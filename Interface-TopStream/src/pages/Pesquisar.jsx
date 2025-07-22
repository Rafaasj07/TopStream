import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPesquisar from "../components/CardPesquisar";
// Importa as imagens para os cards de categoria.
import ImagemAnimeAcao from "../assets/Categoria-Anime-Acao.jpg";
import ImagemSerieComedia from "../assets/Categoria-Serie-Comedia.jpg";
import ImagemFilmeDrama from "../assets/Categoria-Filme-Drama.jpg";
import ImagemAnimeFantasia from "../assets/Categoria-Anime-Fantasia.jpg";
import ImagemSerieFiccao from "../assets/Categoria-Serie-Ficcao.jpg";
import ImagemFilmeTerror from "../assets/Categoria-Filme-Terror.jpg";
import ImagemAnimeRomance from "../assets/Categoria-Anime-Romance.jpg";
import ImagemSerieSuspense from "../assets/Categoria-Serie-Suspense.jpg";
import ImagemFilmeAventura from "../assets/Categoria-Filme-Aventura.jpg";
import ImagemFilmeSlice from "../assets/Categoria-Serie-Slice.jpg";

// Página de pesquisa, onde o usuário pode buscar por um termo ou navegar por categorias.
const Pesquisar = () => {
    // Estados para controlar o input do usuário e o filtro selecionado.
    const [input, setInput] = useState("");
    const [filtroSelecionado, setFiltroSelecionado] = useState("todos");
    const navegar = useNavigate();
    
    // Funções para lidar com as ações do usuário e navegar para a página de resultados.
    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleFiltroClick = (filtro) => {
        setFiltroSelecionado(filtro);
    };

    const handleBuscaSubmit = (e) => {
        e.preventDefault(); 
        if (input.trim() !== "") {
            navegar(`/busca/${input.trim()}?filter=${filtroSelecionado}`);
        }
    };

    const handleGenreClick = (genre) => {
        navegar(`/busca/${genre}`);
    };

    return (
        <>
            {/* Barra de pesquisa e filtros, visíveis apenas em telas pequenas. */}
            <form
                onSubmit={handleBuscaSubmit}
                className="w-full bg-gray-950 p-4 flex items-center gap-3 fixed top-0 left-0 z-50 sm:hidden"
            >
                <button type="button" className="text-white text-3xl" onClick={() => window.history.back()}>
                    <i className="bx bx-arrow-back" />
                </button>

                <input
                    type="text"
                    id="assistente-input"
                    autoComplete="off"
                    value={input}
                    onChange={handleChange}
                    placeholder="O que está procurando?"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-3xl text-gray-100 placeholder-gray-500
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-500 ease-in-out"
                />
            </form>

            <div className="mt-20 pl-6 pr-3 sm:hidden flex gap-2 overflow-x-auto pb-2 scroll-invisivel">
                    <button
                        onClick={() => handleFiltroClick("todos")}
                        className={`px-4 py-1.5 rounded-3xl font-medium transition-all duration-300 border flex-shrink-0
                        ${filtroSelecionado === "todos"
                                ? "bg-white text-gray-900 scale-105 border-white"
                                : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                            }`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => handleFiltroClick("filmes")}
                        className={`px-4 py-1.5 rounded-3xl font-medium transition-all duration-300 border flex-shrink-0
                        ${filtroSelecionado === "filmes"
                                ? "bg-white text-gray-900 scale-105 border-white"
                                : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                            }`}
                    >
                        Filmes
                    </button>

                    <button
                        onClick={() => handleFiltroClick("series")}
                        className={`px-4 py-1.5 rounded-3xl font-medium transition-all duration-300 border flex-shrink-0
                        ${filtroSelecionado === "series"
                                ? "bg-white text-gray-900 scale-105 border-white"
                                : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                            }`}
                    >
                        Séries
                    </button>

                    <button
                        onClick={() => handleFiltroClick("animes")}
                        className={`px-4 py-1.5 rounded-3xl font-medium transition-all duration-300 border flex-shrink-0
                    ${filtroSelecionado === "animes"
                                ? "bg-white text-gray-900 scale-105 border-white"
                                : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                            }`}
                    >
                        Animes
                    </button>
            </div>

            {/* Seção com os cards de categorias de gênero. */}
            <div className="pb-6">
                <h1 className="text-white text-2xl font-bold py-4 px-5">Categorias</h1>
                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 gap-3 px-4">
                    <CardPesquisar color="#C0392B" texto="Ação" imagem={ImagemAnimeAcao} onClick={() => handleGenreClick("Ação")} />
                    <CardPesquisar color="#2C3E50" texto="Drama" imagem={ImagemFilmeDrama} onClick={() => handleGenreClick("Drama")} />
                    <CardPesquisar color="#19a654" texto="Comédia" imagem={ImagemSerieComedia} onClick={() => handleGenreClick("Comédia")} />
                    <CardPesquisar color="#E67E22" texto="Fantasia" imagem={ImagemAnimeFantasia} onClick={() => handleGenreClick("Fantasia")} />
                    <CardPesquisar color="#cea80e" texto="Ficção Científica" imagem={ImagemSerieFiccao} onClick={() => handleGenreClick("Ficção Científica")} />
                    <CardPesquisar color="#8E44AD" texto="Terror" imagem={ImagemFilmeTerror} onClick={() => handleGenreClick("Terror")} />
                    <CardPesquisar color="#F1948A" texto="Romance" imagem={ImagemAnimeRomance} onClick={() => handleGenreClick("Romance")} />
                    <CardPesquisar color="#5a9ecc" texto="Suspense" imagem={ImagemSerieSuspense} onClick={() => handleGenreClick("Suspense")} />
                    <CardPesquisar color="#556B2F" texto="Aventura" imagem={ImagemFilmeAventura} onClick={() => handleGenreClick("Aventura")} />
                    <CardPesquisar color="#7f868a" texto="Slice of Life" imagem={ImagemFilmeSlice} onClick={() => handleGenreClick("Slice of Life")} />
                </div>
            </div>
        </>
    );
};

export default Pesquisar;