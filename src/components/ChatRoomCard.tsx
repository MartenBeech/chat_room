import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

interface Props {
  title: string;
  description: string;
  onPress?: () => void;
}

export const ChatRoomCard = (props: Props) => {
  return (
    <Pressable style={styles.card} onPress={props.onPress}>
      <View style={styles.row}>
        <View>
          <View>
            <Text style={styles.titleFont}>{props.title}</Text>
          </View>
          <View style={styles.topMargin} />
          <Text style={styles.descriptionFont}>{props.description}</Text>
        </View>
        <View style={styles.chevronIcon}>
          <Image
            style={styles.chevronIcon}
            source={require('../images/Chevron.png')}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    width: '80%',
  },
  titleFont: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: 'black',
  },
  descriptionFont: {
    fontSize: 20,
    marginHorizontal: 10,
    marginBottom: 10,
    color: 'black',
  },
  topMargin: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chevronIcon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
});
