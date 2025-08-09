import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonsReducer from '@/store/slices/selectedPokemonsSlice';
import { useLocalStorage } from '@/store/hooks/useLocalStorage';
import { pokemonApi } from '@/store/slices/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import PokemonPage from '@/app/page';

vi.mock('@/store/hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn(() => ['', vi.fn()]),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

const mockFetch = vi.fn();
global.fetch = mockFetch;

const createTestStore = () => {
  const store = configureStore({
    reducer: {
      selectedPokemons: selectedPokemonsReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });
  setupListeners(store.dispatch);
  return store;
};

describe('PokemonPage', () => {
  const mockPokemonList = {
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ],
    count: 100,
  };

  const mockPokemonDetail = {
    name: 'pikachu',
    id: 25,
    sprites: { front_default: 'pikachu.png' },
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };

  beforeEach(() => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(''),
      vi.fn(),
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    const store = createTestStore();
    return render(
      <Provider store={store}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Provider>
    );
  };

  it('should not display pagination when searching by name', async () => {
    const mockSetLocalData = vi.fn();
    vi.mocked(useLocalStorage).mockReturnValueOnce([
      'pikachu',
      mockSetLocalData,
    ]);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=1'),
      vi.fn(),
    ]);

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPokemonDetail),
    });

    renderWithProviders(<PokemonPage />);

    await waitFor(() => {
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });
  });

  it('should display Outlet for Pokemon details', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPokemonList),
    });

    render(
      <Provider store={createTestStore()}>
        <MemoryRouter>
          <PokemonPage />
          <Routes>
            <Route path="/" element={<div>Detail Content</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Detail Content')).toBeInTheDocument();
    });
  });

  it('should display error message when there is an error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    renderWithProviders(<PokemonPage />);

    await waitFor(() => {
      expect(
        screen.getByText(/Oops! Something went wrong/i)
      ).toBeInTheDocument();
    });
  });

  it('should reset cache when reset cache button is clicked', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPokemonList),
    });

    const store = createTestStore();
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonPage />
        </MemoryRouter>
      </Provider>
    );

    const resetButton = screen.getByText('Reset all cache');
    fireEvent.click(resetButton);

    expect(dispatchSpy).toHaveBeenCalledWith(pokemonApi.util.resetApiState());
  });
});
