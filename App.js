import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './components/List';
import Details from './components/Details';
import { navigationScreenOptions } from './components/Styles'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="List"
        screenOptions={navigationScreenOptions}
      >
        <Stack.Screen 
          name="List" 
          component={List} 
          options={{ title: 'TaqtileDex' }}
        />
        <Stack.Screen 
          name="Details" 
          component={Details} 
          options={({ route }) => ({ title: route.params.pokemonName || 'TaqtileDex' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}