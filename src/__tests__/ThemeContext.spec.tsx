import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

describe('ThemeProvider', () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Provides a light theme by default', () => {
    localStorageMock.getItem.mockReturnValue(null);

    const TestComponent = () => {
      const { theme } = useTheme();
      return <div>Current theme: {theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
  });

  it('restores theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('dark');

    const TestComponent = () => {
      const { theme } = useTheme();
      return <div>Current theme: {theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
  });

  it('switches the theme from light to dark and back', () => {
    localStorageMock.getItem.mockReturnValue('light');

    const TestComponent = () => {
      const { theme, toggleTheme } = useTheme();
      return (
        <>
          <div>Current theme: {theme}</div>
          <button onClick={toggleTheme}>Toggle theme</button>
        </>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    act(() => {
      screen.getByText('Toggle theme').click();
    });

    expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');

    act(() => {
      screen.getByText('Toggle theme').click();
    });

    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('updates the data-theme attribute and localStorage when the theme changes', () => {
    localStorageMock.getItem.mockReturnValue('light');

    const TestComponent = () => {
      const { toggleTheme } = useTheme();
      return <button onClick={toggleTheme}>Toggle theme</button>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    act(() => {
      screen.getByText('Toggle theme').click();
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });
});

describe('useTheme', () => {
  it('throws an error when used outside of ThemeProvider', () => {
    const originalError = console.error;
    console.error = vi.fn();

    expect(() => {
      const TestComponent = () => {
        useTheme();
        return null;
      };
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');

    console.error = originalError;
  });
});
