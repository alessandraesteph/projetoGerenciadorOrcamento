// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { FinanceProvider } from './context/FinanceContext';
import './global.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <FinanceProvider>
      <App />
    </FinanceProvider>
  </BrowserRouter>
);
