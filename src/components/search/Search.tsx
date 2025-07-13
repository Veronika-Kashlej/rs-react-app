import { Component } from 'react';
import './Search.css';
import React from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}
interface SearchState {
  query: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      query: props.initialQuery || '',
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ query: e.target.value });
  }
  handleSearch = (): void => {
    this.props.onSearch(this.state.query);
  };
  handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };
  render() {
    return (
      <header>
        <input
          type="text"
          placeholder="Enter the full name of the pokemon..."
          onKeyDown={this.handleKeyPress}
          onChange={this.handleChange}
          autoFocus
          value={this.state.query}
        />
        <button className="search-button" onClick={this.handleSearch}>
          Search
        </button>
      </header>
    );
  }
}
export default Search;
