// routes/assistenteRoutes.js
import express from 'express';
import { obterSugestaoUnica } from '../controllers/assistenteController.js';

const rotaAssistente = express.Router();

// Usamos POST porque o frontend enviará a descrição no corpo da requisição
rotaAssistente.post('/sugestao', obterSugestaoUnica);

export default rotaAssistente;