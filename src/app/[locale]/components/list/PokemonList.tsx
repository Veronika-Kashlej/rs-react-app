'use client';
import { useSelector } from 'react-redux';
import { PokemonInfo } from './components/PokemonInfo';
import { PokemonCheckbox } from './components/PokemonCheckbox';
import { Pokemon } from '@/store/types/pokemon';
import { RootState } from '@/store';
import { getPokemonId } from '@/app/api/getPokemon';
import styles from './PokemonList.module.css';

interface PokemonListProps {
  results: Pokemon[];
  onSelect: (id: string) => void;
}

function PokemonList({ results, onSelect }: PokemonListProps) {
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedPokemons.selected
  );

  return (
    <div className={styles['pokemon-grid']}>
      {results.map((pokemon) => {
        const id = getPokemonId(pokemon);
        const isSelected = selectedPokemons.some((p) => getPokemonId(p) === id);
        return (
          <div
            key={id}
            className={`${styles['pokemon-card']} ${isSelected ? styles.selected : ''}`}
            onClick={() => onSelect(id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(id)}
          >
            <PokemonCheckbox pokemon={pokemon} isSelected={isSelected} />
            <PokemonInfo pokemon={pokemon} />
          </div>
        );
      })}
    </div>
  );
}

export default PokemonList;
