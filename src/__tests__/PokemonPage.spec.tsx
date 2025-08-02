import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonsReducer from '@/store/slices/selectedPokemonsSlice';
import { useLocalStorage } from '@/store/hooks/useLocalStorage';
import PokemonPage from '@/pages/pokemon/PokemonPage';

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
  return configureStore({
    reducer: {
      selectedPokemons: selectedPokemonsReducer,
    },
  });
};

describe('PokemonListPage', () => {
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

  it('does not display pagination when searching by name', async () => {
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

  it('displays Outlet for Pokemon items', async () => {
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
});
