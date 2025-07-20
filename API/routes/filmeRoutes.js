import express from 'express';
import {
  listarTopFilmes,
  listarFilmesPorGenero,
  detalhesDoFilme,
  pesquisarFilmes
} from '../controllers/filmeController.js';

const rotaFilmes = express.Router();

rotaFilmes.get('/top10', listarTopFilmes);                  // /filmes/top10
rotaFilmes.get('/genero/:id', listarFilmesPorGenero);       // /filmes/genero/28
rotaFilmes.get('/pesquisar', pesquisarFilmes);              // /filmes/pesquisar?query=matrix
rotaFilmes.get('/:id', detalhesDoFilme);                    // /filmes/603

export default rotaFilmes;
