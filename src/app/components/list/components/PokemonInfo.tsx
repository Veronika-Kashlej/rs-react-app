import { getPokemonId, getPokemonImage } from '../../../api/getPokemon';
import { Pokemon } from '../../../../store/types/pokemon';
import Image from 'next/image';
import styles from '../PokemonList.module.css';

interface PokemonInfoProps {
  pokemon: Pokemon;
}
export function PokemonInfo({ pokemon }: PokemonInfoProps) {
  const id = getPokemonId(pokemon);
  return (
    <>
      <Image
        src={getPokemonImage(id)}
        alt={pokemon.name}
        className={styles['pokemon-image']}
        width={1}
        height={1}
      />
      <div className={styles['pokemon-info']}>
        <h3 className={styles['pokemon-name']}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>
        <p className={styles['pokemon-id']}>#{id.padStart(3, '0')}</p>
      </div>
    </>
  );
}
