import { Outlet } from 'react-router-dom';
import Search from './components/search/Search';
import './PokemonPage.css';
import { ErrorMessage } from './components/error/ErrorMessage';
import SelectedPokemonsPanel from './components/panel/SelectedPokemonsPanel';
import PokemonList from './components/list/PokemonList';
import { Pagination } from './components/pagination/Pagination';
import { useFetchPokemon } from '@/store/hooks/useFetchPokemon';
import { usePokemonSearch } from '@/store/hooks/usePokemonSearch';
import { usePagination } from '@/store/hooks/usePagination';
import { useEffect } from 'react';

function PokemonPage() {
  const { query, handleSearch } = usePokemonSearch();
  const { currentPage, setPage } = usePagination();
  const { results, isLoading, error, totalPages, fetchData } =
    useFetchPokemon();

  useEffect(() => {
    fetchData(query, currentPage);
  }, [currentPage, query, fetchData]);

  const handlePageChange = (page: number) => {
    if (query) return;
    setPage(page);
  };

  const onSearch = (searchQuery: string) => {
    handleSearch(searchQuery);
    setPage(1);
  };

  return (
    <div className="wrapper">
      <Search onSearch={onSearch} initialQuery={query} />
      {isLoading && <div className="loading-spinner"></div>}
      {error && <ErrorMessage error={error} />}
      {!isLoading && !error && (
        <div className="master-detail-container">
          <div className="master-content">
            <SelectedPokemonsPanel />
            <PokemonList results={results} />
            {!query && totalPages > 1 && results.length > 0 && (
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

export default PokemonPage;
