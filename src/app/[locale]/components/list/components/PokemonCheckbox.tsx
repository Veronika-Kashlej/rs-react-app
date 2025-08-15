import { useDispatch } from 'react-redux';
import { Pokemon } from '../../../../../store/types/pokemon';
import { togglePokemonSelection } from '../../../../../store/slices/selectedPokemonsSlice';
import styles from '../PokemonList.module.css';

interface PokemonCheckboxProps {
  pokemon: Pokemon;
  isSelected: boolean;
}
export function PokemonCheckbox({ pokemon, isSelected }: PokemonCheckboxProps) {
  const dispatch = useDispatch();

  const handleCheckboxChange = (e: React.MouseEvent, pokemon: Pokemon) => {
    e.stopPropagation();
    dispatch(togglePokemonSelection(pokemon));
  };
  return (
    <div
      className={styles['pokemon-checkbox']}
      onClick={(e) => handleCheckboxChange(e, pokemon)}
    >
      <input
        type="checkbox"
        checked={isSelected}
        readOnly
        data-testid={`checkbox-${pokemon.id}`}
      />
    </div>
  );
}
