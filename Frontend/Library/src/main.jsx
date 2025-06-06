import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure styles are included

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer autoClose={2000} position="top-right" />
  </StrictMode>
);
