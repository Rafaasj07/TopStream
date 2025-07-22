import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";

// Importa as funções de busca de diferentes serviços.
import { buscarTopFilmes } from "../services/filmeService";
import { buscarTopSeries, buscarSeriesPorGenero } from "../services/serieService";
import { buscarTopAnimes } from "../services/animeService";

// Componente da página principal (Home) da aplicação.
const Home = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />

            {/* O conteúdo principal organiza as diferentes seções de conteúdo. */}
            <main className="flex flex-col gap-8 pb-8 pt-26">
                
                <CardSection
                    nomeSecao="Top 10 Filmes"
                    fetchFunction={buscarTopFilmes}
                    tipo="filme"
                />
                
                <CardSection
                    nomeSecao="Top 10 Séries"
                    fetchFunction={buscarTopSeries}
                    tipo="serie"
                />
                
                <CardSection
                    nomeSecao="Top 10 Animes"
                    fetchFunction={buscarTopAnimes}
                    tipo="anime"
                />
                
                <CardSection
                    nomeSecao="Séries de Ação e Aventura"
                    fetchFunction={buscarSeriesPorGenero}
                    fetchParams={[10759]} // Passa o ID do gênero como parâmetro.
                    tipo="serie"
                />
            </main>
        </div>
    );
};

export default Home;