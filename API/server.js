// server.js
import express from 'express';
import dotenv from 'dotenv';
import rotaFilmes from './routes/filmeRoutes.js';
import rotaSeries from './routes/serieRoutes.js';

// Carrega as variáveis de ambiente do .env O MAIS CEDO POSSÍVEL
dotenv.config(); 

const app = express();
const PORTA = process.env.PORT || 3001;

app.use(express.json());

// Rotas base
app.use('/filmes', rotaFilmes);
app.use('/series', rotaSeries);

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
