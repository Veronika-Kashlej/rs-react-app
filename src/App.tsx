import { Component } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Main from './components/Main/Main';

interface AppState {
  results: Array<{
    id: string;
    name: string;
    description: string;
  }>;
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
    //api request logic here
    console.log(query);
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
