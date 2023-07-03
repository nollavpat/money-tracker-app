import React, {useEffect} from 'react';
import {Alert, BackHandler, Text, View} from 'react-native';
import {useAtom} from 'jotai';

import {loggedInAtom} from '../states/auth';

const Home = () => {
  const [isLoggedIn] = useAtom(loggedInAtom);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View>
      <Text>Logged in? {isLoggedIn.toString()}</Text>
    </View>
  );
};

export default Home;
