import Image from 'next/image';
import { SocialLinks } from './SocialLinks';
import styles from '../page.module.css';

export function AuthorSection() {
  return (
    <div className={styles['author-section']}>
      <div className={styles['author-avatar']}>
        <Image
          width={1}
          height={1}
          alt="author's image"
          src="/assets/my-photo.jpg"
          className={styles['avatar-image']}
        />
      </div>
      <div className={styles['author-info']}>
        <h2>Veronika Kashlei</h2>
        <p>Frontend Developer & Pokémon Enthusiast</p>
        <SocialLinks />
      </div>
    </div>
  );
}
