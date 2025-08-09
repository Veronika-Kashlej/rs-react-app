import { useState } from 'react';
import React from 'react';
import styles from './Search.module.css';

interface SearchParams {
  onSearch: (query: string) => void;
  initialQuery?: string;
}
function Search({ onSearch, initialQuery = '' }: SearchParams) {
  const [query, setQuery] = useState(initialQuery);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setQuery(e.target.value);
  }

  function handleSearch(): void {
    onSearch(query);
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <header className={styles.container}>
      <input
        type="text"
        placeholder="Enter the full name of the pokemon..."
        onKeyDown={handleKeyPress}
        onChange={handleChange}
        autoFocus
        value={query}
      />
      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
    </header>
  );
}
export default Search;
