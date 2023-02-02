import {useIsFocused} from '@react-navigation/native';
import {doc, onSnapshot} from 'firebase/firestore';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {MessageCard} from '../components/MessageCard';
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

  const scrollViewRef = useRef() as any;
  return (
    <View>
      <View style={styles.messageView}>
        <ScrollView
          style={styles.scrollView}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}>
          {state && (
            <View>
              {state.messages.map((message, index) => {
                return (
                  <MessageCard
                    key={`${message}-${index}`}
                    text={message.messageText}
                    avatar={message.senderAvatar}
                    date={message.messageDate}
                    name={message.senderName}
                  />
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
      <View style={styles.row}>
        <TextInput
          placeholder="Add message..."
          placeholderTextColor={'black'}
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
    color: 'black',
  },
  textInputEmpty: {
    width: '90%',
    height: 40,
    marginVertical: 12,
    marginHorizontal: '4%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: 'black',
  },
  messageView: {
    justifyContent: 'flex-end',
    height: '80%',
  },
  scrollView: {},
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
