import api from './api';

// Envia a descrição do usuário para a API e retorna uma sugestão de conteúdo
export const obterSugestao = async (descricao) => {
  try {
    // Realiza a requisição POST com a descrição no corpo
    const response = await api.post('/assistente/sugestao', { descricao });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar sugestão do assistente:", error);
    throw error;
  }
};