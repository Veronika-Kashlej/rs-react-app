import { Link } from 'react-router-dom';
import './NotFoundPage.css';
import pokemon from '@/assets/pokemon-not-found.jpg';

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oops! Page Not Found</h2>
        <p className="not-found-text">
          The page you&lsquo;re looking for doesn&lsquo;t exist or has been
          moved.
        </p>
        <div className="not-found-illustration">
          <img src={pokemon} alt="sad-pokemon" />
        </div>
        <Link to="/" className="not-found-button">
          Back to Pokémon
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
