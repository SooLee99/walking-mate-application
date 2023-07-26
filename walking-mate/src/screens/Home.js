/**
 * @파일명 Home.js
 * @작성자 이수
 * @작성일 2023-07-23
 */

import React, { useContext } from 'react';
import { UserContext } from '../contexts';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Button } from '../components';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 30px;
  color: #000;
`;

const Home = ({ route, navigation }) => {
  console.log(route.params);
  return (
    <Container>
      <StyledText>Home 화면</StyledText>
    </Container>
  );
};

export default Home;
