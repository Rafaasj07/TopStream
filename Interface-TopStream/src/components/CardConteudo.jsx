// Interface-TopStream/src/components/CardConteudo.jsx

const CardConteudo = ({ titulo, imagem }) => {
    return (
        // ✅ A CORREÇÃO: Adicionamos a classe `h-full`.
        // Agora, este contêiner ocupará toda a altura disponível no carrossel.
        <div className="lg:w-40 w-32 flex-shrink-0 h-full">
            <img
                src={imagem}
                alt={`Pôster de ${titulo}`}
                // A imagem (com h-full) agora preencherá este contêiner de tamanho correto,
                // sem vazar ou criar rolagem vertical.
                className="w-full h-full object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
        </div>
    );
};

export default CardConteudo;