import Image from 'next/image';
import styles from '../page.module.css';

export function SocialLinks() {
  return (
    <div className={styles['social-links']}>
      <a
        href="https://github.com/veronika-kashlej"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/assets/logo/github.png"
          alt="github"
          width={50}
          height={50}
        />
      </a>
      <a
        href="https://www.linkedin.com/in/veronika-kashlej-1886ab308/"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/assets/logo/linkedin.png"
          alt="linkedin"
          width={50}
          height={50}
        />
      </a>
      <a
        href="mailto:veronika.kashlei@mail.ru"
        target="_blank"
        rel="noreferrer"
      >
        <Image src="/assets/logo/mail.png" alt="mail" width={50} height={50} />
      </a>
      <a href="https://t.me/veroniiche" target="_blank" rel="noreferrer">
        <Image
          src="/assets/logo/telegram.png"
          alt="telegram"
          width={50}
          height={50}
        />
      </a>
    </div>
  );
}
