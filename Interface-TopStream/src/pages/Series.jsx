import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";

const Series = () => {
    return (
        <div className="bg-gray-950 min-h-screen">

            <NavPadrao />
            <main className="pt-24 pl-3">
                <CardSection nomeSecao="Series Policiais" />
                <CardSection nomeSecao="Series Policiais" />
                <CardSection nomeSecao="Series Policiais" />
                <CardSection nomeSecao="Series Policiais" />
                <CardSection nomeSecao="Series Policiais" />
            </main>

        </div>
    );
};

export default Series;
