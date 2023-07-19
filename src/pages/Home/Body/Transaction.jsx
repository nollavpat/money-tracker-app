import React from 'react';
import {Text, View} from 'react-native';

const Transaction = ({transaction}) => {
  return (
    <View>
      <Text>{transaction.name}</Text>
    </View>
  );
};

export default Transaction;
