import { Pokemon } from '@/store/types/pokemon';
import './PokemonList.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPokemonId, getPokemonImage } from '@/api/getPokemon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { togglePokemonSelection } from '@/store/slices/selectedPokemonsSlice';

interface PokemonListProps {
  results: Pokemon[];
}

function PokemonList({ results }: PokemonListProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedPokemons.selected
  );

  const handlePokemonSelect = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    navigate({
      pathname: `details/${id}`,
      search: params.toString(),
    });
  };
  const handleCheckboxChange = (e: React.MouseEvent, pokemon: Pokemon) => {
    e.stopPropagation();
    dispatch(togglePokemonSelection(pokemon));
  };
  return (
    <div className="pokemon-grid">
      {results.map((pokemon) => {
        const id = getPokemonId(pokemon);
        const isSelected = selectedPokemons.some((p) => getPokemonId(p) === id);
        return (
          <div
            key={id}
            className={`pokemon-card ${isSelected ? 'selected' : ''}`}
            onClick={() => handlePokemonSelect(id)}
          >
            <div
              className="pokemon-checkbox"
              onClick={(e) => handleCheckboxChange(e, pokemon)}
            >
              <input
                type="checkbox"
                checked={isSelected}
                readOnly
                data-testid={`checkbox-${pokemon.id}`}
              />
            </div>
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
