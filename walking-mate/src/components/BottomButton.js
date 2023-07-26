/**
 * @파일명 BottomButton.js
 * @작성자 허준영
 * @작성일 2023-07-23
 */

import { View, Text, Pressable, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

function BottomButton({ BottomText, pressed, onPress }) {
  const navigation = useNavigation();

  return (
    <View style={pressed ? styles.pressedRootContainer : styles.rootContainer}>
      <Pressable onPress={pressed ? onPress : null}>
        <Text style={styles.bottomText}>{BottomText}</Text>
      </Pressable>
    </View>
  );
}

export default BottomButton;

const styles = StyleSheet.create({
  rootContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 27,
    backgroundColor: 'rgba(196, 196, 196, 0.15)',
    borderColor: 'rgba(196, 196, 196, 0.15)',
  },
  pressedRootContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 27,
    backgroundColor: '#00FEEF',
    borderColor: '#00FEEF',
  },
  bottomText: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
