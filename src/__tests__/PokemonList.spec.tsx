import PokemonList from '@/components/main/PokemonList';
import { Pokemon } from '@/types/pokemon';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, beforeEach, expect, it, vi, afterEach } from 'vitest';
const mockPokemonList: Pokemon[] = [
  { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
  { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
];
const mockFetch = vi.fn();
global.fetch = mockFetch;
let pokemonList: PokemonList;
describe('PokemonList', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    pokemonList = new PokemonList({ results: [] });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading skeleton when fetching data', () => {
    render(<PokemonList results={mockPokemonList} />);
    expect(screen.getByRole('loading')).toBeInTheDocument();
  });
  it('handles fetch errors gracefully', () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    render(<PokemonList results={[mockPokemonList[0]]} />);
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
  });
  it('displays pokemon cards after loading', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: 'pikachu',
        types: [{ type: { name: 'electric' } }],
        abilities: [
          { ability: { name: 'static' } },
          { ability: { name: 'lightning-rod' } },
        ],
        height: 4,
        weight: 60,
      }),
    });
    render(<PokemonList results={[mockPokemonList[0]]} />);
    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
      expect(screen.getByText('#025')).toBeInTheDocument();
      expect(screen.getByText('electric')).toBeInTheDocument();
      expect(screen.getByText('0.4m')).toBeInTheDocument();
      expect(screen.getByText('6kg')).toBeInTheDocument();
      expect(screen.getByText('static')).toBeInTheDocument();
      expect(screen.getByText('lightning rod')).toBeInTheDocument();
    });
  });
  it('should return "0" when Pokemon has no id and no url', () => {
    const pokemonWithoutIdOrUrl = {
      name: 'missingno',
    } as unknown as Pokemon;

    const result = pokemonList.getPokemonId(pokemonWithoutIdOrUrl);
    expect(result).toBe('0');
  });
  it('should call fetchPokemonDetails when results prop changes', async () => {
    const initialProps = {
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      ],
    };

    const nextProps = {
      results: [
        { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
      ],
    };

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          name: 'pikachu',
          types: [{ type: { name: 'electric' } }],
          abilities: [{ ability: { name: 'static' } }],
          height: 4,
          weight: 60,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          name: 'charizard',
          types: [{ type: { name: 'fire' } }],
          abilities: [{ ability: { name: 'blaze' } }],
          height: 17,
          weight: 905,
        }),
      });

    const { rerender } = render(<PokemonList {...initialProps} />);

    await vi.waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    rerender(<PokemonList {...nextProps} />);

    await vi.waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });
  it('should handle image errors', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        name: 'pikachu',
        types: [{ type: { name: 'electric' } }],
        abilities: [{ ability: { name: 'static' } }],
        height: 4,
        weight: 60,
      }),
    });

    render(
      <PokemonList
        results={[
          {
            name: 'pikachu',
            url: 'https://pokeapi.co/api/v2/pokemon/25/',
          },
        ]}
      />
    );
    await waitFor(() => {
      expect(screen.getByAltText('pikachu')).toBeInTheDocument();
    });

    const image = screen.getByAltText('pikachu') as HTMLImageElement;
    fireEvent.error(image);

    expect(image.src).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    );
  });
  it('should return array as-is when input is array', () => {
    const inputArray: Pokemon[] = [
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
    ];

    const result = pokemonList.normalizeResults(inputArray);
    expect(result).toBe(inputArray);
    expect(result).toEqual(inputArray);
  });
});
