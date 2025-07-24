// TopStream - Copia/API/services/tmdbService.js

// Importa o axios para fazer requisições HTTP
import axios from 'axios';
// Importa funções para trabalhar com cache local de dados
import { get, set } from './cacheService.js';

// Define a URL base da API TMDB e usa a chave da API (armazenada em variável de ambiente)
const BASE_URL_TMDB = 'https://api.themoviedb.org/3';
const CHAVE_API_TMDB = process.env.TMDB_API_KEY;

// IDs de gêneros que devem ser ignorados nas buscas (por exemplo: romance)
const GENEROS_EXCLUIDOS = [10749];

// Palavras-chave para filtrar conteúdos inadequados
const PALAVRAS_PROIBIDAS = [
  // ... (você pode definir palavras que indiquem conteúdo adulto)
];

// Função que normaliza texto: tira acentos e coloca tudo em minúsculas
function normalizarTexto(texto) {
  return (texto || '')
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

// Função genérica para fazer chamadas à API TMDB com parâmetros personalizados
async function buscarNaTMDB(endpoint, parametros = {}) {
  try {
    const resposta = await axios.get(`${BASE_URL_TMDB}${endpoint}`, {
      params: {
        api_key: CHAVE_API_TMDB,
        language: 'pt-BR',
        include_adult: false,
        ...parametros,
      },
    });
    return resposta.data;
  } catch (erro) {
    console.error('Erro ao acessar TMDB:', erro.message);
    throw new Error('Erro ao buscar dados da TMDB.');
  }
}

// Função para filtrar resultados (remove conteúdo sem imagem ou com palavras proibidas)
const filtrarResultados = (item) => {
  const titulo = normalizarTexto(item.title || item.name);
  const sinopse = normalizarTexto(item.overview);
  const proibido = PALAVRAS_PROIBIDAS.some(p => titulo.includes(p) || sinopse.includes(p));
  return item.poster_path && !proibido;
};


// ===================== FILMES =====================

// Busca os filmes mais populares, usando cache para otimizar
export async function buscarTopFilmes() {
  const cacheKey = 'top-filmes';
  const cachedData = get(cacheKey);
  if (cachedData) {
    console.log(`[Cache] Servindo '${cacheKey}' do cache.`);
    return cachedData;
  }

  console.log(`[API] Buscando '${cacheKey}' na TMDB.`);
  const dados = await buscarNaTMDB('/discover/movie', {
    sort_by: 'popularity.desc',
    without_genres: GENEROS_EXCLUIDOS.join(','),
  });

  const resultados = dados.results.filter(filtrarResultados).slice(0, 10);
  await set(cacheKey, resultados);
  return resultados;
}

// Busca filmes de um gênero específico
export async function buscarFilmesPorGenero(idGenero) {
  if (GENEROS_EXCLUIDOS.includes(Number(idGenero))) return [];

  const cacheKey = `filmes-genero-${idGenero}`;
  const cachedData = get(cacheKey);
  if (cachedData) {
    console.log(`[Cache] Servindo '${cacheKey}' do cache.`);
    return cachedData;
  }

  console.log(`[API] Buscando '${cacheKey}' na TMDB.`);
  const dados = await buscarNaTMDB('/discover/movie', {
    with_genres: idGenero,
    sort_by: 'popularity.desc',
  });

  const resultados = dados.results.filter(filtrarResultados);
  await set(cacheKey, resultados);
  return resultados;
}

// Busca filmes pelo título
export async function buscarFilmesPorTitulo(tituloBusca) {
  const dados = await buscarNaTMDB('/search/movie', { query: tituloBusca });
  return dados.results.filter(filtrarResultados);
}

// Busca detalhes de um filme, incluindo trailer (se houver)
export async function buscarDetalhesFilme(idFilme) {
  const [detalhes, videos] = await Promise.all([
    buscarNaTMDB(`/movie/${idFilme}`),
    buscarNaTMDB(`/movie/${idFilme}/videos`)
  ]);

  const trailer = videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  detalhes.trailer_key = trailer ? trailer.key : null;

  return detalhes;
}


// ===================== SÉRIES =====================

// Busca as séries mais populares
export async function buscarTopSeries() {
  const cacheKey = 'top-series';
  const cachedData = get(cacheKey);
  if (cachedData) {
    console.log(`[Cache] Servindo '${cacheKey}' do cache.`);
    return cachedData;
  }

  console.log(`[API] Buscando '${cacheKey}' na TMDB.`);
  const dados = await buscarNaTMDB('/discover/tv', {
    sort_by: 'popularity.desc',
    without_genres: GENEROS_EXCLUIDOS.join(','),
  });

  const resultados = dados.results.filter(filtrarResultados).slice(0, 10);
  await set(cacheKey, resultados);
  return resultados;
}

// Busca séries por gênero
export async function buscarSeriesPorGenero(idGenero) {
  if (GENEROS_EXCLUIDOS.includes(Number(idGenero))) return [];

  const cacheKey = `series-genero-${idGenero}`;
  const cachedData = get(cacheKey);
  if (cachedData) {
    console.log(`[Cache] Servindo '${cacheKey}' do cache.`);
    return cachedData;
  }

  console.log(`[API] Buscando '${cacheKey}' na TMDB.`);
  const dados = await buscarNaTMDB('/discover/tv', {
    with_genres: idGenero,
    sort_by: 'popularity.desc',
  });

  const resultados = dados.results.filter(filtrarResultados);
  await set(cacheKey, resultados);
  return resultados;
}

// Busca séries pelo nome
export async function buscarSeriesPorTitulo(tituloBusca) {
  const dados = await buscarNaTMDB('/search/tv', { query: tituloBusca });
  return dados.results.filter(filtrarResultados);
}

// Busca detalhes de uma série, incluindo trailer
export async function buscarDetalhesSerie(idSerie) {
  const [detalhes, videos] = await Promise.all([
    buscarNaTMDB(`/tv/${idSerie}`),
    buscarNaTMDB(`/tv/${idSerie}/videos`)
  ]);

  const trailer = videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  detalhes.trailer_key = trailer ? trailer.key : null;

  return detalhes;
}
