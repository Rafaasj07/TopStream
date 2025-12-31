import { useState, useEffect } from "react";
import NavPadrao from "../components/NavPadrao";
import CardSection from "../components/CardSection";
import NavInferior from "../components/NavInferior";
import { getFavoritos } from "../services/favoritosService";

// Componente que gerencia e exibe a lista de itens favoritados pelo usuário
const Favoritos = () => {
    const [filmesFavoritos, setFilmesFavoritos] = useState([]);
    const [seriesFavoritas, setSeriesFavoritas] = useState([]);
    const [animesFavoritos, setAnimesFavoritos] = useState([]);

    // Recupera os favoritos do serviço e os separa por categoria na montagem
    useEffect(() => {
        const todosFavoritos = getFavoritos();

        setFilmesFavoritos(todosFavoritos.filter(f => f.media_type === 'filme'));
        setSeriesFavoritas(todosFavoritos.filter(f => f.media_type === 'serie'));
        setAnimesFavoritos(todosFavoritos.filter(f => f.media_type === 'anime'));
    }, []);

    const totalFavoritos = filmesFavoritos.length + seriesFavoritas.length + animesFavoritos.length;

    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />

            <main className="flex flex-col pb-15 sm:pb-8 pt-18 sm:pt-26">
                {totalFavoritos > 0 ? (
                    <>
                        {filmesFavoritos.length > 0 && (
                            <CardSection
                                nomeSecao="Filmes Favoritos"
                                dados={filmesFavoritos}
                                tipo="filme"
                            />
                        )}

                        {seriesFavoritas.length > 0 && (
                            <CardSection
                                nomeSecao="Séries Favoritas"
                                dados={seriesFavoritas}
                                tipo="serie"
                            />
                        )}

                        {animesFavoritos.length > 0 && (
                            <CardSection
                                nomeSecao="Animes Favoritos"
                                dados={animesFavoritos}
                                tipo="anime"
                            />
                        )}
                    </>
                ) : (
                    <div className="text-center mt-10 px-4">
                        <i className='bx bx-star text-6xl text-gray-600'></i>
                        <p className="text-gray-400 text-lg mt-4">
                            Você ainda não adicionou nenhum favorito.
                        </p>
                        <p className="text-gray-500 text-sm">Clique na estrela ★ nos detalhes de um filme, série ou anime para adicioná-lo aqui.</p>
                    </div>
                )}
            </main>

            <NavInferior />
        </div>
    );
};

export default Favoritos;