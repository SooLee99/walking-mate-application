/**
 * @파일명 TeamService.js
 * @작성자 이수
 * @작성일 2023-07-29
 */

import { Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config/Config';

export const TeamService = {
  // (1) 모집 중인 팀 리스트의 정보를 가져오는 함수
  getRecruitingTeams: async () => {
    try {
      const response = await axios.get(`${API_URL}/team/list`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Error in getting recruiting teams:', error);
      Alert.alert('Error', error.message);
      throw error;
    }
  },

  // (2) 팀 생성 처리 (2023-07-31 완료)
  createTeam: async (
    userJwt,
    teamName,
    teamIntroduction,
    totalMembers,
    createdDate
  ) => {
    console.log('팀 생성 처리 완료');
    try {
      const response = await axios.post(
        `${API_URL}/team/save`,
        {
          name: teamName,
          peopleNum: totalMembers,
          intro: teamIntroduction,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${userJwt}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('팀 생성 오류:', error);
      throw error;
    }
  },

  // (3) 팀 삭제 요청 (2023-08-02 이수)
  deleteTeam: async (teamId, userJwt) => {
    try {
      const response = await axios.delete(`${API_URL}/team/${teamId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${userJwt}`,
        },
      });
      console.log(userJwt);
      console.log(`${API_URL}/team/${teamId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('강퇴 에러:', error);
      Alert.alert('강퇴 에러', error.message);
      throw error;
    }
  },

  // (4) 팀 가입 요청 (2023-08-02 이수)
  joinMember: async (teamId, jwt) => {
    try {
      console.log('여기여기여기여기');
      console.log(teamId);
      console.log(jwt);
      const response = await axios.post(
        `${API_URL}/team/${teamId}/member/save`,
        {}, // 두 번째 인자는 요청 본문.
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${jwt}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('강퇴 에러:', error);
      Alert.alert('강퇴 에러', error.message);
      throw error;
    }
  },

  // (5) 팀에서 나가기 요청 (2023-08-02 이수)
  kickMember: async (teamId, userId, userJwt) => {
    try {
      console.log(`${API_URL}/team/${teamId}/member/${userId}`);
      console.log(userJwt);
      const response = await axios.delete(
        `${API_URL}/team/${teamId}/member/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${userJwt}`,
          },
        }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('강퇴 에러:', error);
      Alert.alert('강퇴 에러', error.message);
      throw error;
    }
  },

  // (6) 팀 단일 검색 (2023-08-13 이수)
  getTeamById: async (teamId) => {
    try {
      console.log('팀 검색 : ' + teamId);
      const response = await fetch(`${API_URL}/team/${teamId}`);
      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      console.error('Error fetching team by ID:', error);
      throw error;
    }
  },

  // (7) 팀 멤버 검색 (2023-08-13 이수)
  getMemberById: async (teamId) => {
    try {
      console.log('팀 검색 : ' + teamId);
      const response = await axios.get(`${API_URL}/team/list/search/${teamId}`);
      console.log('팀 멤버 검색 결과');
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error('Error fetching team by ID:', error);
      throw error;
    }
  },
};
