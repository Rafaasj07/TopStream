// --- IMPORTAÇÕES ESSENCIAIS ---
// Importa o modo estrito do React para identificar problemas na aplicação.
import { StrictMode } from 'react';
// Importa a função para criar a raiz da aplicação no DOM.
import { createRoot } from 'react-dom/client';
// Importa o componente principal da aplicação.
import App from './App';
import './index.css'; // ou './styles.css'


// --- RENDERIZAÇÃO DA APLICAÇÃO ---
// Monta o componente App dentro da div com id 'root' do HTML.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Envolve a aplicação no StrictMode para detectar possíveis problemas. */}
    <App />
  </StrictMode>
);
