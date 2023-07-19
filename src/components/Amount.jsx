import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Amount = ({amount, style}) => {
  const formattedAmount = Number(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'PHP',
  });

  return <Text style={StyleSheet.create(style)}>{formattedAmount}</Text>;
};

export default Amount;
