import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon, PokemonDetails, PokemonApiResponse } from '../types/pokemon';
import { getPokemonImage } from '@/api/getPokemon';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  tagTypes: ['Pokemon'],
  keepUnusedDataFor: 600,
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name.toLowerCase().trim()}`,
      transformResponse: (response: PokemonApiResponse) => ({
        name: response.name,
        url: `https://pokeapi.co/api/v2/pokemon/${response.id}/`,
        id: Number(response.id),
        sprites: { front_default: getPokemonImage(String(response.id)) },
      }),
      providesTags: (result) =>
        result
          ? [{ type: 'Pokemon', id: result.id }]
          : [{ type: 'Pokemon', id: 'LIST' }],
    }),

    getPokemonList: builder.query<
      { results: Pokemon[]; count: number },
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => {
        const offset = (page - 1) * limit;
        return `pokemon?limit=${limit}&offset=${offset}`;
      },
      transformResponse: (response: {
        results: { name: string; url: string }[];
        count: number;
      }) => ({
        results: response.results.map((pokemon) => ({
          ...pokemon,
          id: Number(pokemon.url.split('/').slice(-2, -1)[0]),
        })),
        count: response.count,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: 'Pokemon' as const,
                id,
              })),
              { type: 'Pokemon', id: 'LIST' },
            ]
          : [{ type: 'Pokemon', id: 'LIST' }],
    }),

    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: (id) => `pokemon/${id}`,
      transformResponse: (response: PokemonApiResponse) => ({
        id: response.id,
        name: response.name.charAt(0).toUpperCase() + response.name.slice(1),
        image: getPokemonImage(String(response.id)),
        types: response.types.map((t) => t.type.name),
        abilities: response.abilities.map((a) => a.ability.name),
        height: response.height / 10,
        weight: response.weight / 10,
      }),
      providesTags: (result, error, id) =>
        result
          ? [{ type: 'Pokemon', id: Number(id) }]
          : [{ type: 'Pokemon', id: 'LIST' }],
    }),

    refreshPokemons: builder.mutation<undefined, undefined>({
      queryFn: async () => ({ data: undefined }),
      invalidatesTags: [{ type: 'Pokemon', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
  useGetPokemonDetailsQuery,
  useRefreshPokemonsMutation,
} = pokemonApi;
