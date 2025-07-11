import { Component } from 'react';
import './App.css';
import { Pokemon } from './types/pokemon';
import Search from './components/search/Search';
import PokemonList from './components/main/PokemonList';

interface AppState {
  results: Pokemon[];
}

type AppProps = Record<string, never>;

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      results: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount(): void {
    const query = localStorage.getItem('query') || '';
    this.handleSearch(query);
  }
  handleSearch(query: string) {
    localStorage.setItem('query', query);
    this.fetchPokemon(query);
  }
  async fetchPokemon(query: string = '') {
    try {
      const url = query
        ? `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase().trim()}`
        : 'https://pokeapi.co/api/v2/pokemon?limit=20';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const dataParam = data.results ? data.results : [data];
      this.setState({
        results: dataParam,
      });
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  }
  render() {
    const { results } = this.state;
    return (
      <div className="wrapper">
        <Search
          onSearch={this.handleSearch}
          initialQuery={localStorage.getItem('query') || ''}
        />
        <PokemonList results={results} />
      </div>
    );
  }
}

export default App;
