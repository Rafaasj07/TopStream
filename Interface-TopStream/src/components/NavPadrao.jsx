import { useState } from 'react';
import Logo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';

const NavPadrao = () => {
  // Estado para controlar o menu hamburguer no mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Estado para mostrar ou esconder o campo de pesquisa (input)
  const [mostrarInput, setMostrarInput] = useState(false);

  // Hook para navegação entre páginas
  const navegar = useNavigate();

  // Função de navegação que fecha o menu antes de mudar de rota
  const handleNav = (path) => {
    setIsMenuOpen(false);
    setTimeout(() => navegar(path), 400);
  };

  return (
    <nav className="relative h-24 w-full bg-gray-950 flex items-center justify-between lg:px-6 pr-6 mb-5">
      
      {/* Seção da logo + links de navegação (visíveis apenas em telas médias ou maiores) */}
      <div className="flex items-center gap-6">
        {/* Botão da logo que leva para a Home */}
        <button onClick={() => handleNav('/Home')}>
          <img src={Logo} alt="Logo" className="h-32 w-32 mt-4" />
        </button>

        {/* Navegação principal visível apenas no desktop (md ou maior) */}
        <div className="hidden md:flex gap-6 items-center">
          <button onClick={() => handleNav('/Home')} className="text-white text-lg px-4 py-2 hover:text-gray-300 transition duration-200">Início</button>
          <button onClick={() => handleNav('/Filmes')} className="text-white text-lg px-4 py-2 hover:text-gray-300 transition duration-200">Filmes</button>
          <button onClick={() => handleNav('/Series')} className="text-white text-lg px-4 py-2 hover:text-gray-300 transition duration-200">Séries</button>
          <button onClick={() => handleNav('/Animes')} className="text-white text-lg px-4 py-2 hover:text-gray-300 transition duration-200">Animes</button>
        </div>
      </div>

      {/* Seção do lado direito da navbar: pesquisa e botão do assistente */}
      <div className="flex items-center gap-4">
        
        {/* Área de pesquisa no desktop */}
        <div className="hidden md:flex items-center relative">
          <i
            className="bx bx-search text-white text-4xl cursor-pointer hover:text-gray-300 transition duration-200"
            onClick={() => setMostrarInput(!mostrarInput)}
          />
          
          {/* Campo de pesquisa que aparece com animação da direita para a esquerda */}
          <input
            type="text"
            placeholder="Pesquisar..."
            className={`ml-2 px-3 py-1 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden whitespace-nowrap
              transition-all duration-500 ease-in-out transform origin-right
              ${mostrarInput ? 'w-[300px] opacity-100' : 'w-0 opacity-0'}`}
          />
        </div>

        {/* Botão do assistente (somente no desktop) */}
        <button onClick={() => handleNav('/Assistente')} className="hidden md:block text-white text-4xl hover:text-gray-300 transition duration-200 mr-5">
          <i className="bx bxs-bot" />
        </button>

        {/* Atalho de pesquisa no mobile */}
        <button onClick={() => handleNav('/Pesquisar')} className="md:hidden text-white text-4xl hover:text-gray-300 transition duration-200 mr-2">
          <i className="bx bx-search" />
        </button>

        {/* Botão hamburguer para abrir/fechar o menu no mobile */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white text-5xl">
          {isMenuOpen ? <i className="bx bx-x" /> : <i className="bx bx-menu" />}
        </button>
      </div>

      {/* Menu dropdown para mobile (expande/contrai com animação) */}
      <div
        className={`absolute top-24 left-0 w-full bg-gray-950 flex flex-col items-center gap-4 overflow-hidden transition-all duration-300 ease-in-out md:hidden z-50
          ${isMenuOpen ? 'max-h-[500px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
      >
        <button onClick={() => handleNav('/Home')} className="text-white text-lg w-full py-2 hover:bg-gray-800">Início</button>
        <button onClick={() => handleNav('/Filmes')} className="text-white text-lg w-full py-2 hover:bg-gray-800">Filmes</button>
        <button onClick={() => handleNav('/Series')} className="text-white text-lg w-full py-2 hover:bg-gray-800">Séries</button>
        <button onClick={() => handleNav('/Animes')} className="text-white text-lg w-full py-2 hover:bg-gray-800">Animes</button>
        <button onClick={() => handleNav('/Assistente')} className="text-white text-lg w-full py-2 hover:bg-gray-800 flex justify-center">
          <i className="bx bxs-bot text-3xl" />
        </button>
      </div>
    </nav>
  );
};

export default NavPadrao;
