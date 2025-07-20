// services/tmdbService.js
import axios from 'axios';

const BASE_URL_TMDB = 'https://api.themoviedb.org/3';
const CHAVE_API_TMDB = process.env.TMDB_API_KEY; 
// 🔹 Função genérica para chamadas à API do TMDB
async function buscarNaTMDB(endpoint, parametros = {}) {
  try {
    const resposta = await axios.get(`${BASE_URL_TMDB}${endpoint}`, {
      params: {
        api_key: CHAVE_API_TMDB,
        language: 'pt-BR',
        ...parametros,
      },
    });
    return resposta.data;
  } catch (erro) {
    console.error('Erro ao acessar TMDB:', erro.message);
    throw new Error('Erro ao buscar dados da TMDB.');
  }
}

// 🔹 Buscar os 10 filmes mais populares
export async function buscarTopFilmes() {
  const dados = await buscarNaTMDB('/movie/popular');
  return dados.results.slice(0, 10);
}

// 🔹 Buscar as 10 séries mais populares
export async function buscarTopSeries() {
  const dados = await buscarNaTMDB('/tv/popular');
  return dados.results.slice(0, 10);
}

// 🔹 Buscar filmes por gênero
export async function buscarFilmesPorGenero(idGenero) {
  const dados = await buscarNaTMDB('/discover/movie', {
    with_genres: idGenero,
    sort_by: 'popularity.desc',
  });
  return dados.results;
}

// 🔹 Buscar séries por gênero
export async function buscarSeriesPorGenero(idGenero) {
  const dados = await buscarNaTMDB('/discover/tv', {
    with_genres: idGenero,
    sort_by: 'popularity.desc',
  });
  return dados.results;
}

// 🔹 Buscar detalhes de um filme específico
export async function buscarDetalhesFilme(idFilme) {
  return await buscarNaTMDB(`/movie/${idFilme}`);
}

// 🔹 Buscar detalhes de uma série específica
export async function buscarDetalhesSerie(idSerie) {
  return await buscarNaTMDB(`/tv/${idSerie}`);
}

export async function buscarFilmesPorTitulo(titulo) {
  const dados = await buscarNaTMDB('/search/movie', {
    query: titulo
  });
  return dados.results;
}

export async function buscarSeriesPorTitulo(titulo) {
  const dados = await buscarNaTMDB('/search/tv', {
    query: titulo
  });
  return dados.results;
}