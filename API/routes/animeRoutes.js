import express from 'express';
import {
  listarTopAnimes,
  listarAnimesPorGenero,
  detalhesDoAnime,
  pesquisarAnime
} from '../controllers/animeController.js';

const rotaAnimes = express.Router();

// Rota para listar os animes mais populares
rotaAnimes.get('/top10', listarTopAnimes);

// Rota para filtrar animes por gênero
rotaAnimes.get('/genero/:id', listarAnimesPorGenero);

// Rota para pesquisar animes por título
rotaAnimes.get('/pesquisar', pesquisarAnime);

// Rota para obter detalhes de um anime por ID
rotaAnimes.get('/:id', detalhesDoAnime);

export default rotaAnimes;