// routes/assistenteRoutes.js
import express from 'express';
import { obterSugestaoUnica } from '../controllers/assistenteController.js';

const rotaAssistente = express.Router();

/**
 * Define a rota para a funcionalidade do assistente inteligente.
 * Esta rota é responsável por receber a requisição do usuário
 * e direcioná-la para o controller que processa a sugestão.
 */

// A rota utiliza o método POST, pois espera receber a descrição do usuário no corpo da requisição.
rotaAssistente.post('/sugestao', obterSugestaoUnica);

export default rotaAssistente;