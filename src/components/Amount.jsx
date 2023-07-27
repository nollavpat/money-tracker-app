import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Amount = ({amount, style, isHidden}) => {
  const formattedAmount = Number(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'PHP',
  });

  return (
    <Text style={StyleSheet.create(style)}>
      {isHidden ? [...formattedAmount].map(n => '*') : formattedAmount}
    </Text>
  );
};

export default Amount;
