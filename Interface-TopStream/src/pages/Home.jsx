import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";
import NavInferior from "../components/NavInferior";
import FiltroMobile from "../components/FiltroMobile";
import Footer from "../components/Footer";
import { buscarTopFilmes, buscarFilmesPorGenero } from "../services/filmeService";
import { buscarTopSeries, buscarSeriesPorGenero } from "../services/serieService";
import { buscarTopAnimes, buscarAnimesPorGenero } from "../services/animeService";

// Página inicial que agrega seções de filmes, séries e animes organizadas por categorias
const Home = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />
            <FiltroMobile />

            <main className="flex flex-col pb-5 sm:pg-8 lg:pb-6 pt-0.5 sm:pt-22 lg:pt-26">
                <CardSection nomeSecao="Top 10 Filmes" fetchFunction={buscarTopFilmes} tipo="filme" />
                <CardSection nomeSecao="Top 10 Séries" fetchFunction={buscarTopSeries} tipo="serie" />
                <CardSection nomeSecao="Top 10 Animes" fetchFunction={buscarTopAnimes} tipo="anime" />

                <CardSection nomeSecao="Filmes de Ação" fetchFunction={buscarFilmesPorGenero} fetchParams={[28]} tipo="filme" />
                <CardSection nomeSecao="Séries de Aventura" fetchFunction={buscarSeriesPorGenero} fetchParams={[10759]} tipo="serie" />
                <CardSection nomeSecao="Animes de Ação" fetchFunction={buscarAnimesPorGenero} fetchParams={["Action"]} tipo="anime" />

                <CardSection nomeSecao="Clássicos de TV" fetchFunction={buscarFilmesPorGenero} fetchParams={[10770]} tipo="filme" />
                <CardSection nomeSecao="Séries de Comédia" fetchFunction={buscarSeriesPorGenero} fetchParams={[35]} tipo="serie" />
                <CardSection nomeSecao="Animes Slice of Life" fetchFunction={buscarAnimesPorGenero} fetchParams={["Slice of Life"]} tipo="anime" />

                <CardSection nomeSecao="Filmes de Fantasia" fetchFunction={buscarFilmesPorGenero} fetchParams={[14]} tipo="filme" />
                <CardSection nomeSecao="Séries de Fantasia" fetchFunction={buscarSeriesPorGenero} fetchParams={[10765]} tipo="serie" />
                <CardSection nomeSecao="Animes de Fantasia" fetchFunction={buscarAnimesPorGenero} fetchParams={["Fantasy"]} tipo="anime" />

                <CardSection nomeSecao="Filmes de Mistério" fetchFunction={buscarFilmesPorGenero} fetchParams={[9648]} tipo="filme" />
                <CardSection nomeSecao="Séries de Mistério" fetchFunction={buscarSeriesPorGenero} fetchParams={[9648]} tipo="serie" />
                <CardSection nomeSecao="Animes Psicológicos" fetchFunction={buscarAnimesPorGenero} fetchParams={["Psychological"]} tipo="anime" />

                <CardSection nomeSecao="Filmes de Ficção Científica" fetchFunction={buscarFilmesPorGenero} fetchParams={[878]} tipo="filme" />
                <CardSection nomeSecao="Séries de Ficção Científica" fetchFunction={buscarSeriesPorGenero} fetchParams={[10765]} tipo="serie" />
                <CardSection nomeSecao="Animes Mecha" fetchFunction={buscarAnimesPorGenero} fetchParams={["Mecha"]} tipo="anime" />

                <CardSection nomeSecao="Filmes de Terror" fetchFunction={buscarFilmesPorGenero} fetchParams={[27]} tipo="filme" />
                <CardSection nomeSecao="Séries de Suspense" fetchFunction={buscarSeriesPorGenero} fetchParams={[53]} tipo="serie" />
                <CardSection nomeSecao="Animes Sobrenaturais" fetchFunction={buscarAnimesPorGenero} fetchParams={["Supernatural"]} tipo="anime" />

                <CardSection nomeSecao="Filmes de Animação" fetchFunction={buscarFilmesPorGenero} fetchParams={[16]} tipo="filme" />
                <CardSection nomeSecao="Séries de Animação" fetchFunction={buscarSeriesPorGenero} fetchParams={[16]} tipo="serie" />
                <CardSection nomeSecao="Animes de Esporte" fetchFunction={buscarAnimesPorGenero} fetchParams={["Sports"]} tipo="anime" />

                <CardSection nomeSecao="Filmes Musicais" fetchFunction={buscarFilmesPorGenero} fetchParams={[10402]} tipo="filme" />
                <CardSection nomeSecao="Séries Musicais" fetchFunction={buscarSeriesPorGenero} fetchParams={[10402]} tipo="serie" />
                <CardSection nomeSecao="Animes de Música" fetchFunction={buscarAnimesPorGenero} fetchParams={["Music"]} tipo="anime" />

                <CardSection nomeSecao="Filmes de Crime" fetchFunction={buscarFilmesPorGenero} fetchParams={[80]} tipo="filme" />
                <CardSection nomeSecao="Séries de Crime" fetchFunction={buscarSeriesPorGenero} fetchParams={[80]} tipo="serie" />
                <CardSection nomeSecao="Animes de Suspense" fetchFunction={buscarAnimesPorGenero} fetchParams={["Thriller"]} tipo="anime" />

                <CardSection nomeSecao="Filmes para a Família" fetchFunction={buscarFilmesPorGenero} fetchParams={[10751]} tipo="filme" />
                <CardSection nomeSecao="Séries para a Família" fetchFunction={buscarSeriesPorGenero} fetchParams={[10751]} tipo="serie" />
                <CardSection nomeSecao="Animes de Garotas Mágicas" fetchFunction={buscarAnimesPorGenero} fetchParams={["Mahou Shoujo"]} tipo="anime" />

                <CardSection nomeSecao="Filmes de Aventura" fetchFunction={buscarFilmesPorGenero} fetchParams={[12]} tipo="filme" />
                <CardSection nomeSecao="Séries de Drama" fetchFunction={buscarSeriesPorGenero} fetchParams={[18]} tipo="serie" />
                <CardSection nomeSecao="Animes de Romance" fetchFunction={buscarAnimesPorGenero} fetchParams={["Romance"]} tipo="anime" />

                <CardSection nomeSecao="Filmes de História" fetchFunction={buscarFilmesPorGenero} fetchParams={[36]} tipo="filme" />
                <CardSection nomeSecao="Séries de Guerra e Política" fetchFunction={buscarSeriesPorGenero} fetchParams={[10768]} tipo="serie" />
                <CardSection nomeSecao="Animes de Aventura" fetchFunction={buscarAnimesPorGenero} fetchParams={["Adventure"]} tipo="anime" />
            </main>

            <NavInferior />
            <Footer />
        </div>
    );
};

export default Home;