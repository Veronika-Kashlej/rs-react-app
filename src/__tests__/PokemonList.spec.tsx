import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PokemonList from '@/components/main/PokemonList';
import { BrowserRouter } from 'react-router-dom';

describe('PokemonList', () => {
  it('navigates to detail page when pokemon clicked', () => {
    const mockPokemons = [
      { id: 1, name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      {
        id: 2,
        name: 'ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
      },
    ];
    render(
      <BrowserRouter>
        <PokemonList results={mockPokemons} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Ivysaur'));
    expect(window.location.pathname).toBe('/details/2');
  });
});
