import './App.css';
import PokemonDetail from './components/main/PokemonDetail';
import Navigation from './components/navigation/Navigation';
import AboutPage from './pages/about/AboutPage';
import NotFoundPage from './pages/not-found/NotFoundPage';
import PokemonPage from './pages/pokemon/PokemonPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<PokemonPage />}>
          <Route path="details/:id" element={<PokemonDetail />} />
        </Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/*" element={<NotFoundPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
