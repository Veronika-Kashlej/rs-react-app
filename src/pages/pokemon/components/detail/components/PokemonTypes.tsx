import { PokemonDetails } from '@/store/types/pokemon';
interface PokemonTypesProps {
  pokemon: Pick<PokemonDetails, 'types'>;
}

export function PokemonTypes({ pokemon }: PokemonTypesProps) {
  return (
    <div className="pokemon-types">
      {pokemon?.types?.map((type) => (
        <span key={type} className={`type-badge type-${type}`}>
          {type}
        </span>
      ))}
    </div>
  );
}
