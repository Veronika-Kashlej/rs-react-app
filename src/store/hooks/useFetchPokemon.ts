import { useCallback, useState } from 'react';
import { Pokemon } from '@/store/types/pokemon';

interface FetchPokemonResult {
  results: Pokemon[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  fetchData: (query: string, page: number) => Promise<void>;
}

export function useFetchPokemon(itemsPerPage = 25): FetchPokemonResult {
  const [results, setResults] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = useCallback(
    async (query: string = '', page: number = 1) => {
      setIsLoading(true);
      setError(null);

      try {
        if (query) {
          const url = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase().trim()}`;
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(
              response.status >= 500
                ? 'Server error'
                : response.status === 404
                  ? 'Pokemon not found'
                  : 'Failed to fetch data'
            );
          }

          const data = await response.json();
          setResults([
            {
              name: data.name,
              url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
              id: data.id,
              sprites: data.sprites,
            },
          ]);
          setTotalPages(1);
        } else {
          const offset = (page - 1) * itemsPerPage;
          const url = `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`;
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error('Failed to fetch Pokemon list');
          }

          const data = await response.json();
          setResults(data.results);
          setTotalPages(Math.ceil(data.count / itemsPerPage));
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch Pokemon'
        );
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [itemsPerPage]
  );

  return {
    results,
    isLoading,
    error,
    totalPages,
    fetchData,
  };
}
