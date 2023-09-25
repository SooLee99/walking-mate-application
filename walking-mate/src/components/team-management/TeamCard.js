import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  teamCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#b0b0b0',
  },
  teamDetail: {
    marginTop: 5,
    fontSize: 12,
    flex: 1,
  },
});

export default function TeamCard({
  leaderName,
  currentMembers,
  totalMembers,
  createdDate,
  onPress,
}) {
  return (
    <View style={styles.teamCard} onPress={onPress}>
      <Text style={styles.teamDetail}>{`팀장: ${leaderName}`}</Text>
      <Text
        style={
          styles.teamDetail
        }>{`현재 인원: ${currentMembers}/${totalMembers}`}</Text>
      <Text style={styles.teamDetail}>{`생성일: ${createdDate}`}</Text>
    </View>
  );
}
