import {
  buscarTopSeries,
  buscarSeriesPorGenero,
  buscarDetalhesSerie,
  buscarSeriesPorTitulo
} from '../services/tmdbService.js';

export async function listarTopSeries(req, res) {
  try {
    const series = await buscarTopSeries();
    res.json(series);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

export async function listarSeriesPorGenero(req, res) {
  const { id } = req.params;
  try {
    const series = await buscarSeriesPorGenero(id);
    res.json(series);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

export async function detalhesDaSerie(req, res) {
  const { id } = req.params;
  try {
    const detalhes = await buscarDetalhesSerie(id);
    res.json(detalhes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

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
