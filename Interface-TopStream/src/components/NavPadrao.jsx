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
        <nav className="fixed top-0 left-0 z-50 h-20 sm:h-20 md:h-20 lg:h-24 w-full bg-gray-950 flex items-center justify-between lg:pr-1 lg:pl-13 pr-4 pl-5 mb-5">
            {/* Seção da logo + links de navegação (visíveis apenas em telas médias ou maiores) */}
            <div className="flex items-center gap-6">
                {/* Botão da logo que leva para a Home */}
                <button onClick={() => handleNav('/Home')}>
                    <img
                        src={Logo}
                        alt="Logo"
                        className="h-12 w-12 sm:h-13 sm:w-13 md:h-15 md:w-15 lg:h-16 lg:w-16 cursor-pointer transition-all duration-300"
                    />

                </button>

                {/* Navegação principal visível apenas no desktop (md ou maior) */}
                <div className="hidden md:flex gap-6 items-center">
                    <button onClick={() => handleNav('/Home')} className="text-white text-lg px-4 py-2 hover:text-gray-300 transition duration-200 cursor-pointer">Início</button>
                    <button onClick={() => handleNav('/Filmes')} className="text-white text-lg px-4 py-2 hover:text-gray-300 transition duration-200 cursor-pointer">Filmes</button>
                    <button onClick={() => handleNav('/Series')} className="text-white text-lg px-4 py-2 hover:text-gray-300 transition duration-200 cursor-pointer">Séries</button>
                    <button onClick={() => handleNav('/Animes')} className="text-white text-lg px-4 py-2 hover:text-gray-300 transition duration-200 cursor-pointer">Animes</button>
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
                        autoComplete="off"
                        placeholder="Pesquisar..."
                        className={`ml-2 px-3 py-1 rounded-3xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-hidden whitespace-nowrap
              transition-all duration-500 ease-in-out transform origin-right
              ${mostrarInput ? 'w-[300px] opacity-100' : 'w-0 opacity-0'}`}
                    />
                </div>

                {/* Botão do assistente (somente no desktop) */}
                <button onClick={() => handleNav('/Assistente')} className="hidden md:block text-white text-4xl hover:text-gray-300 transition duration-200 mr-6 cursor-pointer">
                    <i className="bx bxs-bot" />
                </button>

                {/* Atalho de pesquisa no mobile */}
                <button
                    onClick={() => navegar('/Pesquisar')}
                    className="md:hidden text-white text-3xl sm:text-4xl hover:text-gray-300 transition duration-200 mr-2"
                >
                    <i className="bx bx-search" />
                </button>


                {/* Botão hamburguer para abrir/fechar o menu no mobile */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-white text-4xl sm:text-5xl"
                >
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
