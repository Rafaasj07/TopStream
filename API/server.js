import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { clearAll } from './services/cacheService.js';

import rotaFilmes from './routes/filmeRoutes.js';
import rotaSeries from './routes/serieRoutes.js';
import rotaAnimes from './routes/animeRoutes.js';
import rotaAssistente from './routes/assistenteRoutes.js';

dotenv.config();

const app = express();
const PORTA = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api/filmes', rotaFilmes);
app.use('/api/series', rotaSeries);
app.use('/api/animes', rotaAnimes);
app.use('/api/assistente', rotaAssistente);

const CACHE_REFRESH_INTERVAL = 3600000;
// Executa a limpeza do cache periodicamente (a cada 1 hora)
setInterval(async () => {
  console.log('Iniciando rotina de limpeza de cache...');
  await clearAll();
}, CACHE_REFRESH_INTERVAL);

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});