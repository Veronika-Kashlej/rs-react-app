import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Pokemon } from '@/types/pokemon';
import PokemonListPage from '@/pages/pokemon/PokemonPage';

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
  useNavigate: vi.fn(),
  Outlet: vi.fn(() => <div>Outlet</div>),
}));

vi.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn(),
}));

vi.mock('./search/Search', () => ({
  default: vi.fn(({ onSearch, initialQuery }) => (
    <div>
      <input data-testid="search-input" defaultValue={initialQuery} />
      <button data-testid="search-button" onClick={() => onSearch('pikachu')}>
        Search
      </button>
    </div>
  )),
}));

vi.mock('./main/PokemonList', () => ({
  default: vi.fn(({ results }) => (
    <div data-testid="pokemon-list">
      {results.map((pokemon: Pokemon) => (
        <div key={pokemon.name}>{pokemon.name}</div>
      ))}
    </div>
  )),
}));

vi.mock('./main/Pagination', () => ({
  Pagination: vi.fn(({ currentPage, totalPages, onPageChange }) => (
    <div>
      <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
    </div>
  )),
}));

describe('PokemonListPage', () => {
  const mockSetSearchParams = vi.fn();
  const mockNavigate = vi.fn();
  const mockSetLocalData = vi.fn();

  beforeEach(() => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('?page=1'),
      mockSetSearchParams,
    ]);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useLocalStorage).mockReturnValue(['', mockSetLocalData]);
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders error state when fetch fails', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

    render(<PokemonListPage />);

    await waitFor(() => {
      expect(
        screen.getByText('Oops! Something went wrong')
      ).toBeInTheDocument();
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('fetches and displays pokemon list', async () => {
    const mockData = {
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      ],
      count: 50,
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    render(<PokemonListPage />);

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
      expect(screen.getByText('Charmander')).toBeInTheDocument();
    });
  });

  it('handles pagination correctly', async () => {
    const mockData = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
      count: 50,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    render(<PokemonListPage />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Next'));
      expect(mockSetSearchParams).toHaveBeenCalled();
    });
  });

  it('renders Outlet for detail view', async () => {
    const mockData = {
      results: [],
      count: 0,
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    render(<PokemonListPage />);

    await waitFor(() => {
      expect(screen.getByText('Outlet')).toBeInTheDocument();
    });
  });
  it('handles individual pokemon fetch correctly', async () => {
    const mockPokemonData = {
      name: 'pikachu',
      id: 25,
      sprites: { front_default: 'pikachu.png' },
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPokemonData),
    } as Response);

    vi.mocked(useLocalStorage).mockReturnValue(['pikachu', mockSetLocalData]);

    render(<PokemonListPage />);

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
      expect(fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
    });
  });
  it('handles 404 error for individual pokemon', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    vi.mocked(useLocalStorage).mockReturnValue(['missingno', mockSetLocalData]);

    render(<PokemonListPage />);

    await waitFor(() => {
      expect(screen.getByText('Pokemon not found')).toBeInTheDocument();
    });
  });
  it('handles server error (500+) for individual pokemon', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    vi.mocked(useLocalStorage).mockReturnValue(['pikachu', mockSetLocalData]);

    render(<PokemonListPage />);

    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });
  });
  it('handles generic fetch error for individual pokemon', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 400,
    } as Response);

    vi.mocked(useLocalStorage).mockReturnValue(['pikachu', mockSetLocalData]);

    render(<PokemonListPage />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
    });
  });
});
