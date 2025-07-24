import './App.css';
import PokemonDetail from './components/main/PokemonDetail';
import PokemonPage from './components/PokemonPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonPage />}>
          <Route path="details/:id" element={<PokemonDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
