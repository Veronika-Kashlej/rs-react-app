import { Link } from 'react-router-dom';

export function BackButton() {
  return (
    <Link to="/" className="back-button">
      ← Back to Pokémon
    </Link>
  );
}
