interface ErrorMessageProps {
  error: string;
}
export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <h2>Oops! Something went wrong</h2>
      <p>{error}</p>
      <p>Please try another search or check your connection.</p>
    </div>
  );
}
