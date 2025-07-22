// Em uma página como `pages/Home.jsx`

import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";

// Importe TODAS as funções de busca que você vai precisar
import { buscarTopFilmes } from "../services/filmeService";
import { buscarTopSeries, buscarSeriesPorGenero } from "../services/serieService";
import { buscarTopAnimes } from "../services/animeService";

const Home = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />

            <main className="flex flex-col gap-8 pb-8 pt-26">
                {/* Exemplo 1: Top 10 Filmes */}
                <CardSection
                    nomeSecao="Top 10 Filmes"
                    fetchFunction={buscarTopFilmes}
                />

                {/* Exemplo 2: Top 10 Séries */}
                <CardSection
                    nomeSecao="Top 10 Séries"
                    fetchFunction={buscarTopSeries}
                />
                
                {/* Exemplo 3: Top 10 Animes */}
                <CardSection
                    nomeSecao="Top 10 Animes"
                    fetchFunction={buscarTopAnimes}
                />
                
                {/* Exemplo 4: Séries de Ação (ID do gênero: 10759) */}
                <CardSection
                    nomeSecao="Séries de Ação e Aventura"
                    fetchFunction={buscarSeriesPorGenero}
                    fetchParams={[10759]} // Passa o ID do gênero como parâmetro
                />

                 {/* Exemplo 5: Filmes de Comédia (ID do gênero: 35)
                 // Supondo que você crie a função buscarFilmesPorGenero no seu filmeService.js
                 <CardSection
                    nomeSecao="Filmes de Comédia"
                    fetchFunction={buscarFilmesPorGenero}
                    fetchParams={[35]} 
                /> */}
            </main>
        </div>
    );
};

export default Home;