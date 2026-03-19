import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // CRITICAL: This pulls in your Tailwind directives (@tailwind base, etc.)
import './App.css';   // This pulls in your Sparkle effects and custom fonts
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);