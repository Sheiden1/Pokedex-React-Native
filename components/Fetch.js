import { BASE_URL, OFFICIAL_ARTWORK_URL } from './Constants'; // Importa do novo arquivo de Constantes

export const fetchPokemonList = async (offset = 0, limit = 20) => {
  const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  return response.json();
};

export const fetchPokemonDetails = async (url) => {
  const response = await fetch(url);
  return response.json();
};

// NOVA FUNÇÃO
export const fetchPokemonSpecies = async (pokemonId) => {
  const response = await fetch(`${BASE_URL}/pokemon-species/${pokemonId}`);
  return response.json();
}

export const getPokemonImageUrl = (pokemonId) => {
  if (!pokemonId) {
    return null; // Retorna null ou uma imagem de placeholder se o ID não for válido
  }
  return `${OFFICIAL_ARTWORK_URL}/${pokemonId}.png`;
};