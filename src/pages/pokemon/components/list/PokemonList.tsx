import { Pokemon } from '@/store/types/pokemon';
import './PokemonList.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPokemonId } from '@/api/getPokemon';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PokemonInfo } from './components/PokemonInfo';
import { PokemonCheckbox } from './components/PokemonCheckbox';

interface PokemonListProps {
  results: Pokemon[];
}

function PokemonList({ results }: PokemonListProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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
            <PokemonCheckbox pokemon={pokemon} isSelected={isSelected} />
            <PokemonInfo pokemon={pokemon} />
          </div>
        );
      })}
    </div>
  );
}

export default PokemonList;
