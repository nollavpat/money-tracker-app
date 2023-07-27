import React, {useState, useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import {useAtom} from 'jotai';

import Amount from '../../components/Amount';

import {
  homeFromAtom,
  homeToAtom,
  transactionsAtom,
} from '../../states/transactions';

const DATE_PICKER_FORMAT = 'MMMM D, YYYY';

const Header = () => {
  const [fromDate, setFromDate] = useAtom(homeFromAtom);
  const [toDate, setToDate] = useAtom(homeToAtom);
  const [transactions] = useAtom(transactionsAtom);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerProps, setDatePickerProps] = useState({});

  const onDateSelect = type => (event, selectedDate) => {
    if (type === 'from') {
      if (+selectedDate !== +fromDate) {
        setFromDate(selectedDate.toUTCString());
      }
    } else if (type === 'to') {
      if (+selectedDate !== +toDate) {
        selectedDate.setHours(23, 59);

        setToDate(selectedDate.toUTCString());
      }
    }

    setShowDatePicker(false);
  };

  const totalExpense = useMemo(() => {
    const expenses = transactions.reduce((acc, curr) => {
      if (Number(curr.amount) > 0) {
        return acc;
      }

      return acc + Number(curr.amount);
    }, 0);

    return Math.abs(expenses);
  }, [transactions]);

  const totalIncome = useMemo(() => {
    const expenses = transactions.reduce((acc, curr) => {
      if (Number(curr.amount) < 0) {
        return acc;
      }

      return acc + Number(curr.amount);
    }, 0);

    return Math.abs(expenses);
  }, [transactions]);

  return (
    <View style={styles.header}>
      <Text className="text-3xl font-medium text-green-500">MT</Text>
      <View className="mt-4">
        <View className="flex flex-row justify-center gap-4">
          <Pressable
            onPress={() => {
              setDatePickerProps({
                value: fromDate,
                onChange: onDateSelect('from'),
                maximumDate: toDate,
              });
              setShowDatePicker(true);
            }}>
            <Text className="text-neutral-500 underline">
              {dayjs(fromDate).format(DATE_PICKER_FORMAT)}
            </Text>
          </Pressable>
          <Text className="text-neutral-500">-</Text>
          <Pressable
            onPress={() => {
              setDatePickerProps({
                value: toDate,
                onChange: onDateSelect('to'),
                minimumDate: fromDate,
              });
              setShowDatePicker(true);
            }}>
            <Text className="text-neutral-500 underline">
              {dayjs(toDate).format(DATE_PICKER_FORMAT)}
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.summaryContainer}>
        <View className="items-center">
          <Text className="text-neutral-500">EXPENSE</Text>
          <Amount className="font-medium text-red-500 " amount={totalExpense} />
        </View>
        <View className="items-center">
          <Text className="text-neutral-500">INCOME</Text>
          <Amount
            className="font-medium text-green-500 "
            amount={totalIncome}
          />
        </View>
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          mode="date"
          {...datePickerProps}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fafafa',
    elevation: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#0a0a0a',
    zIndex: 2,
  },
  summaryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16,
  },
});

export default Header;
