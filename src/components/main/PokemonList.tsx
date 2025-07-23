import { useCallback, useEffect, useState } from 'react';
import { Pokemon, PokemonApiResponse, PokemonDetails } from '@/types/pokemon';
import './PokemonList.css';

interface PokemonListProps {
  results: Pokemon[];
}

function PokemonList({ results }: PokemonListProps) {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPokemonId = useCallback(
    (pokemon: Pokemon | PokemonDetails): string => {
      if ('id' in pokemon) return pokemon.id.toString();
      if (pokemon.url) {
        const parts = pokemon.url.split('/');
        return parts[parts.length - 2];
      }
      return '0';
    },
    []
  );

  const getPokemonImage = useCallback((id: string): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }, []);

  const fetchPokemonDetails = useCallback(async () => {
    if (results.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const details = await Promise.all(
        results.map(async (pokemon) => {
          const id = getPokemonId(pokemon);
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          if (!response.ok) throw new Error('Failed to fetch Pokemon details');

          const data: PokemonApiResponse = await response.json();

          return {
            id,
            name: data.name,
            image: getPokemonImage(id),
            types: data.types.map((t) => t.type.name),
            abilities: data.abilities.map((a) => a.ability.name),
            height: data.height / 10,
            weight: data.weight / 10,
          };
        })
      );
      setPokemonDetails(details);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to fetch details'
      );
      setPokemonDetails([]);
    } finally {
      setIsLoading(false);
    }
  }, [results, getPokemonId, getPokemonImage]);

  useEffect(() => {
    fetchPokemonDetails();
  }, [fetchPokemonDetails]);

  if (error) {
    return (
      <div className="error-message">
        <h2>Error loading Pokemon details</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="pokemon-container">
      {isLoading && (
        <div className="skeleton-grid" role="loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
            </div>
          ))}
        </div>
      )}
      <div className={`pokemon-grid ${isLoading ? 'loading' : ''}`}>
        {pokemonDetails.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="pokemon-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
              }}
            />
            <div className="pokemon-info">
              <h3 className="pokemon-name">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h3>
              <p className="pokemon-id">#{pokemon.id.padStart(3, '0')}</p>

              <div className="pokemon-types">
                {pokemon.types?.map((type) => (
                  <span key={type} className={`type-badge type-${type}`}>
                    {type}
                  </span>
                ))}
              </div>

              <div className="pokemon-stats">
                <div className="stat">
                  <span className="stat-label">Height:</span>
                  <span>{pokemon.height}m</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Weight:</span>
                  <span>{pokemon.weight}kg</span>
                </div>
              </div>

              <div className="pokemon-abilities">
                <h4>Abilities:</h4>
                <ul>
                  {pokemon.abilities?.map((ability) => (
                    <li key={ability}>{ability.replace('-', ' ')}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default PokemonList;
