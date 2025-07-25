import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
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
      </div>
    </nav>
  );
}
export default Navigation;
