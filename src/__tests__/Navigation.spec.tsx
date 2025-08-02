import Navigation from '@/pages/pokemon/navigation/Navigation';
import { ThemeProvider } from '@/context/ThemeContext';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

describe('Navigation Component', () => {
  it('renders logo and links', () => {
    render(
      <ThemeProvider>
        <Router>
          <Navigation />
        </Router>
      </ThemeProvider>
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
      <ThemeProvider>
        <MemoryRouter initialEntries={['/about']}>
          <Navigation />
        </MemoryRouter>
      </ThemeProvider>
    );

    const aboutLink = screen.getByText(/about/i);
    expect(aboutLink).toHaveClass('active');

    const homeLink = screen.getByText(/home/i);
    expect(homeLink).not.toHaveClass('active');
  });
  it('should display the moon icon when the theme is dark', () => {
    localStorage.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <Router>
          <Navigation />
        </Router>
      </ThemeProvider>
    );
    expect(screen.getByText('🌙')).toBeInTheDocument();
  });
});
