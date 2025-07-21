import * as React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { ITEMS_PER_PAGE, MAX_POKEMON } from './Constants';
import { fetchPokemonList, getPokemonImageUrl } from './Fetch';
import { getTypeColor } from './Colors';
import {
  ListContainer,
  ListItemContainer,
  PokemonCard,
  PokemonNumber,
  NameAndTypesContainer,
  PokemonNameInList,
  TypesContainerInList,
  TypeTagInList,
  TypeTextInList,
  PokemonImageInList,
  FooterContainer,
  FooterText,
  LoadMoreButton,
  LoadMoreText,
  LoadingFooter
} from './Styles';

export default function List(props) {
  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const fetchPokemonPage = React.useCallback(async (page) => {
    if (loading) return;
    
    setLoading(true);
    
    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const limit = Math.min(ITEMS_PER_PAGE, MAX_POKEMON - offset);
      
      if (offset >= MAX_POKEMON) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const data = await fetchPokemonList(offset, limit);
      
      const pokemonDetailsPromises = data.results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);
        const detailData = await detailResponse.json();
        
        const types = detailData.types.map(typeInfo => typeInfo.type.name);
        const primaryType = types[0] || 'normal';

        return {
          ...pokemon,
          id: detailData.id,
          imageUrl: getPokemonImageUrl(detailData.id),
          primaryType: primaryType,
          types: types,
        };
      });

      const pokemonsWithDetails = await Promise.all(pokemonDetailsPromises);

      if (page === 1) {
        setList(pokemonsWithDetails);
      } else {
        setList(prevList => [...prevList, ...pokemonsWithDetails]);
      }
      
      const totalLoaded = offset + data.results.length;
      setHasMore(totalLoaded < MAX_POKEMON);
      
    } catch (error) {
      console.error('Erro ao carregar pokémons:', error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  React.useEffect(() => {
    fetchPokemonPage(1);
  }, []);

  const loadMore = React.useCallback(() => {
    if (hasMore && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPokemonPage(nextPage);
    }
  }, [currentPage, hasMore, loading, fetchPokemonPage]);

  const renderPokemon = React.useCallback(({ item, index }) => {
    const capitalizedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
    const itemBackgroundColor = getTypeColor(item.primaryType);

    return (
      <ListItemContainer>
        <PokemonCard
          backgroundColor={itemBackgroundColor}
          onPress={() => {
            console.log('Clicou em:', item.name);
            console.log('URL:', item.url);
            if (props.navigation) {
              props.navigation.navigate('Details', { pokemonUrl: item.url });
            } else {
              console.error('Navigation não disponível');
            }
          }}
        >
          <PokemonNumber>#{item.id.toString().padStart(3, '0')}</PokemonNumber>

          <NameAndTypesContainer>
            <PokemonNameInList>{capitalizedName}</PokemonNameInList>
            <TypesContainerInList>
              {item.types.map((type, typeIndex) => (
                <TypeTagInList key={typeIndex}>
                  <TypeTextInList>{type}</TypeTextInList>
                </TypeTagInList>
              ))}
            </TypesContainerInList>
          </NameAndTypesContainer>

          {item.imageUrl && (
            <PokemonImageInList
              source={{ uri: item.imageUrl }}
            />
          )}
        </PokemonCard>
      </ListItemContainer>
    );
  }, [props.navigation]);

  const renderFooter = React.useCallback(() => {
    if (!hasMore) {
      return (
        <FooterContainer>
          <FooterText>Todos os pokémons carregados!</FooterText>
        </FooterContainer>
      );
    }
    
    if (loading) {
      return (
        <LoadingFooter>
          <ActivityIndicator size="small" />
        </LoadingFooter>
      );
    }
    
    return (
      <LoadMoreButton onPress={loadMore}>
        <LoadMoreText>Carregar mais</LoadMoreText>
      </LoadMoreButton>
    );
  }, [hasMore, loading, loadMore]);

  const keyExtractor = React.useCallback((item, index) => `${item.name}-${index}`, []);

  return (
    <ListContainer>
      <FlatList
        data={list}
        renderItem={renderPokemon}
        keyExtractor={keyExtractor}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        initialNumToRender={ITEMS_PER_PAGE}
        maxToRenderPerBatch={ITEMS_PER_PAGE}
        windowSize={10}
        removeClippedSubviews={true}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 5, marginBottom: 5 }}
        contentContainerStyle={{ paddingVertical: 5 }}
      />
    </ListContainer>
  );
}