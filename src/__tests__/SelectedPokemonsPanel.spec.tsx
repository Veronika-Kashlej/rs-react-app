import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonsReducer, {
  SelectedPokemonsState,
} from '@/store/slices/selectedPokemonsSlice';
import SelectedPokemonsPanel from '@/pages/pokemon/components/panel/SelectedPokemonsPanel';
vi.mock('@/api/getPokemon', () => ({
  getPokemonId: vi.fn((pokemon) => {
    const matches = pokemon.url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : 'unknown';
  }),
}));

describe('SelectedPokemonsPanel', () => {
  const mockSelectedPokemons = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ];

  const createTestStore = (
    initialState: SelectedPokemonsState = { selected: [] }
  ) => {
    return configureStore({
      reducer: {
        selectedPokemons: selectedPokemonsReducer,
      },
      preloadedState: {
        selectedPokemons: initialState,
      },
    });
  };

  beforeEach(() => {
    global.URL.createObjectURL = vi.fn(() => 'mock-url');

    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation(
      (tagName, options) => {
        if (tagName === 'a') {
          return {
            click: vi.fn(),
            setAttribute: vi.fn(),
            ...options,
          } as unknown as HTMLAnchorElement;
        }
        return originalCreateElement(tagName, options);
      }
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not display when no pokemon selected', () => {
    const store = createTestStore();

    const { container } = render(
      <Provider store={store}>
        <SelectedPokemonsPanel />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('displays the number of selected Pokemon', () => {
    const store = createTestStore({ selected: mockSelectedPokemons });

    render(
      <Provider store={store}>
        <SelectedPokemonsPanel />
      </Provider>
    );

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('2')).toHaveClass('selected-panel__count');
  });

  it('displays Clear All and Export CSV buttons', () => {
    const store = createTestStore({ selected: mockSelectedPokemons });

    render(
      <Provider store={store}>
        <SelectedPokemonsPanel />
      </Provider>
    );

    expect(screen.getByText('Clear All')).toBeInTheDocument();
    expect(screen.getByText('Export CSV')).toBeInTheDocument();
  });

  it('calls dispatch when clicking Clear All', () => {
    const store = createTestStore({ selected: mockSelectedPokemons });
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <SelectedPokemonsPanel />
      </Provider>
    );

    fireEvent.click(screen.getByText('Clear All'));
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('generates CSV when you click on Export CSV', () => {
    const store = createTestStore({ selected: mockSelectedPokemons });

    render(
      <Provider store={store}>
        <SelectedPokemonsPanel />
      </Provider>
    );

    fireEvent.click(screen.getByText('Export CSV'));
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });

  it('correctly generates CSV data', () => {
    const store = createTestStore({ selected: mockSelectedPokemons });
    const mockBlob = vi.fn();
    global.Blob = mockBlob;

    render(
      <Provider store={store}>
        <SelectedPokemonsPanel />
      </Provider>
    );

    fireEvent.click(screen.getByText('Export CSV'));

    const csvContent = mockBlob.mock.calls[0][0][0];
    expect(csvContent).toContain('ID,Name,URL');
    expect(csvContent).toContain(
      '1,"bulbasaur","https://pokeapi.co/api/v2/pokemon/1/"'
    );
    expect(csvContent).toContain(
      '2,"ivysaur","https://pokeapi.co/api/v2/pokemon/2/"'
    );
  });

  it('correctly handles Pokemon without ID in URL', () => {
    const pokemonWithoutId = {
      name: 'unknown',
      url: 'https://pokeapi.co/api/v2/pokemon//',
    };
    const store = createTestStore({ selected: [pokemonWithoutId] });
    const mockBlob = vi.fn();
    global.Blob = mockBlob;

    render(
      <Provider store={store}>
        <SelectedPokemonsPanel />
      </Provider>
    );

    fireEvent.click(screen.getByText('Export CSV'));

    const csvContent = mockBlob.mock.calls[0][0][0];
    expect(csvContent).toContain(
      'unknown,"unknown","https://pokeapi.co/api/v2/pokemon//"'
    );
  });
});
