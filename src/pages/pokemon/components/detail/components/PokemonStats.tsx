import { PokemonDetails } from '@/store/types/pokemon';
interface PokemonStatsProps {
  pokemon: Pick<PokemonDetails, 'height' | 'weight'>;
}
export function PokemonStats({ pokemon }: PokemonStatsProps) {
  return (
    <div className="pokemon-stats">
      <div className="stat">
        <span className="stat-label">Height</span>
        <span>{pokemon?.height}m</span>
      </div>
      <div className="stat">
        <span className="stat-label">Weight</span>
        <span>{pokemon?.weight}kg</span>
      </div>
    </div>
  );
}
