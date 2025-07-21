import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";

const Filmes = () => {
    return (
        <div className="bg-gray-950 min-h-screen">

            <NavPadrao />
            <main className="pt-24 pl-3">
                <CardSection nomeSecao="Filmes de Ação" />
                <CardSection nomeSecao="Filmes de Ação" />

            </main>

        </div>
    );
};

export default Filmes;
