import { useGetPokemonDetailsQuery } from '@/store/slices/apiSlice';
import './PokemonDetail.css';
import { useParams } from 'react-router-dom';
import { PokemonTypes } from './components/PokemonTypes';
import { PokemonStats } from './components/PokemonStats';
import { PokemonAbilities } from './components/PokemonAbilities';
import { CloseButton } from './components/CloseButton';

function PokemonDetail() {
  const { id } = useParams();
  const {
    data: pokemon,
    isLoading,
    error,
  } = useGetPokemonDetailsQuery(id!, { skip: !id });

  if (isLoading) {
    return (
      <div className="detail-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-error">
        <CloseButton />
        <p>Failed to fetch details</p>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="pokemon-detail">
      <CloseButton />
      <div className="detail-header">
        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
        <div className="pokemon-info">
          <h3 className="pokemon-name">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h3>
          <p className="pokemon-id">#{id?.padStart(3, '0')}</p>
          <PokemonTypes pokemon={pokemon} />
          <PokemonStats pokemon={pokemon} />
          <PokemonAbilities pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
