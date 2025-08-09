import { PokemonDetails } from '@/store/types/pokemon';
import styles from '../PokemonDetail.module.css';

interface PokemonAbilitiesProps {
  pokemon: Pick<PokemonDetails, 'abilities'>;
}
export function PokemonAbilities({ pokemon }: PokemonAbilitiesProps) {
  return (
    <div className={styles['pokemon-abilities']}>
      <h4>Abilities</h4>
      <ul>
        {pokemon.abilities?.map((ability) => (
          <li key={ability}>{ability.replace('-', ' ')}</li>
        ))}
      </ul>
    </div>
  );
}
