import styled from 'styled-components/native';
import { TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';

const cartoonColors = {
  background: '#FDF6E3',
  text: '#586E75',
  lightText: '#93A1A1',
  accent: '#FF6F61',
  cardBackground: '#FFFFFF',
};

export const DetailsContainer = styled(ScrollView)`
  flex: 1;
  background-color: ${cartoonColors.background};
`;

export const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${cartoonColors.background};
`;

export const LoadingText = styled(Text)`
  margin-top: 15px;
  font-size: 18px;
  font-weight: bold;
  color: ${cartoonColors.text};
`;

export const ErrorContainer = styled(LoadingContainer)``;

export const ErrorText = styled(LoadingText)`
  color: ${cartoonColors.accent};
  text-align: center;
  padding-horizontal: 20px;
`;

// --- Header ---
export const Header = styled(View)`
  background-color: ${(props) => props.typeColor || '#6495ED'};
  padding-bottom: 80px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  align-items: center;
`;

export const HeaderContent = styled(View)`
  width: 100%;
  padding-horizontal: 20px;
  align-items: center;
`;

export const PokemonName = styled(Text)`
  font-size: 28px;
  font-weight: 900;
  color: white;
  text-transform: capitalize;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  margin-top: 10px;
`;

export const PokemonImageWrapper = styled(View)`
  width: 220px;
  height: 220px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  background-color: transparent; /* <-- ADICIONADO AQUI */
`;

export const PokemonImage = styled(Image)`
  width: 100%;
  height: 100%;
  background-color: transparent; /* <-- E ADICIONADO AQUI */
  /* Nota: A propriedade "filter" não é padrão no React Native e pode não funcionar.
     Para sombras, o ideal é usar as propriedades shadow- no componente wrapper. */
`;

// --- Tipos ---
export const TypesContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
  padding-top: 20px;
`;

export const TypeText = styled(Text)`
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
`;

// Novo estilo para o tipo no Header, com mais destaque
export const HeaderTypeTag = styled(View)`
  padding: 8px 15px;
  border-radius: 20px;
  margin-right: 10px;
  /* A cor de fundo agora é dinâmica, baseada na propriedade recebida */
  background-color: ${(props) => props.backgroundColor || 'rgba(255, 255, 255, 0.25)'};
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 2px;
`;

// --- Conteúdo ---
export const CartoonContainer = styled(View)`
  margin-top: -60px;
  background-color: ${cartoonColors.cardBackground};
  border-radius: 25px;
  min-height: 400px;
`;

export const Content = styled(View)`
  padding: 20px;
  padding-top: 30px;
`;

export const DescriptionText = styled(Text)`
  font-size: 16px;
  color: ${cartoonColors.lightText};
  text-align: center;
  font-style: italic;
  margin-bottom: 25px;
  line-height: 24px;
`;

export const SectionTitle = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  color: ${cartoonColors.text};
  margin-top: 20px;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom-width: 3px;
  border-bottom-color: ${(props) => props.typeColor || cartoonColors.accent};
  align-self: flex-start;
`;

export const InfoRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
  background-color: #F9F9F9;
  padding: 10px;
  border-radius: 10px;
`;

export const Label = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: ${cartoonColors.text};
`;

export const Value = styled(Text)`
  font-size: 16px;
  color: ${cartoonColors.lightText};
`;

export const AbilityText = styled(Text)`
  font-size: 16px;
  margin-bottom: 8px;
  color: ${cartoonColors.text};
  background-color: #F9F9F9;
  padding: 10px;
  border-radius: 10px;
  text-transform: capitalize;
`;

// --- Stats ---
export const StatRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 8px;
`;

export const StatName = styled(Text)`
  font-size: 16px;
  text-transform: capitalize;
  font-weight: 600;
  color: ${cartoonColors.text};
`;

export const StatValue = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${cartoonColors.accent};
  min-width: 30px;
  text-align: right;
`;

// --- Botão ---
export const ShareButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.typeColor || cartoonColors.accent};
  padding: 18px;
  border-radius: 18px;
  align-items: center;
  margin-top: 30px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
`;

export const ShareButtonText = styled(Text)`
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
`;

// --- Estilos da Lista (mantidos para consistência) ---
// (O restante do código de Styles.js permanece o mesmo)

export const ListContainer = styled(View)`
  flex: 1;
  background-color: #f0f0f0;
`;

export const ListItemContainer = styled(View)`
  flex: 1;
  padding: 5px;
`;

export const PokemonCard = styled(TouchableOpacity)`
  background-color: ${props => props.backgroundColor || '#3498db'};
  border-radius: 15px;
  padding: 10px;
  height: 150px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 5px;
  overflow: hidden;
  position: relative;
  justify-content: space-between;
`;

export const PokemonNumber = styled(Text)`
  font-size: 12px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
`;

export const PokemonNameInList = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-transform: capitalize;
  margin-bottom: 5px;
`;

export const PokemonImageInList = styled(Image)`
  width: 80px;
  height: 80px;
  position: absolute;
  bottom: 5px;
  right: 5px;
  z-index: 1;
`;

export const NameAndTypesContainer = styled(View)`
  align-self: flex-start;
  max-width: 70%;
`;

export const TypesContainerInList = styled(View)`
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0;
`;

export const TypeTagInList = styled(View)`
  padding-horizontal: 8px;
  padding-vertical: 3px;
  border-radius: 10px;
  margin-bottom: 5px;
  background-color: rgba(255, 255, 255, 0.3);
  align-self: flex-start;
`;

export const TypeTextInList = styled(Text)`
  color: white;
  font-size: 10px;
  font-weight: bold;
  text-transform: capitalize;
`;

export const FooterContainer = styled(View)`
  padding: 16px;
  align-items: center;
`;

export const FooterText = styled(Text)`backgroundColor: 'transparent'
  font-size: 14px;
  color: #666666;
  text-align: center;
`;

export const LoadMoreButton = styled(TouchableOpacity)`
  padding: 16px;
  align-items: center;
  background-color: transparent;
`;

export const LoadMoreText = styled(Text)`
  font-size: 14px;
  color: #3498db;
  font-weight: bold;
`;

export const LoadingFooter = styled(View)`
  padding: 16px;
  align-items: center;
`;