import { Component } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Main from './components/Main/Main';

interface Pokemon {
  name: string;
  url: string;
}

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
      console.log(data);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  }
  render() {
    return (
      <div className="wrapper">
        <Search
          onSearch={this.handleSearch}
          initialQuery={localStorage.getItem('query') || ''}
        />
        <Main />
      </div>
    );
  }
}

export default App;
