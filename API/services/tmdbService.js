import axios from 'axios';

// Define a URL base da API TMDB e a chave de acesso da API, que é lida de uma variável de ambiente
const BASE_URL_TMDB = 'https://api.themoviedb.org/3';
const CHAVE_API_TMDB = process.env.TMDB_API_KEY;

// IDs de gêneros que devem ser completamente excluídos das buscas (exemplo: Romance)
const GENEROS_EXCLUIDOS = [10749]; // 10749 = Romance

// Lista de palavras-chave usadas para filtrar conteúdo potencialmente adulto ou inapropriado
const PALAVRAS_PROIBIDAS = [
  // Português
  'hentai', 'adulto', '+18', '18+', 'xxx', 'erótico', 'erotico', 'pornô', 'porno', 'porn',
  'sexual', 'sexo', 'nude', 'nudes', 'nudez', 'sensual', 'sedutor', 'sedução', 'orgasmo',
  'fetiche', 'bdsm', 'yaoi', 'yuri', 'ecchi', 'nsfw', 'tentáculo', 'incesto', 'pedofilia',
  'abuso', 'explícito', 'explicit', 'vulgar', 'lascivo', 'obsceno', 'perverso',
  'prostituição', 'prostituta', 'strip', 'striper', 'bordel', 'dominação', 'submisso',
  'submissa', 'sugestivo', 'safado', 'safadeza', 'garotas quentes', 'garoto quente',
  'garota sexy', 'garoto sexy', 'sexo explícito', 'conteúdo adulto', 'prazer', 'masturbação',
  'peitos', 'seios', 'bundas', 'nádegas', 'genitália', 'vagina', 'pênis', 'boquete',
  'chupar', 'gozar', 'gozo', 'ejacular', 'ejaculação', 'penetração', 'beijo técnico',

  // Inglês
  'hentai', 'adult', '18+', 'xxx', 'pussy', 'erotic', 'porn', 'sexual', 'sex', 'nude', 'nudes',
  'sensual', 'seductive', 'orgasm', 'fetish', 'bdsm', 'yaoi', 'yuri', 'ecchi', 'nsfw',
  'tentacle', 'incest', 'pedophilia', 'abuse', 'explicit', 'vulgar', 'lewd', 'obscene',
  'perverse', 'prostitution', 'prostitute', 'strip', 'stripper', 'brothel', 'domination',
  'submissive', 'suggestive', 'naughty', 'hot girls', 'hot boy', 'sexy girl', 'sexy boy',
  'explicit sex', 'adult content', 'pleasure', 'masturbation', 'boobs', 'tits', 'butt',
  'ass', 'genitals', 'vagina', 'penis', 'blowjob', 'suck', 'cum', 'ejaculate', 'penetration',
  'technical kiss'
];

// Função para normalizar o texto (remover acentos e padronizar para minúsculas)
function normalizarTexto(texto) {
  return (texto || '')
    .normalize("NFD") // Decompõe os caracteres com acento
    .replace(/[̀-ͯ]/g, '') // Remove os acentos
    .toLowerCase(); // Transforma tudo em minúsculas
}

// Função genérica para chamadas à API TMDB, já aplicando idioma e desativando conteúdo adulto
async function buscarNaTMDB(endpoint, parametros = {}) {
  try {
    const resposta = await axios.get(`${BASE_URL_TMDB}${endpoint}`, {
      params: {
        api_key: CHAVE_API_TMDB,
        language: 'pt-BR',
        include_adult: false,
        ...parametros, // Adiciona parâmetros extras (como filtros de gênero, ordenação, etc.)
      },
    });
    return resposta.data;
  } catch (erro) {
    console.error('Erro ao acessar TMDB:', erro.message);
    throw new Error('Erro ao buscar dados da TMDB.');
  }
}

// ===================== FILMES =====================

