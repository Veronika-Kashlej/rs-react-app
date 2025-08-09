'use client';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export function usePagination(initialPage = 1) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    const page = Number(searchParams?.get('page')) || initialPage;
    setCurrentPage(page);
  }, [searchParams, initialPage]);

  const setPage = useCallback(
    (page: number) => {
      const newParams = new URLSearchParams(searchParams?.toString());
      newParams.set('page', page.toString());

      router.push(`?${newParams.toString()}`, { scroll: false });
      setCurrentPage(page);
    },
    [searchParams, router]
  );

  return {
    currentPage,
    setPage,
  };
}
