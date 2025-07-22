import { useState } from "react";
import NavPadrao from "../components/NavPadrao";
import CardSuguestao from "../components/CardSuguestao";
import { obterSugestao } from "../services/assistenteService"; // Importando a função da API

const Assistente = () => {
    // --- ESTADOS DO COMPONENTE ---
    const [input, setInput] = useState("");
    const [resultado, setResultado] = useState(null); // Guarda o resultado da API
    const [carregando, setCarregando] = useState(false);
    const [buscaRealizada, setBuscaRealizada] = useState(false);
    const [erro, setErro] = useState(null); // Guarda a mensagem de erro para o usuário

    // --- FUNÇÃO CHAMADA AO ENVIAR O FORMULÁRIO ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // 1. Prepara para a nova busca
        setCarregando(true);
        setBuscaRealizada(true);
        setResultado(null);
        setErro(null); // Limpa erros anteriores

        try {
            // 2. Chama a função do serviço que busca na API real
            const sugestaoDaApi = await obterSugestao(input);

            // 3. Verifica se a API retornou um resultado válido
            if (sugestaoDaApi && sugestaoDaApi.poster_path) {
                // Formata o resultado para o que o CardSuguestao espera
                const dadosFormatados = {
                    // O título pode vir como 'title' (filme/TMDB) ou 'name' (série/TMDB)
                    titulo: sugestaoDaApi.title || sugestaoDaApi.name,
                    // A imagem precisa do caminho base da API do TMDB
                    imagem: `https://image.tmdb.org/t/p/w500${sugestaoDaApi.poster_path}`,
                };
                setResultado(dadosFormatados);
            } else {
                // Se a API não retornou um pôster, consideramos que não houve um bom resultado
                throw new Error("Não foi possível encontrar uma sugestão correspondente.");
            }

        } catch (error) {
            // 4. Trata os erros da API de forma amigável
            console.error("Erro detalhado:", error); // Log para o desenvolvedor
            setErro("Desculpe, não encontramos nada. Tente descrever de outra forma.");
        } finally {
            // 5. Finaliza o carregamento, ocorrendo erro ou não
            setCarregando(false);
        }
    };

    return (
        <div className="bg-gray-950 min-h-screen text-white">
            <NavPadrao />

            <main className="w-full max-w-4xl pt-24 mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {/* Cabeçalho e formulário (sem alterações) */}
                <div className="flex flex-col items-center justify-center gap-3 text-center mb-8">
                    <i className="bx bxs-bot text-5xl text-indigo-400" />
                    <h1 className="text-white text-3xl sm:text-4xl font-bold">
                        Assistente de Busca
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Não sabe o nome? Descreva o que você lembra.
                    </p>
                </div>
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
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full sm:w-auto flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-lg transition-colors cursor-pointer disabled:bg-indigo-900 disabled:cursor-not-allowed"
                    >
                        {carregando ? "Buscando..." : "Buscar"}
                    </button>
                </form>

                {/* Seção de Resultados Melhorada */}
                <section className="mt-16">
                    {buscaRealizada && !carregando && (
                        <>
                            {resultado ? (
                                // Se 'resultado' tem um objeto, renderiza o card com os dados da API
                                <div className="flex justify-center">
                                    <CardSuguestao titulo={resultado.titulo} imagem={resultado.imagem} />
                                </div>
                            ) : (
                                // Se 'resultado' for null, mostra a mensagem de erro (se houver) ou a padrão
                                <div className="text-center">
                                    <p className="text-gray-400 text-lg">
                                        {erro || "Nenhum resultado encontrado para sua busca."}
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