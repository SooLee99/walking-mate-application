/**
 * @파일명 Spinner.js
 * @작성자 이수
 * @작성일 2023-07-23
 * @코드설명
 *   로딩 상태를 표시하는 Spinner 컴포넌트입니다.
 *   전체 화면을 덮는 스타일과 ActivityIndicator를 사용해 로딩 중임을 사용자에게 알립니다.
 */

import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  position: absolute;
  z-index: 2;
  opacity: 0.3;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: ${({ theme }) => theme.spinnerBackground};
`;

const SpinnerIndicator = styled.ActivityIndicator.attrs(({ theme }) => ({
  size: 'large',
  color: theme.spinnerIndicator,
}))``;

const Spinner = () => {
  return (
    <Container>
      <SpinnerIndicator />
    </Container>
  );
};

export default Spinner;
