import { useSelector } from 'react-redux';
import './SelectedPokemonsPanel.css';
import { RootState } from '@/store';
import { ClearButton } from './components/panel/components/ClearButton';
import { SaveButton } from './components/panel/components/SaveButton';

function SelectedPokemonsPanel() {
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedPokemons.selected
  );

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
          <ClearButton />
          <SaveButton />
        </div>
      </div>
    </div>
  );
}

export default SelectedPokemonsPanel;
