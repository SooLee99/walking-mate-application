import { Text, StyleSheet, Pressable } from 'react-native';

import Colors from '../../themes/color';

function Button({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.rootContainer,
        pressed && styles.pressedButton,
      ]}
      onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  pressedButton: {
    opacity: 0.75,
    backgroundColor: Colors.primary200,
  },
  rootContainer: {
    borderRadius: 5,
    backgroundColor: Colors.primary400,
    marginBottom: 10,
    paddingVertical: 15,
    shadowColor: '#cccccc',
    shadowOffset: { width: 2, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});
