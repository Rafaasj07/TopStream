// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Importação dos arquivos de rota para cada seção da API.
import rotaFilmes from './routes/filmeRoutes.js';
import rotaSeries from './routes/serieRoutes.js';
import rotaAnimes from './routes/animeRoutes.js';
import rotaAssistente from './routes/assistenteRoutes.js';

// Carrega as variáveis de ambiente do arquivo .env para o `process.env`.
// É importante que isso seja feito no início do arquivo.
dotenv.config();

// Cria a instância principal do aplicativo Express.
const app = express();
// Define a porta do servidor, usando a variável de ambiente ou 3001 como padrão.
const PORTA = process.env.PORT || 3001;

// Habilita o CORS (Cross-Origin Resource Sharing) para permitir que o front-end
// (rodando em localhost:5173) faça requisições para este servidor.
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Adiciona o middleware que interpreta o corpo das requisições com formato JSON.
// Essencial para rotas POST e PUT que enviam dados.
app.use(express.json());


// --- ROTAS DA APLICAÇÃO ---
// Registra os roteadores, associando cada um a um prefixo de URL.
// Todas as rotas de filmes começarão com /api/filmes, e assim por diante.
app.use('/api/filmes', rotaFilmes);
app.use('/api/series', rotaSeries);
app.use('/api/animes', rotaAnimes);
app.use('/api/assistente', rotaAssistente);


// --- INICIALIZAÇÃO DO SERVIDOR ---
// Inicia o servidor para que ele comece a "ouvir" requisições na porta definida.
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});