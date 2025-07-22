import api from './api';

/** Busca os 10 filmes mais populares */
export const buscarTopFilmes = async () => {
    const response = await api.get('/filmes/top10');
    return response.data;
};

/** Busca filmes por um gênero específico */
export const buscarFilmesPorGenero = async (idGenero) => {
    const response = await api.get(`/filmes/genero/${idGenero}`);
    return response.data;
};

/** Busca os detalhes de um filme específico pelo ID */
export const buscarDetalhesFilme = async (id) => {
    const response = await api.get(`/filmes/${id}`);
    return response.data;
};

/** Pesquisa filmes por um título */
export const pesquisarFilmes = async (query) => {
    const response = await api.get('/filmes/pesquisar', { params: { query } });
    return response.data;
};