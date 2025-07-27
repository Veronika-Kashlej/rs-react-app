import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useLocalStorage(
  key: string,
  initialValue: string
): [string, Dispatch<SetStateAction<string>>] {
  const [state, setState] = useState(() => {
    const localData = localStorage.getItem(key);
    return localData || initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
}
