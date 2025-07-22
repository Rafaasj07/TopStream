import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";

// Importa as funções de busca de filmes.
import { buscarTopFilmes, buscarFilmesPorGenero } from "../services/filmeService";

// Componente que representa a página de Filmes.
const Filmes = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />

            {/* O conteúdo principal organiza as diferentes seções de filmes. */}
            <main className="flex flex-col gap-8 pb-8 pt-26">
                {/* Cada CardSection é um carrossel configurado para uma categoria de filme. */}
                <CardSection
                    nomeSecao="Top 10 Filmes do Momento"
                    fetchFunction={buscarTopFilmes}
                    tipo="filme"
                />
                <CardSection
                    nomeSecao="Filmes de Ação"
                    fetchFunction={buscarFilmesPorGenero}
                    fetchParams={[28]} // ID do gênero Ação
                    tipo="filme"
                />
                <CardSection
                    nomeSecao="Comédias de Sucesso"
                    fetchFunction={buscarFilmesPorGenero}
                    fetchParams={[35]} // ID do gênero Comédia
                    tipo="filme"
                />
                 <CardSection
                    nomeSecao="Ficção Científica e Fantasia"
                    fetchFunction={buscarFilmesPorGenero}
                    fetchParams={[878]} // ID do gênero Ficção Científica
                    tipo="filme"
                />
            </main>
        </div>
    );
};

export default Filmes;