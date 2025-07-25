import Navigation from '@/components/navigation/Navigation';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

describe('Navigation Component', () => {
  it('renders logo and links', () => {
    render(
      <Router>
        <Navigation />
      </Router>
    );

    const logo = screen.getByText(/pokemon/i);
    expect(logo).toBeInTheDocument();

    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByText(/about/i);
    expect(aboutLink).toBeInTheDocument();
  });
  it('applies active class for current route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Navigation />
      </MemoryRouter>
    );

    const aboutLink = screen.getByText(/about/i);
    expect(aboutLink).toHaveClass('active');

    const homeLink = screen.getByText(/home/i);
    expect(homeLink).not.toHaveClass('active');
  });
});
