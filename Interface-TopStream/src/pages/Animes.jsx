import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";

// Importe as funções de busca de animes
import { buscarTopAnimes, buscarAnimesPorGenero } from "../services/animeService";

const Animes = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />
            <main className="flex flex-col gap-8 pb-8 pt-26">
                <CardSection
                    nomeSecao="Top 10 Animes Populares"
                    fetchFunction={buscarTopAnimes}
                />
                <CardSection
                    nomeSecao="Animes de Ação"
                    fetchFunction={buscarAnimesPorGenero}
                    fetchParams={["Action"]} // ID do gênero Ação & Aventura
                />
                <CardSection
                    nomeSecao="Animes de Fantasia"
                    fetchFunction={buscarAnimesPorGenero}
                    fetchParams={["Fantasy"]} // ID do gênero Fantasia
                />
                 <CardSection
                    nomeSecao="Animes de Ficção Científica"
                    fetchFunction={buscarAnimesPorGenero}
                    fetchParams={["Sci-Fi"]} // ID do gênero Sci-Fi & Fantasy
                />
            </main>
        </div>
    );
};

export default Animes;