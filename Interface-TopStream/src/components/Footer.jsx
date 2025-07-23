// Componente do rodapé, contendo informações do desenvolvedor e créditos.
const Footer = () => {
    return (
        // O container principal do rodapé.
        <footer className="w-full bg-gray-950 text-center pb-18 sm:pb-15 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Nome do desenvolvedor. */}
                <p className="text-gray-200 text-xl sm:text-2xl font-bold font-mono mb-4">
                    Desenvolvido por Rafael Augusto
                </p>

                {/* Links para redes sociais, que se ajustam de coluna para linha em telas maiores. */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center justify-center mb-6">
                    <a
                        href="https://github.com/rafaasj07"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-lg font-mono"
                    >
                        <i className='bx bxl-github text-2xl'></i>
                        <span>GitHub</span>
                    </a>

                    <a
                        href="https://instagram.com/rafael_asj7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-lg font-mono"
                    >
                        <i className='bx bxl-instagram text-2xl'></i>
                        <span>Instagram</span>
                    </a>
                </div>

                {/* Créditos das APIs utilizadas. */}
                <div className="text-gray-500 text-sm sm:text-base font-mono leading-relaxed">
                    Dados fornecidos por&nbsp;
                    <a
                        href="https://www.themoviedb.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-400 hover:underline"
                    >
                        <i className='bx bxs-movie-play'></i> TMDB
                    </a>,&nbsp;
                    <a
                        href="https://anilist.co/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-pink-400 hover:underline"
                    >
                        <i className='bx bx-analyse'></i> AniList
                    </a>&nbsp;e&nbsp;
                    <a
                        href="https://openrouter.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-400 hover:underline"
                    >
                        <i className='bx bxs-bot'></i> OpenRouter
                    </a>
                    .
                </div>
            </div>
        </footer>
    );
};

export default Footer;