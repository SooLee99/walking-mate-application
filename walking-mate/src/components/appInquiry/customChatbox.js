import { View,Text,StyleSheet } from "react-native";

function CustomChatBox({ children, currentTime }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.timeText}>{currentTime}</Text>
      <View style={styles.bubbleContainer}>
        <Text style={styles.talkText}>{children}</Text>
      </View>
    </View>
  );
}

export default CustomChatBox;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    alignSelf :'flex-end',
    alignItems :"flex-end",
    marginBottom: 10,
    marginRight :10,
  },
  bubbleContainer: {
    marginTop: 10,
    marginLeft: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  talkText: {
    fontSize: 13,
    fontWeight: "600",
  },
  timeText: {
    fontSize: 11,
    marginBottom: 7,
    color: "#E0E0E0",
  },
});
