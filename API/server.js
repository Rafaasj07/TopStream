// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Importação das rotas
import rotaFilmes from './routes/filmeRoutes.js';
import rotaSeries from './routes/serieRoutes.js';
import rotaAnimes from './routes/animeRoutes.js';
import rotaAssistente from './routes/assistenteRoutes.js';

// Carrega as variáveis de ambiente do .env O MAIS CEDO POSSÍVEL
dotenv.config();

const app = express();
const PORTA = process.env.PORT || 3001;

// Habilita o CORS para permitir requisições do seu front-end
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Habilita o parser de JSON para o corpo das requisições POST/PUT
app.use(express.json());


// --- ROTAS DA APLICAÇÃO ---
// Adicionamos o prefixo /api para corresponder à configuração do front-end
app.use('/api/filmes', rotaFilmes);
app.use('/api/series', rotaSeries);
app.use('/api/animes', rotaAnimes);
app.use('/api/assistente', rotaAssistente);


// --- INICIALIZAÇÃO DO SERVIDOR ---
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});