import Image from 'next/image';
import styles from '../page.module.css';
import { useTranslations } from 'next-intl';

export function TechStack() {
  const aboutT = useTranslations('AboutPage');
  return (
    <div className="tech-stack">
      <h3>{aboutT('technologies')}</h3>
      <div className={styles['tech-icons']}>
        <Image
          src="/assets/logo/react.png"
          alt="React"
          className={styles['tech-icon']}
          width={80}
          height={80}
        />
        <Image
          src="/assets/logo/typescript.png"
          alt="TypeScript"
          className={styles['tech-icon']}
          width={80}
          height={80}
        />
        <Image
          src="/assets/logo/html5.png"
          alt="HTML5"
          className={styles['tech-icon']}
          width={80}
          height={80}
        />
        <Image
          src="/assets/logo/css3.png"
          alt="CSS3"
          className={styles['tech-icon']}
          width={80}
          height={80}
        />
        <Image
          src="/assets/logo/vite.png"
          alt="Vite"
          className={styles['tech-icon']}
          width={80}
          height={80}
        />
        <Image
          src="/assets/logo/vitest.png"
          alt="Vitest"
          className={styles['tech-icon']}
          width={80}
          height={80}
        />
        <Image
          src="/assets/logo/git.png"
          alt="Git"
          className={styles['tech-icon']}
          width={80}
          height={80}
        />
      </div>
    </div>
  );
}
