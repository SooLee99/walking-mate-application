/**
 * @파일명 ExerciseRecordService.js
 * @작성자 이수
 * @작성일 2023-08-12
 */

import { Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config/Config';

export const ExerciseRecordService = {
  /* (1) 일정별로 운동 기록 조회 처리 (2023-08-12 이수)
  getExerciseRecords: async (jwt, selectedDate) => {
    console.log('운동 기록을 조회하였습니다.');
    console.log(jwt);
    console.log(selectedDate);

    try {
      // 실제로는 서버에 요청을 보내는 코드가 필요합니다.
      // const response = await axios.get(`${API_URL}/run/list/{date},
      // headers: {
      //  'Content-Type': 'application/json',
      //  'Authorization': `${jwt}`
      // });

      const exerciseRecordsData = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: [
          {
            id: 1,
            userId: 'aaa',
            date: '2023-08-20',
            step: 10,
            distance: 5.0,
            time: 5,
            startTime: '18:59:30',
            endTime: '18:59:33',
          },
          {
            id: 2,
            userId: 'aaa',
            date: '2023-08-21',
            step: 555,
            distance: 55.0,
            time: 10,
            startTime: '18:59:30',
            endTime: '18:59:33',
          },
          {
            id: 3,
            userId: 'aaa',
            date: '2023-08-22',
            step: 55,
            distance: 55.0,
            time: 10,
            startTime: '18:59:30',
            endTime: '19:09:33',
          },
          {
            id: 4,
            userId: 'aaa',
            date: '2023-08-24',
            step: 1000,
            distance: 5.0,
            time: 10,
            startTime: '18:59:30',
            endTime: '18:59:33',
          },
          {
            id: 5,
            userId: 'aaa',
            date: '2023-08-25',
            step: 555,
            distance: 55.0,
            time: 10,
            startTime: '18:59:30',
            endTime: '18:59:33',
          },
          {
            id: 6,
            userId: 'aaa',
            date: '2023-08-26',
            step: 555,
            distance: 55.0,
            time: 10,
            startTime: '18:59:30',
            endTime: '19:09:33',
          },
          {
            id: 7,
            userId: 'aaa',
            date: '2023-08-26',
            step: 200,
            distance: 20.0,
            time: 10,
            startTime: '19:59:30',
            endTime: '20:09:33',
          },
          {
            id: 8,
            userId: 'aaa',
            date: '2023-08-27',
            step: 2500,
            distance: 25.0,
            time: 10,
            startTime: '18:59:30',
            endTime: '19:09:33',
          },
        ],
      };

      return exerciseRecordsData;
    } catch (error) {
      console.error('Get exercise records error:', error);
      Alert.alert('Get Exercise Records Error', error.message);
      throw error;
    }
  },*/

  // (2) 전체 운동 기록 조회 처리 (2023-08-28 이수)
  getAllExerciseRecords: async (jwt) => {
    console.log('운동 전체 기록을 조회하였습니다.');
    console.log(jwt);

    try {
      // 실제로는 서버에 요청을 보내는 코드가 필요합니다.
      // const response = await axios.get(`${API_URL}/run/list,
      // headers: {
      //  'Content-Type': 'application/json',
      //  'Authorization': `${jwt}`
      // });

      const exerciseRecordsData = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: [
          {
            id: 1,
            userId: 'aaa',
            date: '2023-08-20',
            step: 10,
            distance: 5.0,
            time: 5,
            startTime: '18:59:30',
            endTime: '18:59:33',
          },
          {
            id: 2,
            userId: 'aaa',
            date: '2023-08-21',
            step: 555,
            distance: 55.0,
            time: 10,
            startTime: '18:59:30',
            endTime: '18:59:33',
          },
          {
            id: 3,
            userId: 'aaa',
            date: '2023-08-22',
            step: 55,
            distance: 55.0,
            time: 10,
            startTime: '18:59:30',
            endTime: '19:09:33',
          },
          {
            id: 4,
            userId: 'aaa',
            date: '2023-08-24',
            step: 1000,
            distance: 5.0,
            time: 10,
            startTime: '18:59:30',
            endTime: '18:59:33',
          },
          {
            id: 5,
            userId: 'aaa',
            date: '2023-08-25',
            step: 555,
            distance: 55.0,
            time: 10,
            startTime: '18:59:30',
            endTime: '18:59:33',
          },
          {
            id: 6,
            userId: 'aaa',
            date: '2023-08-26',
            step: 555,
            distance: 55.0,
            time: 10,
            startTime: '18:59:30',
            endTime: '19:09:33',
          },
          {
            id: 7,
            userId: 'aaa',
            date: '2023-08-26',
            step: 200,
            distance: 20.0,
            time: 10,
            startTime: '19:59:30',
            endTime: '20:09:33',
          },
          {
            id: 8,
            userId: 'aaa',
            date: '2023-08-27',
            step: 2500,
            distance: 25.0,
            time: 10,
            startTime: '18:59:30',
            endTime: '19:09:33',
          },
        ],
      };

      return exerciseRecordsData;
    } catch (error) {
      console.error('Get exercise records error:', error);
      Alert.alert('Get Exercise Records Error', error.message);
      throw error;
    }
  },

  // (3) 서버에 운동 정보 전송 (2023-08-18 이수)
  sendExerciseDataToServer: async (
    jwt,
    distance,
    steps,
    calories,
    exerciseDate,
    exerciseTime,
    startTime,
    endTime
  ) => {
    const exerciseData = {
      steps: steps, // 운동 정보 (걸음 수)
      distance: distance.toFixed(2), // 운동 정보 (거리)
      calories: calories, // 운동 정보 (칼로리)
      exerciseDate: exerciseDate, // 운동한 날짜
      exerciseTime: exerciseTime, // 운동한 시간
      startTime: startTime, // 운동을 시작한 시간
      endTime: endTime, // 운동이 종료된 시간
    };

    try {
      // const response = await axios.post(`${API_URL}/run/record`,
      // headers: {
      //  'Content-Type': 'application/json',
      //  'Authorization': `${jwt}`
      // },
      //  body: JSON.stringify({
      //    steps: steps, // 운동 정보 (걸음 수)
      //    distance: distance.toFixed(2), // 운동 정보 (거리)
      //    kcal: calories, // 운동 정보 (칼로리)
      //    date: exerciseDate, // 운동한 날짜
      //    exerciseTime: exerciseTime, // 운동한 시간
      //    startTime: startTime, // 운동을 시작한 시간
      //    endTime: endTime, // 운동이 종료된 시간
      // }));
      const response = {
        status: 'OK',
        message: '운동기록 저장 성공',
        data: {
          id: 11,
          userId: 'ccc',
          kcal: calories,
          step: steps,
          distance: 10.0,
          date: '2023-08-20',
          time: 0,
          startTime: '18:56:20',
          endTime: null,
        },
      };
      if (response.status === 'OK') {
        console.log('운동 정보가 성공적으로 전송되었습니다.');
        console.log(jwt);
        console.log(response);
        return true;
      } else {
        console.error('운동 정보 전송에 실패했습니다.');
        Alert.alert(
          '전송 실패',
          '운동 정보 전송에 실패하였습니다. 다시 시도하시겠습니까?'
        );
        return false;
      }
    } catch (error) {
      console.error('서버로의 요청 중 에러 발생:', error);
      Alert.alert('전송 실패', '서버로의 요청 중 에러가 발생하였습니다.');
      return false;
    }
  },
};
