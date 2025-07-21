// components/CardSuguestao.jsx
const CardSuguestao = ({ titulo, imagem }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg w-64 text-center">
      {imagem && (
        <img
          src={imagem}
          alt={titulo}
          className="w-full h-40 object-cover rounded mb-4"
        />
      )}
      <h2 className="text-lg font-semibold text-white">{titulo}</h2>
    </div>
  );
};

export default CardSuguestao;
