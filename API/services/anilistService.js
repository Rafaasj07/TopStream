// TopStream - Copia/API/services/anilistService.js

// Importa o axios para realizar chamadas HTTP e o serviço de tradução.
import axios from 'axios';
import { traduzirTexto } from './traducaoService.js';

// URL base da API GraphQL da AniList
const ANILIST_API_URL = 'https://graphql.anilist.co';

/**
 * Função genérica para fazer requisições GraphQL à AniList
 * @param {string} query - A consulta GraphQL (query ou mutation)
 * @param {object} variables - Variáveis utilizadas na consulta
 * @returns {Promise<object>} - Resposta da API
 */
async function buscarNaAniList(query, variables) {
  try {
    const response = await axios.post(ANILIST_API_URL, {
      query,
      variables,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    // Em caso de erro, exibe no console e lança uma exceção
    console.error('Erro ao acessar AniList API:', error.response ? error.response.data : error.message);
    throw new Error('Não foi possível buscar dados da AniList.');
  }
}

/**
 * Busca os 10 animes mais populares da AniList (excluindo conteúdo adulto)
 * @returns {Promise<Array>} - Lista de animes populares
 */
export async function buscarTopAnimes() {
  const query = `
      query {
        Page(page: 1, perPage: 10) {
          media(type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
            id
            title { romaji english }
            coverImage { large }
          }
        }
      }
    `;
  const response = await buscarNaAniList(query);
  // Formata o resultado para manter consistência com o padrão usado nos cards
  return response.data.Page.media.map(anime => ({
    id: anime.id,
    title: anime.title.romaji || anime.title.english,
    name: anime.title.english || anime.title.romaji,
    poster_path: anime.coverImage.large
  }));
}

/**
 * Busca animes de um determinado gênero
 * @param {string} genre - Gênero a buscar (ex: "Action", "Drama")
 * @returns {Promise<Array>} - Lista de animes encontrados
 */
export async function buscarAnimesPorGenero(genre) {
  const query = `
      query ($genre: String) {
        Page(page: 1, perPage: 24) {
          media(type: ANIME, genre: $genre, sort: POPULARITY_DESC, isAdult: false) {
            id
            title { romaji english }
            coverImage { large }
          }
        }
      }
    `;
  const variables = { genre };
  const response = await buscarNaAniList(query, variables);
  return response.data.Page.media.map(anime => ({
    id: anime.id,
    title: anime.title.romaji || anime.title.english,
    name: anime.title.english || anime.title.romaji,
    poster_path: anime.coverImage.large
  }));
}

/**
 * Busca os detalhes completos de um anime, incluindo:
 * - Sinopse (traduzida para PT-BR)
 * - Gêneros
 * - Nota média (convertida de 100 para escala 10)
 * - Trailer (caso exista e seja do YouTube)
 * @param {number} id - ID do anime no AniList
 * @returns {Promise<object>} - Dados detalhados do anime
 */
export async function buscarDetalhesAnime(id) {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title { romaji english }
        coverImage { large }
        bannerImage
        description
        genres
        averageScore
        trailer {
          id
          site
        }
      }
    }
  `;
  const variables = { id: Number(id) };
  const response = await buscarNaAniList(query, variables);
  const anime = response.data.Media;

  if (!anime) return null;

  // Remove tags HTML e traduz a sinopse para português
  let overviewFinal = 'Sem sinopse disponível.';
  if (anime.description) {
    const overviewLimpo = anime.description.replace(/<[^>]*>?/gm, '\n'); // Remove tags HTML
    overviewFinal = await traduzirTexto(overviewLimpo); // Tradução automática
  }

  // Verifica se há trailer no YouTube e extrai o ID
  const trailer = anime.trailer && anime.trailer.site === 'youtube' ? anime.trailer.id : null;

  return {
    id: anime.id,
    title: anime.title.romaji || anime.title.english,
    name: anime.title.english || anime.title.romaji,
    poster_path: anime.coverImage.large,
    backdrop_path: anime.bannerImage,
    overview: overviewFinal,
    genres: anime.genres.map(g => ({ name: g })), // Formata os gêneros no mesmo estilo do TMDB
    vote_average: anime.averageScore ? anime.averageScore / 10 : 0, // Converte nota 0–100 para 0–10
    trailer_key: trailer, // ID do vídeo do YouTube (usado no iframe do modal)
  };
}

/**
 * Busca animes pelo título informado, similar à busca global
 * @param {string} search - Termo de busca
 * @returns {Promise<Array>} - Lista de animes que correspondem
 */
export async function buscarAnimesPorTitulo(search) {
  const query = `
      query ($search: String) {
        Page(page: 1, perPage: 24) {
          media(search: $search, type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
            id
            title { romaji english }
            coverImage { large }
          }
        }
      }
    `;
  const variables = { search };
  const response = await buscarNaAniList(query, variables);
  return response.data.Page.media.map(anime => ({
    id: anime.id,
    title: anime.title.romaji || anime.title.english,
    name: anime.title.english || anime.title.romaji,
    poster_path: anime.coverImage.large
  }));
}
