// O nome da chave que usaremos no localStorage.
const FAVORITOS_KEY = 'favoritos';

/**
 * Busca todos os favoritos salvos no localStorage.
 * @returns {Array} Um array com os itens favoritos.
 */
export const getFavoritos = () => {
    const favoritos = localStorage.getItem(FAVORITOS_KEY);
    return favoritos ? JSON.parse(favoritos) : [];
};

/**
 * Salva a lista de favoritos no localStorage.
 * @param {Array} favoritos - O array de favoritos para salvar.
 */
const salvarFavoritos = (favoritos) => {
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
};

/**
 * Adiciona um novo item à lista de favoritos.
 * Inclui o tipo (filme, serie, anime) para uso posterior.
 * @param {object} item - O item a ser adicionado.
 * @param {'filme' | 'serie' | 'anime'} tipo - O tipo do item.
 */
export const adicionarFavorito = (item, tipo) => {
    const favoritos = getFavoritos();
    // Adiciona o tipo ao objeto antes de salvar
    const itemComTipo = { ...item, media_type: tipo };
    favoritos.push(itemComTipo);
    salvarFavoritos(favoritos);
};

/**
 * Remove um item da lista de favoritos pelo ID.
 * @param {number} itemId - O ID do item a ser removido.
 */
export const removerFavorito = (itemId) => {
    let favoritos = getFavoritos();
    favoritos = favoritos.filter(fav => fav.id !== itemId);
    salvarFavoritos(favoritos);
};

/**
 * Verifica se um item já está na lista de favoritos.
 * @param {number} itemId - O ID do item a ser verificado.
 * @returns {boolean} - True se o item for um favorito, false caso contrário.
 */
export const isFavorito = (itemId) => {
    const favoritos = getFavoritos();
    return favoritos.some(fav => fav.id === itemId);
};