import { PokemonDetails } from '@/store/types/pokemon';
import styles from '../PokemonDetail.module.css';

interface PokemonTypesProps {
  pokemon: Pick<PokemonDetails, 'types'>;
}

export function PokemonTypes({ pokemon }: PokemonTypesProps) {
  return (
    <div className={styles['pokemon-types']}>
      {pokemon?.types?.map((type) => (
        <span
          key={type}
          className={`${styles['type-badge']} ${styles[`type-${type}`]}`}
        >
          {type}
        </span>
      ))}
    </div>
  );
}
