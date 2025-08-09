import AboutPage from '@/app/about/page';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

describe('AboutPage Component', () => {
  it('renders back button', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    const backButton = screen.getByText(/back to pokémon/i);
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/');
  });
});
