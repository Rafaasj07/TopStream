// services/cacheService.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Configuração do Cache em Arquivo ---

// Constrói o caminho para o arquivo de cache de forma segura
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cachePath = path.join(__dirname, '..', 'cache.json'); // Salvará o cache na raiz da pasta /API

// Define o tempo de vida (TTL) do cache em milissegundos. 1 hora = 3600000 ms.
const TTL = 3600000; 

let cache = new Map();

/**
 * Carrega o cache do arquivo JSON para a memória.
 * É chamado na inicialização do módulo.
 */
function loadCacheFromFile() {
    try {
        if (fs.existsSync(cachePath)) {
            const data = fs.readFileSync(cachePath, 'utf-8');
            const parsedData = JSON.parse(data);
            // Reconstrói o Map a partir do objeto JSON
            cache = new Map(Object.entries(parsedData));
            console.log("Cache carregado do arquivo com sucesso.");
        }
    } catch (error) {
        console.error("Erro ao carregar o cache do arquivo:", error);
        // Se houver erro, começa com um cache vazio
        cache = new Map();
    }
}

/**
 * Salva o estado atual do cache em memória no arquivo JSON.
 * Esta função agora é assíncrona para não bloquear a execução.
 */
async function saveCacheToFile() {
    try {
        const data = JSON.stringify(Object.fromEntries(cache));
        await fs.promises.writeFile(cachePath, data, 'utf-8');
    } catch (error) {
        console.error("Erro ao salvar o cache no arquivo:", error);
    }
}

// Carrega o cache do arquivo assim que o serviço é iniciado.
loadCacheFromFile();

// --- Funções do Serviço de Cache ---

/**
 * Busca um valor no cache. Verifica a validade (TTL) antes de retornar.
 * @param {string} key - A chave para buscar no cache.
 * @returns {any | undefined} O valor em cache ou undefined se não for encontrado ou tiver expirado.
 */
function get(key) {
    if (!cache.has(key)) {
        return undefined;
    }

    const item = cache.get(key);
    // Checa se o item no cache expirou
    const isExpired = (Date.now() - item.timestamp) > TTL;

    if (isExpired) {
        // Se expirou, deleta do cache e do arquivo
        cache.delete(key);
        saveCacheToFile(); // Atualiza o arquivo sem o item expirado
        return undefined;
    }

    return item.value;
}

/**
 * Adiciona ou atualiza um valor no cache e salva no arquivo.
 * @param {string} key - A chave para salvar o valor.
 * @param {any} value - O valor a ser armazenado.
 */
async function set(key, value) {
    const item = {
        value,
        timestamp: Date.now(), // Adiciona o timestamp para controle de expiração
    };
    cache.set(key, item);
    // Salva o cache atualizado no arquivo
    await saveCacheToFile();
}

/**
 * Limpa todo o cache da memória e do arquivo.
 */
async function clearAll() {
    cache.clear();
    await saveCacheToFile();
    console.log('Cache de animes limpo (memória e arquivo).');
}

// Exporta as funções para serem usadas em outros módulos.
export { get, set, clearAll };