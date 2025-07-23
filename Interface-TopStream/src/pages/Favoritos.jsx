// Importa hooks e componentes necessários
import { useState, useEffect } from "react";
import NavPadrao from "../components/NavPadrao";
import CardSection from "../components/CardSection";
import NavInferior from "../components/NavInferior";
import { getFavoritos } from "../services/favoritosService";
import Footer from "../components/Footer";

// Componente principal da página de Favoritos
const Favoritos = () => {
    // Estados separados para filmes, séries e animes favoritos
    const [filmesFavoritos, setFilmesFavoritos] = useState([]);
    const [seriesFavoritas, setSeriesFavoritas] = useState([]);
    const [animesFavoritos, setAnimesFavoritos] = useState([]);

    // Carrega os favoritos do localStorage ao montar o componente
    useEffect(() => {
        const todosFavoritos = getFavoritos();

        // Filtra os favoritos por tipo de mídia
        setFilmesFavoritos(todosFavoritos.filter(f => f.media_type === 'filme'));
        setSeriesFavoritas(todosFavoritos.filter(f => f.media_type === 'serie'));
        setAnimesFavoritos(todosFavoritos.filter(f => f.media_type === 'anime'));
    }, []);

    // Soma total de itens favoritos (usado para verificar se a lista está vazia)
    const totalFavoritos = filmesFavoritos.length + seriesFavoritas.length + animesFavoritos.length;

    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao /> {/* Navbar superior */}

            {/* Container principal da página */}
            <main className="flex flex-col pb-15 sm:pb-8 pt-18 sm:pt-26">
                {/* Se houver ao menos 1 favorito, exibe os grupos */}
                {totalFavoritos > 0 ? (
                    <>
                        {/* Lista de filmes favoritos */}
                        {filmesFavoritos.length > 0 && (
                            <CardSection
                                nomeSecao="Filmes Favoritos"
                                dados={filmesFavoritos}
                                tipo="filme"
                            />
                        )}

                        {/* Lista de séries favoritas */}
                        {seriesFavoritas.length > 0 && (
                            <CardSection
                                nomeSecao="Séries Favoritas"
                                dados={seriesFavoritas}
                                tipo="serie"
                            />
                        )}

                        {/* Lista de animes favoritos */}
                        {animesFavoritos.length > 0 && (
                            <CardSection
                                nomeSecao="Animes Favoritos"
                                dados={animesFavoritos}
                                tipo="anime"
                            />
                        )}
                    </>
                ) : (
                    // Mensagem exibida quando não há favoritos salvos
                    <div className="text-center mt-10 px-4">
                        <i className='bx bx-star text-6xl text-gray-600'></i>
                        <p className="text-gray-400 text-lg mt-4">
                            Você ainda não adicionou nenhum favorito.
                        </p>
                        <p className="text-gray-500 text-sm">Clique na estrela ★ nos detalhes de um filme, série ou anime para adicioná-lo aqui.</p>
                    </div>
                )}
            </main>

            <NavInferior /> {/* Barra de navegação inferior (mobile) */}
        </div>
    );
};

export default Favoritos; 
