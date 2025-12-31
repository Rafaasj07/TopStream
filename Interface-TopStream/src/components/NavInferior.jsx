import { useNavigate } from 'react-router-dom';

// Componente de navegação inferior fixa, visível apenas em dispositivos móveis
const NavInferior = () => {

  const navegar = useNavigate();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-gray-950 flex items-center justify-center px-4">

      <div className="flex items-center justify-between w-full max-w-md px-6 gap-6">

        <button
          onClick={() => navegar('/Home')}
          className="text-white text-2xl sm:text-3xl p-2 hover:text-gray-300 transition duration-200"
        >
          <i className="bx bx-home" />
        </button>

        <button
          onClick={() => navegar('/Favoritos')}
          className="text-white text-2xl sm:text-3xl p-2 hover:text-gray-300 transition duration-200"
        >
          <i className="bx bx-heart" />
        </button>
      </div>
    </nav>
  );
};

export default NavInferior;