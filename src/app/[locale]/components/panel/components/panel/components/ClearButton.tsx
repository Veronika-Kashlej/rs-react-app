import { useDispatch } from 'react-redux';
import { clearSelectedPokemons } from '../../../../../../../store/slices/selectedPokemonsSlice';
import styles from 'src/app/[locale]/components/panel/SelectedPokemonsPanel.module.css';
import { useTranslations } from 'next-intl';

export function ClearButton() {
  const panelT = useTranslations('SelectedPanel');
  const dispatch = useDispatch();
  return (
    <button
      className={`${styles.button} ${styles['button--clear']}`}
      onClick={() => dispatch(clearSelectedPokemons())}
    >
      <span className={styles.icon}>×</span>
      {panelT('clear-button')}
    </button>
  );
}
