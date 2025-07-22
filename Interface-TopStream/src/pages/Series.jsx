import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";


// Importe as funções de busca de séries
import { buscarTopSeries, buscarSeriesPorGenero } from "../services/serieService";

const Series = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />
            <main className="flex flex-col gap-8 pb-8 pt-26">
                <CardSection
                    nomeSecao="Top 10 Séries em Alta"
                    fetchFunction={buscarTopSeries}
                />
                <CardSection
                    nomeSecao="Séries de Crime e Suspense"
                    fetchFunction={buscarSeriesPorGenero}
                    fetchParams={[80]} // ID do gênero Crime
                />
                <CardSection
                    nomeSecao="Dramas para Maratonar"
                    fetchFunction={buscarSeriesPorGenero}
                    fetchParams={[18]} // ID do gênero Drama
                />
                <CardSection
                    nomeSecao="Séries de Comédia"
                    fetchFunction={buscarSeriesPorGenero}
                    fetchParams={[35]} // ID do gênero Comédia
                />
            </main>
        </div>
    );
};

export default Series;