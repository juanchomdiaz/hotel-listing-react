import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { startMirage } from '../development/miragejs/server';

//If we started the app in dev mode with npm run start we will run a dev server to stub the backend
if (process.env.NODE_ENV === 'development') {
  startMirage();
}


// Get the root element from the HTML
const rootElement = document.getElementById('root');

// Make sure the element exists
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

// Create a root
const root = createRoot(rootElement);

// Render the App component within StrictMode
root.render(<App />);
