import { View, Text, StyleSheet } from 'react-native';

function CustomDate({ currentDate }) {
  return (
    <View style={styles.dateContainer}>
      <View style={styles.line} />
      <Text style={styles.dateText}>{currentDate}</Text>
      <View style={styles.line} />
    </View>
  );
}

export default CustomDate;

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 10,
  },
  dateText: {
    fontSize: 13,
    color: '#E0E0E0',
    fontWeight: 'normal',
  },
});
