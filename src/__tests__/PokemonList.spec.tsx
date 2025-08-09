import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { togglePokemonSelection } from '@/store/slices/selectedPokemonsSlice';
import { getPokemonId } from '@/app/api/getPokemon';
import PokemonList from '@/app/components/list/PokemonList';

describe('PokemonList', () => {
  const mockPokemons = [
    { id: 1, name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    {
      id: 2,
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ];

  it('navigates to detail page when pokemon clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonList results={mockPokemons} />
        </BrowserRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('Ivysaur'));
    expect(window.location.pathname).toBe('/details/2');
  });
  it('should toggle pokemon selection on checkbox click', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonList results={mockPokemons} />
        </BrowserRouter>
      </Provider>
    );

    const checkbox = screen.getByTestId(
      `checkbox-${getPokemonId(mockPokemons[0])}`
    );
    fireEvent.click(checkbox);
    expect(dispatchSpy).toHaveBeenCalledWith(
      togglePokemonSelection(mockPokemons[0])
    );

    expect(checkbox).toBeChecked();
  });
});
