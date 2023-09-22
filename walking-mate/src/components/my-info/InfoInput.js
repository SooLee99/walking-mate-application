import { StyleSheet, Text, TextInput, View } from "react-native";

function InfoInput({
  children,
  placeholder,
  onChangeText,
  value,
  maxLength,
  keyboardType,
  returnKeyType,
  secureTextEntry
}) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.infoText}>{children}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        secureTextEntry = {secureTextEntry}
        autoCorrect = {false}
        autoCapitalize="none"
      />
    </View>
  );
}

export default InfoInput;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: "#D3D3D3",
    width: "90%",
    fontSize: 15,
    height: 30,
  },
});
