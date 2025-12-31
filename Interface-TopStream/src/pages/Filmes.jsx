import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";
import NavInferior from "../components/NavInferior";
import FiltroMobile from "../components/FiltroMobile";
import Footer from "../components/Footer";
import { buscarTopFilmes, buscarFilmesPorGenero } from "../services/filmeService";

// Página principal que lista filmes populares e categorias por gênero
const Filmes = () => {
    return (
        <div className="bg-gray-950 min-h-screen">
            <NavPadrao />
            <FiltroMobile />

            <main className="flex flex-col pb-5 sm:pg-8 lg:pb-6 pt-0.5 sm:pt-22 lg:pt-26">
                <CardSection nomeSecao="Top 10 Filmes do Momento" fetchFunction={buscarTopFilmes} tipo="filme" />
                <CardSection nomeSecao="Filmes de Ação" fetchFunction={buscarFilmesPorGenero} fetchParams={[28]} tipo="filme" />
                <CardSection nomeSecao="Ficção Científica" fetchFunction={buscarFilmesPorGenero} fetchParams={[878]} tipo="filme" />
                <CardSection nomeSecao="Suspense e Mistério" fetchFunction={buscarFilmesPorGenero} fetchParams={[53, 9648]} tipo="filme" />
                <CardSection nomeSecao="Filmes de Terror" fetchFunction={buscarFilmesPorGenero} fetchParams={[27]} tipo="filme" />
                <CardSection nomeSecao="Animações para Todos" fetchFunction={buscarFilmesPorGenero} fetchParams={[16]} tipo="filme" />
                <CardSection nomeSecao="Filmes de Guerra" fetchFunction={buscarFilmesPorGenero} fetchParams={[10752]} tipo="filme" />
                <CardSection nomeSecao="Aventuras Épicas" fetchFunction={buscarFilmesPorGenero} fetchParams={[12]} tipo="filme" />
                <CardSection nomeSecao="Documentários Impactantes" fetchFunction={buscarFilmesPorGenero} fetchParams={[99]} tipo="filme" />
                <CardSection nomeSecao="Filmes para a Família" fetchFunction={buscarFilmesPorGenero} fetchParams={[10751]} tipo="filme" />
                <CardSection nomeSecao="Filmes Históricos" fetchFunction={buscarFilmesPorGenero} fetchParams={[36]} tipo="filme" />
                <CardSection nomeSecao="Filmes Musicais" fetchFunction={buscarFilmesPorGenero} fetchParams={[10402]} tipo="filme" />
                <CardSection nomeSecao="Filmes de Faroeste" fetchFunction={buscarFilmesPorGenero} fetchParams={[37]} tipo="filme" />
                <CardSection nomeSecao="Filmes Românticos" fetchFunction={buscarFilmesPorGenero} fetchParams={[10749]} tipo="filme" />
                <CardSection nomeSecao="Clássicos de TV" fetchFunction={buscarFilmesPorGenero} fetchParams={[10770]} tipo="filme" />
            </main>

            <NavInferior />
            <Footer />
        </div>
    );
};

export default Filmes;