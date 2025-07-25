import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

const ErrorComponent = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

const consoleErrorMock = vi
  .spyOn(console, 'error')
  .mockImplementation(() => {});

describe('ErrorBoundary', () => {
  beforeEach(() => {
    consoleErrorMock.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('calls componentDidCatch with error and error info', () => {
    const componentDidCatchSpy = vi.spyOn(
      ErrorBoundary.prototype,
      'componentDidCatch'
    );

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(componentDidCatchSpy).toHaveBeenCalled();
    expect(componentDidCatchSpy.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(componentDidCatchSpy.mock.calls[0][0].message).toBe('Test error');
    expect(componentDidCatchSpy.mock.calls[0][1]).toEqual(
      expect.objectContaining({
        componentStack: expect.any(String),
      })
    );
  });

  it('displays custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>;

    render(
      <ErrorBoundary fallback={customFallback}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('handles when error message is undefined', () => {
    const UndefinedErrorComponent = () => {
      throw {};
    };

    render(
      <ErrorBoundary>
        <UndefinedErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.queryByText('undefined')).not.toBeInTheDocument();
  });
});
