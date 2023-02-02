import {useIsFocused} from '@react-navigation/native';
import {doc, onSnapshot} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {ChatRoom} from '../entities/chatRoom';
import {getChatRoom, submitMessage} from '../firebase/chatRoom';
import {db} from '../firebase/config';

interface Props {
  navigation: any;
  route: any;
}

export const ChatRoomPage = (props: Props) => {
  const [state, setState] = useState<ChatRoom>();
  const [inputText, setInputText] = useState<string>('');
  const [snapshot, setSnapshot] = useState<ChatRoom>();

  const isFocused = useIsFocused();
  const chatRoomId = props.route.params.name as number;
  useEffect(() => {
    if (isFocused) {
      getChatRoom(chatRoomId).then(response => {
        setState(response);
      });
      const messagesRef = doc(db, 'ChatRooms', chatRoomId.toString());
      onSnapshot(messagesRef, docSnap => {
        if (docSnap.exists()) {
          const snapData = docSnap.data();
          const chatRoom = snapData as ChatRoom;
          setSnapshot(chatRoom);
        }
      });
    }
  }, [isFocused]);

  useEffect(() => {
    if (snapshot) {
      if (state) {
        setState({...state, messages: snapshot.messages});
      }
    }
  }, [snapshot]);

  return (
    <View>
      <ScrollView style={styles.scrollView}>
        {state && (
          <View>
            {state.messages.map((message, index) => {
              return (
                <View key={`${message}-${index}`}>
                  <Text style={styles.messageText}>{message.messageText}</Text>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
      <View style={styles.row}>
        <TextInput
          placeholder="Add message..."
          style={inputText ? styles.textInputFilled : styles.textInputEmpty}
          value={inputText}
          onChangeText={setInputText}
        />
        {inputText ? (
          <Pressable
            onPress={async () => {
              setInputText('');
              await submitMessage({chatRoomId, text: inputText});
            }}>
            <Image
              style={styles.chevronIcon}
              source={require('../images/Send.png')}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputFilled: {
    width: '80%',
    height: 40,
    marginVertical: 12,
    marginHorizontal: '4%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  textInputEmpty: {
    width: '90%',
    height: 40,
    marginVertical: 12,
    marginHorizontal: '4%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  scrollView: {
    height: '80%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevronIcon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  messageText: {
    color: 'black',
    fontSize: 20,
  },
});
