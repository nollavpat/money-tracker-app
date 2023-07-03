import React, {useEffect, useRef} from 'react';
import {AppState} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAtom} from 'jotai';

import Home from './src/pages/Home';
import Login from './src/pages/Login';
import {loggedInAtom} from './src/states/auth';

const Stack = createNativeStackNavigator();

const App = () => {
  const appState = useRef(AppState.currentState);
  const [isLoggedIn, setLoggedIn] = useAtom(loggedInAtom);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        setLoggedIn(false);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {(() => {
          if (isLoggedIn) {
            return <Stack.Screen name="Home" component={Home} />;
          } else {
            return <Stack.Screen name="Login" component={Login} />;
          }
        })()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
