/**
 * @파일명 useLogin.js
 * @작성자 이수
 * @작성일 2023-07-23
 */

import { useState } from 'react';
import { AuthService } from '../services/AuthService';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (id, pw) => {
    setLoading(true);
    try {
      const response = await AuthService.login(id, pw);
      setLoading(false);
      return response;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { login, loading, error };
};
