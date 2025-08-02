import rsschoolLogo from '@/assets/logo/rsschool.svg';
export function CourseSection() {
  return (
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
  );
}
