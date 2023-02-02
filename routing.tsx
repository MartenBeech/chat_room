import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatRoomPage} from './src/pages/ChatRoomPage';
import {LobbyPage} from './src/pages/LobbyPage';
import {LoginPage} from './src/pages/LoginPage';

const Stack = createNativeStackNavigator();

export const Routing = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="LobbyPage" component={LobbyPage} />
        <Stack.Screen name="ChatRoomPage" component={ChatRoomPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
