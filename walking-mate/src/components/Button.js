/**
 * @파일명 Button.js
 * @작성자 이수
 * @작성일 2023-07-23
 * @코드설명
 *   Styled-components를 이용해 Button 컴포넌트를 정의하였습니다.
 *   버튼이 눌렸을 때 전달받은 onPress 이벤트 핸들러를 호출합니다.
 *   PropTypes를 이용해 props의 유효성을 검사합니다.
 */

import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

// styled-components를 사용해 버튼 컨테이너를 정의합니다.
const Container = styled.View`
  background-color: ${({ theme }) => theme.btnBackground};
  padding: 10px;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

// styled-components를 사용해 버튼 제목을 정의합니다.
const Title = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.btnTitle};
`;

// Button 컴포넌트를 정의합니다.
const Button = ({ title, onPress, containerStyle, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'row' }}
      disabled={disabled}>
      <Container style={containerStyle} disabled={disabled}>
        <Title style={textStyle}>{title}</Title>
      </Container>
    </TouchableOpacity>
  );
};

// PropTypes를 이용해 props의 유효성을 검사합니다.
Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Button;
