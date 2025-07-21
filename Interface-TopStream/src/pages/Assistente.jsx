import { useState } from "react";
import NavPadrao from "../components/NavPadrao";
import CardSuguestao from "../components/CardSuguestao";
import teste from "../assets/teste.jpg"

// --- DADOS MOCADOS (SIMULANDO UM BANCO DE DADOS) ---
const mockFilmes = [
    { id: 1, titulo: "teste" },
];

const Assistente = () => {
    // --- ESTADOS DO COMPONENTE ---
    const [input, setInput] = useState("");
    const [resultado, setResultado] = useState(null); // Guarda o resultado encontrado (objeto ou null)
    const [carregando, setCarregando] = useState(false); // Controla a mensagem "Buscando..."
    const [buscaRealizada, setBuscaRealizada] = useState(false); // Mostra a seção de resultados após a primeira busca

    // --- FUNÇÃO CHAMADA AO ENVIAR O FORMULÁRIO ---
    const handleSubmit = (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        if (!input.trim()) return; // Não faz nada se o input estiver vazio

        // 1. Prepara para a nova busca
        setCarregando(true);
        setBuscaRealizada(true);
        setResultado(null); // Limpa o resultado anterior

        // 2. Simula uma chamada de API (demora 1.5 segundos)
        setTimeout(() => {
            const inputLower = input.toLowerCase();

            // Se o usuário digitar "voltarei" ou "teste", retorna o filme mockado
            if (inputLower.includes("voltarei") || inputLower.includes("teste")) {
                setResultado(mockFilmes[0]); // Retorna o primeiro filme
            }

            // Finaliza carregamento (mesmo que não tenha resultado)
            setCarregando(false);
        }, 1500);

    };

    return (
        <div className="bg-gray-950 min-h-screen text-white">
            <NavPadrao />

            <main className="w-full max-w-4xl pt-24 mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {/* Cabeçalho do assistente */}
                <div className="flex flex-col items-center justify-center gap-3 text-center mb-8">
                    <i className="bx bxs-bot text-5xl text-indigo-400" />
                    <h1 className="text-white text-3xl sm:text-4xl font-bold">
                        Assistente de Busca
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Não sabe o nome? Descreva o que você lembra.
                    </p>
                </div>

                {/* Campo de busca e botão */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto"
                >
                    <input
                        type="text"
                        id="assistente-input"
                        autoComplete="off"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Aquele filme com o cara que fala 'eu voltarei'..."
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full sm:w-auto flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-lg 
                       transition-colors cursor-pointer disabled:bg-indigo-900 disabled:cursor-not-allowed"
                    >
                        {carregando ? "Buscando..." : "Buscar"}
                    </button>
                </form>

                {/* Seção de Resultados */}
                <section className="mt-16">
                    {/* Só mostra algo se uma busca já foi feita e não está carregando */}
                    {buscaRealizada && !carregando && (
                        <>
                            {resultado ? (
                                // Se 'resultado' tem um objeto, renderiza o card
                                <div className="flex justify-center">
                                    <CardSuguestao titulo={resultado.titulo} imagem={teste} />
                                </div>
                            ) : (
                                // Se 'resultado' for null, mostra a mensagem de não encontrado
                                <div className="text-center">
                                    <p className="text-gray-400 text-lg">
                                        Nenhum resultado encontrado para sua busca.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Assistente;