export const BASE_URL = 'https://pokeapi.co/api/v2';
export const ITEMS_PER_PAGE = 20;
export const MAX_POKEMON = 151; // Apenas a primeira geração
export const OFFICIAL_ARTWORK_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

// Centralizando as cores dos tipos para fácil manutenção
export const TYPE_COLORS = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  default: '#68A090', // Cor padrão
};

// Centralizando as traduções dos status
export const STAT_TRANSLATIONS = {
  'hp': 'HP',
  'attack': 'Ataque',
  'defense': 'Defesa',
  'special-attack': 'Ataque Especial',
  'special-defense': 'Defesa Especial',
  'speed': 'Velocidade',
};