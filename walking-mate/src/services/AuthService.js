/**
 * @파일명 AuthService.js
 * @작성자 이수
 * @작성일 2023-07-23
 */

import { Alert } from 'react-native';
import axios from 'axios';

export const AuthService = {
  // 로그인 처리 (2023-07-23 이수)
  login: async (id, pw) => {
    try {
      console.log(id);
      console.log(pw);
      const response = await axios.post('/api/login', { id, pw });
      return response.data.success; // <- 임시로 성공 처리(2023-07-23 이수)
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', error.message);
      throw error;
    }
  },

  // 회원가입 처리 (2023-07-23 이수)
  signUp: async (id, pw, name, phone, birth, height, weight) => {
    console.log(id);
    console.log(pw);
    console.log(name);
    console.log(phone);
    console.log(birth);
    console.log(height);
    console.log(weight);

    try {
      const response = await axios.post('/api/signUp', {
        id,
        pw,
        name,
        phone,
        birth,
        height,
        weight,
      });
      return response.data.success; // <- 임시로 성공 처리(2023-07-23 이수)
    } catch (error) {
      console.error('SignUp error:', error);
      Alert.alert('SignUp Error', error.message);
      throw error;
    }
  },

  // 인증번호를 이메일로 전송 요청하는 함수 (2023-07-23 이수)
  requestAuthNumber: async (email) => {
    console.log(email);
    try {
      const response = await axios.post('/api/requestAuthNumber', { email });
      // return response.data;
      return response.data.success; // <- 임시로 성공 처리(2023-07-23 이수)
    } catch (error) {
      console.error('Request Auth Number error:', error);
      Alert.alert('Request Auth Number Error', error.message);
      throw error;
    }
  },

  // 인증번호 확인 함수 (2023-07-23 이수)
  submitAuthNumber: async (email, number) => {
    try {
      // const response = await axios.post('/api/submitAuthNumber', { email, number });
      const response = { data: { success: true } }; // <- 임시로 성공 처리(2023-07-23 이수)
      return response.data.success;
    } catch (error) {
      console.error('Submit Auth Number error:', error);
      Alert.alert('Submit Auth Number Error', error.message);
      throw error;
    }
  },
};
