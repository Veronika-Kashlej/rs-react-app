import reactLogo from '@/assets/logo/react.png';
import htmlLogo from '@/assets/logo/html5.png';
import cssLogo from '@/assets/logo/css3.png';
import viteLogo from '@/assets/logo/vite.png';
import vitestLogo from '@/assets/logo/vitest.png';
import gitLogo from '@/assets/logo/git.png';
import typescriptLogo from '@/assets/logo/typescript.png';
export function TechStack() {
  return (
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
  );
}
