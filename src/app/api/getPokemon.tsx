import { Pokemon } from '../../store/types/pokemon';

export function getPokemonImage(id: string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function getPokemonId(pokemon: Pokemon) {
  if (pokemon.url) {
    const parts = pokemon.url.split('/');
    return parts[parts.length - 2];
  }
  return '0';
}
