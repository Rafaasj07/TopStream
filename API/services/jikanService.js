// services/jikanService.js
import axios from 'axios';

// URL base da versão 4 da API pública do Jikan
const BASE_URL_JIKAN = 'https://api.jikan.moe/v4';

/**
 * Função genérica e reutilizável para fazer chamadas à API do Jikan.
 * Centraliza o tratamento de erros e a construção da URL.
 * @param {string} endpoint - O endpoint da API a ser chamado (ex: '/top/anime').
 * @param {object} parametros - Parâmetros de consulta (query params) a serem adicionados à requisição.
 * @returns {Promise<object>} - Os dados da resposta da API.
 */
async function buscarNaJikan(endpoint, parametros = {}) {
  try {
    // A API Jikan não requer chave, então a chamada é mais simples.
    const resposta = await axios.get(`${BASE_URL_JIKAN}${endpoint}`, {
      params: parametros,
    });
    // A API Jikan encapsula os resultados principais em uma propriedade 'data' no corpo da resposta.
    return resposta.data;
  } catch (erro) {
    // Log detalhado do erro no console do servidor para depuração.
    console.error(`Erro ao acessar Jikan API no endpoint ${endpoint}:`, erro.message);
    // Lança um erro genérico para ser capturado e tratado pelo controller.
    throw new Error('Erro ao buscar dados da API de animes.');
  }
}

// --- Funções Específicas para Animes (Exportadas para o Controller) ---

/**
 * Busca os 10 animes mais populares.
 * @returns {Promise<Array>} Uma lista com os 10 animes mais populares.
 */
export async function buscarTopAnimes() {
  const dados = await buscarNaJikan('/top/anime', { limit: 10 });
  return dados.data;
}

/**
 * Busca animes por gênero.
 * @param {number|string} idGenero - O ID do gênero de anime a ser buscado.
 * @returns {Promise<Array>} Uma lista de animes que correspondem ao gênero.
 */
export async function buscarAnimesPorGenero(idGenero) {
  const dados = await buscarNaJikan('/anime', {
    genres: idGenero,
    sort_by: 'popularity.desc', // Ordena por popularidade
    limit: 24, // Limita a quantidade de resultados
  });
  return dados.data;
}

/**
 * Busca detalhes completos de um anime específico pelo seu ID.
 * @param {number|string} idAnime - O ID do anime no MyAnimeList.
 * @returns {Promise<object>} Um objeto com os detalhes completos do anime.
 */
export async function buscarDetalhesAnime(idAnime) {
  const dados = await buscarNaJikan(`/anime/${idAnime}/full`);
  return dados.data;
}

/**
 * Pesquisa animes por um título ou termo.
 * @param {string} titulo - O termo de busca.
 * @returns {Promise<Array>} Uma lista de animes que correspondem ao título pesquisado.
 */
export async function buscarAnimesPorTitulo(titulo) {
  const dados = await buscarNaJikan('/anime', {
    q: titulo, // O parâmetro de busca no Jikan é 'q'
    limit: 24,
  });
  return dados.data;
}