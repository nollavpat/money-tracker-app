import React from 'react';
import {Pressable, Text, View} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAtom} from 'jotai';

import {loggedInAtom} from '../states/auth';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

const Login = ({navigation}) => {
  const [, setLoggedIn] = useAtom(loggedInAtom);

  const onFingerprint = async () => {
    try {
      const {success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Confirm fingerprint',
      });

      if (success) {
        setLoggedIn(true);
        navigation.navigate('ProtectedScreens');
      } else {
        console.log('user cancelled biometric prompt');
      }
    } catch (error) {
      console.log('biometrics failed');
      console.error(error);
    }
  };

  return (
    <View className="p-6">
      <Text className="text-3xl font-medium text-green-500">MT</Text>
      <View className="mt-40">
        <Text className="text-3xl font-bold text-neutral-950">
          Hello Patrick,
        </Text>
        <View className="mx-6">
          <Text className="text-xl font-normal text-neutral-500">
            Fucking save man, don't
          </Text>
          <Text className="text-xl font-normal text-neutral-500">
            be an idiot.
          </Text>
        </View>
      </View>
      <View className="mt-52 items-center justify-center">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-green-500">
          <Pressable onPress={onFingerprint}>
            <MaterialIcons name="fingerprint" size={64} color="#FAFAFA" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;
