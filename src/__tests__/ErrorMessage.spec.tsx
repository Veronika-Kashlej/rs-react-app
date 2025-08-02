import { ErrorMessage } from '@/pages/pokemon/components/error/ErrorMessage';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Error Message', () => {
  it('renders error message', () => {
    const testError = 'Test error message';
    render(<ErrorMessage error={testError} />);
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(testError)).toBeInTheDocument();
    expect(
      screen.getByText('Please try another search or check your connection.')
    ).toBeInTheDocument();
  });
});
