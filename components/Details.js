import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Share, Alert } from 'react-native';
import { TYPE_COLORS, STAT_TRANSLATIONS } from './Constants'; 
import {
  DetailsContainer,
  LoadingContainer,
  LoadingText,
  ErrorContainer,
  ErrorText,
  Header,
  HeaderContent,
  PokemonName,
  PokemonImage,
  Content,
  InfoRow,
  Label,
  Value,
  SectionTitle,
  TypesContainer,
  HeaderTypeTag,
  TypeText,
  AbilityText,
  StatRow,
  StatName,
  StatValue,
  ShareButton,
  ShareButtonText,
  CartoonContainer,
  PokemonImageWrapper,
} from './Styles';
import { fetchPokemonDetails, getPokemonImageUrl } from './Fetch';

// Funções auxiliares movidas para fora para melhor performance
const translateStatName = (name) => {
  return STAT_TRANSLATIONS[name.toLowerCase()] || name;
};

const getTypeColor = (type) => {
  return TYPE_COLORS[type] || TYPE_COLORS.default;
};

export default function Details({ route }) {
  const { pokemonUrl } = route.params;
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  const loadPokemonDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const pokemonData = await fetchPokemonDetails(pokemonUrl);
      setPokemon(pokemonData);

    } catch (e) {
      console.error('Erro ao buscar detalhes do Pokémon:', e);
      setError('Não foi possível carregar os detalhes. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [pokemonUrl]);

  useEffect(() => {
    loadPokemonDetails();
  }, [loadPokemonDetails]);

  const onShare = async () => {
    if (!pokemon) return;

    try {
      const stats = pokemon.stats
        .map(stat => `${translateStatName(stat.stat.name)}: ${stat.base_stat}`)
        .join('\n');

      const message = `Olha esse Pokémon: ${pokemon.name.toUpperCase()}!\n\nStats:\n${stats}`;
      
      await Share.share({ message });
    } catch (shareError) {
      Alert.alert('Erro');
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={TYPE_COLORS.fire} />
        <LoadingText>Carregando</LoadingText>
      </LoadingContainer>
    );
  }

  if (error || !pokemon) {
    return (
      <ErrorContainer>
        <ErrorText>{error || 'Pokemon não encontrado.'}</ErrorText>
      </ErrorContainer>
    );
  }

  const primaryType = pokemon.types[0].type.name;
  const typeColor = getTypeColor(primaryType);
  const capitalizedPokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <DetailsContainer>
      <Header typeColor={typeColor}>
        <HeaderContent>
          <TypesContainer>
            {pokemon.types.map((typeInfo, index) => {
              // Pega a cor correta para o tipo atual
              const currentTypeColor = getTypeColor(typeInfo.type.name);
              return (
                // Passa a cor como uma propriedade para o componente de estilo
                <HeaderTypeTag key={index} backgroundColor={currentTypeColor}>
                  <TypeText>{typeInfo.type.name}</TypeText>
                </HeaderTypeTag>
              );
            })}
          </TypesContainer>
          <PokemonName>
            #{String(pokemon.id).padStart(3, '0')} {capitalizedPokemonName}
          </PokemonName>
          <PokemonImageWrapper>
            <PokemonImage source={{ uri: getPokemonImageUrl(pokemon.id) }} resizeMode="contain" />
          </PokemonImageWrapper>
        </HeaderContent>
      </Header>
      
      <CartoonContainer>
        <Content>
          <SectionTitle typeColor={typeColor}>Informações</SectionTitle>
          <InfoRow>
            <Label>Altura</Label>
            <Value>{pokemon.height / 10} m</Value>
          </InfoRow>
          <InfoRow>
            <Label>Peso</Label>
            <Value>{pokemon.weight / 10} kg</Value>
          </InfoRow>
          
          <SectionTitle typeColor={typeColor}>Habilidades</SectionTitle>
          {pokemon.abilities.map((abilityInfo, index) => (
            <AbilityText key={index}>
              • {abilityInfo.ability.name.charAt(0).toUpperCase() + abilityInfo.ability.name.slice(1)}
            </AbilityText>
          ))}
          
          <SectionTitle typeColor={typeColor}>Status</SectionTitle>
          {pokemon.stats.map((statInfo, index) => (
            <StatRow key={index}>
              <StatName>{translateStatName(statInfo.stat.name)}</StatName>
              <StatValue>{statInfo.base_stat}</StatValue>
            </StatRow>
          ))}

          <ShareButton onPress={onShare} typeColor={typeColor}>
            <ShareButtonText>Compartilhar</ShareButtonText>
          </ShareButton>
        </Content>
      </CartoonContainer>
    </DetailsContainer>
  );
}