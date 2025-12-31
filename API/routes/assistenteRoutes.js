import express from 'express';
import { obterSugestaoUnica } from '../controllers/assistenteController.js';

const rotaAssistente = express.Router();

// Rota que processa a descrição do usuário e retorna uma sugestão de mídia
rotaAssistente.post('/sugestao', obterSugestaoUnica);

export default rotaAssistente;