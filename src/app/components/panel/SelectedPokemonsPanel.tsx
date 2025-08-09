import { useSelector } from 'react-redux';
import { ClearButton } from './components/panel/components/ClearButton';
import { SaveButton } from './components/panel/components/SaveButton';
import { RootState } from '../../../store';
import styles from './SelectedPokemonsPanel.module.css';

function SelectedPokemonsPanel() {
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedPokemons.selected
  );

  if (selectedPokemons.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.count}>{selectedPokemons.length}</span>
          Selected Pokémons
        </h3>
        <div className={styles.actions}>
          <ClearButton />
          <SaveButton />
        </div>
      </div>
    </div>
  );
}

export default SelectedPokemonsPanel;
