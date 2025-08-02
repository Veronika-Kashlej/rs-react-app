import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PokemonDetail from '@/pages/pokemon/components/detail/PokemonDetail';
import userEvent from '@testing-library/user-event';

vi.mock('react-router-dom');
vi.mock('@/api/getPokemon', () => ({
  getPokemonImage: vi.fn().mockReturnValue('mock-image-url'),
}));
global.fetch = vi.fn();

describe('PokemonDetail', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useParams).mockReturnValue({ id: '1' });

    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=2'),
      vi.fn(),
    ]);

    vi.mocked(fetch).mockReset();
  });

  it('closes detail page and preserves page params', async () => {
    const mockData = {
      name: 'pikachu',
      types: [{ type: { name: 'electric' } }],
      abilities: [{ ability: { name: 'static' } }],
      height: 40,
      weight: 60,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    render(<PokemonDetail />);

    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'X' }));

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: 'page=2',
    });
  });

  it('handles errors when fetching Pokemon details', async () => {
    const errorMessage = 'Custom error message';
    vi.mocked(fetch).mockRejectedValue(new Error(errorMessage));
    render(<PokemonDetail />);
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });

  it('does not render anything if there is no id', () => {
    vi.mocked(useParams).mockReturnValue({ id: undefined });
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      vi.fn(),
    ]);
    const { container } = render(<PokemonDetail />);
    expect(container).toBeEmptyDOMElement();
  });

  it('handles error without message', async () => {
    vi.mocked(fetch).mockRejectedValue({ customError: 'some error' });

    render(<PokemonDetail />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch details')).toBeInTheDocument();
    });
  });
});
