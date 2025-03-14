import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// import './styles/global.css';

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
