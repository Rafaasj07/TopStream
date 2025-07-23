// Componente responsável por renderizar uma seção de cards em forma de carrossel horizontal

import { useRef, useState, useEffect } from "react";
import CardConteudo from "./CardConteudo";
import DetalhesModal from "./DetalhesModal";

// Props: nomeSecao (título), fetchFunction (função para buscar os dados), fetchParams (parâmetros da busca),
// dados (caso queira passar conteúdo manualmente), tipo (usado no modal: 'filme', 'serie' ou 'anime')
const CardSection = ({ nomeSecao, fetchFunction, fetchParams = [], dados, tipo }) => {
    // Estado para armazenar os itens retornados da API
    const [conteudo, setConteudo] = useState([]);
    // Estados de controle de carregamento e erro
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    // Estado que define o item exibido no modal
    const [itemModal, setItemModal] = useState(null);

    // Referência para controlar o scroll do carrossel
    const scrollRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false); // seta se botão esquerdo deve aparecer
    const [showRight, setShowRight] = useState(true); // seta se botão direito deve aparecer

    // Efeito que busca os dados da API ou usa os dados manuais passados por props
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

    // Função para controlar o scroll horizontal do carrossel
    const scrollCarrossel = (distancia) => {
        if (!scrollRef.current) return;
        const firstCard = scrollRef.current.querySelector('.flex > *');
        if (!firstCard) return;
        const gap = 10; // espaço entre cards
        const cardWidth = firstCard.offsetWidth;
        const scrollAmount = (cardWidth + gap) * distancia;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    // Define visibilidade dos botões de navegação com base na posição do scroll
    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const threshold = 5; // margem de erro
        setShowLeft(scrollLeft > threshold);
        setShowRight(scrollLeft < scrollWidth - clientWidth - threshold);
    };

    // Controla quando adicionar e remover os eventos de scroll e resize
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || conteudo.length === 0) return;

        // Aguarda renderização antes de calcular
        setTimeout(() => {
            handleScroll();
        }, 100);

        scrollContainer.addEventListener("scroll", handleScroll);
        window.addEventListener('resize', handleScroll);
        return () => {
            scrollContainer.removeEventListener("scroll", handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [conteudo]);

    // Modal
    const abrirModal = (item) => setItemModal(item);
    const fecharModal = () => setItemModal(null);
    const handleClick = (item) => abrirModal(item);

    // Define o caminho da imagem (com fallback para imagens absolutas ou da TMDB)
    const getImagemUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        return `https://image.tmdb.org/t/p/w500${path}`;
    };

    // Exibe loading temporário enquanto busca dados
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

    // Exibe mensagem de erro ou nada, caso não haja conteúdo
    if (erro || !conteudo || conteudo.length === 0) {
        if (erro) return <p className="text-red-500 pl-3 lg:pl-10">{erro}</p>;
        return null;
    }

    return (
        <>
            <div className="w-full mb-3 sm:mb-8">
                <h1 className="text-white text-lg sm:text-2xl font-bold mb-1 sm:mb-4 px-3 lg:px-10">{nomeSecao}</h1>

                {/* Container do carrossel */}
                <div className={`relative passador group lg:h-52 md:h-48 h-44 
                    ${showLeft ? 'before:content-[""] before:absolute before:inset-y-0 before:left-0 before:w-16 before:bg-gradient-to-r before:from-gray-950 before:to-transparent before:z-20' : ''}
                    ${showRight ? 'after:content-[""] after:absolute after:inset-y-0 after:right-0 after:w-16 after:bg-gradient-to-l after:from-gray-950 after:to-transparent after:z-20' : ''}`}
                >
                    {/* Botão scroll esquerdo */}
                    {showLeft && (
                        <button onClick={() => scrollCarrossel(-5)} className="controle absolute left-0 h-full top-0 z-30 items-center px-4 text-white hover:bg-gradient-to-r from-black/60 to-transparent transition-colors duration-300 hidden md:flex" aria-label="Scroll Left">
                            <i className='bx bx-chevron-left text-4xl text-white'></i>
                        </button>
                    )}

                    {/* Botão scroll direito */}
                    {showRight && (
                        <button onClick={() => scrollCarrossel(5)} className="controle absolute right-0 h-full top-0 z-30 items-center px-4 text-white hover:bg-gradient-to-l from-black/60 to-transparent transition-colors duration-300 hidden md:flex" aria-label="Scroll Right">
                            <i className='bx bx-chevron-right text-4xl text-white'></i>
                        </button>
                    )}

                    {/* Lista de cards com scroll horizontal */}
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

            {/* Modal de detalhes do item clicado */}
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
