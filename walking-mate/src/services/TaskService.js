/**
 * @파일명 TaskService.js
 * @작성자 이수
 * @작성일 2023-07-27
 */

import { Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config/Config';

export const TaskService = {
  // (1) 일정 조회 처리 (2023-07-27 이수)
  getTasks: async (jwt, date) => {
    console.log('일정을 조회하였습니다.');
    console.log(jwt);
    console.log(date);
    try {
      // 실제로는 서버에 요청을 보내는 코드가 필요합니다.
      // const response = await axios.get(`${API_URL/checklist/list/{date}`,
      // headers: {
      //  'Content-Type': 'application/json',
      //  'Authorization': `${jwt}`
      // });

      // 날짜별로 임시 일정 데이터를 설정(2023-07-28 이수)
      const tasksData = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: [
          {
            listId: 7,
            userId: 'aaa',
            date: '2023-08-08',
            checked: false,
            content: '체크리스트 테스트1',
          },
          {
            listId: 8,
            userId: 'aaa',
            date: '2023-08-08',
            checked: false,
            content: '체크리스트 테스트2',
          },
          {
            listId: 9,
            userId: 'aaa',
            date: '2023-08-08',
            checked: false,
            content: '체크리스트 테스트3',
          },
          {
            listId: 9,
            userId: 'aaa',
            date: '2023-08-08',
            checked: false,
            content: '체크리스트 테스트4',
          },
          {
            listId: 9,
            userId: 'aaa',
            date: '2023-08-08',
            checked: false,
            content: '체크리스트 테스트5',
          },
        ],
      };
      return tasksData;
    } catch (error) {
      console.error('Get tasks error:', error);
      Alert.alert('Get Tasks Error', error.message);
      throw error;
    }
  },

  // (2) 일정 추가 처리 (2023-07-27 이수)
  addTask: async (jwt, date, task) => {
    console.log('해당 일정을 추가하였습니다.');
    console.log(jwt);
    console.log(date);
    console.log(task);
    try {
      // 실제로는 서버에 요청을 보내는 코드가 필요합니다.
      // const response = await axios.post('${API_URL}/checkList/save',
      // headers: {
      //  'Content-Type': 'application/json',
      //  'Authorization': `${jwt}`
      // },
      //  body: JSON.stringify({
      //  date: date,
      //  content: content
      //  })
      //}););
      const response = {
        status: 'OK',
        message: '체크리스트 작성 성공',
        data: {
          listId: 7,
          userId: 'aaa',
          date: '20230808',
          checked: false,
          content: '체크리스트 테스트1',
        },
      }; // <- 임시로 성공 처리(2023-07-27 이수)
      return response;
    } catch (error) {
      console.error('Add task error:', error);
      Alert.alert('Add Task Error', error.message);
      throw error;
    }
  },

  // (3) 일정 삭제 처리 (2023-07-27 이수)
  deleteTask: async (jwt, listId) => {
    console.log('해당 일정을 삭제하였습니다.');
    console.log(jwt);
    console.log(listId);
    try {
      // 실제로는 서버에 요청을 보내는 코드가 필요합니다.
      // const response = await axios.delete('${API_URL}/checkList/{listId}',
      // headers: {
      //  'Content-Type': 'application/json',
      //  'Authorization': `${jwt}`
      // }
      const response = {
        status: 'OK',
        message: '체크리스트 삭제 성공',
        data: {
          listId: 7,
          userId: 'aaa',
          date: '20230808',
          checked: true,
          content: 'update',
        },
      }; // <- 임시로 성공 처리(2023-07-27 이수)
      return response;
    } catch (error) {
      console.error('Delete task error:', error);
      Alert.alert('Delete Task Error', error.message);
      throw error;
    }
  },

  // (4) 일정 체크 상태 변동 (2023-08-12)
  updateTaskCheckStatus: async (jwt, listId) => {
    console.log('해당 일정을 수정하였습니다.');
    console.log(jwt);
    console.log(listId);
    try {
      // 실제로는 서버에 요청을 보내는 코드가 필요합니다.
      // const response = await axios.delete('${API_URL}/checkList/checked/{listId}',
      // headers: {
      //  'Content-Type': 'application/json',
      //  'Authorization': `${jwt}`
      // });
      const response = {
        status: 'OK',
        message: '체크리스트 선택 및 해제',
        data: {
          listId: 7,
          userId: 'aaa',
          date: '20230808',
          checked: true,
          content: 'update',
        },
      }; // <- 임시로 성공 처리(2023-08-12 이수)
      return response;
    } catch (error) {
      console.error('Update task check status error:', error);
      Alert.alert('Update Task Check Status Error', error.message);
      throw error;
    }
  },
};
