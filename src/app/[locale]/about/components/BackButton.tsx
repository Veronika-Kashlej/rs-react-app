import Link from 'next/link';
import styles from '../page.module.css';
import { useTranslations } from 'next-intl';

export function BackButton() {
  const aboutT = useTranslations('AboutPage');
  return (
    <Link href="/" className={styles['back-button']}>
      {aboutT('button')}
    </Link>
  );
}
