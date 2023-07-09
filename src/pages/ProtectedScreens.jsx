import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './Home';

const Stack = createNativeStackNavigator();

const ProtectedScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default ProtectedScreens;
