import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  teamCard: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  teamName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  teamDetail: {
    marginTop: 5,
    fontSize: 12,
    flex: 1,
  },
});

export default function TeamList({
  name,
  leaderName,
  totalMembers,
  createdDate,
  onPress,
}) {
  const formattedDate = createdDate
    ? createdDate.slice(0, 4) +
      '-' +
      createdDate.slice(4, 6) +
      '-' +
      createdDate.slice(6, 8)
    : '';

  return (
    <TouchableOpacity style={styles.teamCard} onPress={onPress}>
      <Text style={styles.teamName}>{name}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.teamDetail}>{`팀장: ${leaderName}`}</Text>
        <Text style={styles.teamDetail}>{`팀 인원: ${totalMembers}`}</Text>
        <Text style={styles.teamDetail}>{`생성일: ${formattedDate}`}</Text>
      </View>
    </TouchableOpacity>
  );
}
