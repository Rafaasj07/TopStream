const CardPesquisar = ({ imagem, color, texto }) => {
  return (
    <div
      className="rounded-md text-lg text-white font-medium px-4 py-3 relative overflow-hidden aspect-[20/11]"
      style={{ backgroundColor: color }}
    >
      <span className="z-10 relative">{texto}</span>
      <img
        src={imagem}
        alt={texto}
        className="absolute -bottom-[22%] -right-[12%] w-[60%] rotate-[20deg] z-0"
      />
    </div>
  );
};

export default CardPesquisar;