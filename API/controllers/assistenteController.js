// controllers/assistenteController.js
import * as assistenteService from '../services/assistenteService.js';
import * as tmdbService from '../services/tmdbService.js';
import * as anilistService from '../services/anilistService.js';

export async function obterSugestaoUnica(req, res) {
  // Pega a descrição do corpo da requisição POST
  const { descricao } = req.body;

  if (!descricao) {
    return res.status(400).json({ erro: 'A descrição é obrigatória.' });
  }

  try {
    // 1. Pede para a IA analisar a descrição e retornar o tipo e o termo de busca
    const analise = await assistenteService.analisarDescricaoParaBusca(descricao);

    const { tipo, termo_busca } = analise;

    if (!tipo || !termo_busca) {
      return res.status(404).json({ mensagem: 'Não foi possível encontrar uma sugestão para essa descrição.' });
    }

    let resultados = [];

    // 2. Com base no tipo, chama o serviço de busca apropriado
    switch (tipo) {
      case 'filme':
        resultados = await tmdbService.buscarFilmesPorTitulo(termo_busca);
        break;
      case 'serie':
        resultados = await tmdbService.buscarSeriesPorTitulo(termo_busca);
        break;
      case 'anime':
        // Agora usando o anilistService
        resultados = await anilistService.buscarAnimesPorTitulo(termo_busca);
        break;
      default:
        return res.status(400).json({ erro: 'Tipo de conteúdo inválido retornado pela IA.' });
    }

    // 3. Pega o primeiro resultado (o mais relevante) e o retorna
    const sugestaoPrincipal = resultados[0];

    if (!sugestaoPrincipal) {
        return res.status(404).json({ mensagem: `Nenhum resultado encontrado para "${termo_busca}".` });
    }

    res.json(sugestaoPrincipal);

  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}