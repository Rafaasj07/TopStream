const CardSugestao = ({ titulo, imagem }) => {
    return (
        <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl w-80 group transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/10"> 
            {/* Proporção controlada para manter altura reduzida */}
            <div className="relative overflow-hidden aspect-[2/3]">
                <img
                    src={imagem}
                    alt={`Pôster de ${titulo}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="p-4">
                <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    Sugestão Encontrada
                </h2>
                <p className="text-white font-semibold text-lg mt-1 truncate" title={titulo}>
                    {titulo}
                </p>
            </div>
        </div>
    );
};

export default CardSugestao;