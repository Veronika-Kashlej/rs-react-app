import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
interface ErrorMessageProps {
  error: FetchBaseQueryError | SerializedError;
}
export function ErrorMessage({ error }: ErrorMessageProps) {
  const getErrorMessage = (
    error: FetchBaseQueryError | SerializedError
  ): string => {
    if ('status' in error) {
      return typeof error.data === 'string'
        ? error.data
        : 'Error occurred without a specific message';
    } else {
      return typeof error.message === 'string'
        ? error.message
        : 'Unknown error occurred';
    }
  };
  return (
    <div className="error-message">
      <h2>Oops! Something went wrong</h2>
      <p>{getErrorMessage(error)}</p>
      <p>Please try another search or check your connection.</p>
    </div>
  );
}
