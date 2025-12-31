import axios from 'axios';

const GOOGLE_TRANSLATE_URL = 'https://translate.googleapis.com/translate_a/single';

// Traduz um texto para português utilizando a API do Google Translate
export async function traduzirTexto(texto) {
  if (!texto || texto.trim() === '') {
    return texto;
  }

  try {
    const response = await axios.get(GOOGLE_TRANSLATE_URL, {
      params: {
        client: 'gtx',
        sl: 'auto',
        tl: 'pt',
        dt: 't',
        q: texto,
      },
    });

    if (response.data && response.data[0]) {
      const textoTraduzido = response.data[0].map(item => item[0]).join('');
      return textoTraduzido;
    } else {
      throw new Error('Formato de resposta inesperado da API de tradução.');
    }

  } catch (error) {
    console.error("Erro ao traduzir com a API do Google:", error.response?.data || error.message);
    return texto;
  }
}