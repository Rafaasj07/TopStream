import * as anilistService from '../services/anilistService.js';
import { get, set } from '../services/cacheService.js';

// Retorna a lista de animes mais populares, verificando o cache antes da API
export async function listarTopAnimes(req, res) {
  const cacheKey = 'top-animes';
  const cachedData = get(cacheKey);

  // Retorna dados do cache se disponíveis
  if (cachedData) {
    console.log(`[Cache] Servindo '${cacheKey}' do cache.`);
    return res.json(cachedData);
  }

  try {
    console.log(`[API] Buscando '${cacheKey}' na AniList.`);
    // Busca na API externa e atualiza o cache
    const animes = await anilistService.buscarTopAnimes();
    await set(cacheKey, animes);
    res.json(animes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

// Retorna animes de um gênero específico, utilizando cache
export async function listarAnimesPorGenero(req, res) {
  const { id } = req.params;
  const cacheKey = `animes-genero-${id}`;
  const cachedData = get(cacheKey);

  // Serve do cache para evitar chamadas repetidas
  if (cachedData) {
    console.log(`[Cache] Servindo '${cacheKey}' do cache.`);
    return res.json(cachedData);
  }

  try {
    console.log(`[API] Buscando '${cacheKey}' na AniList.`);
    // Busca na API e armazena o resultado
    const animes = await anilistService.buscarAnimesPorGenero(id);
    await set(cacheKey, animes);
    res.json(animes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

// Obtém os detalhes completos de um anime pelo ID
export async function detalhesDoAnime(req, res) {
  const { id } = req.params;

  try {
    const detalhes = await anilistService.buscarDetalhesAnime(id);
    res.json(detalhes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

// Pesquisa animes por título na API
export async function pesquisarAnime(req, res) {
  const { query } = req.query;

  if (!query) return res.status(400).json({ erro: 'Parâmetro "query" é obrigatório.' });

  try {
    // Realiza a busca na API externa
    const animes = await anilistService.buscarAnimesPorTitulo(query);
    res.json(animes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}