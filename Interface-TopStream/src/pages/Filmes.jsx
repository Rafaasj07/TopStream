import CardSection from "../components/CardSection";
import NavPadrao from "../components/NavPadrao";

const Filmes = () => {
  return (
    <div className="bg-gray-950 min-h-screen">
      
      <NavPadrao></NavPadrao>
      <CardSection nomeSecao="Filmes de Ação"></CardSection>
      
    </div>
  );
};

export default Filmes;
