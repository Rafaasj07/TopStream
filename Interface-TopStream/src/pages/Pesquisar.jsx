import { useState } from "react";
import CardPesquisar from "../components/CardPesquisar";
import ImagemAnimeAcao from "../assets/Categoria-Anime-Acao.jpg"
import ImagemSerieComedia from "../assets/Categoria-Serie-Comedia.jpg"
import ImagemFilmeDrama from "../assets/Categoria-Filme-Drama.jpg"
import ImagemAnimeFantasia from "../assets/Categoria-Anime-Fantasia.jpg"
import ImagemSerieFiccao from "../assets/Categoria-Serie-Ficcao.jpg"
import ImagemFilmeTerror from "../assets/Categoria-Filme-Terror.jpg"
import ImagemAnimeRomance from "../assets/Categoria-Anime-Romance.jpg"
import ImagemSerieSuspense from "../assets/Categoria-Serie-Suspense.jpg"
import ImagemFilmeAventura from "../assets/Categoria-Filme-Aventura.jpg"
import ImagemFilmeSlice from "../assets/Categoria-Serie-Slice.jpg"

const Pesquisar = () => {
    const [input, setInput] = useState("");
    const [filtroSelecionado, setFiltroSelecionado] = useState("tudo");

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleFiltroClick = (filtro) => {
        setFiltroSelecionado(filtro);
    };

    return (
        <>
            {/* Barra de pesquisa mobile */}
            <nav className="w-full bg-gray-950 p-4 flex items-center gap-3 fixed top-0 left-0 z-50 sm:hidden">
                <button className="text-white text-3xl" onClick={() => window.history.back()}>
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
            </nav>

            {/* Botões de filtro */}
            <div className="mt-20 pl-6 pr-3 sm:hidden flex gap-2">
                 <button
                    onClick={() => handleFiltroClick("Todos")}
                    className={`px-4 py-1.5 rounded-3xl font-medium transition-all duration-300 border 
                    ${filtroSelecionado === "Todos"
                            ? "bg-white text-gray-900 scale-105 border-white"
                            : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                        }`}
                >
                    Todos
                </button>
                <button
                    onClick={() => handleFiltroClick("filmes")}
                    className={`px-4 py-1.5 rounded-3xl font-medium transition-all duration-300 border 
                    ${filtroSelecionado === "filmes"
                            ? "bg-white text-gray-900 scale-105 border-white"
                            : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                        }`}
                >
                    Filmes
                </button>

                <button
                    onClick={() => handleFiltroClick("series")}
                    className={`px-4 py-1.5 rounded-3xl font-medium transition-all duration-300 border 
                    ${filtroSelecionado === "series"
                            ? "bg-white text-gray-900 scale-105 border-white"
                            : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                        }`}
                >
                    Series
                </button>

                <button
                    onClick={() => handleFiltroClick("animes")}
                    className={`px-4 py-1.5 rounded-3xl font-medium transition-all duration-300 border 
                  ${filtroSelecionado === "animes"
                            ? "bg-white text-gray-900 scale-105 border-white"
                            : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                        }`}
                >
                    Animes
                </button>
            </div>


            {/* Categorias */}
            <div className="pb-6">
                <h1 className="text-white text-2xl font-bold py-4 px-5">Categorias</h1>
                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 gap-3 px-4">
                    <CardPesquisar color="#C0392B" texto="Ação" imagem={ImagemAnimeAcao} />
                    <CardPesquisar color="#2C3E50" texto="Drama" imagem={ImagemFilmeDrama} />
                    <CardPesquisar color="#19a654" texto="Comédia" imagem={ImagemSerieComedia} />
                    <CardPesquisar color="#E67E22" texto="Fantasia" imagem={ImagemAnimeFantasia} />
                    <CardPesquisar color="#cea80e" texto="Ficção científica" imagem={ImagemSerieFiccao} />
                    <CardPesquisar color="#8E44AD" texto="Terror" imagem={ImagemFilmeTerror} />
                    <CardPesquisar color="#F1948A" texto="Romance" imagem={ImagemAnimeRomance} />
                    <CardPesquisar color="#5a9ecc" texto="Suspense" imagem={ImagemSerieSuspense} />
                    <CardPesquisar color="#556B2F" texto="Aventura" imagem={ImagemFilmeAventura} />
                    <CardPesquisar color="#7f868a" texto="Slice of Life" imagem={ImagemFilmeSlice} />
                </div>
            </div>
        </>
    );
};

export default Pesquisar;
