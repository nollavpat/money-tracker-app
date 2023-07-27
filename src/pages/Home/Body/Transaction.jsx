import React from 'react';
import {Image, Text, View} from 'react-native';

import Amount from '../../../components/Amount';
import Tag from './Tag';

const Transaction = ({transaction}) => {
  const amountStyle = amount => {
    if (amount > 0) {
      return 'text-green-500';
    }

    return 'text-red-500';
  };

  return (
    <View className="flex-row justify-center space-x-1 px-2 py-1">
      <Image
        className="h-8 w-8 rounded-full"
        source={{uri: transaction.wallet.logo_url}}
      />
      <View className="grow justify-start border-0 border-b border-solid border-neutral-300">
        <View className="flex-row justify-between">
          <View>
            <Text>{transaction.name}</Text>
            <View className="flex-row justify-start">
              {transaction.tags.map(tag => (
                <Tag key={tag} label={tag} />
              ))}
            </View>
          </View>
          <View className="items-end">
            <Amount
              className={amountStyle(transaction.amount)}
              amount={transaction.amount}
            />
            <View className="flex-row">
              <Tag label={transaction.purpose} />
              <Tag className="ml-2" label={transaction.category} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Transaction;
