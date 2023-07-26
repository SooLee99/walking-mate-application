/**
 * @파일명 ResetPw.js
 * @작성자 허준영
 * @작성일 2023-07-23
 */

import { View, Text, StyleSheet, Keyboard } from 'react-native';

import { useEffect, useState } from 'react';

import BottomButton from '../components/BottomButton';
import ResetInput from '../components/ResetInput';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 40,
    alignItems: 'flex-start',
    paddingHorizontal: 40,
  },
  subContainer: {
    marginBottom: 25,
  },
  alertMessage: {
    color: 'red',
    textAlign: 'left',
    paddingLeft: 10,
  },
  buttonContainer: {},
});

function ResetPw({ navigation }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState(false);
  const [BottomPressed, setBottomPressed] = useState(false);

  function NewPWChangeHandler(enteredPw) {
    setNewPassword(enteredPw);
  }

  function ConfirmPwChangeHandler(enteredPw) {
    setConfirmPassword(enteredPw);
  }

  function goHomeScreenHandler() {
    alert('비밀번호 재설정이 완료되었습니다.');
    navigation.goBack();
    navigation.navigate('Login');
  }

  const newPWlength = newPassword.length;
  const confirmPWlength = confirmPassword.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [alertMessage]);

  useEffect(() => {
    if (
      newPWlength > 0 &&
      confirmPWlength >= newPWlength &&
      newPassword === confirmPassword
    ) {
      setAlertMessage(false);
      setBottomPressed(true);
    } else if (
      newPWlength === confirmPWlength &&
      newPassword !== confirmPassword
    ) {
      setAlertMessage(true);
      setBottomPressed(false);
    } else if (newPassword !== confirmPassword) {
      setBottomPressed(false);
    }
  }, [newPassword, confirmPassword]);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.subContainer}>
        <ResetInput
          Information="신규 비밀번호"
          InPut="비밀번호 입력"
          onChangeText={NewPWChangeHandler}
        />
      </View>
      <View style={styles.subContainer}>
        <ResetInput
          Information="비밀번호 확인"
          InPut="비밀번호 확인"
          onChangeText={ConfirmPwChangeHandler}
        />
      </View>
      {alertMessage && (
        <Text style={styles.alertMessage}>비밀번호가 일치 하지 않습니다.</Text>
      )}
      <BottomButton
        BottomText="완료"
        pressed={BottomPressed}
        onPress={goHomeScreenHandler}
      />
    </View>
  );
}

export default ResetPw;
