import { PokemonDetails } from '@/store/types/pokemon';
import styles from '../PokemonDetail.module.css';

interface PokemonStatsProps {
  pokemon: Pick<PokemonDetails, 'height' | 'weight'>;
}
export function PokemonStats({ pokemon }: PokemonStatsProps) {
  return (
    <div className={styles['pokemon-stats']}>
      <div className={styles.stat}>
        <span className={styles['stat-label']}>Height</span>
        <span>{pokemon?.height}m</span>
      </div>
      <div className={styles.stat}>
        <span className={styles['stat-label']}>Weight</span>
        <span>{pokemon?.weight}kg</span>
      </div>
    </div>
  );
}
