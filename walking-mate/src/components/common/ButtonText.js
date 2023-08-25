/**
 * @파일명 ButtonText.js
 * @작성자 이수
 * @작성일 2023-07-23
 * @코드설명
 *   텍스트 버튼 컴포넌트를 정의합니다. 눌렀을 때 전달받은 onPress 이벤트 핸들러를 호출합니다.
 *   PropTypes를 이용해 props의 유효성을 검사합니다.
 */

import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

// styled-components를 사용해 버튼 컨테이너를 정의합니다. 패딩과 마진은 없습니다.
const Container = styled.View`
  background-color: ${({ theme }) => theme.btnBackground};
  padding: 0 0 0 0;
  margin: 0 0 0 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// styled-components를 사용해 버튼 제목을 정의합니다.
const Title = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;

// Button 컴포넌트를 정의합니다.
const Button = ({ title, onPress, containerStyle, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container style={containerStyle}>
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
};

export default Button;
