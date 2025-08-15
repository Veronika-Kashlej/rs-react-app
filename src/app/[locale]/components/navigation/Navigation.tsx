'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/providers/ThemeProvider';
import styles from './Navigation.module.css';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../language/LanguageSwitcher';

function Navigation() {
  const homeT = useTranslations('Navigation');
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={styles.container}>
      <Link href="/" className={styles.logo}>
        {homeT('title')}
      </Link>
      <LanguageSwitcher />
      <div className={styles.links}>
        <Link
          href="/"
          className={`${styles.link} ${isActive('/') ? styles.active : ''}`}
        >
          {homeT('home')}
        </Link>
        <Link
          href="/about"
          className={`${styles.link} ${isActive('/about') ? styles.active : ''}`}
        >
          {homeT('about')}
        </Link>
        <button
          className={styles['theme-toggle']}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
