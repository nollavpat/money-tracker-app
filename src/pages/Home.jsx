import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

import Amount from '../components/Amount';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const firstDay = new Date(year, month, 1);
const lastDay = new Date(year, month + 1, 0);
const DATE_PICKER_FORMAT = 'MMMM D YYYY';

const Home = () => {
  const [fromDate, setFromDate] = useState(firstDay);
  const [toDate, setToDate] = useState(lastDay);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  const onDateSelect = type => (event, selectedDate) => {
    if (type === 'to') {
      setToDate(selectedDate);
      setShowToDatePicker(false);
    } else {
      setFromDate(selectedDate);
      setShowFromDatePicker(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text className="text-3xl font-medium text-green-500">MT</Text>
        <View className="mt-4">
          <View className="flex flex-row justify-center gap-4">
            <Pressable onPress={() => setShowFromDatePicker(true)}>
              <Text className="text-neutral-500 underline">
                {dayjs(fromDate).format(DATE_PICKER_FORMAT)}
              </Text>
            </Pressable>
            <Text className="text-neutral-500">-</Text>
            <Pressable onPress={() => setShowToDatePicker(true)}>
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
        {showFromDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={fromDate}
            mode="date"
            onChange={onDateSelect('from')}
          />
        )}
        {showToDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={toDate}
            mode="date"
            onChange={onDateSelect('to')}
            minimumDate={fromDate}
          />
        )}
      </View>
      <View className="bg-neutral-100">
        <Text>hello</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fafafa',
    elevation: 10,
    height: 160,
    paddingHorizontal: 16,
    paddingTop: 16,
    shadowColor: '#0a0a0a',
    zIndex: 2,
  },
});

export default Home;
