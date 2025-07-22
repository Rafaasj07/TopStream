// Interface-TopStream/src/services/assistenteService.js
import api from './api';

/**
 * Envia uma descrição para o assistente da API e recebe uma sugestão.
 * Corresponde à rota: POST /assistente/sugestao
 * @param {string} descricao - A descrição do usuário.
 */
export const obterSugestao = async (descricao) => {
  try {
    // Faz uma requisição POST, enviando a descrição no corpo (body)
    const response = await api.post('/assistente/sugestao', { descricao });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar sugestão do assistente:", error);
    throw error;
  }
};