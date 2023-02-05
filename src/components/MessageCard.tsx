import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Message} from '../entities/message';
import {getImage} from '../firebase/storage';

interface Props {
  message: Message;
  roomId: number;
}

export const MessageCard = (props: Props) => {
  const [imageUrl, setImageUrl] = useState('');
  const date = new Date(props.message.messageDate);
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const MM = date.getMinutes();
  const displayedDate = `${dd < 10 ? `0${dd}` : dd}/${
    mm < 10 ? `0${mm}` : mm
  }/${yyyy} ${hh < 10 ? `0${hh}` : hh}:${MM < 10 ? `0${MM}` : MM}`;

  useEffect(() => {
    if (props.message.isImage) {
      getImage({name: props.message.messageText, roomId: props.roomId}).then(
        result => {
          setImageUrl(result);
        },
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          style={styles.avatar}
          source={
            props.message.senderAvatar
              ? {
                  uri: props.message.senderAvatar,
                }
              : {}
          }
        />
        <Text style={styles.name}>{props.message.senderName}</Text>
        <Text style={styles.date}>{displayedDate}</Text>
      </View>
      {props.message.isImage ? (
        <Image
          style={styles.image}
          source={
            imageUrl
              ? {
                  uri: imageUrl,
                }
              : {}
          }
        />
      ) : (
        <Text style={styles.message}>{props.message.messageText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#547EC7',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  avatar: {
    width: '10%',
    height: '200%',
    resizeMode: 'contain',
  },
  name: {
    color: 'white',
    fontSize: 15,
    marginHorizontal: 10,
  },
  date: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },
  message: {
    color: 'white',
    fontSize: 12,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  image: {
    height: 200,
    resizeMode: 'contain',
    marginHorizontal: 10,
    marginBottom: 5,
  },
});
