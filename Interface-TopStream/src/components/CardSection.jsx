// TopStream - Copia/Interface-TopStream/src/components/CardSection.jsx

import { useRef, useState, useEffect } from "react";
import CardConteudo from "./CardConteudo";
import DetalhesModal from "./DetalhesModal";

const CardSection = ({ nomeSecao, fetchFunction, fetchParams = [], dados, tipo }) => {
    const [conteudo, setConteudo] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [itemModal, setItemModal] = useState(null);

    const scrollRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    useEffect(() => {
        const buscarDados = async () => {
            if (!fetchFunction) return;
            try {
                setCarregando(true);
                setErro(null);

                const dadosApi = await fetchFunction(...fetchParams);
                setConteudo(dadosApi);
            } catch (err) {
                console.error(`Erro ao buscar dados para a seção "${nomeSecao}":`, err);
                setErro("Não foi possível carregar o conteúdo.");
            } finally {
                setCarregando(false);
            }
        };

        if (fetchFunction) {
            buscarDados();
        } else if (dados) {
            setConteudo(dados);
            setCarregando(false);
            setErro(null);
        }
    }, [fetchFunction, nomeSecao, JSON.stringify(fetchParams), dados, tipo]);


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
        const threshold = 5;
        setShowLeft(scrollLeft > threshold);
        setShowRight(scrollLeft < scrollWidth - clientWidth - threshold);
    };

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || conteudo.length === 0) return;

        setTimeout(() => {
            handleScroll();
        }, 100);

        scrollContainer.addEventListener("scroll", handleScroll);
        window.addEventListener('resize', handleScroll);
        return () => {
            if (scrollContainer) scrollContainer.removeEventListener("scroll", handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [conteudo]);

    const abrirModal = (item) => setItemModal(item);
    const fecharModal = () => setItemModal(null);
    const handleClick = (item) => abrirModal(item);

    const getImagemUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        return `https://image.tmdb.org/t/p/w500${path}`;
    };

    if (carregando) {
        return (
            <div className="w-full pl-3 lg:pl-10 mb-8">
                <h1 className="text-white text-2xl font-bold mb-4">{nomeSecao}</h1>
                <div className="lg:h-52 md:h-48 h-44 bg-gray-900 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Carregando...</p>
                </div>
            </div>
        );
    }

    if (erro || !conteudo || conteudo.length === 0) {
        if (erro) return <p className="text-red-500 pl-3 lg:pl-10">{erro}</p>;
        return null;
    }

    return (
        <>
            <div className="w-full mb-3 sm:mb-8">
                <h1 className="text-white text-lg sm:text-2xl font-bold mb-1 sm:mb-4 px-3 lg:px-10">{nomeSecao}</h1>
                <div className={`relative passador group lg:h-52 md:h-48 h-44 
                    ${showLeft ? 'before:content-[""] before:absolute before:inset-y-0 before:left-0 before:w-16 before:bg-gradient-to-r before:from-gray-950 before:to-transparent before:z-20' : ''}
                    ${showRight ? 'after:content-[""] after:absolute after:inset-y-0 after:right-0 after:w-16 after:bg-gradient-to-l after:from-gray-950 after:to-transparent after:z-20' : ''}`}
                >
                    {showLeft && (
                        <button onClick={() => scrollCarrossel(-5)} className="controle absolute left-0 h-full top-0 z-30 items-center px-4 text-white hover:bg-gradient-to-r from-black/60 to-transparent transition-colors duration-300 hidden md:flex" aria-label="Scroll Left">
                            <i className='bx bx-chevron-left text-4xl text-white'></i>
                        </button>
                    )}
                    {showRight && (
                        <button onClick={() => scrollCarrossel(5)} className="controle absolute right-0 h-full top-0 z-30 items-center px-4 text-white hover:bg-gradient-to-l from-black/60 to-transparent transition-colors duration-300 hidden md:flex" aria-label="Scroll Right">
                            <i className='bx bx-chevron-right text-4xl text-white'></i>
                        </button>
                    )}
                    <div ref={scrollRef} className="overflow-x-auto scroll-invisivel h-full">
                        <div className="flex gap-[10px] w-max h-full items-center px-3 lg:px-10">
                            {conteudo.map((item, index) => (
                                <CardConteudo
                                    key={`${item.id}-${index}`}
                                    titulo={item.title || item.name}
                                    imagem={getImagemUrl(item.poster_path)}
                                    onClick={() => handleClick(item)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {itemModal && (
                <DetalhesModal
                    item={itemModal}
                    tipo={tipo}
                    onClose={fecharModal}
                />
            )}
        </>
    );
};

export default CardSection;