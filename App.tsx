import React, { ReactNode } from 'react';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import DiscoverScreen from './src/DiscoverScreen';
import AraScreen from './src/AraScreen';

const Tab = createMaterialBottomTabNavigator() as any;

const NewOcticons = Octicons as any;
const NewIonicons = Ionicons as any;

const App = () => {
  return(
    <NavigationContainer>
    <Tab.Navigator initialRouteName='Discover' activeColor={'#11f'} inactiveColor={'#777'} barStyle={{ backgroundColor: '#fff' }}>
      <Tab.Screen name='Discover' component={DiscoverScreen} options={{ taBarLabel: 'Discover', tabBarIcon: ( { color }:any ) => <NewOcticons name="north-star" size={24} color={color} /> }} />
      <Tab.Screen name='Ara' component={AraScreen} options={{ tabBarLabel: 'Ara', tabBarIcon: ( { color }:any ) => <NewIonicons name="search" size={24} color={color} />, tabBarStye: { display: 'none' } }} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;