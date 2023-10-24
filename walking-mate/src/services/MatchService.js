/**
 * @파일명 MatchService.js
 * @작성자 이수
 * @작성일 2023-08-03
 */

import { Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config/Config';

export const MatchService = {
  // (1) 모집 중인 팀 리스트의 정보를 가져오는 함수
  getRecruitingMatchList: async () => {
    try {
      console.log('모집 중인 대결 리스트 정보를 가져오는 함수입니다.');
      const response = await axios.get(`${API_URL}/battle/list`);

      console.log(response.data);

      return response.data;
    } catch (error) {
      //console.error('Error in getting recruiting teams:', error);
      Alert.alert('Error', error.message);
      throw error;
    }
  },

  // (2) 사용자의 팀이 현재 대결 중인지 확인하는 함수 (2023-07-29 이수)
  isUserInMatch: async (jwt) => {
    try {
      console.log('사용자의 팀이 현재 대결 중인지 확인하는 함수입니다.');
      console.log(jwt);
      const response = await axios.get(`${API_URL}/battle/teamStatus`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${jwt}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      //console.error('Error in checking if user is a team leader:', error);
      Alert.alert('Error', error.message);
      throw error;
    }
  },

  // (3) 대결 생성 처리 (2023-07-31 이수)
  createMatch: async (jwt, date) => {
    try {
      console.log('대결 생성 신청함.');
      const response = await axios.post(
        `${API_URL}/battle/new`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: jwt,
          },
        }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      //console.error('Error in createMatch:', error);
      throw error;
    }
  },

  // 대결 신청 처리 (2023-08-31 이수)
  requestMatch: async (userJWT, battleTeamId) => {
    try {
      console.log('대결 신청 처리');
      console.log(userJWT);
      console.log(battleTeamId);
      const response = await fetch(
        `${API_URL}/battle/battleRival/${battleTeamId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${userJWT}`,
          },
          body: JSON.stringify({}),
        }
      );
      console.log(response.data);
      return response;
    } catch (error) {
      //console.error('Error in createMatch:', error);
      throw error;
    }
  },

  // 대결 삭제 처리 (2023-08-31 이수)
  deleteMatch: async (battleId) => {
    try {
      console.log('대결 삭제 처리 시도');
      console.log(battleId);
      const response = await fetch(`${API_URL}/battle/${battleId}`, {
        method: 'DELETE',
      });

      console.log(response.data);
      return response;
    } catch (error) {
      //console.error('Error in createMatch:', error);
      throw error;
    }
  },

  // (4) 대결에 스텝 업데이트 처리 (2023-08-31 이수)
  sendStepsToMatch: async (jwt, teamId, updatedSteps) => {
    try {
      // const response = await axios.post(`${API_URL}/battle/battleRival/{teamId}`, {
      //   step: updatedSteps,
      // });

      const response = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: {
          battleId: 18,
          startDate: '2023-08-01',
          totalStep: 400,
          battleCheck: '대결 진행 중',
          battleRivals: [
            {
              teamId: 11,
              teamName: 'ddd의 팀',
              teamTier: '실버',
              intro: '안녕하세용',
              peopleNum: 4,
              step: 100,
            },
            {
              teamId: 12,
              teamName: 'eee의 팀',
              teamTier: '실버',
              intro: '안녕하세용',
              peopleNum: 4,
              step: 300,
            },
          ],
        },
      };

      return response;
    } catch (error) {
      //console.error('Error in sendStepsToMatch:', error);
      Alert.alert('Error', error.message);
      throw error;
    }
  },
};
