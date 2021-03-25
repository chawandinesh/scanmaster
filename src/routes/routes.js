import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/Scanner';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export default function routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
