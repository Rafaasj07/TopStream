import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";

const Home = () => {
  return (
    <div className="bg-gray-950 min-h-screen">

      <NavPadrao />
      <main className="pt-24 pl-3">
        <CardSection nomeSecao="Top 10 Filmes"/>
        <CardSection nomeSecao="Top 10 Filmes"/>
        <CardSection nomeSecao="Top 10 Filmes"/>
        <CardSection nomeSecao="Top 10 Filmes"/>
        <CardSection nomeSecao="Top 10 Filmes"/>
      </main>

    </div>
  );
};

export default Home;
