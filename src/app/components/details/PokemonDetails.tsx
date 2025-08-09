'use client';
import { PokemonTypes } from './components/PokemonTypes';
import { PokemonStats } from './components/PokemonStats';
import { PokemonAbilities } from './components/PokemonAbilities';
import { CloseButton } from './components/CloseButton';
import { useGetPokemonDetailsQuery } from '../../../store/slices/apiSlice';
import styles from './PokemonDetail.module.css';
import Image from 'next/image';

interface PokemonDetailProps {
  id: string;
  onClose: () => void;
}
function PokemonDetail({ id, onClose }: PokemonDetailProps) {
  const {
    data: pokemon,
    isLoading,
    error,
  } = useGetPokemonDetailsQuery(id, { skip: !id });

  if (isLoading) {
    return (
      <div className={styles['detail-loading']}>
        <div className={styles['loading-spinner']}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['detail-error']}>
        <CloseButton onClick={onClose} />
        <p>Failed to fetch details</p>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className={styles['pokemon-detail']}>
      <CloseButton onClick={onClose} />
      <Image
        src={pokemon.image}
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
        <PokemonTypes pokemon={pokemon} />
        <PokemonStats pokemon={pokemon} />
        <PokemonAbilities pokemon={pokemon} />
      </div>
    </div>
  );
}

export default PokemonDetail;
