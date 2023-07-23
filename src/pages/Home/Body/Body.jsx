import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import dayjs from 'dayjs';

import TransactionsByDate from './TransactionsByDate';
import TransactionWebservice from '../../../webservices/money_tracker/TransactionWebservice';

const DATE_FORMAT = 'MMMM DD, dddd';

const Body = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    (async () => {
      const [error, data] = await TransactionWebservice.getTransactions();

      if (!error) {
        setTransactions(data);
      }
    })();
  }, []);

  const transactionsGroupByDate = transactions.reduce((acc, curr) => {
    const date = dayjs(curr.created_at).format(DATE_FORMAT);

    return {
      ...acc,
      [date]: [...(acc[date] || []), curr],
    };
  }, {});

  return (
    <View className="items-center bg-neutral-100">
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
