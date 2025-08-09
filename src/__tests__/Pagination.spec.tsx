import { Pagination } from '@/app/components/pagination/Pagination';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  it('renders pagination with current page and total pages', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('Page 3 of 10')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Previous' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('calls onPageChange with previous page when Previous button is clicked', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });
});
