import Image from 'next/image';
import styles from '../page.module.css';
import { useTranslations } from 'next-intl';

export function CourseSection() {
  const aboutT = useTranslations('AboutPage');
  return (
    <div className={styles['course-section']}>
      <h3>{aboutT('course')}</h3>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        className={styles['course-link']}
        rel="noreferrer"
      >
        <Image
          src="/assets/logo/rsschool.svg"
          alt={aboutT('school')}
          className={styles['course-logo']}
          width={50}
          height={50}
        />
        {aboutT('school')}
      </a>
    </div>
  );
}
