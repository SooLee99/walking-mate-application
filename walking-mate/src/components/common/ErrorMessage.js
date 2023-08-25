/**
 * @파일명 ErrorMessage.js
 * @작성자 이수
 * @작성일 2023-07-23
 * @코드설명
 *   ErrorMessage 컴포넌트를 정의합니다.
 *   에러 메세지를 화면에 출력합니다.
 *   PropTypes를 이용해 props의 유효성을 검사합니다.
 */

import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

// styled-components를 사용해 에러 메시지의 스타일을 정의합니다.
const StyledText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-top: 15px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

// ErrorMessage 컴포넌트를 정의합니다. 에러 메시지를 화면에 출력합니다.
const ErrorMessage = ({ message }) => {
  return <StyledText>{message}</StyledText>;
};

// PropTypes를 이용해 props의 유효성을 검사합니다.
ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

// props의 기본 값을 설정합니다.
ErrorMessage.defaultProps = {
  message: '',
};

export default ErrorMessage;
