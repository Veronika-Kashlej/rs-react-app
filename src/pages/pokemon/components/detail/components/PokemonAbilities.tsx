import { PokemonDetails } from '@/store/types/pokemon';
interface PokemonAbilitiesProps {
  pokemon: Pick<PokemonDetails, 'abilities'>;
}
export function PokemonAbilities({ pokemon }: PokemonAbilitiesProps) {
  return (
    <div className="pokemon-abilities">
      <h4>Abilities</h4>
      <ul>
        {pokemon.abilities?.map((ability) => (
          <li key={ability}>{ability.replace('-', ' ')}</li>
        ))}
      </ul>
    </div>
  );
}
