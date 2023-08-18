import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView 
} from "react-native";
import { useState } from "react";

function SendBox({ onMessageSend }) {
  const [message, setMessage] = useState("");

  function messageChangeHandler(enteredMessage) {
    setMessage(enteredMessage);
  }

  function messageSendHandler() {
    if (message.length === 0) {
      Alert.alert("Error", "문자를 입력해주세요.");
      return;
    }
    onMessageSend(message);
    setMessage("");
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="메시지를 입력하세요"
          placeholderTextColor="#E0E0E0"
          returnKeyType="done"
          value={message}
          onChangeText={messageChangeHandler}
        />
        <TouchableOpacity style={styles.button} onPress={messageSendHandler}>
          <Text style={styles.buttonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SendBox;

const styles = StyleSheet.create({
  rootContainer: {
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  input: {
    flex: 3,
    height: 50,
    paddingLeft: 10,
    backgroundColor: "#e5ffff",
  },
  button: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    backgroundColor: "#b2ffff",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});
