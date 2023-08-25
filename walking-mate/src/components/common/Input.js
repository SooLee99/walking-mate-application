/**
 * @파일명 Input.js
 * @작성자 이수
 * @작성일 2023-07-23
 * @코드설명
 *   입력 필드를 정의하는 컴포넌트입니다.
 *   이 컴포넌트는 입력 필드의 라벨, 플레이스홀더, 리턴 키 타입 등을 정의합니다.
 *   입력 필드의 형식이 숫자인지, 이메일인지, 비밀번호인지 등을 설정할 수 있습니다.
 */

import React, { useState, forwardRef } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;

const Label = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme, isFocused }) =>
    isFocused ? theme.text : theme.inputLabel};
`;

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.inputPlaceholder,
}))`
  /*background-color: ${({ theme }) => theme.inputBackground};*/
  color: ${({ theme }) => theme.text};
  padding: 5px 5px;
  font-size: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme, isFocused }) =>
    isFocused ? theme.text : theme.inputBorder};
`;

const Input = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      onSubmitEditing,
      onBlur,
      placeholder,
      returnKeyType,
      maxLength,
      isPassword,
      isEmail,
      isNumber,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    let keyboardType = 'default';
    if (isEmail) {
      keyboardType = 'email-address';
    } else if (isNumber) {
      keyboardType = 'numeric';
    }

    return (
      <Container>
        <Label isFocused={isFocused}>{label}</Label>

        <StyledInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          placeholder={placeholder}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          isFocused={isFocused}
          onFocus={() => setIsFocused(true)}
          secureTextEntry={isPassword}
          keyboardType={keyboardType}
        />
      </Container>
    );
  }
);

Input.defaultProps = {
  onBlur: () => {},
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  returnKeyType: PropTypes.oneOf(['done', 'next']),
  maxLength: PropTypes.number,
  isPassword: PropTypes.bool,
  isEmail: PropTypes.bool,
  isNumber: PropTypes.bool,
};

export default Input;
