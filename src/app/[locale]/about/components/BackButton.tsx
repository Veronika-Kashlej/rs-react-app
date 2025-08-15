import styles from '../page.module.css';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function BackButton() {
  const aboutT = useTranslations('AboutPage');
  return (
    <Link href="/" className={styles['back-button']}>
      {aboutT('button')}
    </Link>
  );
}
