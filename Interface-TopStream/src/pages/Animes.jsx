import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";

// Importa as funções de busca de animes.
import { buscarTopAnimes, buscarAnimesPorGenero } from "../services/animeService";

// Componente que representa a página de Animes.
const Animes = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />
            
            {/* O conteúdo principal organiza as diferentes seções de animes. */}
            <main className="flex flex-col gap-8 pb-8 pt-26">
                
                {/* Cada CardSection é um carrossel configurado para uma categoria de anime. */}
                <CardSection
                    nomeSecao="Top 10 Animes Populares"
                    fetchFunction={buscarTopAnimes}
                    tipo="anime"
                />
                <CardSection
                    nomeSecao="Animes de Ação"
                    fetchFunction={buscarAnimesPorGenero}
                    fetchParams={["Action"]}
                    tipo="anime"
                />
                <CardSection
                    nomeSecao="Animes de Fantasia"
                    fetchFunction={buscarAnimesPorGenero}
                    fetchParams={["Fantasy"]}
                    tipo="anime"
                />
                 <CardSection
                    nomeSecao="Animes de Ficção Científica"
                    fetchFunction={buscarAnimesPorGenero}
                    fetchParams={["Sci-Fi"]}
                    tipo="anime"
                />
            </main>
        </div>
    );
};

export default Animes;