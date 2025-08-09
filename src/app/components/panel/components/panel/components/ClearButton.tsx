import { useDispatch } from 'react-redux';
import { clearSelectedPokemons } from '../../../../../../store/slices/selectedPokemonsSlice';
import styles from 'src/app/components/panel/SelectedPokemonsPanel.module.css';

export function ClearButton() {
  const dispatch = useDispatch();
  return (
    <button
      className={`${styles.button} ${styles['button--clear']}`}
      onClick={() => dispatch(clearSelectedPokemons())}
    >
      <span className={styles.icon}>×</span>
      Clear All
    </button>
  );
}
