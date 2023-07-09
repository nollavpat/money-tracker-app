import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAtom} from 'jotai';

import {loggedInAtom} from '../states/auth';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

const Login = ({navigation}) => {
  const [, setLoggedIn] = useAtom(loggedInAtom);

  const onFingerprint = () => {
    rnBiometrics
      .simplePrompt({promptMessage: 'Confirm fingerprint'})
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          setLoggedIn(true);
          navigation.navigate('Home');
        } else {
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>MT</Text>
      </View>
      <View style={styles.greetingsContainer}>
        <Text style={styles.greetings}>Hello Patrick,</Text>
        <View style={styles.subGreetingsContainer}>
          <Text style={styles.subGreeting}>Fucking save man, don't</Text>
          <Text style={styles.subGreeting}>be an idiot.</Text>
        </View>
      </View>
      <View style={styles.fingerprintContainer}>
        <View style={styles.fingerprintButtonContainer}>
          <Pressable onPress={onFingerprint}>
            <MaterialIcons name="fingerprint" size={64} color="#FAFAFA" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#FAFAFA',
    height: '100%',
    padding: 16,
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    color: '#22C55E',
    fontFamily: 'Roboto',
    fontSize: 36,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  greetingsContainer: {
    marginTop: 160,
    paddingHorizontal: 16,
  },
  greetings: {
    color: '#000',
    fontFamily: 'Roboto',
    fontSize: 36,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  subGreetingsContainer: {
    paddingHorizontal: 18,
  },
  subGreeting: {
    color: '#737373',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  fingerprintContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  fingerprintButtonContainer: {
    alignItems: 'center',
    backgroundColor: '#22C55E',
    borderRadius: 42,
    height: 84,
    justifyContent: 'center',
    width: 84,
  },
});

export default Login;
