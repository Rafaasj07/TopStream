import api from './api';

// Busca os 10 animes mais populares da API
export const buscarTopAnimes = async () => {
    const response = await api.get('/animes/top10');
    return response.data;
};

// Busca animes filtrados por gênero
export const buscarAnimesPorGenero = async (idGenero) => {
    const response = await api.get(`/animes/genero/${idGenero}`);
    return response.data;
};

// Obtém detalhes de um anime específico pelo ID
export const buscarDetalhesAnime = async (id) => {
    const response = await api.get(`/animes/${id}`);
    return response.data;
};

// Pesquisa animes baseada em um termo de busca
export const pesquisarAnimes = async (query) => {
    const response = await api.get('/animes/pesquisar', { params: { query } });
    return response.data;
};