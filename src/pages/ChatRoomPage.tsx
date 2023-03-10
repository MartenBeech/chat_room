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
import {Message} from '../entities/message';
import {getChatRoom, submitMessage} from '../firebase/chatRoom';
import {db} from '../firebase/config';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {uploadImage} from '../firebase/storage';

interface Props {
  navigation: any;
  route: any;
}

let nMessagesShown = 0;

export const ChatRoomPage = (props: Props) => {
  const [state, setState] = useState<ChatRoom>();
  const [inputText, setInputText] = useState<string>('');
  const [snapshot, setSnapshot] = useState<ChatRoom>();
  const [messagesShown, setMessagesShown] = useState<Message[]>([]);

  const isFocused = useIsFocused();
  const chatRoomId = props.route.params.name as number;
  useEffect(() => {
    if (isFocused) {
      nMessagesShown = 50;
      scrollViewRef.current.scrollToEnd();
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
        filterMessages(snapshot.messages);
      }
      setState(snapshot);
    }
  }, [snapshot]);

  const filterMessages = (messages: Message[]) => {
    if (state) {
      if (messagesShown.length < messages.length) {
        const newMessages = [...messages];
        setMessagesShown(
          newMessages.splice(
            newMessages.length - nMessagesShown,
            state.messages.length + 1,
          ),
        );
      }
    }
  };

  const sendImage = async (result: ImagePickerResponse) => {
    if (result && result.assets) {
      const data = result.assets[0];
      if (data.uri) {
        const response = await fetch(data.uri);
        const blob = await response.blob();
        const image = new File([blob], `${data.uri}`, {
          type: blob.type,
        }) as any;
        await uploadImage({
          roomId: chatRoomId,
          image: image,
          name: image.data.blobId,
        });
        await submitMessage({
          chatRoomId,
          text: image.data.blobId,
          isImage: true,
        });
      }
    }
  };

  const scrollViewRef = useRef() as any;
  return (
    <View>
      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          if (nMessagesShown === 50) {
            scrollViewRef.current.scrollToEnd();
          }
        }}
        onScroll={event => {
          if (event.nativeEvent.contentOffset.y === 0) {
            if (state) {
              nMessagesShown += 50;
              if (nMessagesShown > state.messages.length) {
                nMessagesShown = state.messages.length;
              }
              filterMessages(state.messages);
            }
          }
        }}>
        {state && (
          <View>
            {messagesShown.map((message, index) => {
              return (
                <MessageCard
                  key={`${message}-${index}`}
                  message={message}
                  roomId={chatRoomId}
                />
              );
            })}
          </View>
        )}
      </ScrollView>
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
              scrollViewRef.current.scrollToEnd();
              await submitMessage({
                chatRoomId,
                text: inputText,
                isImage: false,
              });
            }}>
            <Image
              style={styles.Icon}
              source={require('../images/SendMessage.png')}
            />
          </Pressable>
        ) : (
          <View style={styles.row}>
            <Pressable
              onPress={async () => {
                const result = await launchImageLibrary({mediaType: 'photo'});
                await sendImage(result);
              }}>
              <Image
                style={styles.Icon}
                source={require('../images/UploadImage.png')}
              />
            </Pressable>
            <Pressable
              onPress={async () => {
                const result = await launchCamera({mediaType: 'photo'});
                await sendImage(result);
              }}>
              <Image
                style={styles.Icon}
                source={require('../images/TakePicture.png')}
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputFilled: {
    width: '75%',
    height: 40,
    marginVertical: 12,
    marginHorizontal: '4%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: 'black',
  },
  textInputEmpty: {
    width: '65%',
    height: 40,
    marginVertical: 12,
    marginHorizontal: '4%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: 'black',
  },
  scrollView: {height: '80%'},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Icon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  messageText: {
    color: 'black',
    fontSize: 20,
  },
});
