// --- IMPORTAÇÕES ESSENCIAIS ---
// Importa os componentes do React Router.
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- IMPORTAÇÃO DAS PÁGINAS ---
// Importa todos os componentes que representam as páginas da aplicação.
import Home from './pages/Home';
import Filmes from './pages/Filmes';
import Series from './pages/Series';
import Animes from './pages/Animes';
import Assistente from './pages/Assistente';
import Pesquisar from './pages/Pesquisar';

function App() {
  return (
    // --- RENDERIZAÇÃO DAS ROTAS ---
    // Habilita o roteamento na aplicação.
    <BrowserRouter>
      {/* Define a área onde as rotas serão renderizadas. */}
      <Routes>
        {/* Define cada rota e o componenteAVA correspondente. */}
        <Route path="/Home" element={<Home />} />
        <Route path="/Filmes" element={<Filmes />} />
        <Route path="/Series" element={<Series />} />
        <Route path="/Animes" element={<Animes />} />
        <Route path="/Assistente" element={<Assistente />} />
        <Route path="/Pesquisar" element={<Pesquisar />} />
        {/* Redireciona para /Home caso a rota não exista */}
        <Route path="*" element={<Navigate to="/Home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
