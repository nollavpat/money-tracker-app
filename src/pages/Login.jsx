import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

const Login = ({navigation}) => {
  return (
    <View style={styles.screenContainer}>
      <Button
        title="Enter"
        onPress={async () => {
          rnBiometrics
            .simplePrompt({promptMessage: 'Confirm fingerprint'})
            .then(resultObject => {
              const {success} = resultObject;

              if (success) {
                navigation.navigate('Home');
              } else {
                console.log('user cancelled biometric prompt');
              }
            })
            .catch(() => {
              console.log('biometrics failed');
            });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
