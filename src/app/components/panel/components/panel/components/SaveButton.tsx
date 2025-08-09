import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store';
import { getPokemonId } from '../../../../../api/getPokemon';
import styles from 'src/app/components/panel/SelectedPokemonsPanel.module.css';

export function SaveButton() {
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedPokemons.selected
  );
  function handleDownloadCSV() {
    const headers = ['ID', 'Name', 'URL'];
    const csvRows = selectedPokemons.map((pokemon) => {
      const id = getPokemonId(pokemon);
      return [id, `"${pokemon.name}"`, `"${pokemon.url}"`].join(',');
    });
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedPokemons.length}_pokemons.csv`);
    link.click();
  }
  return (
    <button
      className={`${styles.button} ${styles['button--download']}`}
      onClick={handleDownloadCSV}
    >
      <span className={styles.icon}>↓</span>
      Export CSV
    </button>
  );
}
