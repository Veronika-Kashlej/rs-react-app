import { PokemonDetails } from '@/store/types/pokemon';
import styles from '../PokemonDetail.module.css';
import { useTranslations } from 'next-intl';

interface PokemonStatsProps {
  pokemon: Pick<PokemonDetails, 'height' | 'weight'>;
}
export function PokemonStats({ pokemon }: PokemonStatsProps) {
  const detailsT = useTranslations('PokemonDetails');
  return (
    <div className={styles['pokemon-stats']}>
      <div className={styles.stat}>
        <span className={styles['stat-label']}>{detailsT('height')}</span>
        <span>
          {pokemon?.height}
          {detailsT('measureHeight')}
        </span>
      </div>
      <div className={styles.stat}>
        <span className={styles['stat-label']}>{detailsT('weight')}</span>
        <span>
          {pokemon?.weight}
          {detailsT('measureWeight')}
        </span>
      </div>
    </div>
  );
}
