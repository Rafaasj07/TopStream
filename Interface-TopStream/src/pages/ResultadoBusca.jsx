import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import NavPadrao from "../components/NavPadrao";
import CardSection from "../components/CardSection";
import NavInferior from "../components/NavInferior";

import { pesquisarFilmes, buscarFilmesPorGenero } from "../services/filmeService";
import { pesquisarSeries, buscarSeriesPorGenero } from "../services/serieService";
import { pesquisarAnimes, buscarAnimesPorGenero } from "../services/animeService";

// Exibe resultados de busca baseados em termo textual ou gênero pré-definido
const ResultadoBusca = () => {
    const { query } = useParams();
    const [searchParams] = useSearchParams();
    const filter = searchParams.get('filter');

    const [filmes, setFilmes] = useState([]);
    const [series, setSeries] = useState([]);
    const [animes, setAnimes] = useState([]);
    const [carregando, setCarregando] = useState(true);

    // Normaliza string para comparação (minúsculas e sem acentos)
    const normalizarQuery = (texto) => {
        return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

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

                // Verifica se o termo é um gênero e busca conteúdos correspondentes por categoria
                if (generos.has(queryNormalizada)) {
                    switch (queryNormalizada) {
                        case 'acao':
                            [filmesResult, seriesResult, animesResult] = await Promise.all([
                                buscarFilmesPorGenero(28),
                                buscarSeriesPorGenero(10759),
                                buscarAnimesPorGenero("Action")
                            ]);
                            break;
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
                    // Executa busca textual nos serviços habilitados pelo filtro
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

    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />
            <main className="flex flex-col gap-1 py-15 lg:pt-24 lg:pb-6">
                <h1 className="text-white text-3xl font-bold px-3 lg:pb-3">Resultados para: <span className="text-indigo-400">{query}</span></h1>
                {carregando ? (
                    <p className="text-gray-400 text-lg px-4">Buscando...</p>
                ) : (
                    <>
                        {/* Exibe seções apenas se houver resultados para a categoria */}
                        {filmes.length > 0 && <CardSection nomeSecao="Filmes Encontrados" dados={filmes} tipo="filme" />}
                        {series.length > 0 && <CardSection nomeSecao="Séries Encontradas" dados={series} tipo="serie" />}
                        {animes.length > 0 && <CardSection nomeSecao="Animes Encontrados" dados={animes} tipo="anime" />}

                        {!carregando && !filmes.length && !series.length && !animes.length && (
                            <p className="text-gray-400 text-lg pl-3">Nenhum resultado encontrado para sua busca.</p>
                        )}
                    </>
                )}
            </main>
            <NavInferior></NavInferior>
        </div>
    );
};

export default ResultadoBusca;