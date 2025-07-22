import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";

// Importe as funções de busca de filmes
import { buscarTopFilmes, buscarFilmesPorGenero } from "../services/filmeService";

const Filmes = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />

            <main className="flex flex-col gap-8 pb-8 pt-26">
                <CardSection
                    nomeSecao="Top 10 Filmes do Momento"
                    fetchFunction={buscarTopFilmes}
                />
                <CardSection
                    nomeSecao="Filmes de Ação"
                    fetchFunction={buscarFilmesPorGenero}
                    fetchParams={[28]} // ID do gênero Ação
                />
                <CardSection
                    nomeSecao="Comédias de Sucesso"
                    fetchFunction={buscarFilmesPorGenero}
                    fetchParams={[35]} // ID do gênero Comédia
                />
                 <CardSection
                    nomeSecao="Ficção Científica e Fantasia"
                    fetchFunction={buscarFilmesPorGenero}
                    fetchParams={[878]} // ID do gênero Ficção Científica
                />
            </main>
        </div>
    );
};

export default Filmes;