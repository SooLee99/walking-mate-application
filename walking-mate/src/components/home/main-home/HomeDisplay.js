import { View, Text, StyleSheet } from 'react-native';

function HomeDisplay({ info, text, style }) {
  return (
    <View style={[styles.rootContainer, style]}>
      <Text style={[styles.infoText, style]}>{info}</Text>
      <Text style={[styles.text, style]}>{text}</Text>
    </View>
  );
}

export default HomeDisplay;

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 110,
    borderRadius: 57.5,
    borderWidth: 5,
  },
  infoText: {
    fontSize: 13,
    fontWeight: '600',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
