import { useDispatch, useSelector } from 'react-redux';
import { getPokemonId } from '@/api/getPokemon';
import './SelectedPokemonsPanel.css';
import { RootState } from '@/store';
import { clearSelectedPokemons } from '@/store/slices/selectedPokemonsSlice';

function SelectedPokemonsPanel() {
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedPokemons.selected
  );
  const dispatch = useDispatch();

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

  if (selectedPokemons.length === 0) {
    return null;
  }

  return (
    <div className="selected-panel">
      <div className="selected-panel__header">
        <h3 className="selected-panel__title">
          <span className="selected-panel__count">
            {selectedPokemons.length}
          </span>
          Selected Pokémons
        </h3>
        <div className="selected-panel__actions">
          <button
            className="selected-panel__button selected-panel__button--clear"
            onClick={() => dispatch(clearSelectedPokemons())}
          >
            <span className="icon icon--clear">×</span>
            Clear All
          </button>
          <button
            className="selected-panel__button selected-panel__button--download"
            onClick={handleDownloadCSV}
          >
            <span className="icon icon--download">↓</span>
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectedPokemonsPanel;
