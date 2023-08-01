import { Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../../../themes/color';

function Setting({ iconName, info, onPress, isActive }) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.rootContainer,
        isActive ? styles.preseedButton : null,
      ]}
      onPress={handlePress}>
      {iconName === 'headset' ? (
        <Ionicons name={iconName} size={50} color="black" />
      ) : iconName === 'alarm-outline' ? (
        <Ionicons name={iconName} size={50} color="black" />
      ) : (
        <MaterialCommunityIcons name={iconName} size={50} color="black" />
      )}
      <Text style={styles.infoText}>{info}</Text>
    </Pressable>
  );
}

export default Setting;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.primary100,
    marginHorizontal: 8,
    padding: 5,
  },
  preseedButton: {
    backgroundColor: Colors.primary500,
    opacity: 0.75,
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 3,
  },
});
