import React from 'react';
import {ScrollView, StyleSheet, Switch, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
  const otherWallets = [
    {
      name: 'gcash',
      backgroundColor: '#93c5fd',
    },
    {
      name: 'rcbc',
      backgroundColor: '#fca5a5',
    },
    {
      name: 'rcbc cc',
      backgroundColor: '#D8B4FE',
    },
    {
      name: 'plus 1',
      backgroundColor: '#F5F5F4',
    },
  ];

  return (
    <View style={styles.screenContainer}>
      <View style={styles.heading}>
        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.title}>MT</Text>
          </View>
          <View style={styles.settingsContainer}>
            <MaterialIcons name="settings" size={24} color="#22C55E" />
          </View>
        </View>
        <View style={styles.balanceContainer}>
          <View>
            <Text style={styles.balanceLabel}>Balance</Text>
            <Text style={styles.balance}>₱ 1,000,000</Text>
          </View>
          <Switch />
        </View>
      </View>
      <View style={styles.walletsContainer}>
        <View style={styles.selectedWallet}>
          <Text>ub</Text>
        </View>
        <ScrollView horizontal>
          {otherWallets.map(({name, backgroundColor}) => (
            <View key={name} style={styles.otherWallet({backgroundColor})}>
              <Text>{name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.body}>
        <Text>body</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    height: '100%',
  },
  heading: {
    backgroundColor: '#22C55E',
    height: '27%',
    padding: 16,
  },
  titleContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    color: '#DCFCE7',
    fontFamily: 'Roboto',
    fontSize: 36,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  settingsContainer: {
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderRadius: 30,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  balanceContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  balanceLabel: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  balance: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  walletsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: -40,
    paddingHorizontal: 32,
  },
  selectedWallet: {
    backgroundColor: '#FDBA74',
    borderRadius: 10,
    height: 80,
    marginRight: 24,
    width: 120,
  },
  otherWallet: ({backgroundColor}) => {
    return {
      backgroundColor,
      borderRadius: 10,
      height: 60,
      marginRight: 24,
      width: 70,
    };
  },
  body: {
    flexGrow: 1,
  },
});

export default Home;
