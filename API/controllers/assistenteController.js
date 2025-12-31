import * as assistenteService from '../services/assistenteService.js';
import * as tmdbService from '../services/tmdbService.js';
import * as anilistService from '../services/anilistService.js';

// Processa a descrição de texto via IA e retorna uma sugestão de mídia correspondente
export async function obterSugestaoUnica(req, res) {
  const { descricao } = req.body;

  if (!descricao) {
    return res.status(400).json({ erro: 'A descrição é obrigatória.' });
  }

  try {
    // Analisa a descrição para extrair o tipo de mídia e o termo de busca
    const analise = await assistenteService.analisarDescricaoParaBusca(descricao);

    const { tipo, termo_busca } = analise;

    if (!tipo || !termo_busca) {
      return res.status(404).json({ mensagem: 'Não foi possível encontrar uma sugestão para essa descrição.' });
    }

    let resultados = [];

    // Executa a busca no serviço específico (TMDB ou AniList) baseado no tipo identificado
    switch (tipo) {
      case 'filme':
        resultados = await tmdbService.buscarFilmesPorTitulo(termo_busca);
        break;
      case 'serie':
        resultados = await tmdbService.buscarSeriesPorTitulo(termo_busca);
        break;
      case 'anime':
        resultados = await anilistService.buscarAnimesPorTitulo(termo_busca);
        break;
      default:
        return res.status(400).json({ erro: 'Tipo de conteúdo inválido retornado pela IA.' });
    }

    // Seleciona o primeiro resultado como o mais relevante
    const sugestaoPrincipal = resultados[0];

    if (!sugestaoPrincipal) {
        return res.status(404).json({ mensagem: `Nenhum resultado encontrado para "${termo_busca}".` });
    }

    res.json(sugestaoPrincipal);

  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}