import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import Setting from './Setting';
import Colors from '../../../themes/color';

function MusicSettingView({ musicSetting, onMusicSetting }) {
  const [detailActiveButton, setDetailActiveButton] = useState(
    musicSetting === 'Off' ? null : musicSetting
  );

  function ButtonPressHandler(buttonName) {
    if (detailActiveButton === buttonName) {
      onMusicSetting('Off');
      setDetailActiveButton('');
    } else {
      setDetailActiveButton(buttonName);
      onMusicSetting(buttonName);
    }
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.infoText}>맞춤 음악 설정</Text>
      <View style={styles.settingContainer}>
        <Setting
          iconName="shoe-print"
          info="걷기"
          onPress={() => ButtonPressHandler('걷기')}
          isActive={detailActiveButton === '걷기'}
        />
        <Setting
          iconName="run"
          info="달리기"
          onPress={() => ButtonPressHandler('달리기')}
          isActive={detailActiveButton === '달리기'}
        />
        <Setting
          iconName="stairs-up"
          info="계단"
          onPress={() => ButtonPressHandler('계단')}
          isActive={detailActiveButton === '계단'}
        />
      </View>
    </View>
  );
}

export default MusicSettingView;

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
