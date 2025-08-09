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
  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
