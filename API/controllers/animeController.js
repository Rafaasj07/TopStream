import * as anilistService from '../services/anilistService.js';

export async function listarTopAnimes(req, res) {
  try {
    const animes = await anilistService.buscarTopAnimes();
    res.json(animes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

export async function listarAnimesPorGenero(req, res) {
  const { id } = req.params; // O 'id' aqui será o nome do gênero, ex: "Action"
  try {
    const animes = await anilistService.buscarAnimesPorGenero(id);
    res.json(animes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

export async function detalhesDoAnime(req, res) {
  const { id } = req.params;
  try {
    const detalhes = await anilistService.buscarDetalhesAnime(id);
    res.json(detalhes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

export async function pesquisarAnime(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ erro: 'Parâmetro "query" é obrigatório.' });

  try {
    const animes = await anilistService.buscarAnimesPorTitulo(query);
    res.json(animes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}