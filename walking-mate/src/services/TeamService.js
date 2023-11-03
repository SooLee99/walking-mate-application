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
<<<<<<< HEAD
      const response = await axios.get(`${API_URL}/team/list`);
      console.log(response.data.data);
      return response.data.data;
=======
      // 실제로는 서버에 요청을 보내는 코드가 필요합니다.
      // const response = await axios.get('${API_URL}/team/list');
      const response = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: [
          {
            id: 8,
            name: 'aaa의 팀',
            intro: '안녕',
            peopleNum: 4,
            state: '모집',
            date: '20230701',
            teamMembers: [
              {
                userId: 'aaa',
                teamId: 8,
                teamLeader: true,
              },
              {
                userId: 'ccc',
                teamId: 8,
                teamLeader: false,
              },
            ],
            teamRankResponseDTO: {
              teamId: 8,
              tear: '실버',
              coin: 0,
            },
          },
          {
            id: 10,
            name: 'bbb@naver.com의 팀',
            intro: '안녕하세용',
            peopleNum: 4,
            state: '모집',
            date: '20230701',
            teamMembers: [
              {
                userId: 'bbb@naver.com',
                teamId: 10,
                teamLeader: true,
              },
              {
                userId: 'aaa@naver.com',
                teamId: 8,
                teamLeader: false,
              },
              {
                userId: 'ccc',
                teamId: 8,
                teamLeader: false,
              },
              {
                userId: 'ddd',
                teamId: 8,
                teamLeader: false,
              },
            ],
            teamRankResponseDTO: {
              teamId: 10,
              tear: '실버',
              coin: 0,
            },
          },
        ],
      };

      return response.data;
>>>>>>> master
    } catch (error) {
      console.error('Error in getting recruiting teams:', error);
      Alert.alert('Error', error.message);
      throw error;
    }
  },

<<<<<<< HEAD
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
=======
  // (2) 팀 생성 처리 (2023-07-31 이수)
  createTeam: async (teamName, teamIntroduction, totalMembers, createdDate) => {
    console.log('팀 생성 처리 완료');
    console.log(teamName);
    console.log(teamIntroduction);
    console.log(totalMembers);
    console.log(createdDate);
    try {
      // 서버에 팀 생성 요청을 보내는 부분입니다.
      // const response = await axios.post('${API_URL}/team/save', {
      //   name: teamName,
      //   peopleNum: totalMembers,
      //   intro: teamIntroduction,
      // });
      const response = {
        status: 'OK',
        message: '팀 생성 성공',
        data: {
          id: 18,
          name: '인하대팀',
          intro: '팀 모집 중',
          teamNum: 4,
          peopleNum: 0,
          state: '대결 팀 모집 중',
          date: '20230821',
          teamMembers: null,
          teamRankResponseDTO: null,
        },
      };
      console.log(response);
      return response;
    } catch (error) {
      console.error('Create Team error:', error);
>>>>>>> master
      throw error;
    }
  },

  // (3) 팀 삭제 요청 (2023-08-02 이수)
<<<<<<< HEAD
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
=======
  deleteTeam: async (teamId) => {
    try {
      //const response = await axios.post('${API_URL}/team/{teamId}');
      const response = {
        status: 'OK',
        message: '팀 삭제 성공',
        data: {
          id: 16,
          name: '인하대팀',
          intro: '팀 모집 중',
          teamNum: 0,
          peopleNum: 4,
          state: '대결 팀 모집 중',
          date: '20230808',
          teamMembers: null,
          teamRankResponseDTO: null,
        },
      };
      const response1 = {
        status: 'BAD_REQUEST',
        message: '팀 조회 실패',
        data: null,
      };
      return response;
>>>>>>> master
    } catch (error) {
      console.error('강퇴 에러:', error);
      Alert.alert('강퇴 에러', error.message);
      throw error;
    }
  },

  // (4) 팀 가입 요청 (2023-08-02 이수)
  joinMember: async (teamId, jwt) => {
    try {
<<<<<<< HEAD
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
=======
      //const response = await axios.post('${API_URL}/team/{teamId}/member/save',
      // headers: {
      //  'Content-Type': 'application/json',
      //  'Authorization': `${jwt}`
      //});
      const response = {
        status: 'OK',
        message: '팀 멤버 가입 성공',
        data: {
          userId: 'ccc',
          teamId: teamId,
          teamLeader: false,
        },
      };
      const response1 = {
        status: 'BAD_REQUEST',
        message: '기존 팀 존재',
        data: null,
      };
      return response;
>>>>>>> master
    } catch (error) {
      console.error('강퇴 에러:', error);
      Alert.alert('강퇴 에러', error.message);
      throw error;
    }
  },

  // (5) 팀에서 나가기 요청 (2023-08-02 이수)
<<<<<<< HEAD
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
=======
  kickMember: async (teamId, userId) => {
    try {
      //const response = await axios.post('${API_URL}s/team/${teamId}/member/${userId}');
      const response = {
        status: 'OK',
        message: '팀 멤버 삭제 성공',
        data: {
          userId: 'ccc',
          teamId: teamId,
          teamLeader: false,
        },
      };
      console.log(response);
      return response;
>>>>>>> master
    } catch (error) {
      console.error('강퇴 에러:', error);
      Alert.alert('강퇴 에러', error.message);
      throw error;
    }
  },
<<<<<<< HEAD

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
=======
  // (6) 팀 단일 검색 (2023-08-13 이수)
  getTeamById: async (teamId) => {
    try {
      //const response = await fetch(`${API_URL}/teams/${teamId}`);

      const response = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: {
          id: 8,
          name: 'aaa의 팀',
          intro: '팀원 구해요~',
          teamNum: 4,
          peopleNum: 2,
          state: '모집',
          date: '20230801',
          teamMembers: [
            {
              userId: 'aaa',
              teamId: 8,
              teamLeader: true,
            },
            {
              userId: 'ccc',
              teamId: 8,
              teamLeader: false,
            },
          ],
          teamRankResponseDTO: {
            teamId: 8,
            tear: '실버',
            coin: 0,
          },
        },
      };

      return response;
>>>>>>> master
    } catch (error) {
      console.error('Error fetching team by ID:', error);
      throw error;
    }
  },
};
