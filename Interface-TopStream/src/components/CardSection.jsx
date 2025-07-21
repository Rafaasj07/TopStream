// ====================================================================================
// 1. IMPORTAÇÕES
// ====================================================================================
// Importa os "Hooks" (ferramentas) essenciais do React.
// - useRef: Para criar uma referência a um elemento HTML e poder manipulá-lo diretamente (ex: nosso carrossel).
// - useState: Para criar e gerenciar "estados" no componente, que são variáveis que, ao mudarem, fazem o componente renderizar novamente (ex: se um botão deve ou não aparecer).
// - useEffect: Para executar lógicas que não são diretamente da renderização, como adicionar "ouvintes de eventos" (event listeners) depois que o componente aparece na tela.
import { useRef, useState, useEffect } from "react";

// Importa o componente que representa um único card de anime. Este componente será repetido dentro do carrossel.
import CardConteudo from "./CardConteudo";

// ====================================================================================
// 2. DEFINIÇÃO DO COMPONENTE
// ====================================================================================
// Define o componente funcional principal, chamado `Top10Section`.
const CardSection = ({ nomeSecao }) => {
    // ====================================================================================
    // 3. HOOKS E ESTADO DO COMPONENTE
    // ====================================================================================

    // Cria uma referência `scrollRef`. Ela será ligada ao `div` do carrossel para que possamos controlar sua rolagem via JavaScript.
    const scrollRef = useRef(null);

    // Cria dois "estados" para controlar a visibilidade dos botões de navegação.
    // `showLeft` controla o botão esquerdo, e `showRight` controla o direito.
    // O valor inicial de `showLeft` é `false` (o carrossel começa no início, não há para onde ir à esquerda).
    // O valor inicial de `showRight` é `true` (há conteúdo para rolar para a direita).
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    // ====================================================================================
    // 4. FUNÇÕES DE CONTROLE DO CARROSSEL
    // ====================================================================================

    // Função para rolar o carrossel para a DIREITA em blocos (paginação).
    const pageRight = () => {
        // Garante que a referência ao `div` de rolagem exista antes de continuar.
        if (!scrollRef.current) return;

        // Encontra o primeiro elemento "card" dentro do carrossel para usá-lo como medida.
        const firstCard = scrollRef.current.querySelector('.flex > *');
        if (!firstCard) return; // Se não encontrar nenhum card, encerra a função.

        // Define o valor do espaçamento (gap) entre os cards, que foi definido como `gap-[10px]` no CSS.
        const gap = 10;
        // Pega a largura exata de um card, incluindo padding e borda.
        const cardWidth = firstCard.offsetWidth;
        // Calcula a distância total a ser rolada: (largura de um card + o espaçamento) multiplicado por 5.
        const scrollAmount = (cardWidth + gap) * 5;

        // Usa o método `scrollBy` para mover o carrossel a partir da sua posição ATUAL.
        // `left: scrollAmount` move para a direita. `behavior: "smooth"` cria a animação suave.
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    // Função para rolar o carrossel para a ESQUERDA em blocos.
    const pageLeft = () => {
        // A lógica de cálculo é a mesma da `pageRight` para manter a consistência.
        if (!scrollRef.current) return;
        const firstCard = scrollRef.current.querySelector('.flex > *');
        if (!firstCard) return;
        const gap = 10;
        const cardWidth = firstCard.offsetWidth;
        const scrollAmount = (cardWidth + gap) * 5;

        // A única diferença é que o valor de `left` é negativo, o que move a rolagem para a esquerda.
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    };

    // Função que verifica a posição da rolagem e decide se os botões devem ser exibidos.
    const handleScroll = () => {
        if (!scrollRef.current) return;

        // Pega a posição atual da rolagem horizontal.
        const scrollLeftPos = scrollRef.current.scrollLeft;
        // Calcula a posição máxima possível de rolagem.
        const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

        // Atualiza os estados de visibilidade.
        // `setShowLeft`: O botão esquerdo só aparece se a rolagem for maior que 0 (ou seja, não estamos no começo).
        setShowLeft(scrollLeftPos > 0);
        // `setShowRight`: O botão direito só aparece se a rolagem for menor que o máximo (não estamos no final).
        // A tolerância de `-1` ajuda a evitar problemas de arredondamento de pixels em alguns navegadores.
        setShowRight(scrollLeftPos < maxScrollLeft - 1);
    };

    // ====================================================================================
    // 5. EFEITO DE CICLO DE VIDA (useEffect)
    // ====================================================================================
    // Este `useEffect` roda apenas uma vez, quando o componente é montado na tela.
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        // Adiciona um "ouvinte" que chama `handleScroll` toda vez que o carrossel é rolado.
        scrollContainer.addEventListener("scroll", handleScroll);
        // Adiciona um "ouvinte" que chama `handleScroll` se a janela do navegador for redimensionada, para recalcular a visibilidade dos botões.
        window.addEventListener('resize', handleScroll);

        // Chama `handleScroll` uma vez no início para definir o estado inicial correto dos botões.
        handleScroll();

        // Retorna uma função de "limpeza". Ela será executada quando o componente for removido da tela.
        // Isso é uma boa prática para evitar vazamentos de memória (memory leaks).
        return () => {
            scrollContainer.removeEventListener("scroll", handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []); // O array de dependências `[]` vazio garante que este efeito rode só na montagem e desmontagem.

    // ====================================================================================
    // 6. RENDERIZAÇÃO DO COMPONENTE (JSX)
    // ====================================================================================
    return (
        // Container principal de toda a seção.
        // `w-full`: Ocupa 100% da largura.
        // `h-96`: Altura fixa.
        // `px-4`: Adiciona padding nas laterais esquerda e direita, criando a "moldura" da seção.
        <div className="w-full lg:h-60 h-52 px-3 lg:px-10">
            {/* Título da seção. */}
            <h1 className="text-white text-2xl font-bold py-4">{nomeSecao}</h1>

            {/* Container que agrupa o carrossel e os botões. */}
            {/* `relative`: Essencial para que os botões com `absolute` se posicionem em relação a ele. */}
            {/* `group`: Classe do Tailwind que permite estilizar os botões quando o mouse está sobre este container pai. */}
            <div className="relative passador group">

                {/* Renderiza o botão esquerdo APENAS se `showLeft` for `true`. */}
                {showLeft && (
                    <button onClick={pageLeft} className="controle absolute left-0 h-full top-0 z-10 items-center px-4 text-white hover:bg-gradient-to-r from-black/60 to-transparent transition-colors duration-300 hidden md:flex" aria-label="Scroll Left">
                        <span className="text-2xl font-bold">←</span>
                    </button>
                )}

                {/* Renderiza o botão direito APENAS se `showRight` for `true`. */}
                {showRight && (
                    <button onClick={pageRight} className="controle absolute right-0 h-full top-0 z-10 items-center px-4 text-white hover:bg-gradient-to-l from-black/60 to-transparent transition-colors duration-300 hidden md:flex" aria-label="Scroll Right">
                        <span className="text-2xl font-bold">→</span>
                    </button>
                )}

                {/* O contêiner de rolagem visível. */}
                {/* `ref={scrollRef}`: Liga esta `div` à nossa referência `scrollRef`. */}
                {/* `overflow-x-auto`: Habilita a rolagem horizontal quando o conteúdo interno for maior que a `div`. */}
                {/* `scroll-invisivel`: Sua classe customizada para esconder a barra de rolagem. */}
                <div ref={scrollRef} className="overflow-x-auto scroll-invisivel">
                    {/* O contêiner interno que segura TODOS os cards e que efetivamente se move. */}
                    {/* `flex`: Coloca todos os cards em uma linha horizontal. */}
                    {/* `gap-[10px]`: Cria um espaço de 10px entre cada card. */}
                    {/* `w-max`: Faz a largura deste `div` se expandir para caber todo o seu conteúdo, o que força o `overflow` no pai. */}
                    {/* (NÃO há mais `pr-4` aqui, para garantir a simetria perfeita). */}
                    <div className="flex gap-[10px] w-max">
                        {/* Cria uma lista de 20 cards. */}
                        {/* `[...Array(20)]` cria um array de 20 posições. */}
                        {/* `.map()` itera sobre o array, renderizando um `<CardConteudo>` para cada item. */}
                        {/* `key={i}` é um identificador único para cada item, essencial para o React. */}
                        {[...Array(20)].map((_, i) => (
                            <CardConteudo key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Exporta o componente `Top10Section` para que ele possa ser importado e usado em outras partes do seu site.
export default CardSection;