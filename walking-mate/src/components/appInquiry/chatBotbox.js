import { Text, View, StyleSheet } from "react-native";

function ChatBotBox({ children, currentTime }) {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.bubbleContainer}>
        <Text style = {styles.talkText}>{children}</Text>
      </View>
      <Text style = {styles.timeText}>{currentTime}</Text>
    </View>
  );
}

export default ChatBotBox;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    alignItems:'flex-end',
    marginBottom : 10,
  },
  bubbleContainer: {
    marginTop: 10,
    marginLeft: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor : '#E0E0E0'
  },
  talkText:{
    fontSize : 13,
    fontWeight :"600"
  },
  timeText :{
    fontSize : 11,
    marginLeft : 10,
    marginBottom :5,
    color : '#E0E0E0'
  }
});
