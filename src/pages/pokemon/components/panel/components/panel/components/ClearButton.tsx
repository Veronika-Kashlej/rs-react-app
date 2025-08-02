import { clearSelectedPokemons } from '@/store/slices/selectedPokemonsSlice';
import { useDispatch } from 'react-redux';

export function ClearButton() {
  const dispatch = useDispatch();
  return (
    <button
      className="selected-panel__button selected-panel__button--clear"
      onClick={() => dispatch(clearSelectedPokemons())}
    >
      <span className="icon icon--clear">×</span>
      Clear All
    </button>
  );
}
