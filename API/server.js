// server.js
import express from 'express';
import dotenv from 'dotenv';
import rotaFilmes from './routes/filmeRoutes.js';
import rotaSeries from './routes/serieRoutes.js';
import rotaAnimes from './routes/animeRoutes.js';
import rotaAssistente from './routes/assistenteRoutes.js';

// Carrega as variáveis de ambiente do .env O MAIS CEDO POSSÍVEL
dotenv.config(); 

const app = express();
const PORTA = process.env.PORT || 3001;

app.use(express.json());

// Rotas base
app.use('/filmes', rotaFilmes);
app.use('/series', rotaSeries);
app.use('/animes', rotaAnimes);
app.use('/assistente', rotaAssistente);

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
