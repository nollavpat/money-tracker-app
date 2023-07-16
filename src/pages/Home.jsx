import React, {useState} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

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
      <View className="p-4">
        <View className="h-32">
          <Text className="text-3xl font-medium text-green-500">MT</Text>
          <View className="mt-10">
            <View className="flex flex-row justify-center gap-4">
              <Pressable onPress={() => setShowFromDatePicker(true)}>
                <Text className="text-neutral-500">
                  {dayjs(fromDate).format(DATE_PICKER_FORMAT)}
                </Text>
              </Pressable>
              <Text className="text-neutral-500">-</Text>
              <Pressable onPress={() => setShowToDatePicker(true)}>
                <Text className="text-neutral-500">
                  {dayjs(toDate).format(DATE_PICKER_FORMAT)}
                </Text>
              </Pressable>
            </View>
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
      </View>
    </SafeAreaView>
  );
};

export default Home;
