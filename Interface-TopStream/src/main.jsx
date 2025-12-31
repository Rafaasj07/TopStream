import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Seleciona o elemento raiz do DOM e inicializa a aplicação React
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Renderiza o componente principal encapsulado pelo StrictMode
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);