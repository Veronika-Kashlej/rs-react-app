import Image from 'next/image';
import { SocialLinks } from './SocialLinks';
import styles from '../page.module.css';
import { useTranslations } from 'next-intl';

export function AuthorSection() {
  const aboutT = useTranslations('AboutPage');
  return (
    <div className={styles['author-section']}>
      <div className={styles['author-avatar']}>
        <Image
          width={1}
          height={1}
          alt={aboutT('name')}
          src="/assets/my-photo.jpg"
          className={styles['avatar-image']}
        />
      </div>
      <div className={styles['author-info']}>
        <h2>{aboutT('name')}</h2>
        <p>{aboutT('description')}</p>
        <SocialLinks />
      </div>
    </div>
  );
}
