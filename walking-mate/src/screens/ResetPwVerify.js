/**
 * @파일명 ResetPwVerify.js
 * @작성자 허준영
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
import EmailBox from '../components/EmailBox';
import InputBox from '../components/InputBox';
import BottomButton from '../components/BottomButton';
import { requestAuthNumber, submitAuthNumber } from '../services/AuthService';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // 상위 컨테이너의 시작점(위쪽)으로 정렬
    marginTop: 10,
    marginBottom: 30,
  },
  InformationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
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
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [timer, setTimer] = useState(TIMER_INITIAL_VALUE);
  const [isRunning, setIsRunning] = useState(false);

  // 타이머 작동에 대한 useEffect hook
  useEffect(() => {
    // 타이머가 동작 중이 아니거나 타이머가 0이하이면 return
    if (!isRunning || timer <= 0) return;

    // 1초마다 타이머를 감소시키는 interval 설정
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    // 컴포넌트 언마운트시 interval을 정리하는 cleanup 함수
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  // 타이머 시작/중지 토글 핸들러
  const handleTimerToggle = () => setIsRunning((prev) => !prev);

  // 타이머 리셋 핸들러
  const resetTimer = () => {
    setTimer(TIMER_INITIAL_VALUE);
    setIsRunning(false);
  };

  // 이메일 값 변경 핸들러
  const handleEmailChange = (value) => setEmail(value);

  // 인증번호 값 변경 핸들러
  const handleNumberChange = (value) => {
    setNumber(value);
    // 입력된 인증번호가 4자리일 때, 타이머를 중지하고 키보드를 내림
    if (value.length === 4) {
      handleTimerToggle();
      Keyboard.dismiss();
    }
  };

  // 인증번호 요청 핸들러
  const handleAuthRequest = async () => {
    resetTimer();
    const success = true;
    // 인증번호 요청 성공 시, 타이머를 시작
    success
      ? setTimeout(handleTimerToggle, 0)
      : alert('인증번호 요청에 실패했습니다.');
  };

  // 인증번호 제출 핸들러
  const handleAuthSubmit = async () => {
    // 인증번호가 4자리가 아닐 때, 알림 후 함수 종료
    if (number.trim().length !== 4) {
      alert('인증번호를 4자리로 입력해주세요.');
      return;
    }

    const success = true;

    // 인증 성공 시, ResetPw 화면으로 이동 후 상태 초기화
    if (success) {
      alert('인증이 완료되었습니다.');
      navigation.replace('ResetPw');
      resetForm();
    } else {
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
      <View style={styles.InformationContainer}>
        <Text style={styles.text}>
          회원님의 비밀번호를 재설정할 수 있도록 이메일을 입력해주세요.
        </Text>
      </View>
      <Text style={styles.informationText}>이메일을 입력해주세요.</Text>
      <View style={styles.emailContainer}>
        <EmailBox
          pressAuthn={handleAuthRequest}
          email={email}
          onChangeText={handleEmailChange}
        />
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
        pressed={number.length === 4}
        onPress={handleAuthSubmit}
      />
    </KeyboardAvoidingView>
  );
};

// 컴포넌트 내보내기
export default ResetPwVerify;
