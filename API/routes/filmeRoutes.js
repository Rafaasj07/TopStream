import express from 'express';
import {
  listarTopFilmes,
  listarFilmesPorGenero,
  detalhesDoFilme,
  pesquisarFilmes
} from '../controllers/filmeController.js';

const rotaFilmes = express.Router();

// Rota para listar os filmes mais populares
rotaFilmes.get('/top10', listarTopFilmes);

// Rota para filtrar filmes por gênero
rotaFilmes.get('/genero/:id', listarFilmesPorGenero);

// Rota para pesquisar filmes por título
rotaFilmes.get('/pesquisar', pesquisarFilmes);

// Rota para obter detalhes de um filme por ID
rotaFilmes.get('/:id', detalhesDoFilme);

export default rotaFilmes;