import axios from 'axios';
import { get, set } from './cacheService.js';

const BASE_URL_TMDB = 'https://api.themoviedb.org/3';
const CHAVE_API_TMDB = process.env.TMDB_API_KEY;

const GENEROS_EXCLUIDOS = [10749];

const PALAVRAS_PROIBIDAS = [
  'hentai', 'adulto', '+18', '18+', 'xxx', 'erótico', 'erotico', 'pornô', 'porno', 'porn',
  'sexual', 'sexo', 'nude', 'nudes', 'nudez', 'sensual', 'sedutor', 'sedução', 'orgasmo',
  'fetiche', 'bdsm', 'yaoi', 'yuri', 'ecchi', 'nsfw', 'tentáculo', 'incesto', 'pedofilia',
  'abuso', 'explícito', 'explicit', 'vulgar', 'lascivo', 'obsceno', 'perverso',
  'prostituição', 'prostituta', 'strip', 'striper', 'bordel', 'dominação', 'submisso',
  'submissa', 'sugestivo', 'safado', 'safadeza', 'garotas quentes', 'garoto quente',
  'garota sexy', 'garoto sexy', 'sexo explícito', 'conteúdo adulto', 'prazer', 'masturbação',
  'peitos', 'seios', 'bundas', 'nádegas', 'genitália', 'vagina', 'pênis', 'boquete',
  'chupar', 'gozar', 'gozo', 'ejacular', 'ejaculação', 'penetração', 'beijo técnico',

  'hentai', 'adult', '18+', 'xxx', 'pussy', 'erotic', 'porn', 'sexual', 'sex', 'nude', 'nudes',
  'sensual', 'seductive', 'orgasm', 'fetish', 'bdsm', 'yaoi', 'yuri', 'ecchi', 'nsfw',
  'tentacle', 'incest', 'pedophilia', 'abuse', 'explicit', 'vulgar', 'lewd', 'obscene',
  'perverse', 'prostitution', 'prostitute', 'strip', 'stripper', 'brothel', 'domination',
  'submissive', 'suggestive', 'naughty', 'hot girls', 'hot boy', 'sexy girl', 'sexy boy',
  'explicit sex', 'adult content', 'pleasure', 'masturbation', 'boobs', 'tits', 'butt',
  'ass', 'genitals', 'vagina', 'penis', 'blowjob', 'suck', 'cum', 'ejaculate', 'penetration',
  'technical kiss'
];

// Remove acentos e converte texto para minúsculas
function normalizarTexto(texto) {
  return (texto || '')
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

// Realiza requisições GET genéricas para a API do TMDB
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

// Filtra itens sem poster ou com palavras proibidas no título/sinopse
const filtrarResultados = (item) => {
  const titulo = normalizarTexto(item.title || item.name);
  const sinopse = normalizarTexto(item.overview);
  const proibido = PALAVRAS_PROIBIDAS.some(p => titulo.includes(p) || sinopse.includes(p));
  return item.poster_path && !proibido;
};

// Retorna os 10 filmes mais populares, utilizando cache
export async function buscarTopFilmes() {
  const cacheKey = 'top-filmes';
  const cachedData = get(cacheKey);
  if (cachedData) {
    console.log(`[Cache] Servindo '${cacheKey}' do cache.`);
    return cachedData;
  }

  console.log(`[API] Buscando '${cacheKey}' na TMDB.`);
  // Busca na API, filtra resultados e salva no cache
  const dados = await buscarNaTMDB('/discover/movie', {
    sort_by: 'popularity.desc',
    without_genres: GENEROS_EXCLUIDOS.join(','),
  });

  const resultados = dados.results.filter(filtrarResultados).slice(0, 10);
  await set(cacheKey, resultados);
  return resultados;
}

// Busca filmes por gênero, utilizando cache
export async function buscarFilmesPorGenero(idGenero) {
  if (GENEROS_EXCLUIDOS.includes(Number(idGenero))) return [];

  const cacheKey = `filmes-genero-${idGenero}`;
  const cachedData = get(cacheKey);
  if (cachedData) {
    console.log(`[Cache] Servindo '${cacheKey}' do cache.`);
    return cachedData;
  }

  console.log(`[API] Buscando '${cacheKey}' na TMDB.`);
  // Busca na API e filtra resultados
  const dados = await buscarNaTMDB('/discover/movie', {
    with_genres: idGenero,
    sort_by: 'popularity.desc',
  });

  const resultados = dados.results.filter(filtrarResultados);
  await set(cacheKey, resultados);
  return resultados;
}

// Pesquisa filmes pelo título na API
export async function buscarFilmesPorTitulo(tituloBusca) {
  const dados = await buscarNaTMDB('/search/movie', { query: tituloBusca });
  return dados.results.filter(filtrarResultados);
}

// Obtém detalhes e trailer (YouTube) de um filme
export async function buscarDetalhesFilme(idFilme) {
  const [detalhes, videos] = await Promise.all([
    buscarNaTMDB(`/movie/${idFilme}`),
    buscarNaTMDB(`/movie/${idFilme}/videos`)
  ]);

  const trailer = videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  detalhes.trailer_key = trailer ? trailer.key : null;

  return detalhes;
}

// Retorna as 10 séries mais populares, utilizando cache
export async function buscarTopSeries() {
  const cacheKey = 'top-series';
  const cachedData = get(cacheKey);
  if (cachedData) {
    console.log(`[Cache] Servindo '${cacheKey}' do cache.`);
    return cachedData;
  }

  console.log(`[API] Buscando '${cacheKey}' na TMDB.`);
  // Busca na API, filtra e salva no cache
  const dados = await buscarNaTMDB('/discover/tv', {
    sort_by: 'popularity.desc',
    without_genres: GENEROS_EXCLUIDOS.join(','),
  });

  const resultados = dados.results.filter(filtrarResultados).slice(0, 10);
  await set(cacheKey, resultados);
  return resultados;
}

// Busca séries por gênero, utilizando cache
export async function buscarSeriesPorGenero(idGenero) {
  if (GENEROS_EXCLUIDOS.includes(Number(idGenero))) return [];

  const cacheKey = `series-genero-${idGenero}`;
  const cachedData = get(cacheKey);
  if (cachedData) {
    console.log(`[Cache] Servindo '${cacheKey}' do cache.`);
    return cachedData;
  }

  console.log(`[API] Buscando '${cacheKey}' na TMDB.`);
  // Busca na API e filtra resultados
  const dados = await buscarNaTMDB('/discover/tv', {
    with_genres: idGenero,
    sort_by: 'popularity.desc',
  });

  const resultados = dados.results.filter(filtrarResultados);
  await set(cacheKey, resultados);
  return resultados;
}

// Pesquisa séries pelo título na API
export async function buscarSeriesPorTitulo(tituloBusca) {
  const dados = await buscarNaTMDB('/search/tv', { query: tituloBusca });
  return dados.results.filter(filtrarResultados);
}

// Obtém detalhes e trailer (YouTube) de uma série
export async function buscarDetalhesSerie(idSerie) {
  const [detalhes, videos] = await Promise.all([
    buscarNaTMDB(`/tv/${idSerie}`),
    buscarNaTMDB(`/tv/${idSerie}/videos`)
  ]);

  const trailer = videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  detalhes.trailer_key = trailer ? trailer.key : null;

  return detalhes;
}