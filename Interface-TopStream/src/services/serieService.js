import api from './api';

/** Busca as 10 séries mais populares */
export const buscarTopSeries = async () => {
    const response = await api.get('/series/top10');
    return response.data;
};

/** Busca séries por um gênero específico */
export const buscarSeriesPorGenero = async (idGenero) => {
    const response = await api.get(`/series/genero/${idGenero}`);
    return response.data;
};

/** Busca os detalhes de uma série específica pelo ID */
export const buscarDetalhesSerie = async (id) => {
    const response = await api.get(`/series/${id}`);
    return response.data;
};

/** Pesquisa séries por um título */
export const pesquisarSeries = async (query) => {
    const response = await api.get('/series/pesquisar', { params: { query } });
    return response.data;
};

