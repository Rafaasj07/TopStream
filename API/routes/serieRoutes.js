import express from 'express';
import {
  listarTopSeries,
  listarSeriesPorGenero,
  detalhesDaSerie,
  pesquisarSerie
} from '../controllers/serieController.js';

const rotaSeries = express.Router();

// Rota para listar as séries mais populares
rotaSeries.get('/top10', listarTopSeries);

// Rota para filtrar séries por gênero
rotaSeries.get('/genero/:id', listarSeriesPorGenero);

// Rota para pesquisar séries por título
rotaSeries.get('/pesquisar', pesquisarSerie);

// Rota para obter detalhes de uma série por ID
rotaSeries.get('/:id', detalhesDaSerie);

export default rotaSeries;