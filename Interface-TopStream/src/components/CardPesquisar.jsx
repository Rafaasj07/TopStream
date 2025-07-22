// Componente de card para as categorias de pesquisa (Filmes, Séries, Animes).
const CardPesquisar = ({ imagem, color, texto, onClick }) => {
  return (
    <div
      className="rounded-md text-lg text-white font-medium px-4 py-3 relative overflow-hidden aspect-[20/11] cursor-pointer"
      style={{ backgroundColor: color }} // A cor de fundo é dinâmica.
      onClick={onClick}
    >
      <span className="z-10 relative">{texto}</span>
      {/* A imagem é rotacionada e posicionada para criar um efeito visual. */}
      <img
        src={imagem}
        alt={texto}
        className="absolute -bottom-[22%] -right-[12%] w-[60%] rotate-[20deg] z-0"
      />
    </div>
  );
};

export default CardPesquisar;