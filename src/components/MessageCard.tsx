import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

interface Props {
  text: string;
  date: string;
  name: string;
  avatar: string;
}

export const MessageCard = (props: Props) => {
  const date = new Date(props.date);
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const MM = date.getMinutes();
  const displayedDate = `${dd < 10 ? `0${dd}` : dd}/${
    mm < 10 ? `0${mm}` : mm
  }/${yyyy} ${hh < 10 ? `0${hh}` : hh}:${MM < 10 ? `0${MM}` : MM}`;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          style={styles.avatar}
          source={
            props.avatar
              ? {
                  uri: props.avatar,
                }
              : {}
          }
        />
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.date}>{displayedDate}</Text>
      </View>
      <Text style={styles.message}>{props.text}</Text>
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
});
