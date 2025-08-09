import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { ErrorMessage } from '@/app/components/error/ErrorMessage';

describe('ErrorMessage', () => {
  it('renders FetchBaseQueryError correctly', () => {
    const mockError: FetchBaseQueryError = {
      status: 404,
      data: 'Pokemon not found',
    };

    render(<ErrorMessage error={mockError} />);

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Pokemon not found')).toBeInTheDocument();
    expect(
      screen.getByText('Please try another search or check your connection.')
    ).toBeInTheDocument();
  });

  it('renders SerializedError correctly', () => {
    const mockError: SerializedError = {
      message: 'Network error',
      code: 'NETWORK_ERROR',
    };

    render(<ErrorMessage error={mockError} />);

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
    expect(
      screen.getByText('Please try another search or check your connection.')
    ).toBeInTheDocument();
  });
});
