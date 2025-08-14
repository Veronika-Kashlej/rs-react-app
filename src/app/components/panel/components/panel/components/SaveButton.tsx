'use client';

import { useTransition } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import styles from 'src/app/components/panel/SelectedPokemonsPanel.module.css';
import { generateCSV } from '@/app/actions/generateCSV';

export function SaveButton() {
  const [isPending, startTransition] = useTransition();
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedPokemons.selected
  );

  const handleDownloadCSV = () => {
    startTransition(async () => {
      try {
        const csvContent = await generateCSV(selectedPokemons);
        const blob = new Blob([csvContent], {
          type: 'text/csv;charset=utf-8;',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute(
          'download',
          `${selectedPokemons.length}_pokemons.csv`
        );
        link.click();
      } catch (error) {
        console.error('Failed to generate CSV:', error);
      }
    });
  };

  return (
    <button
      className={`${styles.button} ${styles['button--download']}`}
      onClick={handleDownloadCSV}
      disabled={isPending}
    >
      <span className={styles.icon}>↓</span>
      {isPending ? 'Generating...' : 'Export CSV'}
    </button>
  );
}
