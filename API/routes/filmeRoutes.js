import express from 'express';
import {
  listarTopFilmes,
  listarFilmesPorGenero,
  detalhesDoFilme,
  pesquisarFilmes
} from '../controllers/filmeController.js';

const rotaFilmes = express.Router();

/**
 * Define as rotas para as funcionalidades de filmes.
 * Cada rota corresponde a uma operação, como buscar os mais populares,
 * filtrar por gênero, pesquisar por título ou ver detalhes de um filme.
 */

// Rota para listar os 10 filmes mais populares.
rotaFilmes.get('/top10', listarTopFilmes);

// Rota para listar filmes de um gênero específico.
rotaFilmes.get('/genero/:id', listarFilmesPorGenero);

// Rota para pesquisar filmes por um termo de busca (query).
rotaFilmes.get('/pesquisar', pesquisarFilmes);

// Rota para obter os detalhes de um filme específico pelo seu ID.
rotaFilmes.get('/:id', detalhesDoFilme);

export default rotaFilmes;