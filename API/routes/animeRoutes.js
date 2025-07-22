import express from 'express';
import {
  listarTopAnimes,
  listarAnimesPorGenero,
  detalhesDoAnime,
  pesquisarAnime
} from '../controllers/animeController.js';

const rotaAnimes = express.Router();

/**
 * Define as rotas para as funcionalidades de animes.
 * Cada rota corresponde a uma operação específica, como buscar os mais populares,
 * filtrar por gênero, pesquisar por título ou ver detalhes de um anime.
 */

// Rota para listar os 10 animes mais populares.
rotaAnimes.get('/top10', listarTopAnimes);

// Rota para listar animes de um gênero específico, usando o nome do gênero como ID.
rotaAnimes.get('/genero/:id', listarAnimesPorGenero);

// Rota para pesquisar animes por um termo de busca (query).
rotaAnimes.get('/pesquisar', pesquisarAnime);

// Rota para obter os detalhes de um anime específico pelo seu ID.
rotaAnimes.get('/:id', detalhesDoAnime);

export default rotaAnimes;