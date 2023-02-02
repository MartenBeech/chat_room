import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ChatRoomCard} from '../components/ChatRoomCard';
import {ChatRoom} from '../entities/chatRoom';
import {getChatRooms} from '../firebase/chatRoom';

export const LobbyPage = ({navigation}) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getChatRooms().then(response => {
        setChatRooms(response);
      });
    }
  }, [isFocused]);

  return (
    <View>
      {chatRooms.map((chatRoom, index) => {
        return (
          <View key={`${chatRoom.title}-${index}`} style={styles.chatRoomCard}>
            <ChatRoomCard
              description={chatRoom.description}
              title={chatRoom.title}
              onPress={() =>
                navigation.navigate('ChatRoomPage', {name: chatRoom.id})
              }
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  chatRoomCard: {
    marginTop: 40,
    alignItems: 'center',
  },
});
