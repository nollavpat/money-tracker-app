import React from 'react';
import {SafeAreaView, View} from 'react-native';

import Body from './Body/Body';
import Header from './Header';

const Home = () => {
  return (
    <SafeAreaView>
      <View>
        <Header />
        <Body />
      </View>
    </SafeAreaView>
  );
};

export default Home;
