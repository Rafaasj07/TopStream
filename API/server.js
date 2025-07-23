// --- IMPORTAÇÕES DE MÓDULOS E ROTAS ---
import express from 'express'; // Framework para criação de servidor HTTP
import dotenv from 'dotenv'; // Carrega variáveis de ambiente do arquivo .env
import cors from 'cors'; // Habilita o compartilhamento de recursos entre origens (CORS)
import { clearAll } from './services/cacheService.js'; // Serviço para limpeza de cache

// Importações das rotas
import rotaFilmes from './routes/filmeRoutes.js';
import rotaSeries from './routes/serieRoutes.js';
import rotaAnimes from './routes/animeRoutes.js';
import rotaAssistente from './routes/assistenteRoutes.js';

dotenv.config(); // Carrega variáveis de ambiente

const app = express(); // Cria a aplicação Express
const PORTA = process.env.PORT || 3001; // Define a porta do servidor

// --- CONFIGURAÇÕES DE MIDDLEWARE ---
// Usa a URL do frontend a partir das variáveis de ambiente em produção,
// mas mantém localhost como fallback para desenvolvimento.
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json()); // Permite receber JSON no corpo das requisições

// --- DEFINIÇÃO DAS ROTAS DA API ---
app.use('/api/filmes', rotaFilmes);
app.use('/api/series', rotaSeries);
app.use('/api/animes', rotaAnimes);
app.use('/api/assistente', rotaAssistente);

// --- ROTINA DE ATUALIZAÇÃO AUTOMÁTICA DO CACHE ---
// A cada 1 hora, o cache é limpo para garantir que novos dados sejam buscados
const CACHE_REFRESH_INTERVAL = 3600000; // 1 hora em milissegundos
setInterval(async () => {
  console.log('Iniciando rotina de limpeza de cache...');
  await clearAll(); // Limpa todo o cache armazenado
}, CACHE_REFRESH_INTERVAL);

// --- INICIALIZAÇÃO DO SERVIDOR ---
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
