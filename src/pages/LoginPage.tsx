import React from 'react';
import {View, StyleSheet} from 'react-native';
import {onGoogleButtonPress} from '../firebase/auth';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

export const LoginPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={styles.googleButton}
        onPress={() =>
          onGoogleButtonPress().then(result => {
            if (result) {
              navigation.navigate('LobbyPage');
            }
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    width: '60%',
    marginTop: 40,
  },
});
