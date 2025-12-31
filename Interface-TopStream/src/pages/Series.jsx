import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";
import NavInferior from "../components/NavInferior";
import FiltroMobile from "../components/FiltroMobile";
import { buscarTopSeries, buscarSeriesPorGenero } from "../services/serieService";
import Footer from "../components/Footer";

// Página principal que lista séries populares e categorias por gênero
const Series = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />
            <FiltroMobile />

            <main className="flex flex-col pb-5 sm:pg-8 lg:pb-6 pt-0.5 sm:pt-22 lg:pt-26">
                <CardSection nomeSecao="Top 10 Séries em Alta" fetchFunction={buscarTopSeries} tipo="serie" />

                <CardSection nomeSecao="Séries de Ação e Aventura" fetchFunction={buscarSeriesPorGenero} fetchParams={[10759]} tipo="serie" />
                <CardSection nomeSecao="Séries de Animação" fetchFunction={buscarSeriesPorGenero} fetchParams={[16]} tipo="serie" />
                <CardSection nomeSecao="Comédias para Rir Alto" fetchFunction={buscarSeriesPorGenero} fetchParams={[35]} tipo="serie" />
                <CardSection nomeSecao="Dramas para Maratonar" fetchFunction={buscarSeriesPorGenero} fetchParams={[18]} tipo="serie" />
                <CardSection nomeSecao="Séries de Crime" fetchFunction={buscarSeriesPorGenero} fetchParams={[80]} tipo="serie" />
                <CardSection nomeSecao="Documentários Reveladores" fetchFunction={buscarSeriesPorGenero} fetchParams={[99]} tipo="serie" />
                <CardSection nomeSecao="Séries de Mistério e Suspense" fetchFunction={buscarSeriesPorGenero} fetchParams={[9648]} tipo="serie" />
                <CardSection nomeSecao="Ficção Científica e Fantasia" fetchFunction={buscarSeriesPorGenero} fetchParams={[10765]} tipo="serie" />
                <CardSection nomeSecao="Séries de Família" fetchFunction={buscarSeriesPorGenero} fetchParams={[10751]} tipo="serie" />
                <CardSection nomeSecao="Séries Infantis" fetchFunction={buscarSeriesPorGenero} fetchParams={[10762]} tipo="serie" />
                <CardSection nomeSecao="Séries de Guerra e Política" fetchFunction={buscarSeriesPorGenero} fetchParams={[10768]} tipo="serie" />
                <CardSection nomeSecao="Reality Shows" fetchFunction={buscarSeriesPorGenero} fetchParams={[10764]} tipo="serie" />
                <CardSection nomeSecao="Novelas" fetchFunction={buscarSeriesPorGenero} fetchParams={[10766]} tipo="serie" />
                <CardSection nomeSecao="Talk Shows" fetchFunction={buscarSeriesPorGenero} fetchParams={[10767]} tipo="serie" />
            </main>

            <NavInferior />
            <Footer />
        </div>
    );
};

export default Series;