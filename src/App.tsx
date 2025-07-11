import { Component } from 'react';
import './App.css';
import { Pokemon } from './types/pokemon';
import Search from './components/search/Search';
import PokemonList from './components/main/PokemonList';

interface AppState {
  results: Pokemon[];
  loading: boolean;
  error: string | null;
}

type AppProps = Record<string, never>;

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      error: null,
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount(): void {
    const query = localStorage.getItem('query') || '';
    this.handleSearch(query);
  }
  async handleSearch(query: string) {
    localStorage.setItem('query', query);
    this.setState({ loading: true, error: null });
    try {
      await this.fetchPokemon(query);
    } catch (error) {
      this.setState({
        error:
          error instanceof Error ? error.message : 'Failed to fetch Pokemon',
        results: [],
      });
    } finally {
      this.setState({ loading: false });
    }
  }
  async fetchPokemon(query: string = '') {
    const url = query
      ? `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase().trim()}`
      : 'https://pokeapi.co/api/v2/pokemon?limit=20';

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        response.status >= 500
          ? 'Server error'
          : response.status === 404
            ? 'Pokemon not found'
            : 'Failed to fetch data'
      );
    }

    const data = await response.json();
    this.setState({
      results: data.results ? data.results : [data],
      error: null,
    });
  }
  render() {
    const { results, loading, error } = this.state;
    return (
      <div className="wrapper">
        <Search
          onSearch={this.handleSearch}
          initialQuery={localStorage.getItem('query') || ''}
        />
        {loading && <div className="loading-spinner"></div>}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && <PokemonList results={results} />}{' '}
      </div>
    );
  }
}

export default App;
