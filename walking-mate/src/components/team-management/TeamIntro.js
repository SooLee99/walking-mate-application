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
    marginLeft: 5,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 12,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4, // Android 그림자 효과
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
