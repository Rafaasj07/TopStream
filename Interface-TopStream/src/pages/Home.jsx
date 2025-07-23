// Importações dos componentes visuais da interface
import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";
import NavInferior from "../components/NavInferior";
import FiltroMobile from "../components/FiltroMobile";
import Footer from "../components/Footer";

// Importações das funções de busca de dados de filmes, séries e animes
import { buscarTopFilmes, buscarFilmesPorGenero } from "../services/filmeService";
import { buscarTopSeries, buscarSeriesPorGenero } from "../services/serieService";
import { buscarTopAnimes, buscarAnimesPorGenero } from "../services/animeService";


// Componente principal da página inicial
const Home = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            {/* Navegação superior padrão */}
            <NavPadrao />

            {/* Filtro de navegação horizontal visível apenas em dispositivos móveis */}
            <FiltroMobile />

            {/* Conteúdo principal da página */}
            <main className="flex flex-col pb-5 sm:pg-8 lg:pb-6 pt-0.5 sm:pt-22 lg:pt-26">

                {/* Grupo 1 – Mais populares */}
                <CardSection nomeSecao="Top 10 Filmes" fetchFunction={buscarTopFilmes} tipo="filme" />
                <CardSection nomeSecao="Top 10 Séries" fetchFunction={buscarTopSeries} tipo="serie" />
                <CardSection nomeSecao="Top 10 Animes" fetchFunction={buscarTopAnimes} tipo="anime" />

                {/* Grupo 2 – Ação e Aventura */}
                <CardSection nomeSecao="Filmes de Ação" fetchFunction={buscarFilmesPorGenero} fetchParams={[28]} tipo="filme" />
                <CardSection nomeSecao="Séries de Aventura" fetchFunction={buscarSeriesPorGenero} fetchParams={[10759]} tipo="serie" />
                <CardSection nomeSecao="Animes de Ação" fetchFunction={buscarAnimesPorGenero} fetchParams={["Action"]} tipo="anime" />

                {/* Grupo 3 – Comédia e Slice of Life */}
                <CardSection nomeSecao="Clássicos de TV" fetchFunction={buscarFilmesPorGenero} fetchParams={[10770]} tipo="filme" />
                <CardSection nomeSecao="Séries de Comédia" fetchFunction={buscarSeriesPorGenero} fetchParams={[35]} tipo="serie" />
                <CardSection nomeSecao="Animes Slice of Life" fetchFunction={buscarAnimesPorGenero} fetchParams={["Slice of Life"]} tipo="anime" />

                {/* Grupo 4 – Fantasia */}
                <CardSection nomeSecao="Filmes de Fantasia" fetchFunction={buscarFilmesPorGenero} fetchParams={[14]} tipo="filme" />
                <CardSection nomeSecao="Séries de Fantasia" fetchFunction={buscarSeriesPorGenero} fetchParams={[10765]} tipo="serie" />
                <CardSection nomeSecao="Animes de Fantasia" fetchFunction={buscarAnimesPorGenero} fetchParams={["Fantasy"]} tipo="anime" />

                {/* Grupo 5 – Mistério e Psicológico */}
                <CardSection nomeSecao="Filmes de Mistério" fetchFunction={buscarFilmesPorGenero} fetchParams={[9648]} tipo="filme" />
                <CardSection nomeSecao="Séries de Mistério" fetchFunction={buscarSeriesPorGenero} fetchParams={[9648]} tipo="serie" />
                <CardSection nomeSecao="Animes Psicológicos" fetchFunction={buscarAnimesPorGenero} fetchParams={["Psychological"]} tipo="anime" />

                {/* Grupo 6 – Ficção Científica e Mecha */}
                <CardSection nomeSecao="Filmes de Ficção Científica" fetchFunction={buscarFilmesPorGenero} fetchParams={[878]} tipo="filme" />
                <CardSection nomeSecao="Séries de Ficção Científica" fetchFunction={buscarSeriesPorGenero} fetchParams={[10765]} tipo="serie" />
                <CardSection nomeSecao="Animes Mecha" fetchFunction={buscarAnimesPorGenero} fetchParams={["Mecha"]} tipo="anime" />

                {/* Grupo 7 – Terror e Sobrenatural */}
                <CardSection nomeSecao="Filmes de Terror" fetchFunction={buscarFilmesPorGenero} fetchParams={[27]} tipo="filme" />
                <CardSection nomeSecao="Séries de Suspense" fetchFunction={buscarSeriesPorGenero} fetchParams={[53]} tipo="serie" />
                <CardSection nomeSecao="Animes Sobrenaturais" fetchFunction={buscarAnimesPorGenero} fetchParams={["Supernatural"]} tipo="anime" />

                {/* Grupo 8 – Animação e Esportes */}
                <CardSection nomeSecao="Filmes de Animação" fetchFunction={buscarFilmesPorGenero} fetchParams={[16]} tipo="filme" />
                <CardSection nomeSecao="Séries de Animação" fetchFunction={buscarSeriesPorGenero} fetchParams={[16]} tipo="serie" />
                <CardSection nomeSecao="Animes de Esporte" fetchFunction={buscarAnimesPorGenero} fetchParams={["Sports"]} tipo="anime" />

                {/* Grupo 9 – Música */}
                <CardSection nomeSecao="Filmes Musicais" fetchFunction={buscarFilmesPorGenero} fetchParams={[10402]} tipo="filme" />
                <CardSection nomeSecao="Séries Musicais" fetchFunction={buscarSeriesPorGenero} fetchParams={[10402]} tipo="serie" />
                <CardSection nomeSecao="Animes de Música" fetchFunction={buscarAnimesPorGenero} fetchParams={["Music"]} tipo="anime" />

                {/* Grupo 10 – Crime e Suspense */}
                <CardSection nomeSecao="Filmes de Crime" fetchFunction={buscarFilmesPorGenero} fetchParams={[80]} tipo="filme" />
                <CardSection nomeSecao="Séries de Crime" fetchFunction={buscarSeriesPorGenero} fetchParams={[80]} tipo="serie" />
                <CardSection nomeSecao="Animes de Suspense" fetchFunction={buscarAnimesPorGenero} fetchParams={["Thriller"]} tipo="anime" />

                {/* Grupo 11 – Família e Magia */}
                <CardSection nomeSecao="Filmes para a Família" fetchFunction={buscarFilmesPorGenero} fetchParams={[10751]} tipo="filme" />
                <CardSection nomeSecao="Séries para a Família" fetchFunction={buscarSeriesPorGenero} fetchParams={[10751]} tipo="serie" />
                <CardSection nomeSecao="Animes de Garotas Mágicas" fetchFunction={buscarAnimesPorGenero} fetchParams={["Mahou Shoujo"]} tipo="anime" />

                {/* Grupo 12 – Romance e Drama */}
                <CardSection nomeSecao="Filmes de Aventura" fetchFunction={buscarFilmesPorGenero} fetchParams={[12]} tipo="filme" />
                <CardSection nomeSecao="Séries de Drama" fetchFunction={buscarSeriesPorGenero} fetchParams={[18]} tipo="serie" />
                <CardSection nomeSecao="Animes de Romance" fetchFunction={buscarAnimesPorGenero} fetchParams={["Romance"]} tipo="anime" />

                {/* Grupo 13 – História, Guerra e Aventura */}
                <CardSection nomeSecao="Filmes de História" fetchFunction={buscarFilmesPorGenero} fetchParams={[36]} tipo="filme" />
                <CardSection nomeSecao="Séries de Guerra e Política" fetchFunction={buscarSeriesPorGenero} fetchParams={[10768]} tipo="serie" />
                <CardSection nomeSecao="Animes de Aventura" fetchFunction={buscarAnimesPorGenero} fetchParams={["Adventure"]} tipo="anime" />

            </main>

            {/* Navegação inferior fixa (visível apenas em mobile) */}
            <NavInferior />
            <Footer />
        </div>
    );
};

export default Home;