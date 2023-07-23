import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import dayjs from 'dayjs';
import {MONEY_TRACKER_TOKEN, MONEY_TRACKER_URL} from '@env';

import TransactionsByDate from './TransactionsByDate';

const DATE_FORMAT = 'MMMM DD, dddd';

const Body = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(`${MONEY_TRACKER_URL}/txns`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${MONEY_TRACKER_TOKEN}`,
      },
    })
      .then(response => response.json())
      .then(data => setTransactions(data));
  }, []);

  const transactionsGroupByDate = transactions.reduce((acc, curr) => {
    const date = dayjs(curr.created_at).format(DATE_FORMAT);

    return {
      ...acc,
      [date]: [...(acc[date] || []), curr],
    };
  }, {});

  return (
    <View className="h-3/4 items-center bg-neutral-100 pb-4 pt-4">
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
