import {
  buscarTopSeries,
  buscarSeriesPorGenero,
  buscarDetalhesSerie,
  buscarSeriesPorTitulo
} from '../services/tmdbService.js';

// Retorna a lista de séries mais populares
export async function listarTopSeries(req, res) {
  try {
    const series = await buscarTopSeries();
    res.json(series);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

// Busca séries de um gênero específico pelo ID
export async function listarSeriesPorGenero(req, res) {
  const { id } = req.params;
  try {
    const series = await buscarSeriesPorGenero(id);
    res.json(series);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

// Obtém detalhes completos de uma série pelo ID
export async function detalhesDaSerie(req, res) {
  const { id } = req.params;
  try {
    const detalhes = await buscarDetalhesSerie(id);
    res.json(detalhes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

// Pesquisa séries por título na API
export async function pesquisarSerie(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ erro: 'Parâmetro "query" é obrigatório.' });

  try {
    const series = await buscarSeriesPorTitulo(query);
    res.json(series);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}