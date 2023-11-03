<<<<<<< HEAD
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../../themes/color';

function HomeButton({ children, targetScreen, user }) {
  const navigation = useNavigation();
  console.log('현재 버튼이 눌린 상태~!');
  console.log(user.jwt);

  function goSettingScreenHandler() {
    if (targetScreen) {
      if (user) {
        navigation.navigate(targetScreen, { user });
      } else {
        navigation.navigate(targetScreen);
      }
    }
=======
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../../themes/color";

function HomeButton({ children, targetScreen }) {
  const navigation = useNavigation();

  function goSettingScreenHandler() {
    if (targetScreen) navigation.navigate(targetScreen);
>>>>>>> master
  }

  return (
    <View style={styles.rootContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.rootContainer,
          pressed && styles.pressedButton,
        ]}
<<<<<<< HEAD
        onPress={goSettingScreenHandler}>
=======
        onPress={goSettingScreenHandler}
      >
>>>>>>> master
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default HomeButton;

const styles = StyleSheet.create({
  rootContainer: {
<<<<<<< HEAD
    justifyContent: 'center',
    alignItems: 'center',
=======
    justifyContent: "center",
    alignItems: "center",
>>>>>>> master
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.primary400,
    borderColor: Colors.primary400,
  },
  button: {
    flex: 1,
<<<<<<< HEAD
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressedButton: {
    flex: 1,
    backgroundColor: '#97FFFF',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
=======
    justifyContent: "center",
    alignItems: "center",
  },
  pressedButton: {
    flex: 1,
    backgroundColor: "#97FFFF",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
>>>>>>> master
  },
});
