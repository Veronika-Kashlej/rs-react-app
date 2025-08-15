import styles from './page.module.css';
import { BackButton } from './components/BackButton';
import { TechStack } from './components/TechStack';
import { CourseSection } from './components/CourseSection';
import { AuthorSection } from './components/AuthorSection';
import { useTranslations } from 'next-intl';

function AboutPage() {
  const aboutT = useTranslations('AboutPage');
  return (
    <div className={styles.container}>
      <div className={styles['about-container']}>
        <div className={styles['about-card']}>
          <h1 className={styles['about-title']}>{aboutT('title')}</h1>
          <AuthorSection />
          <CourseSection />
          <TechStack />
          <BackButton />
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
