import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";

const Home = () => {
  return (
    <div className="bg-gray-950 min-h-screen">
  
      <NavPadrao></NavPadrao>
      <CardSection nomeSecao="Top 10 Filmes"></CardSection>
      <CardSection nomeSecao="Top 10 Filmes"></CardSection>
      <CardSection nomeSecao="Top 10 Filmes"></CardSection>
      <CardSection nomeSecao="Top 10 Filmes"></CardSection>
      <CardSection nomeSecao="Top 10 Filmes"></CardSection>
    </div>
  );
};

export default Home;
