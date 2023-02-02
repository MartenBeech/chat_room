import React from 'react';
import {View, Button} from 'react-native';
import {onGoogleButtonPress} from '../firebase/auth';

export const LoginPage = ({navigation}) => {
  return (
    <View>
      <Button
        title="Go to lobby"
        onPress={() =>
          onGoogleButtonPress().then(() => navigation.navigate('LobbyPage'))
        }
      />
    </View>
  );
};
