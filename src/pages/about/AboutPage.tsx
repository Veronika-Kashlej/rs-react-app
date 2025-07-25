import './AboutPage.css';
import rsschoolLogo from '@/assets/logo/rsschool.svg';
import reactLogo from '@/assets/logo/react.png';
import htmlLogo from '@/assets/logo/html5.png';
import cssLogo from '@/assets/logo/css3.png';
import viteLogo from '@/assets/logo/vite.png';
import vitestLogo from '@/assets/logo/vitest.png';
import gitLogo from '@/assets/logo/git.png';
import typescriptLogo from '@/assets/logo/typescript.png';
import avtorImage from '@/assets/my-photo.jpg';
import githubLogo from '@/assets/logo/github.png';
import linledinLogo from '@/assets/logo/linkedin.png';
import mailLogo from '@/assets/logo/mail.png';
import telegramLogo from '@/assets/logo/telegram.png';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">About me</h1>

        <div className="author-section">
          <div className="author-avatar">
            <img src={avtorImage} alt="author's image" />
          </div>
          <div className="author-info">
            <h2>Veronika Kashlei</h2>
            <p>Frontend Developer & Pokémon Enthusiast</p>
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
              <a
                href="https://t.me/veroniiche"
                target="_blank"
                rel="noreferrer"
              >
                <img src={telegramLogo} alt="telegram" />
              </a>
            </div>
          </div>
        </div>

        <div className="course-section">
          <h3>Built as part of</h3>
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            className="course-link"
            rel="noreferrer"
          >
            <img
              src={rsschoolLogo}
              alt="RS School React Course"
              className="course-logo"
            />
            RS School React Course
          </a>
        </div>

        <div className="tech-stack">
          <h3>Technologies Used</h3>
          <div className="tech-icons">
            <img src={reactLogo} alt="React" className="tech-icon" />
            <img src={typescriptLogo} alt="TypeScript" className="tech-icon" />
            <img src={htmlLogo} alt="HTML5" className="tech-icon" />
            <img src={cssLogo} alt="CSS3" className="tech-icon" />
            <img src={viteLogo} alt="Vite" className="tech-icon" />
            <img src={vitestLogo} alt="Vitest" className="tech-icon" />
            <img src={gitLogo} alt="Git" className="tech-icon" />
          </div>
        </div>

        <Link to="/" className="back-button">
          ← Back to Pokémon
        </Link>
      </div>
    </div>
  );
}

export default AboutPage;
