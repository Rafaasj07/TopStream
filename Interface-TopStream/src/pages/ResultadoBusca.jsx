import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import NavPadrao from "../components/NavPadrao";
import CardSection from "../components/CardSection";

// Importa todas as funções de busca necessárias.
import { pesquisarFilmes, buscarFilmesPorGenero } from "../services/filmeService";
import { pesquisarSeries, buscarSeriesPorGenero } from "../services/serieService";
import { pesquisarAnimes, buscarAnimesPorGenero } from "../services/animeService";

// Página para exibir resultados de busca, que pode ser por termo ou gênero.
const ResultadoBusca = () => {
    // Pega o termo de busca e o filtro da URL.
    const { query } = useParams();
    const [searchParams] = useSearchParams();
    const filter = searchParams.get('filter');

    // Estados para armazenar os resultados e controlar o carregamento.
    const [filmes, setFilmes] = useState([]);
    const [series, setSeries] = useState([]);
    const [animes, setAnimes] = useState([]);
    const [carregando, setCarregando] = useState(true);

    // Remove acentos e converte para minúsculas para comparar com a lista de gêneros.
    const normalizarQuery = (texto) => {
        return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    // Efeito para buscar os resultados sempre que a query ou o filtro mudarem.
    useEffect(() => {
        const buscarResultados = async () => {
            if (!query) return;

            setCarregando(true);
            setFilmes([]);
            setSeries([]);
            setAnimes([]);

            try {
                const generos = new Set(['acao', 'drama', 'comedia', 'fantasia', 'ficcao cientifica', 'terror', 'romance', 'suspense', 'aventura', 'slice of life']);
                const queryNormalizada = normalizarQuery(query);

                let filmesResult = [], seriesResult = [], animesResult = [];

                // Verifica se a busca é por um gênero pré-definido.
                if (generos.has(queryNormalizada)) {
                    switch (queryNormalizada) {
                        case 'acao':
                            [filmesResult, seriesResult, animesResult] = await Promise.all([
                                buscarFilmesPorGenero(28),
                                buscarSeriesPorGenero(10759),
                                buscarAnimesPorGenero("Action")
                            ]);
                            break;
                        // ... outros casos de gênero ...
                        case 'drama':
                            [filmesResult, seriesResult] = await Promise.all([buscarFilmesPorGenero(18), buscarSeriesPorGenero(18)]);
                            break;
                        case 'comedia':
                            [filmesResult, seriesResult] = await Promise.all([buscarFilmesPorGenero(35), buscarSeriesPorGenero(35)]);
                            break;
                        case 'fantasia':
                            [filmesResult, animesResult] = await Promise.all([buscarFilmesPorGenero(14), buscarAnimesPorGenero("Fantasy")]);
                            break;
                        case 'ficcao cientifica':
                            [filmesResult, seriesResult, animesResult] = await Promise.all([buscarFilmesPorGenero(878), buscarSeriesPorGenero(10765), buscarAnimesPorGenero("Sci-Fi")]);
                            break;
                        case 'terror':
                            filmesResult = await buscarFilmesPorGenero(27);
                            break;
                        case 'romance':
                            [filmesResult, animesResult] = await Promise.all([buscarFilmesPorGenero(10749), buscarAnimesPorGenero("Romance")]);
                            break;
                        case 'suspense':
                            [filmesResult, seriesResult] = await Promise.all([buscarFilmesPorGenero(53), buscarSeriesPorGenero(9648)]);
                            break;
                        case 'aventura':
                            [filmesResult, seriesResult] = await Promise.all([buscarFilmesPorGenero(12), buscarSeriesPorGenero(10759)]);
                            break;
                        case 'slice of life':
                            animesResult = await buscarAnimesPorGenero("Slice of Life");
                            break;
                    }
                } else {
                    // Se não for um gênero, faz a busca por termo, respeitando o filtro.
                    const promises = [];
                    if (filter === 'filmes' || !filter || filter === 'todos') {
                        promises.push(pesquisarFilmes(query));
                    }
                    if (filter === 'series' || !filter || filter === 'todos') {
                        promises.push(pesquisarSeries(query));
                    }
                    if (filter === 'animes' || !filter || filter === 'todos') {
                        promises.push(pesquisarAnimes(query));
                    }
                    const [resFilmes, resSeries, resAnimes] = await Promise.all(promises);
                    
                    if (filter === 'filmes') filmesResult = resFilmes;
                    else if (filter === 'series') seriesResult = resFilmes;
                    else if (filter === 'animes') animesResult = resFilmes;
                    else {
                        filmesResult = resFilmes;
                        seriesResult = resSeries;
                        animesResult = resAnimes;
                    }
                }

                setFilmes(filmesResult || []);
                setSeries(seriesResult || []);
                setAnimes(animesResult || []);

            } catch (error) {
                console.error("Erro ao buscar resultados:", error);
            } finally {
                setCarregando(false);
            }
        };

        buscarResultados();
    }, [query, filter]);

    // Renderiza a página com os resultados encontrados.
    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />
            <main className="flex flex-col gap-8 pb-8 pt-28">
                <h1 className="text-white text-3xl font-bold px-3">Resultados para: <span className="text-indigo-400">{query}</span></h1>
                {carregando ? (
                    <p className="text-gray-400 text-lg px-4">Buscando...</p>
                ) : (
                    <>
                        {/* Renderiza uma seção para cada tipo de conteúdo que tiver resultados. */}
                        {filmes.length > 0 && <CardSection nomeSecao="Filmes Encontrados" dados={filmes} tipo="filme" />}
                        {series.length > 0 && <CardSection nomeSecao="Séries Encontradas" dados={series} tipo="serie" />}
                        {animes.length > 0 && <CardSection nomeSecao="Animes Encontrados" dados={animes} tipo="anime" />}
                        
                        {/* Mensagem exibida se nenhuma categoria tiver resultados. */}
                        {!carregando && !filmes.length && !series.length && !animes.length && (
                            <p className="text-gray-400 text-lg">Nenhum resultado encontrado para sua busca.</p>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default ResultadoBusca;