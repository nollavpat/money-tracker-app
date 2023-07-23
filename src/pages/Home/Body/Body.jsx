import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import dayjs from 'dayjs';

import TransactionsByDate from './TransactionsByDate';

import TransactionWebservice from '../../../webservices/money_tracker/TransactionWebservice';

const DATE_FORMAT = 'MMMM DD, dddd';

const Body = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const [error, data] = await TransactionWebservice.getTransactions();

      setIsLoading(false);

      if (!error) {
        setTransactions(data);
      }
    })();
  }, []);

  const transactionsGroupByDate = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      const date = dayjs(curr.created_at).format(DATE_FORMAT);

      return {
        ...acc,
        [date]: [...(acc[date] || []), curr],
      };
    }, {});
  }, [transactions]);

  return (
    <View className="flex-grow items-center justify-center bg-neutral-100">
      {(() => {
        if (isLoading) {
          return <ActivityIndicator size="large" color="#22c55e" />;
        } else {
          return (
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
          );
        }
      })()}
    </View>
  );
};

export default Body;
