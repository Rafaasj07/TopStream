import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Filmes from './pages/Filmes';
import Series from './pages/Series';
import Animes from './pages/Animes';
import Assistente from './pages/Assistente';
import Pesquisar from './pages/Pesquisar';
import ResultadoBusca from './pages/ResultadoBusca';
import Favoritos from './pages/Favoritos';

function App() {
  return (
    // Configura o roteamento e define as páginas da aplicação
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Filmes" element={<Filmes />} />
        <Route path="/Series" element={<Series />} />
        <Route path="/Animes" element={<Animes />} />
        <Route path="/Assistente" element={<Assistente />} />
        <Route path="/Pesquisar" element={<Pesquisar />} />
        <Route path="/busca/:query" element={<ResultadoBusca />} />
        <Route path="/Favoritos" element={<Favoritos />} />
        {/* Redireciona qualquer rota desconhecida para a Home */}
        <Route path="*" element={<Navigate to="/Home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;