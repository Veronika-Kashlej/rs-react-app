import { useState, useEffect } from 'react';

export function useLocalStorage(
  key: string,
  initialValue: string
): [string, (value: string) => void] {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem(key);
      if (localData) {
        setState(localData);
      }
    }
  }, [key]);

  const setValue = (value: string) => {
    setState(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  };

  return [state, setValue];
}
