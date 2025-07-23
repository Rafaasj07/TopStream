// Importa os componentes e funções necessárias
import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";
import NavInferior from "../components/NavInferior";
import FiltroMobile from "../components/FiltroMobile";
import { buscarTopAnimes, buscarAnimesPorGenero } from "../services/animeService";
import Footer from "../components/Footer";

// Página principal de Animes
const Animes = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            {/* Navegação superior */}
            <NavPadrao />

            {/* Filtro de categorias (somente mobile) */}
            <FiltroMobile />

            {/* Conteúdo principal da página */}
            <main className="flex flex-col pb-5 sm:pg-8 lg:pb-6 pt-0.5 sm:pt-22 lg:pt-26">
                {/* Seção de destaque com os 10 animes mais populares */}
                <CardSection nomeSecao="Top 10 Animes Populares" fetchFunction={buscarTopAnimes} tipo="anime" />
                {/* Seções com gêneros*/}
                <CardSection nomeSecao="Animes de Ação" fetchFunction={buscarAnimesPorGenero} fetchParams={["Action"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Aventura" fetchFunction={buscarAnimesPorGenero} fetchParams={["Adventure"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Comédia" fetchFunction={buscarAnimesPorGenero} fetchParams={["Comedy"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Drama" fetchFunction={buscarAnimesPorGenero} fetchParams={["Drama"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Fantasia" fetchFunction={buscarAnimesPorGenero} fetchParams={["Fantasy"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Terror" fetchFunction={buscarAnimesPorGenero} fetchParams={["Horror"]} tipo="anime" />
                <CardSection nomeSecao="Animes Mecha" fetchFunction={buscarAnimesPorGenero} fetchParams={["Mecha"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Música" fetchFunction={buscarAnimesPorGenero} fetchParams={["Music"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Mistério" fetchFunction={buscarAnimesPorGenero} fetchParams={["Mystery"]} tipo="anime" />
                <CardSection nomeSecao="Animes Psicológicos" fetchFunction={buscarAnimesPorGenero} fetchParams={["Psychological"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Romance" fetchFunction={buscarAnimesPorGenero} fetchParams={["Romance"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Ficção Científica" fetchFunction={buscarAnimesPorGenero} fetchParams={["Sci-Fi"]} tipo="anime" />
                <CardSection nomeSecao="Slice of Life" fetchFunction={buscarAnimesPorGenero} fetchParams={["Slice of Life"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Esporte" fetchFunction={buscarAnimesPorGenero} fetchParams={["Sports"]} tipo="anime" />
                <CardSection nomeSecao="Animes Sobrenaturais" fetchFunction={buscarAnimesPorGenero} fetchParams={["Supernatural"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Suspense" fetchFunction={buscarAnimesPorGenero} fetchParams={["Thriller"]} tipo="anime" />
            </main>

            {/* Navegação inferior (mobile) */}
            <NavInferior />
            <Footer />
        </div>
    );
};

export default Animes;