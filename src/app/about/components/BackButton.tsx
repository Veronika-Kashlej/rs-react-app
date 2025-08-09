import Link from 'next/link';
import styles from '../page.module.css';

export function BackButton() {
  return (
    <Link href="/" className={styles['back-button']}>
      ← Back to Pokémon
    </Link>
  );
}
