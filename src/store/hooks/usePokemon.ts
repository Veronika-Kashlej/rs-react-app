import {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
} from '../slices/apiSlice';

export const usePokemon = (
  query: string = '',
  page: number = 1,
  itemsPerPage: number = 20
) => {
  const {
    data: singlePokemon,
    isLoading: isLoadingSingle,
    error: errorSingle,
  } = useGetPokemonByNameQuery(query, { skip: !query });
  const {
    data: pokemonList,
    isLoading: isLoadingList,
    error: errorList,
  } = useGetPokemonListQuery({ page, limit: itemsPerPage }, { skip: !!query });

  const results = query
    ? singlePokemon
      ? [singlePokemon]
      : []
    : pokemonList?.results || [];
  const totalPages = query ? 1 : pokemonList?.totalPages || 0;
  const isLoading = isLoadingSingle || isLoadingList;
  const error = errorSingle || errorList;

  return {
    results,
    isLoading,
    error,
    totalPages,
  };
};
