import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";
import NavInferior from "../components/NavInferior";
import FiltroMobile from "../components/FiltroMobile";
import { buscarTopFilmes, buscarFilmesPorGenero } from "../services/filmeService";

// Página principal de Filmes
const Filmes = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />
            <FiltroMobile />

            <main className="flex flex-col pb-12 sm:pg-8 lg:pb-6 pt-0.5 sm:pt-22 lg:pt-26">
                {/* Seção de destaque */}
                <CardSection nomeSecao="Top 10 Filmes do Momento" fetchFunction={buscarTopFilmes} tipo="filme" />

                {/* Seções por gênero */}
                <CardSection nomeSecao="Filmes de Ação" fetchFunction={buscarFilmesPorGenero} fetchParams={[28]} tipo="filme" />
                <CardSection nomeSecao="Comédias de Sucesso" fetchFunction={buscarFilmesPorGenero} fetchParams={[35]} tipo="filme" />
                <CardSection nomeSecao="Ficção Científica e Fantasia" fetchFunction={buscarFilmesPorGenero} fetchParams={[878]} tipo="filme" />
                <CardSection nomeSecao="Filmes de Drama" fetchFunction={buscarFilmesPorGenero} fetchParams={[18]} tipo="filme" />
                <CardSection nomeSecao="Suspense e Mistério" fetchFunction={buscarFilmesPorGenero} fetchParams={[9648]} tipo="filme" />
                <CardSection nomeSecao="Filmes de Terror" fetchFunction={buscarFilmesPorGenero} fetchParams={[27]} tipo="filme" />
                <CardSection nomeSecao="Filmes de Romance" fetchFunction={buscarFilmesPorGenero} fetchParams={[10749]} tipo="filme" />
                <CardSection nomeSecao="Animações para Todos" fetchFunction={buscarFilmesPorGenero} fetchParams={[16]} tipo="filme" />
                <CardSection nomeSecao="Filmes de Guerra" fetchFunction={buscarFilmesPorGenero} fetchParams={[10752]} tipo="filme" />
                <CardSection nomeSecao="Aventuras Épicas" fetchFunction={buscarFilmesPorGenero} fetchParams={[12]} tipo="filme" />
                <CardSection nomeSecao="Documentários Impactantes" fetchFunction={buscarFilmesPorGenero} fetchParams={[99]} tipo="filme" />
                <CardSection nomeSecao="Filmes para a Família" fetchFunction={buscarFilmesPorGenero} fetchParams={[10751]} tipo="filme" />
                <CardSection nomeSecao="Histórias Baseadas em Fatos Reais" fetchFunction={buscarFilmesPorGenero} fetchParams={[36]} tipo="filme" />
            </main>

            <NavInferior />
        </div>
    );
};

export default Filmes;
