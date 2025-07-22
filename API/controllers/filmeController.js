import {
  buscarTopFilmes,
  buscarFilmesPorGenero,
  buscarDetalhesFilme,
  buscarFilmesPorTitulo
} from '../services/tmdbService.js';

// Função para buscar os filmes mais populares ou mais bem avaliados.
export async function listarTopFilmes(req, res) {
  try {
    const filmes = await buscarTopFilmes();
    res.json(filmes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

// Função para buscar filmes filtrando por um gênero específico.
export async function listarFilmesPorGenero(req, res) {
  const { id } = req.params;
  try {
    const filmes = await buscarFilmesPorGenero(id);
    res.json(filmes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

// Função para obter os detalhes de um filme específico pelo seu ID.
export async function detalhesDoFilme(req, res) {
  const { id } = req.params;
  try {
    const detalhes = await buscarDetalhesFilme(id);
    res.json(detalhes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

// Função para pesquisar filmes com base em um título ou termo de busca.
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

