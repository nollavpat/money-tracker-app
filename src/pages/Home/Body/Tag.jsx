import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Tag = ({label, style}) => {
  return (
    <View style={StyleSheet.create(style)}>
      <Text>{label}</Text>
    </View>
  );
};

export default Tag;
