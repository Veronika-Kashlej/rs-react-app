import Link from 'next/link';
import styles from './not-found.module.css';
import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Oops! Page Not Found</h2>
        <p className={styles.text}>
          The page you&aposre looking for doesn&apost exist or has been moved.
        </p>
        <div className={styles.illustration}>
          <Image
            src="/assets/pokemon-not-found.jpg"
            alt="Sad Pokémon"
            width={80}
            height={80}
          />
        </div>
        <Link href="/" className={styles.button}>
          Back to Pokémon
        </Link>
      </div>
    </div>
  );
}
