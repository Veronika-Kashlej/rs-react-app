import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Search from './components/search/Search';
import PokemonList from './components/main/PokemonList';

function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchPokemon = useCallback(async (query: string = '') => {
    const url = query
      ? `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase().trim()}`
      : 'https://pokeapi.co/api/v2/pokemon?limit=20';

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
    setResults(data.results ? data.results : [data]);
  }, []);
  const handleSearch = useCallback(
    async (query: string) => {
      localStorage.setItem('query', query);
      setIsLoading(true);
      setError(null);

      try {
        await fetchPokemon(query);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to fetch Pokemon'
        );
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchPokemon]
  );
  useEffect(() => {
    const query = localStorage.getItem('query') || '';
    handleSearch(query);
  }, [handleSearch]);
  return (
    <div className="wrapper">
      <Search
        onSearch={handleSearch}
        initialQuery={localStorage.getItem('query') || ''}
      />
      {isLoading && <div className="loading-spinner"></div>}
      {error && (
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <p>Please try another search or check your connection.</p>
        </div>
      )}{' '}
      {!isLoading && !error && <PokemonList results={results} />}
    </div>
  );
}

export default App;
