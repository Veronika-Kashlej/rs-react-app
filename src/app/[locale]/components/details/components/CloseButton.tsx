'use client';
import styles from '../PokemonDetail.module.css';

interface CloseButtonProps {
  onClick: () => void;
}

export function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      className={styles['close-button']}
      onClick={onClick}
      aria-label="Close"
    >
      X
    </button>
  );
}
