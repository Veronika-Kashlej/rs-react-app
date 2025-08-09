import { describe, it, expect } from 'vitest';
import { getPokemonImage, getPokemonId } from '@/app/api/getPokemon';
import { Pokemon } from '@/store/types/pokemon';

describe('getPokemon utilities', () => {
  describe('getPokemonImage', () => {
    it('returns correct image URL for given id', () => {
      const id = '25';
      const expectedUrl =
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
      expect(getPokemonImage(id)).toBe(expectedUrl);
    });
  });

  describe('getPokemonId', () => {
    it('handles empty URL', () => {
      const pokemon: Pokemon = {
        name: 'pikachu',
        url: '',
      };
      expect(getPokemonId(pokemon)).toBe('0');
    });
  });
});
