import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../themes/color';
import { useState } from 'react';
import Setting from './Setting';

function IntervalSettingView({ intervalSetting, onIntervalChange }) {
  const [detailActiveButton, setDetailActiveButton] = useState(intervalSetting);

  function handleIntervalToggle(buttonName) {
    setDetailActiveButton(buttonName);
    if (onIntervalChange) {
      onIntervalChange(buttonName);
    }
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.infoText}>인터벌 알림 설정</Text>
      <View style={styles.settingContainer}>
        <Setting
          iconName="shoe-print"
          info="On"
          onPress={() => handleIntervalToggle('On')}
          isActive={detailActiveButton === 'On'}
        />
        <Setting
          iconName="run"
          info="Off"
          onPress={() => handleIntervalToggle('Off')}
          isActive={detailActiveButton === 'Off'}
        />
      </View>
    </View>
  );
}

export default IntervalSettingView;

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 15,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.primary200,
    backgroundColor: Colors.primary200,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingContainer: {
    flexDirection: 'row',
  },
});
