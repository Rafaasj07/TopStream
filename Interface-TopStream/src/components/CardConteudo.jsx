import teste from '../assets/teste.jpg'
const CardConteudo = ({ imagemFundo }) => {
  return (
    <div
      className="lg:w-32 lg:h-40 w-28 h-36 bg-center bg-cover rounded-md"
      style={{ backgroundImage: `url(${teste})` }}
    >
    </div>
  );
};

export default CardConteudo;
