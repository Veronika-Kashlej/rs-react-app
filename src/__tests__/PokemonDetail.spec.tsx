import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '@/store';
import PokemonDetail from '@/app/components/details/PokemonDetails';

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

    render(
      <Provider store={store}>
        <PokemonDetail />
      </Provider>
    );

    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'X' }));

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: 'page=2',
    });
  });

  it('does not render anything if there is no id', () => {
    vi.mocked(useParams).mockReturnValue({ id: undefined });
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      vi.fn(),
    ]);
    const { container } = render(
      <Provider store={store}>
        <PokemonDetail />
      </Provider>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('handles error without message', async () => {
    vi.mocked(fetch).mockRejectedValue({ customError: 'some error' });

    render(
      <Provider store={store}>
        <PokemonDetail />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch details')).toBeInTheDocument();
    });
  });
});
