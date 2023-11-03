/**
 * @파일명 SignUpVerify.js
 * @작성자 이수
 * @작성일 2023-07-23
 */

import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import EmailBox from '../components/common/EmailBox';
import InputBox from '../components/common/InputBox';
import BottomButton from '../components/common/BottomButton';
import { UserAuthService } from '../services/UserAuthService';
import { validateEmail, removeWhitespace } from '../utils/utils';
import { ErrorMessage } from '../components';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 30,
  },
  informationText: {
    fontSize: 12,
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft: 37,
    marginTop: 20,
    marginBottom: 7,
  },
  emailContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// 타이머 초기값 설정
const TIMER_INITIAL_VALUE = 5 * 60;

// ResetPwVerify 컴포넌트 함수
const ResetPwVerify = ({ navigation }) => {
  // 상태 변수 정의
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [timer, setTimer] = useState(TIMER_INITIAL_VALUE);
  const [isRunning, setIsRunning] = useState(false);

  // 타이머 작동에 대한 useEffect hook
  useEffect(() => {
    if (!isRunning || timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleTimerToggle = () => setIsRunning((prev) => !prev);
  const resetTimer = () => {
    setTimer(TIMER_INITIAL_VALUE);
    setIsRunning(false);
  };

  // 이메일 값 변경 핸들러
  const handleEmailChange = (value) => {
    setEmail(value);
    setErrorMessage(validateEmail(value) ? '' : '이메일 형식을 작성해주세요.');
  };

  // 인증번호 값 변경 핸들러
  const handleNumberChange = (value) => {
    setNumber(value);
    // 입력된 인증번호가 6자리일 때, 타이머를 중지하고 키보드를 내림
    if (value.length === 6) {
      handleTimerToggle();
      Keyboard.dismiss();
    }
  };

  // 인증번호 요청 핸들러
  const handleAuthRequest = async () => {
    try {
      resetTimer();
      console.log('여기');
      console.log(email);
<<<<<<< HEAD
      const success = await UserAuthService.verifyAndRequestEmail(email);
=======
      const success = await UserAuthService.confirmVerificationCode(email);
>>>>>>> master
      // 인증번호 요청 성공 시, 타이머를 시작
      if (success) {
        alert('해당 이메일로 인증번호를 전송하였습니다.');
        console.log(email);
      } else {
        alert('인증번호 요청에 실패했습니다.');
      }
    } catch (e) {
      alert('인증번호 요청에 실패했습니다.');
    } finally {
      setTimeout(handleTimerToggle, 0);
    }
  };

  // 인증번호 제출 핸들러
  const handleAuthSubmit = async () => {
    // 인증번호가 4자리가 아닐 때, 알림 후 함수 종료
    if (number.trim().length !== 6) {
      alert('인증번호를 6자리로 입력해주세요.');
      return;
    }

    let success = false; // 여기에서 선언
    try {
      console.log('여기');
      success = await UserAuthService.submitAuthNumber(email, number);
      if (success) {
        alert('인증이 완료되었습니다.');
        console.log(email);
        navigation.navigate('SignUp', { email: email });
        resetForm();
      } else {
        alert('인증번호가 다릅니다. 다시 확인해주세요.');
      }
    } catch (e) {
      alert('인증이 실패했습니다.');
    } finally {
      setTimeout(handleTimerToggle, 0);
    }
    if (!success) {
      // 성공하지 않은 경우만 고려
      alert('인증번호 전송에 실패했습니다.');
    }
  };

  // 폼 상태 초기화 핸들러
  const resetForm = () => {
    setEmail('');
    setNumber('');
    resetTimer();
  };

  // 컴포넌트 렌더링
  return (
    <KeyboardAvoidingView style={styles.rootContainer}>
      <Text style={styles.informationText}>이메일을 입력해주세요.</Text>
      <View style={styles.emailContainer}>
        <EmailBox
          pressAuthn={handleAuthRequest}
          email={email}
          onChangeText={handleEmailChange}
        />
        <ErrorMessage message={errorMessage} style={styles.informationText} />
      </View>

      <Text style={styles.informationText}>인증번호를 입력해주세요.</Text>
      <View style={styles.inputContainer}>
        <InputBox
          number={number}
          onChangeText={handleNumberChange}
          startTimer={isRunning}
          timer={timer}
          stopTimer={handleTimerToggle}
          resetTimer={resetTimer}
        />
      </View>
      <BottomButton
        BottomText="완료"
        pressed={number.length === 6}
        onPress={handleAuthSubmit}
      />
    </KeyboardAvoidingView>
  );
};

// 컴포넌트 내보내기
export default ResetPwVerify;
