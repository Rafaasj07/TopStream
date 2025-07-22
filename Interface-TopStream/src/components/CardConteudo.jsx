// Componente que exibe cada card individual dentro de um carrossel.
const CardConteudo = ({ titulo, imagem, onClick }) => {
    return (
        <div
            className="lg:w-40 w-32 flex-shrink-0 h-full cursor-pointer"
            onClick={onClick}
        >
            <img
                src={imagem}
                alt={`Pôster de ${titulo}`}
                className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300"
            />
        </div>
    );
};

export default CardConteudo;