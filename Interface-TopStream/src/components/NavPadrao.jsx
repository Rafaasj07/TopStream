import { useState } from 'react';
import Logo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';

// Componente de navegação padrão, visível em todos os dispositivos 
const NavPadrao = () => {
    const [mostrarInput, setMostrarInput] = useState(false);
    const [termoBusca, setTermoBusca] = useState('');
    const navegar = useNavigate();

    const handleSearch = (e) => {
        if (e.key === 'Enter' && termoBusca.trim() !== '') {
            navegar(`/busca/${termoBusca.trim()}`);
            setTermoBusca('');
        }
    };

    return (
        <nav className="fixed top-0 left-0 z-50 w-full h-16 sm:h-20 lg:h-24 bg-gray-950 flex items-center justify-between px-3 sm:px-6 lg:px-10">

            <div className="flex items-center gap-4 sm:gap-6">

                <button onClick={() => navegar('/Home')}>
                    <img
                        src={Logo}
                        alt="Logo"
                        className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 cursor-pointer transition-all duration-300"
                    />
                </button>

                <div className="hidden md:flex gap-4 lg:gap-6 items-center">
                    <button onClick={() => navegar('/Home')} className="text-white text-base lg:text-lg px-2 py-1 hover:text-gray-300 transition duration-200">Início</button>
                    <button onClick={() => navegar('/Filmes')} className="text-white text-base lg:text-lg px-2 py-1 hover:text-gray-300 transition duration-200">Filmes</button>
                    <button onClick={() => navegar('/Series')} className="text-white text-base lg:text-lg px-2 py-1 hover:text-gray-300 transition duration-200">Séries</button>
                    <button onClick={() => navegar('/Animes')} className="text-white text-base lg:text-lg px-2 py-1 hover:text-gray-300 transition duration-200">Animes</button>
                    <button onClick={() => navegar('/Favoritos')} className="text-white text-base lg:text-lg px-2 py-1 hover:text-gray-300 transition duration-200">Favoritos</button>
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">

                <div className="hidden md:flex items-center relative">

                    <i
                        className="bx bx-search text-white text-3xl cursor-pointer hover:text-gray-300 transition duration-200"
                        onClick={() => setMostrarInput(!mostrarInput)}
                    />

                    <input
                        type="text"
                        autoComplete="off"
                        placeholder="Pesquisar..."
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                        onKeyDown={handleSearch}
                        className={`ml-2 px-3 py-1 rounded-3xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-500 ease-in-out
              ${mostrarInput ? 'w-[180px] sm:w-[220px] md:w-[280px] opacity-100' : 'w-0 opacity-0'} 
              overflow-hidden whitespace-nowrap`}
                    />
                </div>

                <button
                    onClick={() => navegar('/Pesquisar')}
                    className="md:hidden text-white text-2xl sm:text-3xl hover:text-gray-300 transition duration-200 pr-3"
                >
                    <i className="bx bx-search" />
                </button>

                <button
                    onClick={() => navegar('/Assistente')}
                    className="text-white text-3xl pb-1 sm:pb-0 sm:text-4xl hover:text-gray-300 transition duration-200"
                >
                    <i className="bx bxs-bot" />
                </button>
            </div>
        </nav>
    );
};

export default NavPadrao;