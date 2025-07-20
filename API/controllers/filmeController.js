import {
  buscarTopFilmes,
  buscarFilmesPorGenero,
  buscarDetalhesFilme,
  buscarFilmesPorTitulo
} from '../services/tmdbService.js';

export async function listarTopFilmes(req, res) {
  try {
    const filmes = await buscarTopFilmes();
    res.json(filmes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

export async function listarFilmesPorGenero(req, res) {
  const { id } = req.params;
  try {
    const filmes = await buscarFilmesPorGenero(id);
    res.json(filmes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

export async function detalhesDoFilme(req, res) {
  const { id } = req.params;
  try {
    const detalhes = await buscarDetalhesFilme(id);
    res.json(detalhes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

export async function pesquisarFilmes(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ erro: 'Parâmetro "query" é obrigatório.' });

  try {
    const filmes = await buscarFilmesPorTitulo(query);
    res.json(filmes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}
