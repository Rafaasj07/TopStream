import { useRef, useState, useEffect } from "react";
import CardConteudo from "./CardConteudo";

const CardSection = ({ nomeSecao, fetchFunction, fetchParams = [] }) => {
    const [conteudo, setConteudo] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const scrollRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    useEffect(() => {
        const buscarDados = async () => {
            if (!fetchFunction) {
                setCarregando(false);
                return;
            }
            try {
                setCarregando(true);
                setErro(null);
                const dados = await fetchFunction(...fetchParams);
                setConteudo(dados);
            } catch (err) {
                console.error(`Erro ao buscar dados para a seção "${nomeSecao}":`, err);
                setErro("Não foi possível carregar o conteúdo.");
            } finally {
                setCarregando(false);
            }
        };
        buscarDados();
    }, [fetchFunction, nomeSecao, JSON.stringify(fetchParams)]); // Adicionado stringify para estabilidade

    const scrollCarrossel = (distancia) => {
        if (!scrollRef.current) return;
        const firstCard = scrollRef.current.querySelector('.flex > *');
        if (!firstCard) return;
        const gap = 10;
        const cardWidth = firstCard.offsetWidth;
        const scrollAmount = (cardWidth + gap) * distancia;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeft(scrollLeft > 1);
        setShowRight(scrollLeft < scrollWidth - clientWidth - 1);
    };
    
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || conteudo.length === 0) return;

        handleScroll(); // Verifica o estado inicial
        scrollContainer.addEventListener("scroll", handleScroll);
        window.addEventListener('resize', handleScroll);
        
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll);
            }
            window.removeEventListener('resize', handleScroll);
        };
    }, [conteudo]);

    // Função para formatar a URL da imagem
    const getImagemUrl = (path) => {
        if (!path) return 'URL_DA_IMAGEM_PADRAO'; // URL de uma imagem placeholder
        // Se o path já for uma URL completa (começa com http), use-o diretamente.
        if (path.startsWith('http')) {
            return path;
        }
        // Caso contrário, adicione o prefixo da TMDB.
        return `https://image.tmdb.org/t/p/w500${path}`;
    };

    if (carregando) {
        return (
            <div className="w-full px-3 lg:pl-10 pr-6 mb-8">
                <h1 className="text-white text-2xl font-bold mb-4">{nomeSecao}</h1>
                <div className="lg:h-52 md:h-48 h-44 bg-gray-900 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Carregando...</p>
                </div>
            </div>
        );
    }
    
    if (erro || !conteudo || conteudo.length === 0) {
        return null;
    }

    return (
        <div className="w-full px-3 lg:pl-10 pr-6 ">
            <h1 className="text-white text-2xl font-bold mb-4">{nomeSecao}</h1>
            <div className="relative passador group lg:h-52 md:h-48 h-44">
                {showLeft && (
                    <button onClick={() => scrollCarrossel(-5)} className="controle absolute left-0 h-full top-0 z-10 items-center px-4 text-white hover:bg-gradient-to-r from-black/60 to-transparent transition-colors duration-300 hidden md:flex" aria-label="Scroll Left">
                        <i className='bx bx-chevron-left text-4xl text-white'></i>
                    </button>
                )}
                {showRight && (
                    <button onClick={() => scrollCarrossel(5)} className="controle absolute right-0 h-full top-0 z-10 items-center px-4 text-white hover:bg-gradient-to-l from-black/60 to-transparent transition-colors duration-300 hidden md:flex" aria-label="Scroll Right">
                        <i className='bx bx-chevron-right text-4xl text-white'></i>
                    </button>
                )}
                <div ref={scrollRef} className="overflow-x-auto scroll-invisivel h-full">
                    <div className="flex gap-[10px] w-max h-full items-center">
                        {conteudo.map((item, index) => (
                            <CardConteudo
                                key={`${item.id}-${index}`}
                                titulo={item.title || item.name}
                                imagem={getImagemUrl(item.poster_path)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardSection;