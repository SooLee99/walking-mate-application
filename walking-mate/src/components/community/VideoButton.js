import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../../themes/color';

function VideoButton({ title, onPress, selected }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? Colors.primary400 : '#dddddd',
        },
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.buttonText,
          { color: selected ? Colors.primary400 : 'black' },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default VideoButton;

const styles = StyleSheet.create({
  button: {
    width: 85,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
