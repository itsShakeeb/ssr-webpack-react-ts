import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Get the initial state from the server
const initialState = window.__INITIAL_STATE__ || {};

// Hydrate the app with the server-rendered content
hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <BrowserRouter>
    <App initialState={initialState} />
  </BrowserRouter>
);

// TypeScript declaration for window object
declare global {
  interface Window {
    __INITIAL_STATE__: any;
  }
}
