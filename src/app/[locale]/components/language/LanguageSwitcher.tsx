'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    const currentParams = new URLSearchParams(searchParams);
    router.replace(`${pathname}?${currentParams.toString()}`, {
      locale: newLocale,
    });
  };

  return (
    <div className={`${styles.languageSwitcher} ${styles.selectContainer}`}>
      <select
        onChange={onLanguageChange}
        value={locale}
        className={styles.select}
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
      </select>
      <span className={styles.arrow}>▼</span>
    </div>
  );
}
