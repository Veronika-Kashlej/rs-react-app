import { useLocalStorage } from '@/store/hooks/useLocalStorage';
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('useLocalStorage', () => {
  const key = 'testKey';
  const initialValue = 'initialValue';

  it('should initialize with the initial value', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    expect(result.current[0]).toBe(initialValue);
  });
});
