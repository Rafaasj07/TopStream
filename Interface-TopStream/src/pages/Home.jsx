import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";
import NavInferior from "../components/NavInferior";
import FiltroMobile from "../components/FiltroMobile";

// Importações dos serviços
import { buscarTopFilmes, buscarFilmesPorGenero } from "../services/filmeService";
import { buscarTopSeries, buscarSeriesPorGenero } from "../services/serieService";
import { buscarTopAnimes, buscarAnimesPorGenero } from "../services/animeService";

const Home = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />
            <FiltroMobile />

            <main className="flex flex-col pb-12 sm:pg-8 lg:pb-6 pt-0.5 sm:pt-22 lg:pt-26">

                {/* Top Gerais */}
                <CardSection nomeSecao="Top 10 Filmes" fetchFunction={buscarTopFilmes} tipo="filme" />
                <CardSection nomeSecao="Top 10 Séries" fetchFunction={buscarTopSeries} tipo="serie" />
                <CardSection nomeSecao="Top 10 Animes" fetchFunction={buscarTopAnimes} tipo="anime" />

                <CardSection nomeSecao="Filmes de Ação" fetchFunction={buscarFilmesPorGenero} fetchParams={[28]} tipo="filme" />
                <CardSection nomeSecao="Filmes de Fantasia" fetchFunction={buscarFilmesPorGenero} fetchParams={[14]} tipo="filme" />
                <CardSection nomeSecao="Séries de Comédia" fetchFunction={buscarSeriesPorGenero} fetchParams={[35]} tipo="serie" />
                <CardSection nomeSecao="Séries de Mistério" fetchFunction={buscarSeriesPorGenero} fetchParams={[9648]} tipo="serie" />
                <CardSection nomeSecao="Animes de Ação" fetchFunction={buscarAnimesPorGenero} fetchParams={["Action"]} tipo="anime" />

                <CardSection nomeSecao="Filmes de Romance" fetchFunction={buscarFilmesPorGenero} fetchParams={[10749]} tipo="filme" />
                <CardSection nomeSecao="Filmes de Ficção Científica" fetchFunction={buscarFilmesPorGenero} fetchParams={[878]} tipo="filme" />
                <CardSection nomeSecao="Séries de Drama" fetchFunction={buscarSeriesPorGenero} fetchParams={[18]} tipo="serie" />
                <CardSection nomeSecao="Séries Familiares" fetchFunction={buscarSeriesPorGenero} fetchParams={[10751]} tipo="serie" />
                <CardSection nomeSecao="Animes Slice of Life" fetchFunction={buscarAnimesPorGenero} fetchParams={["Slice of Life"]} tipo="anime" />

                <CardSection nomeSecao="Filmes de Aventura" fetchFunction={buscarFilmesPorGenero} fetchParams={[12]} tipo="filme" />
                <CardSection nomeSecao="Filmes Musicais" fetchFunction={buscarFilmesPorGenero} fetchParams={[10402]} tipo="filme" />
                <CardSection nomeSecao="Séries de Ficção Científica" fetchFunction={buscarSeriesPorGenero} fetchParams={[10765]} tipo="serie" />
                <CardSection nomeSecao="Séries de Ação e Aventura" fetchFunction={buscarSeriesPorGenero} fetchParams={[10759]} tipo="serie" />
                <CardSection nomeSecao="Animes de Comédia" fetchFunction={buscarAnimesPorGenero} fetchParams={["Comedy"]} tipo="anime" />

                <CardSection nomeSecao="Filmes de História" fetchFunction={buscarFilmesPorGenero} fetchParams={[36]} tipo="filme" />
                <CardSection nomeSecao="Filmes Biográficos" fetchFunction={buscarFilmesPorGenero} fetchParams={[36]} tipo="filme" />
                <CardSection nomeSecao="Séries de Guerra e Política" fetchFunction={buscarSeriesPorGenero} fetchParams={[10768]} tipo="serie" />
                <CardSection nomeSecao="Séries de Fantasia" fetchFunction={buscarSeriesPorGenero} fetchParams={[10765]} tipo="serie" />
                <CardSection nomeSecao="Animes de Drama" fetchFunction={buscarAnimesPorGenero} fetchParams={["Drama"]} tipo="anime" />

                <CardSection nomeSecao="Filmes de Mistério" fetchFunction={buscarFilmesPorGenero} fetchParams={[9648]} tipo="filme" />
                <CardSection nomeSecao="Filmes de Guerra" fetchFunction={buscarFilmesPorGenero} fetchParams={[10752]} tipo="filme" />
                <CardSection nomeSecao="Séries de Documentário" fetchFunction={buscarSeriesPorGenero} fetchParams={[99]} tipo="serie" />
                <CardSection nomeSecao="Séries Históricas" fetchFunction={buscarSeriesPorGenero} fetchParams={[36]} tipo="serie" />
                <CardSection nomeSecao="Animes de Sci-Fi" fetchFunction={buscarAnimesPorGenero} fetchParams={["Sci-Fi"]} tipo="anime" />

                <CardSection nomeSecao="Filmes de Fantasia" fetchFunction={buscarFilmesPorGenero} fetchParams={[14]} tipo="filme" />
                <CardSection nomeSecao="Filmes de Ação e Comédia" fetchFunction={buscarFilmesPorGenero} fetchParams={[35]} tipo="filme" />
                <CardSection nomeSecao="Séries de Música" fetchFunction={buscarSeriesPorGenero} fetchParams={[10402]} tipo="serie" />
                <CardSection nomeSecao="Séries de Romance" fetchFunction={buscarSeriesPorGenero} fetchParams={[10749]} tipo="serie" />
                <CardSection nomeSecao="Animes de Esporte" fetchFunction={buscarAnimesPorGenero} fetchParams={["Sports"]} tipo="anime" />

                <CardSection nomeSecao="Filmes de Inspiração" fetchFunction={buscarFilmesPorGenero} fetchParams={[18]} tipo="filme" />
                <CardSection nomeSecao="Filmes Infantis" fetchFunction={buscarFilmesPorGenero} fetchParams={[10751]} tipo="filme" />
                <CardSection nomeSecao="Séries de Família" fetchFunction={buscarSeriesPorGenero} fetchParams={[10751]} tipo="serie" />
                <CardSection nomeSecao="Séries Juvenis" fetchFunction={buscarSeriesPorGenero} fetchParams={[10762]} tipo="serie" />
                <CardSection nomeSecao="Animes de Fantasia" fetchFunction={buscarAnimesPorGenero} fetchParams={["Fantasy"]} tipo="anime" />

                <CardSection nomeSecao="Filmes de Biografia" fetchFunction={buscarFilmesPorGenero} fetchParams={[36]} tipo="filme" />
                <CardSection nomeSecao="Filmes de Mistério" fetchFunction={buscarFilmesPorGenero} fetchParams={[9648]} tipo="filme" />
                <CardSection nomeSecao="Séries Educativas" fetchFunction={buscarSeriesPorGenero} fetchParams={[99]} tipo="serie" />
                <CardSection nomeSecao="Séries de Aventura" fetchFunction={buscarSeriesPorGenero} fetchParams={[10759]} tipo="serie" />
                <CardSection nomeSecao="Animes Isekai" fetchFunction={buscarAnimesPorGenero} fetchParams={["Isekai"]} tipo="anime" />

                <CardSection nomeSecao="Filmes Clássicos" fetchFunction={buscarFilmesPorGenero} fetchParams={[18]} tipo="filme" />
                <CardSection nomeSecao="Filmes de Família" fetchFunction={buscarFilmesPorGenero} fetchParams={[10751]} tipo="filme" />
                <CardSection nomeSecao="Séries Inspiradoras" fetchFunction={buscarSeriesPorGenero} fetchParams={[18]} tipo="serie" />
                <CardSection nomeSecao="Séries Criativas" fetchFunction={buscarSeriesPorGenero} fetchParams={[16]} tipo="serie" />
                <CardSection nomeSecao="Animes de Artes Marciais" fetchFunction={buscarAnimesPorGenero} fetchParams={["Martial Arts"]} tipo="anime" />
            </main>
            <NavInferior />
        </div>
    );
};

export default Home;
