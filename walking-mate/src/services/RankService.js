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
      // const response = await axios.get(`${API_URL}/team/list/userTeam`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${jwt}`
      //   }
      //   });

      const response = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: {
          id: 14,
          name: '러닝메이트',
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
      // const response = await axios.get(`${API_URL}/team/teamRank/list`);
      const response = {
        status: 'OK',
        message: '팀 랭킹 조회 성공',
        data: [
          {
            teamId: '한이음 모임',
            tear: '마스터',
            coin: 0,
            winNum: 3,
          },
          {
            teamId: '러닝메이트',
            tear: '아이언',
            coin: 0,
            winNum: 5,
          },
          {
            teamId: 'ㅇㅅㅇ',
            tear: '아이언',
            coin: 0,
            winNum: 2,
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
      // const response = await axios.get(`${API_URL}/user/userRank/personal`);
      const response = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: [
          {
            userId: 'aaa@naver.com',
            tear: '아이언',
            coin: 172,
            runNum: 5,
          },
          {
            userId: 'bbb@naver.com',
            tear: '아이언',
            coin: 19,
            runNum: 3,
          },
          {
            userId: 'ccc@naver.com',
            tear: '아이언',
            coin: 19,
            runNum: 0,
          },
          {
            userId: 'ddd@naver.com',
            tear: '아이언',
            coin: 19,
            runNum: 0,
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
