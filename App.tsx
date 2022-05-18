import React, { ReactNode } from 'react';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';

import MainScreen from './src/MainScreen';
import DiscoverScreen from './src/DiscoverScreen';
import AraScreen from './src/AraScreen';
import SonucScreen from './src/SonucScreen';

const Stack = createNativeStackNavigator() as any;
const Tab = createMaterialBottomTabNavigator() as any;

const NewOcticons = Octicons as any;
const NewIonicons = Ionicons as any;

const Home = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Discover' activeColor={'#11f'} inactiveColor={'#777'} barStyle={{ backgroundColor: '#fff' }}>
        <Tab.Screen name='Discover' component={DiscoverScreen} options={{ taBarLabel: 'Discover', tabBarIcon: ({ color }: any) => <NewOcticons name="north-star" size={24} color={color} /> }} />
        <Tab.Screen name='Ara' component={AraScreen} options={{ tabBarLabel: 'Ara', tabBarIcon: ({ color }: any) => <NewIonicons name="search" size={24} color={color} />, display: 'none' }} barStyle={{ display: 'none' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Discover' component={DiscoverScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Ara' component={AraScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Sonuc' component={SonucScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;