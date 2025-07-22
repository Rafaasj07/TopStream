import express from 'express';
import {
  listarTopSeries,
  listarSeriesPorGenero,
  detalhesDaSerie,
  pesquisarSerie
} from '../controllers/serieController.js';

const rotaSeries = express.Router();

/**
 * Define as rotas para as funcionalidades de séries.
 * Cada rota corresponde a uma operação, como buscar as mais populares,
 * filtrar por gênero, pesquisar por título ou ver detalhes de uma série.
 */

// Rota para listar as 10 séries mais populares.
rotaSeries.get('/top10', listarTopSeries);

// Rota para listar séries de um gênero específico.
rotaSeries.get('/genero/:id', listarSeriesPorGenero);

// Rota para pesquisar séries por um termo de busca (query).
rotaSeries.get('/pesquisar', pesquisarSerie);

// Rota para obter os detalhes de uma série específica pelo seu ID.
rotaSeries.get('/:id', detalhesDaSerie);

export default rotaSeries;