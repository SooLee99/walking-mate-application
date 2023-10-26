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
    const newDateStr = date.replace(/-/g, '');
    console.log(newDateStr);
    try {
      console.log(`${API_URL}/checkList/list/${newDateStr}`);
      const response = await axios.get(
        `${API_URL}/checkList/list/${newDateStr}`,
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
      console.error('Get tasks error:', error);
      Alert.alert('Get Tasks Error', error.message);
      throw error;
    }
  },

  // (2) 일정 추가 처리 (2023-07-27 이수)
  addTask: async (jwt, date, task) => {
    console.log('해당 일정을 추가하였습니다.');
    console.log(jwt);
    const newDateStr = date.replace(/-/g, '');
    console.log(newDateStr);
    console.log(task.content);
    try {
      const response = await axios.post(
        `${API_URL}/checkList/save`,
        {
          date: date,
          checked: 0,
          content: task.content,
        },
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
