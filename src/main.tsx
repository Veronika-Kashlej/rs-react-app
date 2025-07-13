import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ErrorBoundary } from './components/error/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        <div className="error-fallback">
          <h2>Pokemon App Error</h2>
          <p>Please try refreshing the page</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      }
    >
      <App />
    </ErrorBoundary>{' '}
  </StrictMode>
);
