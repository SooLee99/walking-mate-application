import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  TeamIntro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#b0b0b0',
  },
  teamName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  teamDetail: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default function TeamIntro({ name, introduction }) {
  return (
    <View style={styles.TeamIntro}>
      <Text style={styles.teamName}>{name}</Text>
      <Text style={styles.teamDetail}>{introduction}</Text>
    </View>
  );
}
