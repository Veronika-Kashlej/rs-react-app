import { ErrorTestButton } from '@/components/main/ErrorTestButton';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe } from 'node:test';
import { expect, it, vi } from 'vitest';

describe('ErrorTestButton', () => {
  it('renders the button with correct text', () => {
    const mockThrowError = vi.fn();
    render(<ErrorTestButton throwError={mockThrowError} />);
    const button = screen.getByRole('button', {
      name: /Do Not Press \(or do\)/i,
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('error-test-button');
  });
  it('calls throwError prop when clicked', () => {
    const mockThrowError = vi.fn();
    render(<ErrorTestButton throwError={mockThrowError} />);
    const button = screen.getByRole('button', {
      name: /Do Not Press \(or do\)/i,
    });
    fireEvent.click(button);
    expect(mockThrowError).toHaveBeenCalledTimes(1);
  });
  it('handleClick method calls throwError prop', () => {
    const mockThrowError = vi.fn();
    const instance = new ErrorTestButton({ throwError: mockThrowError });
    instance.handleClick();
    expect(mockThrowError).toHaveBeenCalledTimes(1);
  });
});
