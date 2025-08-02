import { getPokemonId } from '@/api/getPokemon';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

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
      className="selected-panel__button selected-panel__button--download"
      onClick={handleDownloadCSV}
    >
      <span className="icon icon--download">↓</span>
      Export CSV
    </button>
  );
}
