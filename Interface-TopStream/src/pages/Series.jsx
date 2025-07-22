import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";

// Importa as funções de busca de séries.
import { buscarTopSeries, buscarSeriesPorGenero } from "../services/serieService";

// Componente que representa a página de Séries.
const Series = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />
            {/* O conteúdo principal organiza as diferentes seções de séries. */}
            <main className="flex flex-col gap-8 pb-8 pt-26">
                {/* Cada CardSection é um carrossel configurado para buscar uma categoria. */}
                <CardSection
                    nomeSecao="Top 10 Séries em Alta"
                    fetchFunction={buscarTopSeries}
                    tipo="serie"
                />
                <CardSection
                    nomeSecao="Séries de Crime e Suspense"
                    fetchFunction={buscarSeriesPorGenero}
                    fetchParams={[80]} // ID do gênero Crime
                    tipo="serie"
                />
                <CardSection
                    nomeSecao="Dramas para Maratonar"
                    fetchFunction={buscarSeriesPorGenero}
                    fetchParams={[18]} // ID do gênero Drama
                    tipo="serie"
                />
                <CardSection
                    nomeSecao="Séries de Comédia"
                    fetchFunction={buscarSeriesPorGenero}
                    fetchParams={[35]} // ID do gênero Comédia
                    tipo="serie"
                />
            </main>
        </div>
    );
};

export default Series;