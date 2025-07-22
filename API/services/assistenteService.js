// services/assistenteService.js
import axios from 'axios';

// A chave da API é carregada das variáveis de ambiente para segurança.
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

/**
 * Analisa a descrição em linguagem natural de um usuário e a converte
 * em um objeto estruturado para busca em API.
 * @param {string} descricao - A descrição do que o usuário quer assistir.
 * @returns {Promise<{tipo: 'filme' | 'serie' | 'anime', termo_busca: string}>}
 */
export async function analisarDescricaoParaBusca(descricao) {
  // Monta a estrutura de mensagens para enviar à IA.
  const messages = [
    {
      // A mensagem "system" define o comportamento e as regras da IA.
      // É a instrução principal que guia a resposta.
      role: 'system',
      content: `
Você é um assistente especialista em interpretar pedidos de filmes, séries e animes. Sua única função é converter a frase de um usuário em um objeto JSON para uma busca de API.

O formato da resposta é CRÍTICO. A resposta DEVE ser um objeto JSON válido, sem nenhum texto ou formatação adicional.

O objeto JSON deve conter duas chaves:
1. "tipo": deve ser UMA das seguintes strings: "filme", "serie", ou "anime".
2. "termo_busca": deve ser o título específico ou os melhores termos de busca para encontrar o conteúdo descrito.

Exemplos:
- Usuário: "quero ver um anime de ação muito legal que passa em um mundo ninja"
- Sua Resposta: {"tipo": "anime", "termo_busca": "Naruto"}

- Usuário: "aquele filme com o cara que fala 'eu voltarei'"
- Sua Resposta: {"tipo": "filme", "termo_busca": "O Exterminador do Futuro"}

- Usuário: "uma série de comédia sobre um grupo de amigos em nova york"
- Sua Resposta: {"tipo": "serie", "termo_busca": "Friends"}

Regras:
- NÃO adicione explicações. Responda APENAS com o JSON.
- Se o tipo não for claro, escolha o mais provável.
- Se não conseguir extrair um termo de busca útil, retorne: {"tipo": null, "termo_busca": null}
      `.trim(),
    },
    {
      // A mensagem "user" contém a descrição real enviada pelo usuário.
      role: 'user',
      content: `Analise esta descrição: "${descricao}"`,
    },
  ];

  try {
    // Envia a requisição para a API do OpenRouter com as instruções e a descrição.
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-r1:free', // Modelo de IA a ser usado.
        messages,
        response_format: { type: 'json_object' }, // Força a resposta a ser um objeto JSON.
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:3000',
          'X-Title': process.env.APP_NAME || 'TopStream Finder',
        },
      }
    );

    // Extrai o conteúdo da resposta da IA, que é uma string no formato JSON.
    const respostaJsonString = response.data?.choices?.[0]?.message?.content;
    if (!respostaJsonString) {
      throw new Error("Resposta vazia da IA");
    }

    // Converte a string JSON recebida em um objeto JavaScript real.
    return JSON.parse(respostaJsonString);

  } catch (error) {
    console.error("Erro ao analisar descrição com OpenRouter:", error?.response?.data || error.message);
    throw new Error("Erro ao se comunicar com o assistente.");
  }
}