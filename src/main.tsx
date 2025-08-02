import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ErrorBoundary } from './pages/ErrorBoundary';
import catImage from './assets/cat.webp';
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary
        fallback={
          <div className="error-fallback">
            <img
              src={catImage}
              alt="Memetic Black Cat"
              className="meme-image"
            />
            <p className="meme-text">ОКАК</p>
            <button
              className="reload-button"
              onClick={() => window.location.reload()}
            >
              Bring the page back to life
            </button>
          </div>
        }
      >
        <App />
      </ErrorBoundary>{' '}
    </Provider>
  </StrictMode>
);