// Busca os filmes mais populares, excluindo os gêneros e palavras proibidas
export async function buscarTopFilmes() {
  const dados = await buscarNaTMDB('/discover/movie', {
    sort_by: 'popularity.desc',
    without_genres: GENEROS_EXCLUIDOS.join(','),
  });

  // Filtra resultados que não tenham conteúdo proibido e possuem imagem
  return dados.results.filter(item => {
    const titulo = normalizarTexto(item.title);
    const sinopse = normalizarTexto(item.overview);
    const proibido = PALAVRAS_PROIBIDAS.some(p => titulo.includes(p) || sinopse.includes(p));
    return item.poster_path && !proibido;
  }).slice(0, 10); // Limita a 10 resultados
}

// Busca filmes por gênero específico (evita buscar se for gênero proibido)
export async function buscarFilmesPorGenero(idGenero) {
  if (GENEROS_EXCLUIDOS.includes(Number(idGenero))) return [];

  const dados = await buscarNaTMDB('/discover/movie', {
    with_genres: idGenero,
    sort_by: 'popularity.desc',
  });

  return dados.results.filter(item => {
    const titulo = normalizarTexto(item.title);
    const sinopse = normalizarTexto(item.overview);
    const proibido = PALAVRAS_PROIBIDAS.some(p => titulo.includes(p) || sinopse.includes(p));
    return item.poster_path && !proibido;
  });
}

// Busca filmes por texto digitado pelo usuário
export async function buscarFilmesPorTitulo(tituloBusca) {
  const dados = await buscarNaTMDB('/search/movie', { query: tituloBusca });

  return dados.results.filter(item => {
    const titulo = normalizarTexto(item.title);
    const sinopse = normalizarTexto(item.overview);
    const proibido = PALAVRAS_PROIBIDAS.some(p => titulo.includes(p) || sinopse.includes(p));
    return item.poster_path && !proibido;
  });
}

// Busca detalhes completos de um filme pelo ID
export async function buscarDetalhesFilme(idFilme) {
  return await buscarNaTMDB(`/movie/${idFilme}`);
}

// ===================== SÉRIES =====================

// Busca as séries mais populares, aplicando os mesmos filtros de segurança
export async function buscarTopSeries() {
  const dados = await buscarNaTMDB('/discover/tv', {
    sort_by: 'popularity.desc',
    without_genres: GENEROS_EXCLUIDOS.join(','),
  });

  return dados.results.filter(item => {
    const titulo = normalizarTexto(item.name);
    const sinopse = normalizarTexto(item.overview);
    const proibido = PALAVRAS_PROIBIDAS.some(p => titulo.includes(p) || sinopse.includes(p));
    return item.poster_path && !proibido;
  }).slice(0, 10);
}

// Busca séries por gênero (exceto gêneros excluídos)
export async function buscarSeriesPorGenero(idGenero) {
  if (GENEROS_EXCLUIDOS.includes(Number(idGenero))) return [];

  const dados = await buscarNaTMDB('/discover/tv', {
    with_genres: idGenero,
    sort_by: 'popularity.desc',
  });

  return dados.results.filter(item => {
    const titulo = normalizarTexto(item.name);
    const sinopse = normalizarTexto(item.overview);
    const proibido = PALAVRAS_PROIBIDAS.some(p => titulo.includes(p) || sinopse.includes(p));
    return item.poster_path && !proibido;
  });
}

// Busca séries pelo título
export async function buscarSeriesPorTitulo(tituloBusca) {
  const dados = await buscarNaTMDB('/search/tv', { query: tituloBusca });

  return dados.results.filter(item => {
    const titulo = normalizarTexto(item.name);
    const sinopse = normalizarTexto(item.overview);
    const proibido = PALAVRAS_PROIBIDAS.some(p => titulo.includes(p) || sinopse.includes(p));
    return item.poster_path && !proibido;
  });
}

// Busca detalhes completos de uma série pelo ID
export async function buscarDetalhesSerie(idSerie) {
  return await buscarNaTMDB(`/tv/${idSerie}`);
}
