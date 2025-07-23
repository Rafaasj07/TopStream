import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";
import NavInferior from "../components/NavInferior";
import FiltroMobile from "../components/FiltroMobile";
import { buscarTopSeries, buscarSeriesPorGenero } from "../services/serieService";

// Página principal de Séries
const Series = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />
            <FiltroMobile />

            <main className="flex flex-col pb-12 sm:pg-8 lg:pb-6 pt-0.5 sm:pt-22 lg:pt-26">
                {/* Seção de destaque */}
                <CardSection nomeSecao="Top 10 Séries em Alta" fetchFunction={buscarTopSeries} tipo="serie" />

                {/* Seções por gênero */}
                <CardSection nomeSecao="Séries de Crime e Suspense" fetchFunction={buscarSeriesPorGenero} fetchParams={[80]} tipo="serie" />
                <CardSection nomeSecao="Dramas para Maratonar" fetchFunction={buscarSeriesPorGenero} fetchParams={[18]} tipo="serie" />
                <CardSection nomeSecao="Séries de Comédia" fetchFunction={buscarSeriesPorGenero} fetchParams={[35]} tipo="serie" />
                <CardSection nomeSecao="Séries de Ficção Científica" fetchFunction={buscarSeriesPorGenero} fetchParams={[10765]} tipo="serie" />
                <CardSection nomeSecao="Séries de Mistério" fetchFunction={buscarSeriesPorGenero} fetchParams={[9648]} tipo="serie" />
                <CardSection nomeSecao="Séries Históricas" fetchFunction={buscarSeriesPorGenero} fetchParams={[36]} tipo="serie" />
                <CardSection nomeSecao="Séries de Aventura" fetchFunction={buscarSeriesPorGenero} fetchParams={[10759]} tipo="serie" />
                <CardSection nomeSecao="Séries de Fantasia" fetchFunction={buscarSeriesPorGenero} fetchParams={[10765]} tipo="serie" />
                <CardSection nomeSecao="Séries de Família" fetchFunction={buscarSeriesPorGenero} fetchParams={[10751]} tipo="serie" />
                <CardSection nomeSecao="Séries Documentais" fetchFunction={buscarSeriesPorGenero} fetchParams={[99]} tipo="serie" />
                <CardSection nomeSecao="Séries de Romance" fetchFunction={buscarSeriesPorGenero} fetchParams={[10749]} tipo="serie" />
                <CardSection nomeSecao="Séries Juvenis" fetchFunction={buscarSeriesPorGenero} fetchParams={[10762]} tipo="serie" />
                <CardSection nomeSecao="Séries Inspiradoras" fetchFunction={buscarSeriesPorGenero} fetchParams={[18]} tipo="serie" />
            </main>

            <NavInferior />
        </div>
    );
};

export default Series;
