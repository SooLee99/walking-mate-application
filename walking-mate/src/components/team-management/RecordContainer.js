import { View, Text, StyleSheet } from 'react-native';

function RecordContainer({ boldText1, lightText1, boldText2, lightText2 }) {
  return (
    <View style={styles.recordContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>{boldText1}</Text>
        <Text style={styles.lightText}>{lightText1}</Text>
      </View>
      <View style={styles.verticalBar}></View>
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>{boldText2}</Text>
        <Text style={styles.lightText}>{lightText2}</Text>
      </View>
    </View>
  );
}

export default RecordContainer;

const styles = StyleSheet.create({
  recordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  boldText: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 13,
  },
  lightText: {
    fontSize: 12,
    color: '#B0B0B0',
  },
  verticalBar: {
    width: 1,
    height: 32,
    backgroundColor: '#E3E3E8',
  },
});
