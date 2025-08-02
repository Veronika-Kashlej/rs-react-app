import avtorImage from '@/assets/my-photo.jpg';
import { SocialLinks } from './SocialLinks';
export function AuthorSection() {
  return (
    <div className="author-section">
      <div className="author-avatar">
        <img src={avtorImage} alt="author's image" />
      </div>
      <div className="author-info">
        <h2>Veronika Kashlei</h2>
        <p>Frontend Developer & Pokémon Enthusiast</p>
        <SocialLinks />
      </div>
    </div>
  );
}
