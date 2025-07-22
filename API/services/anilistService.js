// services/anilistService.js
import axios from 'axios';

const ANILIST_API_URL = 'https://graphql.anilist.co';

/**
 * Função genérica para fazer chamadas à API AniList.
 * @param {string} query - A query GraphQL.
 * @param {object} variables - As variáveis para a query.
 * @returns {Promise<object>} - Os dados da resposta da API.
 */
async function buscarNaAniList(query, variables) {
  try {
    const response = await axios.post(
      ANILIST_API_URL,
      {
        query,
        variables,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao acessar AniList API:`, error.message);
    throw new Error('Erro ao buscar dados da API de animes.');
  }
}

/**
 * Busca os 10 animes mais populares.
 * @returns {Promise<Array>} Uma lista com os 10 animes mais populares.
 */
export async function buscarTopAnimes() {
  const query = `
    query {
      Page(page: 1, perPage: 10) {
        media(type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
        }
      }
    }
  `;
  const response = await buscarNaAniList(query);
  return response.data.Page.media.map(anime => ({
    id: anime.id,
    title: anime.title.romaji,
    name: anime.title.english || anime.title.romaji,
    poster_path: anime.coverImage.large
  }));
}

/**
 * Busca animes por gênero.
 * @param {string} genre - O nome do gênero de anime a ser buscado.
 * @returns {Promise<Array>} Uma lista de animes que correspondem ao gênero.
 */
export async function buscarAnimesPorGenero(genre) {
    const query = `
      query ($genre: String) {
        Page(page: 1, perPage: 24) {
          media(type: ANIME, genre: $genre, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
          }
        }
      }
    `;
    const variables = { genre };
    const response = await buscarNaAniList(query, variables);
    return response.data.Page.media.map(anime => ({
        id: anime.id,
        title: anime.title.romaji,
        name: anime.title.english || anime.title.romaji,
        poster_path: anime.coverImage.large
      }));
}

/**
 * Busca detalhes completos de um anime específico pelo seu ID.
 * @param {number|string} id - O ID do anime na AniList.
 * @returns {Promise<object>} Um objeto com os detalhes completos do anime.
 */
export async function buscarDetalhesAnime(id) {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        description(asHtml: false)
        genres
        averageScore
      }
    }
  `;
  const variables = { id: Number(id) };
  const response = await buscarNaAniList(query, variables);
  const anime = response.data.Media;
  return {
    id: anime.id,
    title: anime.title.romaji,
    name: anime.title.english || anime.title.romaji,
    poster_path: anime.coverImage.large,
    overview: anime.description,
    genres: anime.genres.map(genre => ({ name: genre })),
    vote_average: anime.averageScore,
  };
}

/**
 * Pesquisa animes por um título ou termo.
 * @param {string} search - O termo de busca.
 * @returns {Promise<Array>} Uma lista de animes que correspondem ao título pesquisado.
 */
export async function buscarAnimesPorTitulo(search) {
    const query = `
      query ($search: String) {
        Page(page: 1, perPage: 24) {
          media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
          }
        }
      }
    `;
    const variables = { search };
    const response = await buscarNaAniList(query, variables);
    return response.data.Page.media.map(anime => ({
        id: anime.id,
        title: anime.title.romaji,
        name: anime.title.english || anime.title.romaji,
        poster_path: anime.coverImage.large
      }));
}