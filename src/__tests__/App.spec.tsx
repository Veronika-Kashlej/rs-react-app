import { render, screen } from '@testing-library/react';
import App from '@/App';
import { beforeEach, describe, expect, it, vi } from 'vitest';
const mockFetch = vi.fn();
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as unknown as Storage;
global.fetch = mockFetch;
describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    });
    localStorageMock.getItem.mockReturnValue('');
  });

  it('renders initial state correctly', () => {
    render(<App />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Do Not Press (or do)' })
    ).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
  it('loads initial pokemon list on mount', () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ results: ['pikachu', 'bulbasaur'] }),
    });

    render(<App />);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=20'
    );
  });
  it('uses saved query from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue('pikachu');
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ name: 'pikachu' }),
    });
    render(<App />);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('query');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu'
    );
  });
  it('handles 404 error from API', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({}),
    });
    render(<App />);
    expect(await screen.findByText(/Pokemon not found/i)).toBeInTheDocument();
  });
  it('handles 5xx error from API', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    });
    render(<App />);
    expect(await screen.findByText(/Server error/i)).toBeInTheDocument();
  });
  it('handles fetch errors from API', async () => {
    mockFetch.mockResolvedValueOnce(new Error('Network error'));
    render(<App />);
    expect(
      await screen.findByText(/Failed to fetch data/i)
    ).toBeInTheDocument();
  });
});
