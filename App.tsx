import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/login';
import GarageScreen from './screens/garage';
import AddCarScreen from './screens/addCar';
import { GarageProvider } from './GarageContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GarageProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Garage" component={GarageScreen} />
          <Stack.Screen name="Add a Car" component={AddCarScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GarageProvider>
  );
}
