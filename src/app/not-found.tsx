import Link from 'next/link';
import styles from './not-found.module.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
export default function NotFound() {
  const t = useTranslations('NotFoundPage');
  return (
    <div className={styles.container}>
      <div className={styles['content']}>
        <h1 className={styles['title']}>404</h1>
        <h2 className={styles['subtitle']}>{t('title')}</h2>
        <p className={styles['text']}>{t('description')}</p>
        <div className={styles['illustration']}>
          <Image
            src="/assets/pokemon-not-found.jpg"
            alt={t('imageAlt')}
            width={80}
            height={80}
          />
        </div>
        <Link href="/" className={styles['button']}>
          {t('goHome')}
        </Link>
      </div>
    </div>
  );
}
