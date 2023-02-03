import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, RefreshControl, ScrollView} from 'react-native';
import {ChatRoomCard} from '../components/ChatRoomCard';
import {ChatRoom} from '../entities/chatRoom';
import {getChatRooms} from '../firebase/chatRoom';

export const LobbyPage = ({navigation}) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getChatRooms().then(response => {
        response.sort((a, b) => {
          const dateA = new Date(a.lastModified);
          const dateB = new Date(b.lastModified);
          return dateA < dateB ? 1 : -1;
        });
        setChatRooms(response);
      });
    }
  }, [isFocused]);

  useEffect(() => {
    getChatRooms().then(response => {
      response.sort((a, b) => {
        const dateA = new Date(a.lastModified);
        const dateB = new Date(b.lastModified);
        return dateA < dateB ? 1 : -1;
      });
      setChatRooms(response);
    });
    setRefreshing(false);
  }, [refreshing]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />
      }>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chatRoomCard: {
    marginVertical: 20,
    alignItems: 'center',
  },
});
