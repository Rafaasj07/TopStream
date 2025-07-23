import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";
import NavInferior from "../components/NavInferior";
import FiltroMobile from "../components/FiltroMobile";
import { buscarTopAnimes, buscarAnimesPorGenero } from "../services/animeService";

// Página principal de Animes
const Animes = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />
            <FiltroMobile />

            <main className="flex flex-col pb-12 sm:pg-8 lg:pb-6 pt-0.5 sm:pt-22 lg:pt-26">
                {/* Seção de destaque */}
                <CardSection nomeSecao="Top 10 Animes Populares" fetchFunction={buscarTopAnimes} tipo="anime" />

                {/* Seções por gênero */}
                <CardSection nomeSecao="Animes de Ação" fetchFunction={buscarAnimesPorGenero} fetchParams={["Action"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Fantasia" fetchFunction={buscarAnimesPorGenero} fetchParams={["Fantasy"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Ficção Científica" fetchFunction={buscarAnimesPorGenero} fetchParams={["Sci-Fi"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Comédia" fetchFunction={buscarAnimesPorGenero} fetchParams={["Comedy"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Drama" fetchFunction={buscarAnimesPorGenero} fetchParams={["Drama"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Terror e Mistério" fetchFunction={buscarAnimesPorGenero} fetchParams={["Horror", "Mystery"]} tipo="anime" />
                <CardSection nomeSecao="Slice of Life" fetchFunction={buscarAnimesPorGenero} fetchParams={["Slice of Life"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Romance" fetchFunction={buscarAnimesPorGenero} fetchParams={["Romance"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Esporte" fetchFunction={buscarAnimesPorGenero} fetchParams={["Sports"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Aventura" fetchFunction={buscarAnimesPorGenero} fetchParams={["Adventure"]} tipo="anime" />
                <CardSection nomeSecao="Animes Históricos" fetchFunction={buscarAnimesPorGenero} fetchParams={["Historical"]} tipo="anime" />
                <CardSection nomeSecao="Animes de Super Poderes" fetchFunction={buscarAnimesPorGenero} fetchParams={["Super Power"]} tipo="anime" />
            </main>

            <NavInferior />
        </div>
    );
};

export default Animes;
