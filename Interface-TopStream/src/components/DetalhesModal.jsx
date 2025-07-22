import { useState, useEffect } from 'react';
import { buscarDetalhesFilme } from '../services/filmeService';
import { buscarDetalhesSerie } from '../services/serieService';
import { buscarDetalhesAnime } from '../services/animeService';

// Componente do modal que exibe detalhes de um filme, série ou anime.
const DetalhesModal = ({ item, tipo, onClose }) => {
    // Estados para guardar os detalhes e controlar o carregamento.
    const [detalhes, setDetalhes] = useState(null);
    const [carregando, setCarregando] = useState(true);

    // Busca os dados do item quando o componente é montado ou o item muda.
    useEffect(() => {
        const fetchDetalhes = async () => {
            if (!item) return;
            try {
                setCarregando(true);
                let resultado;
                // Seleciona o serviço correto com base no tipo de mídia.
                if (tipo === 'filme') {
                    resultado = await buscarDetalhesFilme(item.id);
                } else if (tipo === 'serie') {
                    resultado = await buscarDetalhesSerie(item.id);
                } else if (tipo === 'anime') {
                    resultado = await buscarDetalhesAnime(item.id);
                }
                setDetalhes(resultado);
            } catch (error) {
                console.error("Erro ao buscar detalhes:", error);
            } finally {
                setCarregando(false);
            }
        };

        fetchDetalhes();
    }, [item, tipo]);

    // Formata a URL da imagem, tratando diferentes fontes (TMDB ou AniList).
    const getImagemUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        return `https://image.tmdb.org/t/p/w500${path}`;
    };

    // Fecha o modal se o clique ocorrer no fundo escuro.
    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!item) return null;

    return (
        // Estrutura principal do modal com fundo translúcido.
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
            onClick={handleOutsideClick}
        >
            {/* Conteúdo do modal. */}
            <div
                className="bg-gray-900 rounded-lg shadow-2xl max-w-lg w-full relative transform transition-all animate-fade-in-up"
                onClick={(e) => e.stopPropagation()} // Impede que o clique no conteúdo feche o modal.
            >
                <button className="absolute top-3 right-3 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 z-10" onClick={onClose}>
                    <i className="bx bx-x text-2xl"></i>
                </button>

                {carregando ? (
                    // Exibição do estado de carregamento.
                    <div className="h-96 flex justify-center items-center">
                        <p className="text-white">Carregando detalhes...</p>
                    </div>
                ) : (
                    // Exibição dos detalhes após o carregamento.
                    <>
                        <div className="relative h-56 sm:h-64">
                            <img src={getImagemUrl(detalhes?.backdrop_path || detalhes?.poster_path)} alt={detalhes?.title || detalhes?.name} className="w-full h-full object-cover rounded-t-lg" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                        </div>
                        <div className="p-6 -mt-16 relative z-10">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{detalhes?.title || detalhes?.name}</h2>
                            <div className="flex flex-wrap items-center text-gray-400 text-sm mb-4 gap-x-3 gap-y-1">
                                {/* Informações como ano, gênero e avaliação. */}
                                {(detalhes?.release_date || detalhes?.first_air_date) && <span>{new Date(detalhes.release_date || detalhes.first_air_date).getFullYear()}</span>}
                                {detalhes?.genres && (
                                    <>
                                        <span>•</span>
                                        <span>{detalhes.genres.map(g => g.name).slice(0, 3).join(', ')}</span>
                                    </>
                                )}
                                {detalhes?.vote_average && (
                                    <>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><i className='bx bxs-star text-yellow-400'></i> {detalhes.vote_average.toFixed(1)}</span>
                                    </>
                                )}
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed max-h-40 overflow-y-auto scroll-invisivel">
                                {detalhes?.overview || detalhes?.description || 'Sem sinopse disponível.'}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DetalhesModal;