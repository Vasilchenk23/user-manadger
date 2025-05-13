import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AdminModeProvider } from './context/AdminModeContext';
import 'antd/dist/reset.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AdminModeProvider>
      <App />
    </AdminModeProvider>
  </React.StrictMode>
);