/**
 * @파일명 useLogin.js
 * @작성자 이수
 * @작성일 2023-07-23
 */

import { useContext } from 'react';
import { UserContext } from '../contexts/User';
import { useState } from 'react';
import { UserAuthService } from '../services/UserAuthService';
<<<<<<< HEAD
import { Alert } from 'react-native';
=======
>>>>>>> master

export const useLogin = () => {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (id, pw) => {
    setLoading(true);
    console.log('LOG  로그인 시도:', id);
    try {
      const response = await UserAuthService.login(id, pw);
<<<<<<< HEAD
      console.log('------------------------------------------------------');
      console.log(response);
      console.log('------------------------------------------------------');
      if (response.code === 'success') {
        const id = response.userId;
        const jwt = response.jwt;

        setUser(id, jwt);
        console.log(id);
        console.log(jwt);
        console.log('로그인 설정 완료.');
        setLoading(false);
        return response;
      }
      Alert.alert('오류', response.message + '입니다.');
      return false;
=======
      if (response.data.data.code === 'success') {
        const id = response.data.data.userId;
        const jwt = response.data.data.jwt;
        setUser(id, jwt);
        console.log('로그인 설정 완료.');
      }
      setLoading(false);
      return response;
>>>>>>> master
    } catch (error) {
      console.log('로그인 실패.');
      setError(error);
      setLoading(false);
    }
  };

  return { login, loading, error };
};
