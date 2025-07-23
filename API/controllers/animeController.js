// --- IMPORTAÇÕES DE SERVIÇOS ---
import * as anilistService from '../services/anilistService.js'; // Serviço de integração com a API AniList
import { get, set } from '../services/cacheService.js'; // Funções para manipulação de cache

// --- CONTROLLER: Lista os animes mais populares ---
// Tenta servir os dados do cache; caso contrário, busca da API e armazena no cache
export async function listarTopAnimes(req, res) {
  const cacheKey = 'top-animes'; // Chave usada para identificar os dados no cache
  const cachedData = get(cacheKey); // Verifica se há dados armazenados

  if (cachedData) {
    console.log(`[Cache] Servindo '${cacheKey}' do cache.`);
    return res.json(cachedData); // Retorna os dados em cache
  }

  try {
    console.log(`[API] Buscando '${cacheKey}' na AniList.`);
    const animes = await anilistService.buscarTopAnimes(); // Busca da API externa
    await set(cacheKey, animes); // Armazena o resultado no cache
    res.json(animes); // Retorna os dados obtidos
  } catch (erro) {
    res.status(500).json({ erro: erro.message }); // Retorna erro interno do servidor
  }
}

// --- CONTROLLER: Lista animes filtrando por gênero ---
// Usa cache para evitar chamadas repetidas
export async function listarAnimesPorGenero(req, res) {
  const { id } = req.params; // ID do gênero passado na URL
  const cacheKey = `animes-genero-${id}`; // Chave específica para o gênero
  const cachedData = get(cacheKey); // Verifica se os dados estão em cache

  if (cachedData) {
    console.log(`[Cache] Servindo '${cacheKey}' do cache.`);
    return res.json(cachedData);
  }

  try {
    console.log(`[API] Buscando '${cacheKey}' na AniList.`);
    const animes = await anilistService.buscarAnimesPorGenero(id); // Busca na API por gênero
    await set(cacheKey, animes); // Salva no cache
    res.json(animes); // Retorna o resultado
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

// --- CONTROLLER: Busca detalhes de um anime específico ---
// Não usa cache, pois é uma busca em tempo real por ID
export async function detalhesDoAnime(req, res) {
  const { id } = req.params;

  try {
    const detalhes = await anilistService.buscarDetalhesAnime(id); // Busca detalhes do anime
    res.json(detalhes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

// --- CONTROLLER: Pesquisa de animes por título ---
// Requisição direta sem cache (busca em tempo real)
export async function pesquisarAnime(req, res) {
  const { query } = req.query;

  // Verifica se o parâmetro de busca foi enviado
  if (!query) return res.status(400).json({ erro: 'Parâmetro "query" é obrigatório.' });

  try {
    const animes = await anilistService.buscarAnimesPorTitulo(query); // Busca na API
    res.json(animes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}
