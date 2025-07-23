import { useNavigate } from 'react-router-dom';
const NavInferior = () => {

  const navegar = useNavigate();

  return (
    // Barra inferior fixa no rodapé da tela, escondida em telas médias ou maiores (md:hidden)
    <nav className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-gray-950 flex items-center justify-center px-4">

      {/* Container com largura máxima e espaçamento entre os botões */}
      <div className="flex items-center justify-between w-full max-w-md px-6 gap-6">

        {/* Botão que redireciona para a página Home */}
        <button
          onClick={() => navegar('/Home')}
          className="text-white text-2xl sm:text-3xl p-2 hover:text-gray-300 transition duration-200"
        >
          <i className="bx bx-home" /> {/* Ícone de casa (home) */}
        </button>

        {/* Botão que redireciona para a página de favoritos/pesquisa */}
        <button
          onClick={() => navegar('/Favoritos')}
          className="text-white text-2xl sm:text-3xl p-2 hover:text-gray-300 transition duration-200"
        >
          <i className="bx bx-heart" /> {/* Ícone de coração (favoritos) */}
        </button>
      </div>
    </nav>
  );
};

export default NavInferior;
