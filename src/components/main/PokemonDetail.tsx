import { useEffect, useState } from 'react';
import './PokemonDetail.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { PokemonApiResponse, PokemonDetails } from '@/types/pokemon';
import { getPokemonImage } from '@/api/getPokemon';

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const handleCloseDetail = () => {
    navigate({
      pathname: '/',
      search: searchParams.toString(),
    });
  };

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
        <button onClick={handleCloseDetail}>Close</button>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="pokemon-detail">
      <button className="close-button" onClick={handleCloseDetail}>
        X
      </button>

      <div className="detail-header">
        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
        <div className="pokemon-info">
          <h3 className="pokemon-name">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h3>
          <p className="pokemon-id">#{id?.padStart(3, '0')}</p>
          <div className="pokemon-types">
            {pokemon.types?.map((type) => (
              <span key={type} className={`type-badge type-${type}`}>
                {type}
              </span>
            ))}
          </div>
          <div className="pokemon-stats">
            <div className="pokemon-stats">
              <div className="stat">
                <span className="stat-label">Height</span>
                <span>{pokemon.height}m</span>
              </div>
              <div className="stat">
                <span className="stat-label">Weight</span>
                <span>{pokemon.weight}kg</span>
              </div>
            </div>
          </div>
          <div className="pokemon-abilities">
            <h4>Abilities</h4>
            <ul>
              {pokemon.abilities?.map((ability) => (
                <li key={ability}>{ability.replace('-', ' ')}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
