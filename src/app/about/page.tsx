import styles from './page.module.css';
import { BackButton } from './components/BackButton';
import { TechStack } from './components/TechStack';
import { CourseSection } from './components/CourseSection';
import { AuthorSection } from './components/AuthorSection';

function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles['about-container']}>
        <div className={styles['about-card']}>
          <h1 className={styles['about-title']}>About me</h1>
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
