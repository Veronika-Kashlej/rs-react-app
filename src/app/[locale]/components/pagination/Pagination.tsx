import { useTranslations } from 'next-intl';
import styles from './Pagination.module.css';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  const homeT = useTranslations('HomePage');
  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
        >
          {homeT('prev-button')}
        </button>
        <span>
          {homeT('page.0')} {currentPage} {homeT('page.1')} {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
        >
          {homeT('next-button')}
        </button>
      </div>
    </div>
  );
}
