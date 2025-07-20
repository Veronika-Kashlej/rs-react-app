import App from '@/App';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe } from 'node:test';
import { afterEach, expect, it, vi } from 'vitest';

describe('ErrorBoundary', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    expect(
      screen.getByRole('button', { name: /Do Not Press/i })
    ).toBeInTheDocument();
    expect(console.error).not.toHaveBeenCalled();
  });
  it('catches the error and shows the fallback UI', () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    const errorButton = screen.getByRole('button', { name: /Do Not Press/i });
    fireEvent.click(errorButton);
    expect(
      screen.getByText('This is a test error from the button')
    ).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });
  it('shows custom fallback on error', () => {
    const customFallback = <div>Custom error fallback</div>;

    render(
      <ErrorBoundary fallback={customFallback}>
        <App />
      </ErrorBoundary>
    );
    const errorButton = screen.getByRole('button', { name: /Do Not Press/i });
    fireEvent.click(errorButton);
    expect(screen.getByText('Custom error fallback')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });
  it('resets the error state when the button is pressed in fallback', () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    const errorButton = screen.getByRole('button', { name: /Do Not Press/i });
    fireEvent.click(errorButton);
    const resetErrorButton = screen.getByRole('button', { name: /Try again/i });
    fireEvent.click(resetErrorButton);
    expect(
      screen.getByRole('button', { name: /Do Not Press/i })
    ).toBeInTheDocument();
  });
});
