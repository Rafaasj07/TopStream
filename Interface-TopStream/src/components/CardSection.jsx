// --- IMPORTAÇÕES ---
import { useRef, useState, useEffect } from "react";
import CardConteudo from "./CardConteudo";
import DetalhesModal from "./DetalhesModal";

// --- DEFINIÇÃO DO COMPONENTE ---
// Props:
// - nomeSecao: título da seção exibido no topo
// - fetchFunction: função assíncrona para buscar os dados
// - fetchParams: parâmetros adicionais passados para a função de busca
// - dados: alternativa para fornecer os dados diretamente (ex: favoritos)
// - tipo: tipo de conteúdo ('filme', 'serie' ou 'anime')
const CardSection = ({ nomeSecao, fetchFunction, fetchParams = [], dados, tipo }) => {
    // --- ESTADOS (STATES) ---
    const [conteudo, setConteudo] = useState([]);            // Armazena os dados carregados
    const [carregando, setCarregando] = useState(false);     // Indica se os dados estão sendo carregados
    const [erro, setErro] = useState(null);                  // Armazena possíveis mensagens de erro
    const [itemModal, setItemModal] = useState(null);        // Item que será mostrado no modal
    const [iniciouBusca, setIniciouBusca] = useState(false); // Garante que a busca só aconteça uma vez

    // --- REFERÊNCIAS (REFS) ---
    const scrollRef = useRef(null);   // Referência ao carrossel de cards
    const sectionRef = useRef(null);  // Referência à seção inteira (para lazy loading)
    const [showLeft, setShowLeft] = useState(false);   // Mostra botão de scroll esquerdo
    const [showRight, setShowRight] = useState(true);   // Mostra botão de scroll direito

    // --- EFEITO PARA BUSCA DE DADOS (LAZY LOADING) ---
    useEffect(() => {
        // Se os dados forem fornecidos diretamente, carrega imediatamente
        if (dados) {
            setConteudo(dados);
            setIniciouBusca(true);
            return;
        }

        if (!fetchFunction) return;

        // Cria um IntersectionObserver para detectar quando a seção entra na tela
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;

                // Inicia a busca se ainda não tiver começado e a seção estiver visível
                if (entry.isIntersecting && !iniciouBusca) {
                    setIniciouBusca(true);
                    setCarregando(true);

                    // Executa a função de busca
                    fetchFunction(...fetchParams)
                        .then(dadosApi => setConteudo(dadosApi))
                        .catch(err => {
                            console.error(`Erro ao buscar dados para a seção "${nomeSecao}":`, err);
                            setErro("Não foi possível carregar o conteúdo.");
                        })
                        .finally(() => setCarregando(false));

                    // Para de observar após iniciar a busca
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' } // Começa a buscar um pouco antes de entrar na tela
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        // Limpeza: desconecta o observer se o componente for desmontado
        return () => {
            if (sectionRef.current) {
                observer.disconnect();
            }
        };
    }, [fetchFunction, nomeSecao, JSON.stringify(fetchParams), dados, tipo, iniciouBusca]);

    // --- FUNÇÕES DE CONTROLE DO CARROSSEL ---
    const scrollCarrossel = (distancia) => {
        if (!scrollRef.current) return;

        // Obtém o primeiro card para saber a largura
        const firstCard = scrollRef.current.querySelector('.flex > *');
        if (!firstCard) return;

        const gap = 10; // Espaço entre os cards
        const cardWidth = firstCard.offsetWidth;
        const scrollAmount = (cardWidth + gap) * distancia;

        // Faz o scroll suavemente
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    const handleScroll = () => {
        if (!scrollRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const threshold = 5;

        // Verifica se os botões de scroll devem ser exibidos
        setShowLeft(scrollLeft > threshold);
        setShowRight(scrollLeft < scrollWidth - clientWidth - threshold);
    };

    // Efeito que adiciona/remover listeners de scroll e resize para atualizar os botões
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || conteudo.length === 0) return;

        setTimeout(() => handleScroll(), 100); // Pequeno atraso para detectar corretamente após renderização

        scrollContainer.addEventListener("scroll", handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            scrollContainer.removeEventListener("scroll", handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [conteudo]);

    // --- FUNÇÕES DO MODAL E IMAGENS ---
    const abrirModal = (item) => setItemModal(item);
    const fecharModal = () => setItemModal(null);
    const handleClick = (item) => abrirModal(item);

    // Monta a URL da imagem (com fallback caso já venha completa)
    const getImagemUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        return `https://image.tmdb.org/t/p/w500${path}`;
    };

    // --- RENDERIZAÇÃO ---

    // Placeholder para manter espaço antes da busca iniciar (lazy)
    if (!iniciouBusca) {
        return (
            <div ref={sectionRef} className="w-full mb-3 sm:mb-8">
                <h1 className="text-white text-lg sm:text-2xl font-bold mb-1 sm:mb-4 px-3 lg:px-10">{nomeSecao}</h1>
                <div className="lg:h-52 md:h-48 h-44 bg-gray-900 rounded-lg mx-3 lg:mx-10"></div>
            </div>
        );
    }

    // Exibe indicador de carregamento
    if (carregando) {
        return (
            <div className="w-full mb-3 sm:mb-8">
                <h1 className="text-white text-lg sm:text-2xl font-bold mb-1 sm:mb-4 px-3 lg:px-10">{nomeSecao}</h1>
                <div className="lg:h-52 md:h-48 h-44 bg-gray-900 rounded-lg flex items-center justify-center mx-3 lg:mx-10">
                    <p className="text-gray-500">Carregando...</p>
                </div>
            </div>
        );
    }

    // Exibe erro ou nada se a lista estiver vazia
    if (erro || !conteudo || conteudo.length === 0) {
        if (erro) return <p className="text-red-500 pl-3 lg:pl-10">{erro}</p>;
        return null;
    }

    // Renderiza a seção completa com carrossel e modal
    return (
        <>
            <div ref={sectionRef} className="w-full mb-3 sm:mb-8">
                <h1 className="text-white text-lg sm:text-2xl font-bold mb-1 sm:mb-4 px-3 lg:px-10">{nomeSecao}</h1>

                {/* Container com gradientes nas laterais se necessário */}
                <div className={`relative passador group lg:h-52 md:h-48 h-44 
                    ${showLeft ? 'before:content-[""] before:absolute before:inset-y-0 before:left-0 before:w-16 before:bg-gradient-to-r before:from-gray-950 before:to-transparent before:z-20' : ''}
                    ${showRight ? 'after:content-[""] after:absolute after:inset-y-0 after:right-0 after:w-16 after:bg-gradient-to-l after:from-gray-950 after:to-transparent after:z-20' : ''}
                `}>
                    {/* Botão scroll para esquerda */}
                    {showLeft && (
                        <button onClick={() => scrollCarrossel(-5)} className="controle absolute left-0 h-full top-0 z-30 items-center px-4 text-white hover:bg-gradient-to-r from-black/60 to-transparent transition-colors duration-300 hidden md:flex" aria-label="Scroll Left">
                            <i className='bx bx-chevron-left text-4xl text-white'></i>
                        </button>
                    )}

                    {/* Botão scroll para direita */}
                    {showRight && (
                        <button onClick={() => scrollCarrossel(5)} className="controle absolute right-0 h-full top-0 z-30 items-center px-4 text-white hover:bg-gradient-to-l from-black/60 to-transparent transition-colors duration-300 hidden md:flex" aria-label="Scroll Right">
                            <i className='bx bx-chevron-right text-4xl text-white'></i>
                        </button>
                    )}

                    {/* Carrossel horizontal */}
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

            {/* Modal de detalhes */}
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
