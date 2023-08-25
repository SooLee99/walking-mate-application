/**
 * @파일명 PostService.js
 * @작성자 이수
 * @작성일 2023-08-22
 */

import { Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config/Config';

export const PostService = {
  // (1) 모든 게시물을 가져오는 메서드 (2023-08-22 이수)
  getAllPosts: async () => {
    try {
      // 실제 서버와의 통신을 위한 코드 (현재 주석 처리)
      // const response = await axios.get(`${API_URL}/board/list/{page}`);
      // return response.data;

      // 임시로 게시물 데이터 반환 (실제 서버 통신 코드 작성 시 이 부분을 삭제하거나 주석 처리)
      const response = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: [
          {
            id: 12,
            userId: 'aaa',
            title: 'title2',
            content: 'content2',
            regTime: '2023-07-27T12:10:43.34847',
            updateTime: '2023-08-04T20:57:40.63307',
            recommend: 1,
            isrecommend: true,
            comments: [
              {
                id: 7,
                boardId: 12,
                userId: 'bbb',
                content: 'update2',
                regTime: '2023-07-27T15:44:41.650121',
                updateTime: '2023-08-08T18:34:44.993547',
                parentId: 0,
                recommend: 1,
                isrecommend: false,
                children: [],
              },
              {
                id: 9,
                boardId: 12,
                userId: 'aaa',
                content: '1',
                regTime: '2023-08-07T15:51:10.300305',
                updateTime: '2023-08-07T15:51:10.300305',
                parentId: 0,
                recommend: 1,
                isrecommend: true,
                children: [],
              },
              {
                id: 10,
                boardId: 12,
                userId: 'aaa',
                content: '1',
                regTime: '2023-08-07T15:51:25.641841',
                updateTime: '2023-08-07T15:51:25.641841',
                parentId: 9,
                recommend: 0,
                isrecommend: false,
                children: [],
              },
            ],
          },
          {
            id: 11,
            userId: 'bbb',
            title: 'updateTitle1',
            content: 'updateContent1',
            regTime: '2023-07-27T12:10:42.659357',
            updateTime: '2023-08-08T15:56:04.568503',
            recommend: 1,
            isrecommend: true,
            comments: [],
          },
          {
            id: 10,
            userId: 'bbb',
            title: 'updateTitle1',
            content: 'updateContent1',
            regTime: '2023-07-27T11:58:45.326257',
            updateTime: '2023-07-27T11:58:45.326257',
            recommend: 0,
            isrecommend: false,
            comments: [],
          },
          {
            id: 9,
            userId: 'aaa',
            title: 'title2',
            content: 'content2',
            regTime: '2023-07-26T19:59:53.446575',
            updateTime: '2023-07-26T19:59:53.446575',
            recommend: 0,
            isrecommend: false,
            comments: [],
          },
          {
            id: 7,
            userId: 'bbb',
            title: '테스트 제목',
            content: '테스트 내용',
            regTime: '2023-07-26T19:35:24.566665',
            updateTime: '2023-07-26T19:35:24.566665',
            recommend: 0,
            isrecommend: false,
            comments: [],
          },
          {
            id: 5,
            userId: 'aaa',
            title: 'rrr',
            content: 'rrr',
            regTime: null,
            updateTime: null,
            recommend: 0,
            isrecommend: false,
            comments: [],
          },
        ],
      };
      return response.data;
    } catch (error) {
      console.error('Fetch All Posts error:', error);
      Alert.alert('Fetch All Posts Error', error.message);
      throw error;
    }
  },

  // (2) 특정 게시물을 ID로 가져오는 메서드 (2023-08-22 이수)
  getPostById: async (id) => {
    try {
      // 실제 서버와의 통신을 위한 코드 (현재 주석 처리)
      // const response = await axios.get(`${API_URL}/board/{id}`);
      // return response.data;

      // 임시로 게시물 데이터 반환 (실제 서버 통신 코드 작성 시 이 부분을 삭제하거나 주석 처리)
      const response = {
        status: 'OK',
        message: '데이터베이스 조회 성공',
        data: {
          id: 12,
          userId: 'aaa',
          title: 'title2',
          content: 'content2',
          regTime: '2023-07-27T12:10:43.34847',
          updateTime: '2023-08-04T20:57:40.63307',
          recommend: 1,
          isrecommend: true,
          comments: [
            {
              id: 7,
              boardId: 12,
              userId: 'bbb',
              content: 'update2',
              regTime: '2023-07-27T15:44:41.650121',
              updateTime: '2023-08-08T18:34:44.993547',
              parentId: 0,
              children: [],
            },
            {
              id: 9,
              boardId: 12,
              userId: 'aaa',
              content: '1',
              regTime: '2023-08-07T15:51:10.300305',
              updateTime: '2023-08-07T15:51:10.300305',
              parentId: 0,
              children: [
                {
                  id: 10,
                  boardId: 12,
                  userId: 'aaa',
                  content: '1',
                  regTime: '2023-08-07T15:51:25.641841',
                  updateTime: '2023-08-07T15:51:25.641841',
                  parentId: 9,
                  children: [],
                },
              ],
            },
          ],
        },
      };
      return response;
    } catch (error) {
      console.error('Fetch Post by ID error:', error);
      Alert.alert('Fetch Post by ID Error', error.message);
      throw error;
    }
  },

  // (3) 게시물 작성하여 서버에 전송하는 메서드
  addPost: async (id, title, comment) => {
    try {
      // 실제 서버와의 통신을 위한 코드 (현재 주석 처리)
      // const response = await axios.post(`${API_URL}/board/save`, post);
      // return response.data;

      // 임시로 게시물 추가 결과 반환 (실제 서버 통신 코드 작성 시 이 부분을 삭제하거나 주석 처리)
      const response = {
        status: 'OK',
        message: '게시글 작성 성공',
        data: {
          id: 14,
          userId: id,
          title: title,
          content: comment,
          regTime: '2023-08-09T12:41:02.8066946',
          updateTime: '2023-08-09T12:41:02.8066946',
          recommend: 0,
          isrecommend: false,
          comments: null,
        },
      };
      console.log('서버 전송 완료');
      console.log(response);
      return response;
    } catch (error) {
      console.error('Add Post error:', error);
      Alert.alert('Add Post Error', error.message);
      throw error;
    }
  },
};
