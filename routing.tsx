import * as React from 'react';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatRoomPage} from './src/pages/ChatRoomPage';
import {LobbyPage} from './src/pages/LobbyPage';
import {LoginPage} from './src/pages/LoginPage';
import {Pressable, Text, StyleSheet, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator();

export const Routing = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({route, navigation}) => ({
          headerRight: () =>
            route.name != 'LoginPage' && (
              <Pressable
                onPress={async () => {
                  try {
                    await GoogleSignin.signOut();
                    navigation.navigate('LoginPage');
                  } catch (error) {
                    console.error(error);
                  }
                }}>
                <Text style={styles.headerText}>Log out</Text>
              </Pressable>
            ),
        })}>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="LobbyPage" component={LobbyPage} />
        <Stack.Screen name="ChatRoomPage" component={ChatRoomPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerText: {
    marginRight: 20,
    color: 'black',
  },
});
