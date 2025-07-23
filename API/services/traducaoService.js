// services/traducaoService.js
import axios from 'axios';

// URL para o endpoint não oficial do Google Translate, que é mais estável.
const GOOGLE_TRANSLATE_URL = 'https://translate.googleapis.com/translate_a/single';

/**
 * Traduz um texto para português usando um endpoint do Google Translate.
 * @param {string} texto - O texto original a ser traduzido.
 * @returns {Promise<string>} O texto traduzido.
 */
export async function traduzirTexto(texto) {
  // Se o texto for nulo ou vazio, retorna-o sem fazer a chamada à API.
  if (!texto || texto.trim() === '') {
    return texto;
  }

  try {
    // A chamada é feita via GET, com os parâmetros na URL.
    const response = await axios.get(GOOGLE_TRANSLATE_URL, {
      params: {
        client: 'gtx',       // Identificador do cliente.
        sl: 'auto',          // 'sl' (source language) = 'auto' para detectar o idioma de origem.
        tl: 'pt',            // 'tl' (target language) = 'pt' para português.
        dt: 't',             // 'dt' (data type) = 't' para receber a tradução do texto.
        q: texto,            // 'q' (query) = o texto a ser traduzido.
      },
    });

    // A resposta da API é um array aninhado. O texto traduzido está no primeiro elemento.
    if (response.data && response.data[0]) {
      // Concatenamos as partes traduzidas, pois a API pode dividir o texto em sentenças.
      const textoTraduzido = response.data[0].map(item => item[0]).join('');
      return textoTraduzido;
    } else {
      // Lança um erro se a resposta não vier no formato esperado.
      throw new Error('Formato de resposta inesperado da API de tradução.');
    }

  } catch (error) {
    console.error("Erro ao traduzir com a API do Google:", error.response?.data || error.message);
    // Em caso de qualquer falha, retorna o texto original para não quebrar a aplicação.
    return texto;
  }
}