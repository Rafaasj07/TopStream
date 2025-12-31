import { useState } from "react";
import NavPadrao from "../components/NavPadrao";
import CardSuguestao from "../components/CardSuguestao";
import { obterSugestao } from "../services/assistenteService";
import DetalhesModal from "../components/DetalhesModal";
import NavInferior from "../components/NavInferior";

const Assistente = () => {
    const [input, setInput] = useState("");
    const [resultado, setResultado] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [buscaRealizada, setBuscaRealizada] = useState(false);
    const [erro, setErro] = useState(null);
    const [itemModal, setItemModal] = useState(null);
    const [tipoConteudo, setTipoConteudo] = useState(null);

    const abrirModal = (item) => setItemModal(item);
    const fecharModal = () => setItemModal(null);

    // Envia a descrição do usuário para a API e processa a sugestão retornada
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setCarregando(true);
        setBuscaRealizada(true);
        setResultado(null);
        setItemModal(null);
        setErro(null);

        try {
            // Chama o serviço de IA para obter uma sugestão
            const sugestaoDaApi = await obterSugestao(input);

            if (sugestaoDaApi && sugestaoDaApi.id) {
                // Identifica o tipo de conteúdo (filme, série ou anime) baseado nos campos de data
                if (sugestaoDaApi.first_air_date) {
                    setTipoConteudo('serie');
                } else if (sugestaoDaApi.release_date) {
                    setTipoConteudo('filme');
                } else {
                    setTipoConteudo('anime');
                }
                setResultado(sugestaoDaApi);
            } else {
                throw new Error("Não foi possível encontrar uma sugestão correspondente.");
            }

        } catch (error) {
            console.error("Erro detalhado:", error);
            setErro("Desculpe, não encontramos nada. Tente descrever de outra forma.");
        } finally {
            setCarregando(false);
        }
    };

    // Formata a URL da imagem, adicionando o domínio do TMDB se necessário
    const getImagemUrl = (path) => {
        if (!path) return '';
        if (path.startsWith("http")) return path;
        return `https://image.tmdb.org/t/p/w500${path}`;
    };

    return (
        <div className="bg-gray-950 min-h-screen text-white">
            <NavPadrao />

            <main className="w-full max-w-4xl pt-24 mx-auto px-4 sm:px-6 lg:px-8 pb-16">
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

                <section className="mt-16">
                    {buscaRealizada && !carregando && (
                        <>
                            {resultado ? (
                                <div className="flex justify-center">
                                    <CardSuguestao
                                        titulo={resultado.title || resultado.name}
                                        imagem={getImagemUrl(resultado.poster_path)}
                                        onClick={() => abrirModal(resultado)}
                                    />
                                </div>
                            ) : (
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

            {itemModal && (
                <DetalhesModal
                    item={itemModal}
                    tipo={tipoConteudo}
                    onClose={fecharModal}
                />
            )}
            <NavInferior></NavInferior>
        </div>
    );
};

export default Assistente;