import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";

const Animes = () => {
    return (
        <div className="bg-gray-950 min-h-screen">

            <NavPadrao />
            <main className="pt-24 pl-3">
                <CardSection nomeSecao="Animes de Terror" />
                <CardSection nomeSecao="Animes de Terror" />
                <CardSection nomeSecao="Animes de Terror" />
                <CardSection nomeSecao="Animes de Terror" />
                <CardSection nomeSecao="Animes de Terror" />
            </main>

        </div>
    );
};

export default Animes;
