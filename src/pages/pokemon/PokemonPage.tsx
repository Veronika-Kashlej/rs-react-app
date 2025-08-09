import { Outlet } from 'react-router-dom';
import Search from './components/search/Search';
import './PokemonPage.css';
import { ErrorMessage } from './components/error/ErrorMessage';
import SelectedPokemonsPanel from './components/panel/SelectedPokemonsPanel';
import PokemonList from './components/list/PokemonList';
import { Pagination } from './components/pagination/Pagination';
import {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
  useRefreshPokemonsMutation,
  pokemonApi,
} from '@/store/slices/apiSlice';
import { usePokemonSearch } from '@/store/hooks/usePokemonSearch';
import { usePagination } from '@/store/hooks/usePagination';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';

function PokemonPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { query, handleSearch } = usePokemonSearch();
  const { currentPage, setPage } = usePagination();
  const [refresh] = useRefreshPokemonsMutation();

  const {
    data: listData,
    isLoading: isListLoading,
    isFetching: isListFetching,
    error: listError,
    refetch: refetchList,
  } = useGetPokemonListQuery(
    { page: currentPage, limit: 20 },
    { skip: !!query }
  );

  const {
    data: pokemonData,
    isLoading: isPokemonLoading,
    isFetching: isPokemonFetching,
    error: pokemonError,
    refetch: refetchPokemon,
  } = useGetPokemonByNameQuery(query!, { skip: !query });

  const isLoading = query ? isPokemonLoading : isListLoading;
  const isFetching = query ? isPokemonFetching : isListFetching;
  const error = query ? pokemonError : listError;
  const refetch = query ? refetchPokemon : refetchList;
  const results = useMemo(
    () => (query && pokemonData ? [pokemonData] : listData?.results || []),
    [query, pokemonData, listData]
  );
  const totalPages = useMemo(
    () => (listData ? Math.ceil(listData.count / 20) : 0),
    [listData]
  );

  const handleRefresh = () => {
    if (query) {
      refetch();
    } else {
      refresh(undefined);
    }
  };

  const handleResetCache = () => {
    dispatch(pokemonApi.util.resetApiState());
  };

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
      <button onClick={handleRefresh} className="refresh-button">
        Refresh Data
      </button>
      <button onClick={handleResetCache} className="refresh-button">
        Reset all cache
      </button>
      {isLoading && <div className="loading-spinner"></div>}
      {error && <ErrorMessage error={error} />}{' '}
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
                disabled={isLoading || isFetching}
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
