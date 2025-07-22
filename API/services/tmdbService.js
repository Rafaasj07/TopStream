// services/tmdbService.js
import axios from 'axios';

// Configurações base para as chamadas à API TMDB.
const BASE_URL_TMDB = 'https://api.themoviedb.org/3';
const CHAVE_API_TMDB = process.env.TMDB_API_KEY;

/**
 * Função centralizada para realizar requisições à API da TMDB.
 * Ela anexa automaticamente a chave da API e o idioma em todas as chamadas.
 * @param {string} endpoint - O endpoint da API a ser chamado (ex: '/movie/popular').
 * @param {object} parametros - Parâmetros adicionais para a requisição.
 * @returns A resposta da API.
 */
async function buscarNaTMDB(endpoint, parametros = {}) {
  try {
    const resposta = await axios.get(`${BASE_URL_TMDB}${endpoint}`, {
      params: {
        api_key: CHAVE_API_TMDB,
        language: 'pt-BR',
        ...parametros,
      },
    });
    // A resposta bruta é retornada aqui
    return resposta.data;
  } catch (erro) {
    console.error('Erro ao acessar TMDB:', erro.message);
    throw new Error('Erro ao buscar dados da TMDB.');
  }
}

// Busca os 10 filmes mais populares.
export async function buscarTopFilmes() {
  const dados = await buscarNaTMDB('/movie/popular');
  // Garante que o item tenha uma imagem de pôster e limita a 10 resultados.
  return dados.results.filter(item => item.poster_path).slice(0, 10);
}

// Busca as 10 séries mais populares.
export async function buscarTopSeries() {
  const dados = await buscarNaTMDB('/tv/popular');
  // Garante que o item tenha uma imagem de pôster e limita a 10 resultados.
  return dados.results.filter(item => item.poster_path).slice(0, 10);
}

// As funções abaixo continuam filtrando para não mostrar itens sem imagem.

// Busca filmes com base em um ID de gênero específico.
export async function buscarFilmesPorGenero(idGenero) {
  const dados = await buscarNaTMDB('/discover/movie', {
    with_genres: idGenero,
    sort_by: 'popularity.desc',
  });
  return dados.results.filter(item => item.poster_path);
}

// Busca séries com base em um ID de gênero específico.
export async function buscarSeriesPorGenero(idGenero) {
  const dados = await buscarNaTMDB('/discover/tv', {
    with_genres: idGenero,
    sort_by: 'popularity.desc',
  });
  return dados.results.filter(item => item.poster_path);
}

// Busca os detalhes completos de um filme específico pelo seu ID.
export async function buscarDetalhesFilme(idFilme) {
    const resposta = await axios.get(`${BASE_URL_TMDB}/movie/${idFilme}`, {
        params: { api_key: CHAVE_API_TMDB, language: 'pt-BR' },
    });
    return resposta.data;
}

// Busca os detalhes completos de uma série específica pelo seu ID.
export async function buscarDetalhesSerie(idSerie) {
    const resposta = await axios.get(`${BASE_URL_TMDB}/tv/${idSerie}`, {
        params: { api_key: CHAVE_API_TMDB, language: 'pt-BR' },
    });
    return resposta.data;
}

// Pesquisa filmes que correspondem a um título.
export async function buscarFilmesPorTitulo(titulo) {
  const dados = await buscarNaTMDB('/search/movie', {
    query: titulo
  });
  return dados.results.filter(item => item.poster_path);
}

// Pesquisa séries que correspondem a um título.
export async function buscarSeriesPorTitulo(titulo) {
  const dados = await buscarNaTMDB('/search/tv', {
    query: titulo
  });
  return dados.results.filter(item => item.poster_path);
}
