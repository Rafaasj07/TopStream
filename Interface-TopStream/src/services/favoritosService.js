const FAVORITOS_KEY = 'favoritos';

// Recupera a lista de favoritos salva no localStorage
export const getFavoritos = () => {
    const favoritos = localStorage.getItem(FAVORITOS_KEY);
    return favoritos ? JSON.parse(favoritos) : [];
};

// Persiste o array atualizado no localStorage
const salvarFavoritos = (favoritos) => {
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
};

// Adiciona um item com seu tipo à lista de favoritos 
export const adicionarFavorito = (item, tipo) => {
    const favoritos = getFavoritos();
    const itemComTipo = { ...item, media_type: tipo };
    favoritos.push(itemComTipo);
    salvarFavoritos(favoritos);
};

// Remove um item da lista filtrando pelo ID 
export const removerFavorito = (itemId) => {
    let favoritos = getFavoritos();
    favoritos = favoritos.filter(fav => fav.id !== itemId);
    salvarFavoritos(favoritos);
};

// Verifica se o ID informado já existe nos favoritos 
export const isFavorito = (itemId) => {
    const favoritos = getFavoritos();
    return favoritos.some(fav => fav.id === itemId);
};