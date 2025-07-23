import axios from 'axios';
import { traduzirTexto } from './traducaoService.js';

// URL base da API GraphQL da AniList
const ANILIST_API_URL = 'https://graphql.anilist.co';

/**
 * Função genérica que faz requisição GraphQL para a AniList
 * @param {string} query - A query GraphQL a ser enviada
 * @param {object} variables - Variáveis da query
 * @returns {Promise<object>} - Dados da resposta
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
    console.error('Erro ao acessar AniList API:', error.response ? error.response.data : error.message);
    throw new Error('Não foi possível buscar dados da AniList.');
  }
}

/**
 * Busca os 10 animes mais populares, excluindo conteúdo adulto
 * @returns {Promise<Array>} - Lista de animes
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
  return response.data.Page.media.map(anime => ({
    id: anime.id,
    title: anime.title.romaji || anime.title.english,
    name: anime.title.english || anime.title.romaji,
    poster_path: anime.coverImage.large
  }));
}

/**
 * Busca animes por gênero, excluindo conteúdo adulto
 * @param {string} genre - Gênero a ser buscado
 * @returns {Promise<Array>} - Lista de animes do gênero
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
 * Busca detalhes de um anime pelo ID, incluindo sinopse traduzida
 * @param {number} id - ID do anime
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
      }
    }
  `;
  const variables = { id: Number(id) };
  const response = await buscarNaAniList(query, variables);
  const anime = response.data.Media;

  if (!anime) return null;

  // Processa e traduz a sinopse se existir
  let overviewFinal = 'Sem sinopse disponível.';
  if (anime.description) {
    const overviewLimpo = anime.description.replace(/<[^>]*>?/gm, '\n');
    overviewFinal = await traduzirTexto(overviewLimpo, 'pt-BR');
  }

  return {
    id: anime.id,
    title: anime.title.romaji || anime.title.english,
    name: anime.title.english || anime.title.romaji,
    poster_path: anime.coverImage.large,
    backdrop_path: anime.bannerImage,
    overview: overviewFinal,
    genres: anime.genres.map(g => ({ name: g })),
    vote_average: anime.averageScore ? anime.averageScore / 10 : 0,
  };
}

/**
 * Busca animes pelo título, excluindo conteúdo adulto
 * @param {string} search - Texto de busca (título do anime)
 * @returns {Promise<Array>} - Lista de animes encontrados
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
