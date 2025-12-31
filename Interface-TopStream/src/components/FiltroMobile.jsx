import { useNavigate, useLocation } from "react-router-dom";

// Componente de menu mobile para navegação rápida entre categorias
const FiltroMobile = () => {
    const navegar = useNavigate();
    const location = useLocation();
    const caminhoAtual = location.pathname;

    const handleFiltroClick = (rota) => {
        navegar(`/${rota.charAt(0).toUpperCase() + rota.slice(1)}`);
    };

    return (
        <div className="mt-16 pl-3 pr-3 sm:hidden flex gap-2 overflow-x-auto scroll-invisivel py-1">
            <button
                onClick={() => handleFiltroClick("filmes")}
                className={`px-3 py-1 rounded-3xl text-sm font-medium transition-all duration-300 border flex-shrink-0
                    ${caminhoAtual === "/Filmes"
                        ? "bg-white text-gray-900 scale-105 border-white"
                        : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                    }`}
            >
                Filmes
            </button>

            <button
                onClick={() => handleFiltroClick("series")}
                className={`px-3 py-1 rounded-3xl text-sm font-medium transition-all duration-300 border flex-shrink-0
                    ${caminhoAtual === "/Series"
                        ? "bg-white text-gray-900 scale-105 border-white"
                        : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                    }`}
            >
                Séries
            </button>

            <button
                onClick={() => handleFiltroClick("animes")}
                className={`px-3 py-1 rounded-3xl text-sm font-medium transition-all duration-300 border flex-shrink-0
                    ${caminhoAtual === "/Animes"
                        ? "bg-white text-gray-900 scale-105 border-white"
                        : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                    }`}
            >
                Animes
            </button>
        </div>
    );
};

export default FiltroMobile;