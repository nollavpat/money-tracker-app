import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import {useAtom} from 'jotai';

import Amount from '../../components/Amount';

import {homeFromAtom, homeToAtom} from '../../states/transactions';

const DATE_PICKER_FORMAT = 'MMMM D, YYYY';

const Header = () => {
  const [fromDate, setFromDate] = useAtom(homeFromAtom);
  const [toDate, setToDate] = useAtom(homeToAtom);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerProps, setDatePickerProps] = useState({});

  const onDateSelect = type => (event, selectedDate) => {
    if (type === 'from') {
      if (+selectedDate !== +fromDate) {
        setFromDate(selectedDate);
      }
    } else if (type === 'to') {
      if (+selectedDate !== +toDate) {
        setToDate(selectedDate);
      }
    }

    setShowDatePicker(false);
  };

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
      <View className="mt-4 items-center">
        <Text className="text-neutral-500">EXPENSES</Text>
        <Amount className="font-medium text-green-500 " amount="10000" />
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
});

export default Header;
