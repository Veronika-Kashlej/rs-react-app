import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function usePagination(initialPage = 1) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    const page = Number(searchParams.get('page')) || initialPage;
    setCurrentPage(page);
  }, [searchParams, initialPage]);

  const setPage = useCallback(
    (page: number) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('page', page.toString());
      setSearchParams(newParams);
      setCurrentPage(page);
    },
    [searchParams, setSearchParams]
  );

  return {
    currentPage,
    setPage,
  };
}
