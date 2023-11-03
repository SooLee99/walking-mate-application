/**
 * @파일명 UserAuthService.js
 * @작성자 이수
 * @작성일 2023-07-23
 */

import { Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config/Config';

export const UserAuthService = {
  // (1) 로그인 처리 (2023-07-23 이수)
  login: async (id, pw) => {
    console.log('LOG  로그인 처리 완료');
    console.log('LOG ', id);
    console.log('LOG ', pw);
    try {
<<<<<<< HEAD
      const response = await axios.post(
        `${API_URL}/api/login`,
        {
          userId: id,
          password: pw,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('LOG  로그인 응답:', response);
      return response.data.data.data;
=======
      const response = {
        status: 'OK',
        message: '로그인 성공',
        data: {
          data: {
            userId: id,
            message: 'generate token',
            code: 'success',
            jwt: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFhYSIsImlhdCI6MTY5MzEzODcwOSwiZXhwIjoxNjkzMTQyMzA5fQ.MDZ_PgKfKPZnLNWsp1tEwDtRumePtuRh2mpy2gwdcks',
          },
        },
      };

      // 실제 서버와의 통신은 주석 처리
      // const response = await axios.post('${API_URL}/api/login',
      // headers: {
      //  'Content-Type': 'application/json',
      // },
      //  body: JSON.stringify({
      //  userId: id,
      //  password: pw
      // }));
      //console.log('LOG  로그인 응답:', response);
      return response;
>>>>>>> master
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', error.message);
      throw error;
    }
  },

  // (1) 회원가입 시 아이디 중복 확인 및 인증번호 요청하는 함수 (2023-07-23 이수)
  verifyAndRequestEmail: async (id) => {
    console.log('해당 이메일로 인증번호를 요청하였습니다.');
    console.log(id);
    try {
<<<<<<< HEAD
      const response = await axios.post(`${API_URL}/user/emailConfirm`, {
        email: id,
      });
      console.log(response);
      return true;
=======
      //const response = await axios.post('${API_URL}/api/sign-up/send-verification-code', { id });
      // return response.data;
      return true; // <- 임시로 성공 처리(2023-07-23 이수)
>>>>>>> master
    } catch (error) {
      console.error('Request Auth Number error:', error);
      Alert.alert('Request Auth Number Error', error.message);
      throw error;
    }
  },

  // (2) 인증번호 확인 함수 (2023-07-23 이수)
  confirmVerificationCode: async (id, verificationCode) => {
    console.log(id);
    console.log(verificationCode);
    console.log('이메일과 인증번호를 확인하고 인증을 완료하였습니다.');
    try {
      // const response = await axios.post('${API_URL}/api/sign-up/confirm-verification-code', { id, verificationCode });
      const response = { data: { success: true } }; // <- 임시로 성공 처리(2023-07-23 이수)
      return response.data.success;
    } catch (error) {
      console.error('Submit Auth Number error:', error);
      Alert.alert('Submit Auth Number Error', error.message);
      throw error;
    }
  },

  // (3) 회원가입 처리 (2023-07-23 이수)
  signUp: async (id, pw, name, phone, birth, height, weight) => {
<<<<<<< HEAD
    console.log('회원가입 처리 시작');
=======
    console.log('회원가입 처리 완료');
>>>>>>> master
    console.log(id);
    console.log(pw);
    console.log(name);
    console.log(phone);
    console.log(birth);
    console.log(height);
    console.log(weight);

<<<<<<< HEAD
    try {
      const response = await axios.post(`${API_URL}/api/join`, {
=======
    return true;
    /*try {
      const response = await axios.post('${API_URL}/api/sign-up/enter-info, {
>>>>>>> master
        id,
        pw,
        name,
        phone,
        birth,
        height,
        weight,
      });
<<<<<<< HEAD
      return response.data;
=======
      return response.data.success; // <- 임시로 성공 처리(2023-07-23 이수)
>>>>>>> master
    } catch (error) {
      console.error('SignUp error:', error);
      Alert.alert('SignUp Error', error.message);
      throw error;
<<<<<<< HEAD
    }
=======
    }*/
>>>>>>> master
  },

  // (1) 비밀번호 재설정 시, 인증번호를 이메일로 전송 요청하는 함수 => 현재 회원 여부 확인(2023-07-23 이수)
  requestAuthNumber: async (id) => {
    console.log('해당 이메일로 인증번호를 요청하였습니다.');
    console.log(id);
    try {
      //const response = await axios.post('${API_URL}/api/reset-password/send-verification-code', { id });
      // return response.data;
      return true; // <- 임시로 성공 처리(2023-07-23 이수)
    } catch (error) {
      console.error('Request Auth Number error:', error);
      Alert.alert('Request Auth Number Error', error.message);
      throw error;
    }
  },

  // (2) 인증번호 확인 함수 (2023-07-23 이수)
  submitAuthNumber: async (id, verificationCode) => {
    console.log(id);
    console.log(verificationCode);
    console.log('이메일과 인증번호를 확인하고 인증을 완료하였습니다.');
    try {
      // const response = await axios.post('${API_URL}/api/reset-password/confirm-verification-code', { id, verificationCode });
      const response = { data: { success: true } }; // <- 임시로 성공 처리(2023-07-23 이수)
      return response.data.success;
    } catch (error) {
      console.error('Submit Auth Number error:', error);
      Alert.alert('Submit Auth Number Error', error.message);
      throw error;
    }
  },

  // (4) 비밀번호 재설정 함수 (2023-08-19 이수)
  resetPassword: async (email, newPassword) => {
    console.log('비밀번호 재설정 요청:', email, newPassword);
    try {
      // 주석 처리된 실제 API 호출 코드
      // const response = await axios.post('${API_URL}/api/reset-password/enter-info', { email, newPassword });

      // 임시로 성공 처리
      const response = {
        status: 'OK',
        message: '비밀번호가 성공적으로 재설정되었습니다.',
      };
      return response;
    } catch (error) {
      console.error('Reset Password error:', error);
      Alert.alert('Reset Password Error', error.message);
      throw error;
    }
  },

  // (5) 홈 화면의 kcal, km, step 데이터 가져오기 (2023-08-22 이수)
  fetchHomeData: async (userJwt) => {
    console.log('홈 화면 데이터 요청');
<<<<<<< HEAD
    console.log('userJwt: ' + userJwt);
    try {
      const response = await axios.get(`${API_URL}/run/list/home`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${userJwt}`,
        },
      });
      return response.data.data;
=======
    try {
      // 실제 서버와의 통신을 위한 코드 (현재 주석 처리)
      // const response = await axios.get(`${API_URL}/run/list/home`,
      // headers: {
      //  'Content-Type': 'application/json',
      //  'Authorization': `${userJwt}`
      //});

      // 임시로 데이터 반환 (실제 서버 통신 코드 작성 시 이 부분을 삭제하거나 주석 처리)
      const response = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: {
          step: 200,
          distance: 20.0,
          kcal: 444,
        },
      };
      return response;
>>>>>>> master
    } catch (error) {
      console.error('Fetch Home Data error:', error);
      Alert.alert('Fetch Home Data Error', error.message);
      throw error;
    }
  },

  // (6) BMI 데이터 가져오기 (2023-08-22 이수)
  fetchBMI: async (userJwt) => {
    console.log('BMI 데이터 요청');
    try {
      // 실제 서버와의 통신을 위한 코드 (현재 주석 처리)
<<<<<<< HEAD
      const response = await axios.get(`${API_URL}/user/userBody/bodyInfo`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${userJwt}`,
        },
      });

      console.log(response.data);
      return response.data.data;
=======
      // const response = await axios.get(`${API_URL}/user/userBody/bodyInfo`,
      // headers: {
      //  'Content-Type': 'application/json',
      //  'Authorization': `${userJwt}`
      //});
      // return response;

      // 임시로 데이터 반환 (실제 서버 통신 코드 작성 시 이 부분을 삭제하거나 주석 처리)
      const response = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: {
          userId: userJwt,
          height: 150,
          weight: 40,
          bmi: 0,
        },
      };
      return response;
>>>>>>> master
    } catch (error) {
      console.error('Fetch BMI Data error:', error);
      Alert.alert('Fetch BMI Data Error', error.message);
      throw error;
    }
  },

  // (7) 사용자의 신체 정보 가져오기 (2023-08-23 이수) <-------------------------------------------- 추후 수정이 필요함. (2023-08-23 이수)
  fetchBodyInfo: async (jwt) => {
    console.log('신체 정보 요청');
    try {
      // 실제 서버와의 통신을 위한 코드 (현재 주석 처리)
      // const response = await axios.get(`${API_URL}/api/my-info`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${jwt}`
      //   }
      // });
      // return response.data;

      // 임시로 데이터 반환 (실제 서버 통신 코드 작성 시 이 부분을 삭제하거나 주석 처리)
      const response = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: {
          userId: jwt,
          height: 170,
          weight: 60,
          teamName: 'Sample Team',
          bmi: 20.8,
        },
      };
      return response.data;
    } catch (error) {
      console.error('Fetch Body Info error:', error);
      Alert.alert('Fetch Body Info Error', error.message);
      throw error;
    }
  },

  // (8) 사용자 정보 수정 (2023-08-23 ChatGPT)
  updateUserInfo: async (name, phone, password) => {
    console.log('사용자 정보 수정 요청');
    try {
      // 실제 서버와의 통신을 위한 코드. 필요에 따라 수정해주세요.
      //const response = await axios.post(`${API_URL}/api/my-info/modify, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${jwt}`
      //   },
      //   {
      //      password: password,
      //      name: name,
      //      phone: phone
      //   }
      // });

      const response = {
        success: true,
        message: '내 정보가 성공적으로 수정되었습니다.',
        name: name,
        phone: phone,
        password: password,
        log: '실제 데이터를 전송 받을 때는 개인정보를 입력하지 않습니다!',
      };

      return response;
    } catch (error) {
      console.error('Update User Info error:', error);
      Alert.alert('Update User Info Error', error.message);
      throw error;
    }
  },

  // (9) 사용자 신체 정보 수정 (2023-08-24 ChatGPT)
  updatePhysicalInfo: async (height, weight) => {
    console.log('사용자 신체 정보 수정 요청');
    try {
      //  const response = await axios.post(`${API_URL}/user/userBody/bodyInfo`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${jwt}`
      //   },
      //  {
      //    height: height,
      //    weight: weight,
      //  }
      // });

      // Temporary response to simulate a successful update. Remove or modify as needed.
      const response = {
        status: 'OK',
        message: '신체정보 수정 성공',
        data: {
          userId: 'aaa',
          height: 160,
          weight: 50,
          bmi: 0,
        },
      };

      return response;
    } catch (error) {
      console.error('Update Physical Info error:', error);
      Alert.alert('Update Physical Info Error', error.message);
      throw error;
    }
  },
};
