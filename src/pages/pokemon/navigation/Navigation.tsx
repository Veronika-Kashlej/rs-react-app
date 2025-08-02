import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useTheme } from '@/context/ThemeContext';

function Navigation() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="app-navigation">
      <NavLink to="/" className="nav-logo">
        Pokemon
      </NavLink>
      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          About
        </NavLink>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}
export default Navigation;
