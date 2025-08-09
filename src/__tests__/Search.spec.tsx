import Search from '@/app/components/search/Search';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe } from 'node:test';
import { beforeEach, expect, it, vi } from 'vitest';

describe('Search component', () => {
  const mockOnSearch = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });
  describe('Rendering tests', () => {
    it('renders search input and search button', () => {
      render(<Search onSearch={mockOnSearch} />);
      const searchInput = screen.getByRole('textbox');
      const searchButton = screen.getByRole('button', { name: /search/i });
      expect(searchInput).toBeInTheDocument();
      expect(searchButton).toBeInTheDocument();
    });
    it('shows empty input when no saved query exists', () => {
      render(<Search onSearch={mockOnSearch} />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });
    it('uses initialQuery prop when provided', () => {
      render(<Search onSearch={mockOnSearch} initialQuery="bulbasaur" />);
      expect(screen.getByRole('textbox')).toHaveValue('bulbasaur');
    });
  });
  describe('User Interaction Tests', () => {
    it('updates input value when user types', () => {
      render(<Search onSearch={mockOnSearch} />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'charmander' } });
      expect(input).toHaveValue('charmander');
    });
    it('triggers search callback with correct parameters when button is clicked', () => {
      render(<Search onSearch={mockOnSearch} />);
      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /search/i });

      fireEvent.change(input, { target: { value: 'eevee' } });
      fireEvent.click(button);

      expect(mockOnSearch).toHaveBeenCalledWith('eevee');
    });
    it('triggers search callback when Enter key is pressed', () => {
      render(<Search onSearch={mockOnSearch} />);
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: 'jigglypuff' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      expect(mockOnSearch).toHaveBeenCalledWith('jigglypuff');
    });
    it('does not trigger search callback for other key presses', () => {
      render(<Search onSearch={mockOnSearch} />);
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: 'snorlax' } });
      fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });

      expect(mockOnSearch).not.toHaveBeenCalled();
    });
  });
});
