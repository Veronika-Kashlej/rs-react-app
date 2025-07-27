import { Pokemon } from '@/types/pokemon';
import './PokemonList.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPokemonId, getPokemonImage } from '@/api/getPokemon';

interface PokemonListProps {
  results: Pokemon[];
}

function PokemonList({ results }: PokemonListProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handlePokemonSelect = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    navigate({
      pathname: `details/${id}`,
      search: params.toString(),
    });
  };

  return (
    <div className="pokemon-grid">
      {results.map((pokemon) => {
        const id = getPokemonId(pokemon);
        return (
          <div
            key={id}
            className="pokemon-card"
            onClick={() => handlePokemonSelect(id)}
          >
            <img
              src={getPokemonImage(id)}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <div className="pokemon-info">
              <h3 className="pokemon-name">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h3>
              <p className="pokemon-id">#{id.padStart(3, '0')}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PokemonList;
