import githubLogo from '@/assets/logo/github.png';
import linledinLogo from '@/assets/logo/linkedin.png';
import mailLogo from '@/assets/logo/mail.png';
import telegramLogo from '@/assets/logo/telegram.png';
export function SocialLinks() {
  return (
    <div className="social-links">
      <a
        href="https://github.com/veronika-kashlej"
        target="_blank"
        rel="noreferrer"
      >
        <img src={githubLogo} alt="github" />
      </a>
      <a
        href="https://www.linkedin.com/in/veronika-kashlej-1886ab308/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={linledinLogo} alt="linkedin" />
      </a>
      <a
        href="mailto:veronika.kashlei@mail.ru"
        target="_blank"
        rel="noreferrer"
      >
        <img src={mailLogo} alt="mail" />
      </a>
      <a href="https://t.me/veroniiche" target="_blank" rel="noreferrer">
        <img src={telegramLogo} alt="telegram" />
      </a>
    </div>
  );
}
