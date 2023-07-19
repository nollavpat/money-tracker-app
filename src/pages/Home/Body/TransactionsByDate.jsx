import React from 'react';
import {FlatList, Text, View} from 'react-native';

import Transaction from './Transaction';

const TransactionsByDate = ({transactionDate, transactions}) => {
  return (
    <View className="my-2 min-w-full p-2">
      <View className="border-b border-neutral-600 p-1">
        <Text>{transactionDate}</Text>
      </View>
      <FlatList
        data={transactions}
        keyExtractor={transaction => transaction.id}
        renderItem={({item}) => <Transaction transaction={item} />}
      />
    </View>
  );
};

export default TransactionsByDate;
