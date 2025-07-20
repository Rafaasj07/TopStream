import express from 'express';
import {
  listarTopSeries,
  listarSeriesPorGenero,
  detalhesDaSerie,
  pesquisarSerie
} from '../controllers/serieController.js';

const rotaSeries = express.Router();

rotaSeries.get('/top10', listarTopSeries);                  // /series/top10
rotaSeries.get('/genero/:id', listarSeriesPorGenero);       // /series/genero/28
rotaSeries.get('/pesquisar', detalhesDaSerie);              // /series/pesquisar?query=matrix
rotaSeries.get('/:id', pesquisarSerie);                    // /series/603

export default rotaSeries;
