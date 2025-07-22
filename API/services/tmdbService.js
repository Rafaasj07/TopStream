// services/tmdbService.js
import axios from 'axios';

const BASE_URL_TMDB = 'https://api.themoviedb.org/3';
const CHAVE_API_TMDB = process.env.TMDB_API_KEY;

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

// 🔹 Buscar os 10 filmes mais populares
export async function buscarTopFilmes() {
  const dados = await buscarNaTMDB('/movie/popular');
  // Filtra por imagem E limita a 10 resultados
  return dados.results.filter(item => item.poster_path).slice(0, 10);
}

// 🔹 Buscar as 10 séries mais populares
export async function buscarTopSeries() {
  const dados = await buscarNaTMDB('/tv/popular');
  // Filtra por imagem E limita a 10 resultados
  return dados.results.filter(item => item.poster_path).slice(0, 10);
}

// As funções abaixo continuam filtrando para não mostrar itens sem imagem
export async function buscarFilmesPorGenero(idGenero) {
  const dados = await buscarNaTMDB('/discover/movie', {
    with_genres: idGenero,
    sort_by: 'popularity.desc',
  });
  return dados.results.filter(item => item.poster_path);
}

export async function buscarSeriesPorGenero(idGenero) {
  const dados = await buscarNaTMDB('/discover/tv', {
    with_genres: idGenero,
    sort_by: 'popularity.desc',
  });
  return dados.results.filter(item => item.poster_path);
}

export async function buscarDetalhesFilme(idFilme) {
    const resposta = await axios.get(`${BASE_URL_TMDB}/movie/${idFilme}`, {
        params: { api_key: CHAVE_API_TMDB, language: 'pt-BR' },
    });
    return resposta.data;
}

export async function buscarDetalhesSerie(idSerie) {
    const resposta = await axios.get(`${BASE_URL_TMDB}/tv/${idSerie}`, {
        params: { api_key: CHAVE_API_TMDB, language: 'pt-BR' },
    });
    return resposta.data;
}

export async function buscarFilmesPorTitulo(titulo) {
  const dados = await buscarNaTMDB('/search/movie', {
    query: titulo
  });
  return dados.results.filter(item => item.poster_path);
}

export async function buscarSeriesPorTitulo(titulo) {
  const dados = await buscarNaTMDB('/search/tv', {
    query: titulo
  });
  return dados.results.filter(item => item.poster_path);
}