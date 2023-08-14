import { View, StyleSheet, Alert } from 'react-native';

import { useState } from 'react';

import InfoInput from '../../components/my-info/InfoInput';
import BottomButton from '../../components/common/BottomButton';
import { UserAuthService } from '../../services/UserAuthService';
import { useNavigation } from '@react-navigation/native';

function PhysicalInfoEditScreen() {
  const navigation = useNavigation();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bottomPress, setBottomPress] = useState(false);

  function heightChangeHandler(enteredHeight) {
    setHeight(enteredHeight);
    setBottomPress(enteredHeight.length >= 3 && weight.length >= 2);
  }

  function weightChangeHandler(enteredWeight) {
    setWeight(enteredWeight);
    setBottomPress(height.length >= 3 && enteredWeight.length >= 2);
  }

  async function handlePhysicalInfoSubmission() {
    try {
      const response = await UserAuthService.updatePhysicalInfo(height, weight);
      if (response.status === 'OK') {
        Alert.alert('성공', '키와 몸무게가 성공적으로 수정되었습니다.', [
          {
            text: '확인',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert(
          '오류',
          '키와 몸무게 수정에 실패했습니다. 다시 시도해주세요.'
        );
      }
    } catch (error) {
      console.error('Failed to submit physical data:', error);
      Alert.alert('오류', '서버와의 통신 중 오류가 발생했습니다.');
    }
  }

  return (
    <View style={styles.rootContainer}>
      <InfoInput
        placeholder="키를 입력하세요(cm 제외)"
        onChangeText={heightChangeHandler}
        value={height}
        maxLength={3}
        keyboardType="numeric"
        returnKeyType="done">
        키
      </InfoInput>
      <InfoInput
        placeholder="몸무게를 입력하세요(kg 제외)"
        onChangeText={weightChangeHandler}
        value={weight}
        maxLength={3}
        keyboardType="numeric"
        returnKeyType="done">
        몸무게
      </InfoInput>
      <BottomButton
        BottomText="수정하기"
        pressed={bottomPress}
        onPress={handlePhysicalInfoSubmission}
      />
    </View>
  );
}

export default PhysicalInfoEditScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 40,
    backgroundColor: '#F5FAFA',
  },
});
