'use client';
import { useMemo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { usePokemonSearch } from '@/store/hooks/usePokemonSearch';
import { usePagination } from '@/store/hooks/usePagination';
import styles from './page.module.css';
import {
  pokemonApi,
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
  useRefreshPokemonsMutation,
} from '@/store/slices/apiSlice';
import Search from './components/search/Search';
import SelectedPokemonsPanel from './components/panel/SelectedPokemonsPanel';
import { ErrorMessage } from './components/error/ErrorMessage';
import { Pagination } from './components/pagination/Pagination';
import PokemonList from './components/list/PokemonList';
import { useSearchParams } from 'next/navigation';
import PokemonDetail from './components/details/PokemonDetails';
import { useTranslations } from 'next-intl';

export default function PokemonPage() {
  const homeT = useTranslations('HomePage');
  const [selectedPokemonId, setSelectedPokemonId] = useState<string | null>(
    null
  );
  const dispatch = useDispatch<AppDispatch>();
  const { query, handleSearch } = usePokemonSearch();
  const { currentPage, setPage } = usePagination();
  const [refresh] = useRefreshPokemonsMutation();
  const searchParams = useSearchParams();
  const selectedId = searchParams?.get('details');
  useEffect(() => {
    if (selectedId) {
      setSelectedPokemonId(selectedId);
    }
  }, [selectedId]);
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

  const handlePokemonSelect = (id: string) => {
    setSelectedPokemonId(id);
    const params = new URLSearchParams(searchParams?.toString());
    params.set('details', id);
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  const handleCloseDetail = () => {
    setSelectedPokemonId(null);
    const params = new URLSearchParams(searchParams?.toString());
    params.delete('details');
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  return (
    <div className={styles.container}>
      <Search onSearch={onSearch} initialQuery={query} />
      <div className={styles.content}>
        <div className={styles['master-content']}>
          <div className={styles.actions}>
            <button onClick={handleRefresh} className={styles.refreshButton}>
              {homeT('refresh-button')}
            </button>
            <button onClick={handleResetCache} className={styles.refreshButton}>
              {homeT('reset-button')}
            </button>
          </div>

          {isLoading && <div className={styles.loadingSpinner}></div>}
          {error && <ErrorMessage error={error} />}

          {!isLoading && !error && (
            <div className={styles.masterDetailContainer}>
              <SelectedPokemonsPanel />
              <PokemonList results={results} onSelect={handlePokemonSelect} />
              {!query && totalPages > 1 && results.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  disabled={isLoading || isFetching}
                />
              )}
            </div>
          )}
        </div>
        {selectedPokemonId && (
          <div className={styles['detail-content']}>
            <PokemonDetail id={selectedPokemonId} onClose={handleCloseDetail} />
          </div>
        )}
      </div>
    </div>
  );
}
