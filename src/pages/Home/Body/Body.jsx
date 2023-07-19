import React from 'react';
import {FlatList, Text, View} from 'react-native';
import dayjs from 'dayjs';

import TransactionsByDate from './TransactionsByDate';

const transactions = [
  {
    id: 1,
    amount: -100,
    name: 'Grocery',
    purpose: 'food',
    tags: ['japan'],
    createdAt: new Date('2023-07-15 11:20:00'),
  },
  {
    id: 2,
    amount: -100,
    name: 'Clothes',
    purpose: 'apparel',
    tags: ['japan'],
    createdAt: new Date('2023-07-15 11:20:00'),
  },
  {
    id: 3,
    amount: -100,
    name: 'MRT',
    purpose: 'commute',
    tags: ['japan'],
    createdAt: new Date('2023-07-15 11:20:00'),
  },
  {
    id: 4,
    amount: -100,
    name: 'Food',
    purpose: 'travel',
    tags: ['japan'],
    createdAt: new Date('2023-07-15 11:20:00'),
  },
  {
    id: 5,
    amount: -100,
    name: 'Grocery',
    purpose: 'food',
    tags: ['japan'],
    createdAt: new Date('2023-07-16 11:20:00'),
  },
  {
    id: 6,
    amount: -100,
    name: 'Clothes',
    purpose: 'apparel',
    tags: ['japan'],
    createdAt: new Date('2023-07-16 11:20:00'),
  },
  {
    id: 7,
    amount: -100,
    name: 'MRT',
    purpose: 'commute',
    tags: ['japan'],
    createdAt: new Date('2023-07-16 11:20:00'),
  },
  {
    id: 8,
    amount: -100,
    name: 'Food',
    purpose: 'travel',
    tags: ['japan'],
    createdAt: new Date('2023-07-16 11:20:00'),
  },
  {
    id: 9,
    amount: -100,
    name: 'Grocery',
    purpose: 'food',
    tags: ['japan'],
    createdAt: new Date('2023-07-17 11:20:00'),
  },
  {
    id: 10,
    amount: -100,
    name: 'Clothes',
    purpose: 'apparel',
    tags: ['japan'],
    createdAt: new Date('2023-07-17 11:20:00'),
  },
  {
    id: 11,
    amount: -100,
    name: 'MRT',
    purpose: 'commute',
    tags: ['japan'],
    createdAt: new Date('2023-07-17 11:20:00'),
  },
  {
    id: 12,
    amount: -100,
    name: 'Food',
    purpose: 'travel',
    tags: ['japan'],
    createdAt: new Date('2023-07-17 11:20:00'),
  },
];
const DATE_FORMAT = 'MMMM DD, dddd';

const Body = () => {
  transactions.sort((t1, t2) => {
    if (t1.createdAt < t2.createdAt) {
      return 1;
    }

    if (t1.createdAt > t2.createdAt) {
      return -1;
    }

    return 0;
  });

  const transactionsGroupByDate = transactions.reduce((acc, curr) => {
    const date = dayjs(curr.createdAt).format(DATE_FORMAT);

    return {
      ...acc,
      [date]: [...(acc[date] || []), curr],
    };
  }, {});

  return (
    <View className="h-full items-center bg-neutral-100 pt-4">
      <FlatList
        keyExtractor={transactionDate => transactionDate}
        data={Object.keys(transactionsGroupByDate)}
        renderItem={({item: transactionDate}) => (
          <TransactionsByDate
            transactionDate={transactionDate}
            transactions={transactionsGroupByDate[transactionDate]}
          />
        )}
      />
    </View>
  );
};

export default Body;
