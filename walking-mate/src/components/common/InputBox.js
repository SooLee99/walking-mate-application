/**
 * @파일명 inputBox.js
 * @작성자 허준영
 * @작성일 2023-07-23
 */

import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  Pressable,
  Dimensions,
} from 'react-native';
import { useState, useEffect } from 'react';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 0,
    height: 50,
    width: windowWidth - 72,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    marginVertical: 15,
    backgroundColor: 'rgba(196, 196, 196, 0.15)',
    borderColor: 'rgba(196, 196, 196, 0.15)',
  },
  input: {
    paddingLeft: 10,
    marginRight: 20,
    width: windowWidth - 180,
  },
  timerContainer: {
    padding: 10,
  },
  timerText: {
    color: 'red',
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function InputBox({ number, onChangeText, startTimer, stopTimer }) {
  const [timer, setTimer] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // 이전 타이머를 종료합니다.
    if (intervalId) {
      clearInterval(intervalId);
    }

    // 새로운 타이머를 시작합니다.
    if (startTimer) {
      const id = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(id); // 타이머 정지
            Alert.alert('인증시간 초과', '인증시간이 초과되었습니다.');
            stopTimer(); // 시간이 더이상 내려가지 않도록 하기 위해서
            return null;
          }
          return prevTimer - 1; // 1초마다 timer 1초씩 없애기
        });
      }, 1000);

      setTimer(5 * 60);
      setIntervalId(id); // intervalId 업데이트
    }
  }, [startTimer]);

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60).toString();
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  return (
    <View style={styles.centeredContainer}>
      <Pressable style={styles.rootContainer}>
        <TextInput
          style={styles.input}
          placeholder="인증번호 입력"
          keyboardType="number-pad"
          value={number}
          onChangeText={onChangeText}
        />
        {timer !== null && (
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(timer)}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

export default InputBox;
