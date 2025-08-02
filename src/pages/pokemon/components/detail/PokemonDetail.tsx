import { useEffect, useState } from 'react';
import './PokemonDetail.css';
import { useParams } from 'react-router-dom';
import { PokemonApiResponse, PokemonDetails } from '@/store/types/pokemon';
import { getPokemonImage } from '@/api/getPokemon';
import { PokemonTypes } from './components/PokemonTypes';
import { PokemonStats } from './components/PokemonStats';
import { PokemonAbilities } from './components/PokemonAbilities';
import { CloseButton } from './components/CloseButton';

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPokemonDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error('Pokemon not found');
        const data: PokemonApiResponse = await response.json();
        setPokemon({
          id: id,
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          image: getPokemonImage(id),
          types: data.types.map((t) => t.type.name),
          abilities: data.abilities.map((a) => a.ability.name),
          height: data.height / 10,
          weight: data.weight / 10,
        });
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch details'
        );
        setPokemon(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

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
        <p>{error}</p>
        <CloseButton />
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
