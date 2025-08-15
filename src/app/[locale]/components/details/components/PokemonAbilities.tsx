import { PokemonDetails } from '@/store/types/pokemon';
import styles from '../PokemonDetail.module.css';
import { useTranslations } from 'next-intl';

interface PokemonAbilitiesProps {
  pokemon: Pick<PokemonDetails, 'abilities'>;
}
export function PokemonAbilities({ pokemon }: PokemonAbilitiesProps) {
  const detailsT = useTranslations('PokemonDetails');
  return (
    <div className={styles['pokemon-abilities']}>
      <h4>{detailsT('abilities')}</h4>
      <ul>
        {pokemon.abilities?.map((ability) => (
          <li key={ability}>{ability.replace('-', ' ')}</li>
        ))}
      </ul>
    </div>
  );
}
