import './AboutPage.css';
import { BackButton } from './components/BackButton';
import { TechStack } from './components/TechStack';
import { CourseSection } from './components/CourseSection';
import { AuthorSection } from './components/AuthorSection';

function AboutPage() {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">About me</h1>
        <AuthorSection />
        <CourseSection />
        <TechStack />
        <BackButton />
      </div>
    </div>
  );
}

export default AboutPage;
