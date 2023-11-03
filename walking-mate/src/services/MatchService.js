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
<<<<<<< HEAD
      console.log('모집 중인 대결 리스트 정보를 가져오는 함수입니다.');
      const response = await axios.get(`${API_URL}/battle/list`);

      console.log(response.data);

      return response.data;
    } catch (error) {
      //console.error('Error in getting recruiting teams:', error);
=======
      // 실제로는 서버에 요청을 보내는 코드가 필요합니다.
      // const response = await axios.get('${API_URL}/battle/list');
      const response = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: [
          {
            id: 15,
            startDate: null,
            totalStep: 0,
            battleCheck: '대결 팀 모집 중',
            createdDate: '20230801',
            battleRivals: [
              {
                teamId: 8,
                teamLeader: 'aaa',
                teamTier: '실버',
                intro: '안녕하세용',
                teamName: 'aaa의 팀',
                peopleNum: 4,
                step: 0,
              },
            ],
          },
          {
            id: 16,
            startDate: null,
            totalStep: 0,
            battleCheck: '대결 팀 모집 중',
            createdDate: '20230802',
            battleRivals: [
              {
                teamId: 9,
                teamLeader: 'bbb',
                teamTier: '브론즈',
                teamName: 'bbb의 팀',
                intro: '안녕하세용',
                peopleNum: 4,
                step: 0,
              },
            ],
          },
          {
            id: 17,
            startDate: null,
            totalStep: 0,
            battleCheck: '대결 팀 모집 중',
            createdDate: '20230802',
            battleRivals: [
              {
                teamId: 10,
                teamLeader: 'ccc',
                teamTier: '골드',
                teamName: 'ccc의 팀',
                intro: '안녕하세용',
                peopleNum: 4,
                step: 0,
              },
            ],
          },
          {
            id: 18,
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
        ],
      };
      return response.data;
    } catch (error) {
      console.error('Error in getting recruiting teams:', error);
>>>>>>> master
      Alert.alert('Error', error.message);
      throw error;
    }
  },

  // (2) 사용자의 팀이 현재 대결 중인지 확인하는 함수 (2023-07-29 이수)
  isUserInMatch: async (jwt) => {
    try {
<<<<<<< HEAD
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
=======
      // 서버에 요청하는 부분은 주석 처리하였습니다.
      // const response = await axios.get('${API_URL}/battle/teamStatus'),
      // headers: {
      //  'Content-Type': 'application/json',
      //  'Authorization': `${userJwt}`
      //});

      // const data = await response.data;
      // return data;

      const response = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: {
          id: 18,
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

      const response1 = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: {
          id: 15,
          startDate: null,
          totalStep: 0,
          battleCheck: '팀 생성 완료',
          battleRivals: [
            {
              teamId: 8,
              teamName: 'aaa의 팀',
              peopleNum: 4,
              step: 0,
            },
          ],
        },
      };
      return response1;
    } catch (error) {
      console.error('Error in checking if user is a team leader:', error);
>>>>>>> master
      Alert.alert('Error', error.message);
      throw error;
    }
  },

  // (3) 대결 생성 처리 (2023-07-31 이수)
  createMatch: async (jwt, date) => {
    try {
<<<<<<< HEAD
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
=======
      /*const response = await fetch('${API_URL}/battle/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : jwt
        },
        body: JSON.stringify({
          createdDate: date
        }));*/

      const response = {
        status: 'OK',
        message: '대결 생성 성공',
        data: {
          id: 16,
          startDate: date,
          totalStep: 0,
          battleCheck: '팀 모집 중',
          battleRivals: null,
        },
      };

      console.log(response);
      return response;
    } catch (error) {
      console.error('Error in createMatch:', error);
>>>>>>> master
      throw error;
    }
  },

<<<<<<< HEAD
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
=======
  // 대결 신청 처리 (2023-08-31 이수) => userTeamId 안필요한가...?
  requestMatch: async (userTeamId, battleTeamId) => {
    try {
      //const response = await fetch('${API_URL}/battle/battleRival/{battleId}');

      const response = {
        status: 'OK',
        message: '대결 라이벌 생성 성공',
        data: {
          teamId: 15,
          leaderName: null,
          tear: null,
          intro: null,
          teamName: '인하대팀',
          peopleNum: 4,
          step: 0,
        },
      };
      return response;
    } catch (error) {
      console.error('Error in createMatch:', error);
>>>>>>> master
      throw error;
    }
  },

  // 대결 삭제 처리 (2023-08-31 이수)
<<<<<<< HEAD
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
=======
  deleteMatch: async (teamId) => {
    try {
      // const response = await fetch('${API_URL}/battle/{battleId});
      const response = {
        status: 'OK',
        message: '대결 삭제 성공',
        data: {
          id: 32,
          startDate: null,
          createdDate: '2023-08-20',
          totalStep: 0,
          battleCheck: null,
          battleRivals: null,
        },
      };
      return response;
    } catch (error) {
      console.error('Error in createMatch:', error);
>>>>>>> master
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
<<<<<<< HEAD
      //console.error('Error in sendStepsToMatch:', error);
=======
      console.error('Error in sendStepsToMatch:', error);
>>>>>>> master
      Alert.alert('Error', error.message);
      throw error;
    }
  },
};
