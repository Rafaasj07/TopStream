import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cachePath = path.join(__dirname, '..', 'cache.json');

const TTL = 3600000;

let cache = new Map();

// Carrega dados do arquivo JSON para a memória ao iniciar
function loadCacheFromFile() {
  try {
    if (fs.existsSync(cachePath)) {
      // Lê o arquivo e reconstrói o Map de cache
      const data = fs.readFileSync(cachePath, 'utf-8');
      const parsedData = JSON.parse(data);
      cache = new Map(Object.entries(parsedData));
      console.log("Cache carregado do arquivo com sucesso.");
    }
  } catch (error) {
    console.error("Erro ao carregar o cache do arquivo:", error);
    cache = new Map();
  }
}

// Persiste o estado atual do cache no arquivo JSON
async function saveCacheToFile() {
  try {
    const data = JSON.stringify(Object.fromEntries(cache));
    await fs.promises.writeFile(cachePath, data, 'utf-8');
  } catch (error) {
    console.error("Erro ao salvar o cache no arquivo:", error);
  }
}

loadCacheFromFile();

// Recupera um valor se existir e não estiver expirado
function get(key) {
  if (!cache.has(key)) {
    return undefined;
  }

  const item = cache.get(key);
  // Verifica se o tempo de vida do item expirou
  const isExpired = (Date.now() - item.timestamp) > TTL;

  if (isExpired) {
    cache.delete(key);
    saveCacheToFile();
    return undefined;
  }

  return item.value;
}

// Armazena valor com timestamp e atualiza o arquivo
async function set(key, value) {
  const item = {
    value,
    timestamp: Date.now(),
  };
  cache.set(key, item);
  await saveCacheToFile();
}

// Limpa todo o cache da memória e do arquivo
async function clearAll() {
  cache.clear();
  await saveCacheToFile();
  console.log('Cache de animes limpo (memória e arquivo).');
}

export { get, set, clearAll };