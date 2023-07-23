import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import dayjs from 'dayjs';
import {useAtom} from 'jotai';

import TransactionsByDate from './TransactionsByDate';

import {homeFrom, homeTo} from '../../../states/transactions';
import TransactionWebservice from '../../../webservices/money_tracker/TransactionWebservice';

const DATE_FORMAT = 'MMMM DD, dddd';

const Body = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fromDate] = useAtom(homeFrom);
  const [toDate] = useAtom(homeTo);

  const getTransactions = async (from, to) => {
    setIsLoading(true);

    const [error, data] = await TransactionWebservice.getTransactions(from, to);

    setIsLoading(false);

    if (!error) {
      setTransactions(data);
    }
  };

  useEffect(() => {
    getTransactions(fromDate, toDate);
  }, [fromDate, toDate]);

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
      <FlatList
        keyExtractor={transactionDate => transactionDate}
        data={Object.keys(transactionsGroupByDate)}
        renderItem={({item: transactionDate}) => (
          <TransactionsByDate
            transactionDate={transactionDate}
            transactions={transactionsGroupByDate[transactionDate]}
          />
        )}
        refreshing={isLoading}
        onRefresh={async () => getTransactions(fromDate, toDate)}
      />
    </View>
  );
};

export default Body;
