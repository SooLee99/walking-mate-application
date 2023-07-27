/**
 * @파일명 EmailBox.js
 * @작성자 허준영
 * @작성일 2023-07-23
 * @코드설명
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import validator from 'validator';

const windowWidth = Dimensions.get('window').width;

// 컴포넌트를 감싸는 컨테이너 스타일 정의
const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${windowWidth - 72}px;
  margin: 0 auto;
`;

// 이메일 입력을 위한 TextInput 스타일 정의
const InputEmail = styled.TextInput`
  height: 50px;
  width: ${windowWidth * 0.5}px;
  border-width: 1px;
  background-color: rgba(196, 196, 196, 0.15);
  border-color: rgba(196, 196, 196, 0.15);
  padding-left: 10px;
`;

// 인증요청 버튼 스타일 정의
const SuggestButton = styled(TouchableOpacity)`
  background-color: ${(props) =>
    props.isValid ? '#00FEEF' : 'rgba(0, 0, 0, 0.37)'};
  border-color: ${(props) =>
    props.isValid ? '#00FEEF' : 'rgba(0, 0, 0, 0.37)'};
  height: 50px;
  width: ${windowWidth * 0.3}px;
  justify-content: center;
  align-items: center;
`;

// 인증요청 버튼 텍스트 스타일 정의
const SuggestText = styled.Text`
  color: ${(props) => (props.isValid ? '#FFFFFF' : '#000000')};
  font-weight: bold;
`;

function EmailBox({ pressAuthn, onChangeText }) {
  const [email, setEmail] = useState('');

  // 이메일 유효성과 이메일 길이를 검사하여 인증요청 버튼 활성화 여부 결정
  const isEmailValid = validator.isEmail(email);
  const emailNum = email.length >= 12;

  // 이메일 입력이 변경될 때 실행되는 함수
  const handleEmailChange = (text) => {
    setEmail(text);
    onChangeText(text);
  };

  // 인증요청 버튼을 눌렀을 때 실행되는 함수
  const handlePress = () => {
    if (isEmailValid && emailNum) {
      pressAuthn();
      Keyboard.dismiss();
    }
  };

  return (
    <Container>
      {/* 이메일을 입력하는 TextInput */}
      <InputEmail
        placeholder="이메일을 입력하세요"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={handleEmailChange}
      />

      {/* 인증요청 버튼 */}
      <SuggestButton isValid={isEmailValid && emailNum} onPress={handlePress}>
        <SuggestText isValid={isEmailValid && emailNum}>인증요청</SuggestText>
      </SuggestButton>
    </Container>
  );
}
export default EmailBox;
