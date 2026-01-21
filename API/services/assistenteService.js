import axios from 'axios';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Analisa a descrição do usuário via IA e retorna um objeto com tipo e termo de busca
export async function analisarDescricaoParaBusca(descricao) {
  const messages = [
    {
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
      role: 'user',
      content: `Analise esta descrição: "${descricao}"`,
    },
  ];

  try {
    // Envia o prompt para a API do OpenRouter processar a intenção
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages,
        response_format: { type: 'json_object' },
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:3000',
          'X-Title': process.env.APP_NAME || 'TopStream',
        },
      }
    );

    const respostaJsonString = response.data?.choices?.[0]?.message?.content;
    if (!respostaJsonString) {
      throw new Error("Resposta vazia da IA");
    }

    // Converte a resposta da IA de string para objeto JSON
    return JSON.parse(respostaJsonString);

  } catch (error) {
    console.error("Erro ao analisar descrição com OpenRouter:", error?.response?.data || error.message);
    throw new Error("Erro ao se comunicar com o assistente.");
  }
}