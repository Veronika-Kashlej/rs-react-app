import Image from 'next/image';
import styles from '../page.module.css';

export function CourseSection() {
  return (
    <div className={styles['course-section']}>
      <h3>Built as part of</h3>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        className={styles['course-link']}
        rel="noreferrer"
      >
        <Image
          src="/assets/logo/rsschool.svg"
          alt="RS School React Course"
          className={styles['course-logo']}
          width={50}
          height={50}
        />
        RS School React Course
      </a>
    </div>
  );
}
