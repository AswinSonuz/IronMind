import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../IronMind.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
