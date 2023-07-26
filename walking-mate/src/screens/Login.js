/**
 * @파일명 Login.js
 * @작성자 이수
 * @작성일 2023-07-23
 * @코드설명
 *   로그인 기능을 수행하는 컴포넌트입니다.
 *   입력된 아이디와 비밀번호로 로그인 시도를 할 수 있고, 비밀번호 재설정 및 회원가입으로 이동하는 버튼을 포함합니다.
 *   이메일 유효성 검사 및 비밀번호 공백 제거 등의 유틸리티 함수를 사용하여 입력 값을 처리합니다.
 *   로그인 성공 시 사용자 정보를 받아와 홈 화면으로 이동합니다.
 *   로딩 상태와 에러를 관리하며, 스피너를 이용하여 로그인 시간동안 로딩을 표시합니다.
 */

import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { ThemeContext } from 'styled-components/native';
import { Button, Input, ButtonText, ErrorMessage } from '../components/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLogin } from '../hooks/useLogin';
import { Alert } from 'react-native';
import { validateEmail, removeWhitespace } from '../utils/utils';
import { UserContext, ProgressContext } from '../contexts';

// styled-components를 이용하여 컴포넌트를 스타일링합니다.
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding-left: 10%;
  padding-right: 10%;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom + 20}px;
`;

const StyledText = styled.Text`
  font-size: 40px;
  color: #111111;
  font-weight: bold;
  padding-bottom: 30%;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const commonBtnTextStyle = {
  backgroundColor: 'transparent',
};

const commonTextStyle = (theme) => ({
  color: theme.text,
  fontSize: 15,
});

// Login 컴포넌트를 정의합니다.
const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const refPassword = useRef(null);
  const { login, loading, error } = useLogin();

  useEffect(() => {
    setDisabled(!(id && pw && !errorMessage && !error));
    if (errorMessage == '') {
      if (errorMessage) {
        setErrorMessage(errorMessage.message);
      } else if (error) {
        setErrorMessage(error.message);
      }
    }
  }, [id, pw, error]);

  // 입력된 아이디의 공백 제거.
  const _handleIdChange = (id) => {
    const changedId = removeWhitespace(id);
    setId(changedId);
    setErrorMessage(
      validateEmail(changedId) ? '' : '이메일 형식을 작성해주세요.'
    );
  };

  // 입력된 비밀번호의 공백 제거.
  const _handlePwChange = (pw) => {
    const changedPw = removeWhitespace(pw);
    setPw(changedPw);
  };

  const _handleLoginBtnPress = async () => {
    try {
      spinner.start();
      // const user = await login(id, pw);         // 서버 요청 부분 주석처리
      const user = { id: 'dummyId', name: 'dummyName' }; // 임의의 사용자 데이터
      setUser(user);

      // login 함수가 성공적으로 실행되어 사용자 정보를 받았을 경우에만 화면 이동
      if (user) {
        navigation.navigate('Home', { user });
      }
    } catch (e) {
      Alert.alert('Login Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}
      contentContainerStyle={{ flex: 1 }}>
      <Container insets={insets}>
        <StyledText>Walking Mate</StyledText>

        <Input
          label="Your Email Address"
          placeholder="이메일을 입력해주세요."
          returnKeyType="next"
          value={id}
          isEmail={true}
          onChangeText={_handleIdChange}
          onSubmitEditing={() => refPassword.current.focus()}
        />

        <Input
          ref={refPassword}
          label="Password"
          placeholder="비밀번호를 입력해주세요."
          returnKeyType="done"
          value={pw}
          onChangeText={_handlePwChange}
          isPassword={true}
          onSubmitEditing={_handleLoginBtnPress}
        />

        <Row>
          <ButtonText
            title="비밀번호 재설정"
            onPress={() => navigation.navigate('ResetPwVerify')}
            containerStyle={commonBtnTextStyle}
            textStyle={commonTextStyle(theme)}
          />

          <ButtonText
            title="회원가입"
            onPress={() => navigation.navigate('SignUpVerify')}
            containerStyle={commonBtnTextStyle}
            textStyle={commonTextStyle(theme)}
          />
        </Row>

        <ErrorMessage message={errorMessage} />

        <Button
          title="Login"
          onPress={_handleLoginBtnPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;
