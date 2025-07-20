import express from 'express';
import {
  listarTopAnimes,
  listarAnimesPorGenero,
  detalhesDoAnime,
  pesquisarAnime
} from '../controllers/animeController.js';

const rotaAnimes = express.Router();

rotaAnimes.get('/top10', listarTopAnimes);                  // /animes/top10
rotaAnimes.get('/genero/:id', listarAnimesPorGenero);             // /animes/genero/28
rotaAnimes.get('/pesquisar', detalhesDoAnime);              // /animes/pesquisar?query=matrix
rotaAnimes.get('/:id', pesquisarAnime);                    // /animes/603

export default rotaAnimes;
