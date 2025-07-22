import axios from 'axios';

// Cria e exporta uma instância do Axios pré-configurada para a API.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;