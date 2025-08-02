import './App.css';
import PokemonDetail from './pages/pokemon/components/detail/PokemonDetail';
import Navigation from './pages/pokemon/navigation/Navigation';
import { ThemeProvider } from './context/ThemeContext';
import AboutPage from './pages/about/AboutPage';
import NotFoundPage from './pages/not-found/NotFoundPage';
import PokemonPage from './pages/pokemon/PokemonPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<PokemonPage />}>
            <Route path="details/:id" element={<PokemonDetail />} />
          </Route>
          <Route path="details/:id" element={<PokemonDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
