import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import Search from '../../components/search/Search';
import PokemonList from '../../components/main/PokemonList';
import { Pokemon } from '@/types/pokemon';
import { Pagination } from '../../components/main/Pagination';

function PokemonListPage() {
  const [results, setResults] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localData, setLocalData] = useLocalStorage('query', '');
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 25;

  const currentPage = Number(searchParams.get('page')) || 1;

  const fetchPokemon = useCallback(
    async (query: string = '', page: number = 1) => {
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
        setError(null);
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
        setError(null);
        setResults(data.results);
        setTotalPages(Math.ceil(data.count / itemsPerPage));
      }
    },
    [itemsPerPage]
  );

  const handleSearch = useCallback(
    async (query: string) => {
      setLocalData(query);
      setIsLoading(true);
      setError(null);
      try {
        await fetchPokemon(query, currentPage);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to fetch Pokemon'
        );
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchPokemon, setLocalData, currentPage]
  );

  const handlePageChange = useCallback(
    async (page: number) => {
      if (localData) return;

      setIsLoading(true);
      setError(null);

      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('page', page.toString());
      setSearchParams(newParams);
      try {
        await fetchPokemon('', page);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to fetch Pokemon list'
        );
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchPokemon, localData, setSearchParams, searchParams]
  );

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', page.toString());
    setSearchParams(newParams);
    fetchPokemon(localData, page).catch((error) => {
      setError(
        error instanceof Error ? error.message : 'Failed to fetch Pokemon'
      );
      setResults([]);
    });
  }, [searchParams, localData, fetchPokemon, setSearchParams]);

  return (
    <div className="wrapper">
      <Search onSearch={handleSearch} initialQuery={localData} />
      {isLoading && <div className="loading-spinner"></div>}
      {error && (
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <p>Please try another search or check your connection.</p>
        </div>
      )}
      {!isLoading && !error && (
        <div className="master-detail-container">
          <div className="master-content">
            <PokemonList results={results} />
            {!localData && totalPages > 1 && results.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                disabled={isLoading}
              />
            )}
          </div>
          <div className="detail-content">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonListPage;
