import { getPokemonId, getPokemonImage } from '@/api/getPokemon';
import { Pokemon } from '@/store/types/pokemon';
interface PokemonInfoProps {
  pokemon: Pokemon;
}
export function PokemonInfo({ pokemon }: PokemonInfoProps) {
  const id = getPokemonId(pokemon);
  return (
    <>
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
    </>
  );
}
