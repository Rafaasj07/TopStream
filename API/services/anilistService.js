import axios from 'axios';
import { traduzirTexto } from './traducaoService.js';

const ANILIST_API_URL = 'https://graphql.anilist.co';

// Realiza requisições genéricas GraphQL à API do AniList
async function buscarNaAniList(query, variables) {
  try {
    // Executa a chamada HTTP POST com a query GraphQL
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

// Busca os 10 animes mais populares (excluindo conteúdo adulto)
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
  // Formata a resposta para o padrão da aplicação
  return response.data.Page.media.map(anime => ({
    id: anime.id,
    title: anime.title.romaji || anime.title.english,
    name: anime.title.english || anime.title.romaji,
    poster_path: anime.coverImage.large
  }));
}

// Retorna lista de animes filtrados por gênero
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

// Busca detalhes completos de um anime, traduz a sinopse e formata dados
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

  let overviewFinal = 'Sem sinopse disponível.';
  if (anime.description) {
    // Remove tags HTML e traduz a descrição para português
    const overviewLimpo = anime.description.replace(/<[^>]*>?/gm, '\n');
    overviewFinal = await traduzirTexto(overviewLimpo);
  }

  // Extrai o ID do trailer se estiver disponível no YouTube
  const trailer = anime.trailer && anime.trailer.site === 'youtube' ? anime.trailer.id : null;

  return {
    id: anime.id,
    title: anime.title.romaji || anime.title.english,
    name: anime.title.english || anime.title.romaji,
    poster_path: anime.coverImage.large,
    backdrop_path: anime.bannerImage,
    overview: overviewFinal,
    genres: anime.genres.map(g => ({ name: g })),
    vote_average: anime.averageScore ? anime.averageScore / 10 : 0,
    trailer_key: trailer,
  };
}

// Pesquisa animes baseada em termo de busca
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