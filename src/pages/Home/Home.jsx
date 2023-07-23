import React from 'react';
import {View} from 'react-native';

import Body from './Body/Body';
import Header from './Header';

const Home = () => {
  return (
    <View className="flex-1">
      <Header />
      <Body />
    </View>
  );
};

export default Home;
