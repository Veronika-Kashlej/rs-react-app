import { useCallback } from 'react';
import { useLocalStorage } from '@/store/hooks/useLocalStorage';

export function usePokemonSearch(initialQuery = '') {
  const [query, setQuery] = useLocalStorage('query', initialQuery);

  const handleSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery);
    },
    [setQuery]
  );

  return {
    query,
    handleSearch,
  };
}
