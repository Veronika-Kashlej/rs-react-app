import { Pokemon, PokemonApiResponse, PokemonDetails } from '@/types/pokemon';
import { Component } from 'react';
import './PokemonList.css';

interface PokemonListProps {
  results: Pokemon[];
}

class PokemonList extends Component<PokemonListProps> {
  state = {
    pokemonDetails: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchPokemonDetails();
  }

  componentDidUpdate(prevProps: PokemonListProps) {
    if (prevProps.results !== this.props.results) {
      this.fetchPokemonDetails();
    }
  }

  getPokemonId(pokemon: Pokemon | PokemonDetails): string {
    if ('id' in pokemon) return pokemon.id.toString();

    if (pokemon.url) {
      const parts = pokemon.url.split('/');
      return parts[parts.length - 2];
    }

    return '0';
  }

  getPokemonImage(id: string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  normalizeResults(results: Pokemon[]) {
    if (Array.isArray(results)) return results;

    return [results];
  }

  async fetchPokemonDetails() {
    const normalizedResults = this.normalizeResults(this.props.results);
    if (normalizedResults.length === 0) return;
    this.setState({ loading: true, error: null });
    try {
      const details = await Promise.all(
        normalizedResults.map(async (pokemon) => {
          const id = this.getPokemonId(pokemon);
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          if (!response.ok) throw new Error('Failed to fetch Pokemon details');

          const data: PokemonApiResponse = await response.json();

          return {
            id,
            name: data.name,
            image: this.getPokemonImage(id),
            types: data.types.map((t) => t.type.name),
            abilities: data.abilities.map((a) => a.ability.name),
            height: data.height / 10,
            weight: data.weight / 10,
          };
        })
      );

      this.setState({ pokemonDetails: details });
    } catch (error) {
      this.setState({
        error:
          error instanceof Error ? error.message : 'Failed to fetch details',
        pokemonDetails: [],
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { pokemonDetails, loading, error } = this.state;
    const normalizedResults = this.normalizeResults(this.props.results);
    if (error) {
      return <div className="error-message">{error}</div>;
    }
    if (normalizedResults.length === 0)
      return <div className="no-results">No Pokemon found</div>;

    return (
      <main className="pokemon-container">
        {loading && (
          <div className="skeleton-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
              </div>
            ))}
          </div>
        )}
        <div className={`pokemon-grid ${loading ? 'loading' : ''}`}>
          {pokemonDetails.map((pokemon: PokemonDetails) => (
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
                  {pokemon.types?.map((type: string) => (
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
                    {pokemon.abilities?.map((ability: string) => (
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
}

export default PokemonList;
