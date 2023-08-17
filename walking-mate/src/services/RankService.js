/**
 * @파일명 RankService.js
 * @작성자 이수
 * @작성일 2023-08-25
 */

import { Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config/Config';

export const RankService = {
  // (1) 현재 이용자의 팀정보를 가져오는 함수
  getUserInfo: async () => {
    try {
      // const response = await axios.get(`${API_URL}/user/info`);
      const response = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: {
          id: 14,
          name: '인하공전팀',
          intro: '팀 모집합니당',
          teamNum: 4,
          peopleNum: 4,
          state: '대결 진행 중',
          date: '20230808',
          teamMembers: [
            {
              userId: 'aaa',
              teamId: 14,
              teamLeader: true,
            },
            {
              userId: 'asdf',
              teamId: 14,
              teamLeader: false,
            },
            {
              userId: 'ccc',
              teamId: 14,
              teamLeader: false,
            },
            {
              userId: 'ffff',
              teamId: 14,
              teamLeader: false,
            },
          ],
          teamRankResponseDTO: {
            teamId: 14,
            tear: '아이언',
            coin: 0,
            winNum: 3,
          },
        },
      };
      return response;
    } catch (error) {
      console.error('Error fetching user info:', error);
      Alert.alert('Error', error.message);
      throw error;
    }
  },

  // (2) 팀 랭킹을 조회하는 함수
  getTeamRanking: async () => {
    try {
      // const response = await axios.get(`${API_URL}/ranking/team`);
      const response = {
        status: 'OK',
        message: '팀 랭킹 조회 성공',
        data: [
          {
            teamId: 16,
            tear: '마스터',
            coin: 0,
            winNum: 1000,
          },
          {
            teamId: 14,
            tear: '아이언',
            coin: 0,
            winNum: 2,
          },
          {
            teamId: 15,
            tear: '아이언',
            coin: 0,
            winNum: 2,
          },
          {
            teamId: 8,
            tear: '아이언',
            coin: 0,
            winNum: 0,
          },
          {
            teamId: 11,
            tear: '아이언',
            coin: 0,
            winNum: 0,
          },
        ],
      };
      return response;
    } catch (error) {
      console.error('Error fetching team ranking:', error);
      Alert.alert('Error', error.message);
      throw error;
    }
  },

  // (3) 개인 랭킹을 조회하는 함수
  getIndividualRanking: async () => {
    try {
      // const response = await axios.get(`${API_URL}/ranking/individual`);
      const response = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: [
          {
            userId: 'bbb',
            tear: '실버',
            coin: 172,
            runNum: 5,
          },
          {
            userId: 'aaa',
            tear: '아이언',
            coin: 19,
            runNum: 3,
          },
        ],
      };
      return response;
    } catch (error) {
      console.error('Error fetching individual ranking:', error);
      Alert.alert('Error', error.message);
      throw error;
    }
  },
};
