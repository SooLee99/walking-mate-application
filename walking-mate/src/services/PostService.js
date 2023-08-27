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
            userId: 'aaa@naver.com',
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
                recommend: 1, // 추가
                isrecommend: false, // 추가
                children: [],
              },
              {
                id: 9,
                boardId: 12,
                userId: 'aaa@naver.com',
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
            regTime: '2023-07-26T19:35:24.566665',
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

  // (2) 특정 게시물을 ID로 가져오는 메서드 (2023-08-22 이수) => 이거 사용하나?
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
  addPost: async (jwt, title, comment) => {
    try {
      // 실제 서버와의 통신을 위한 코드 (현재 주석 처리)
      // const response = await axios.post(`${API_URL}/board/save`,
      // headers: {
      //  'Content-Type': 'application/json',
      //  'Authorization': `${jwt}`
      // },
      //  body: JSON.stringify({
      //    createdDate: date
      // }));

      // return response;

      // 임시로 게시물 추가 결과 반환 (실제 서버 통신 코드 작성 시 이 부분을 삭제하거나 주석 처리)
      const response = {
        status: 'OK',
        message: '게시글 작성 성공',
        data: {
          id: 14,
          userId: jwt,
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

  // 게시물 수정하기
  editPost: async (jwt, postId, newTitle, newContent) => {
    try {
      // 실제 서버와의 통신을 위한 코드 (현재 주석 처리)
      // const response = await axios.put(`${API_URL}/board/{postId}`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `${jwt}`
      //   },
      //   body: JSON.stringify({
      //     title: newTitle,
      //     content: newContent
      //   })
      // });

      // 임시 응답 (실제 서버 통신 코드 작성 시 이 부분을 삭제하거나 주석 처리)
      const response = {
        status: 'OK',
        message: '게시글 수정 성공',
        data: {
          id: postId,
          userId: jwt,
          title: newTitle,
          content: newContent,
          regTime: '2023-08-09T12:41:02.806695',
          updateTime: '2023-08-09T12:41:02.806695',
          recommend: 0,
          isrecommend: false,
          comments: null,
        },
      };
      return response;
    } catch (error) {
      console.error('Edit Post error:', error);
      Alert.alert('Edit Post Error', error.message);
      throw error;
    }
  },

  // 게시물 삭제하기
  deletePost: async (jwt, postId) => {
    try {
      // 실제 서버와의 통신을 위한 코드 (현재 주석 처리)
      // const response = await axios.delete(`${API_URL}/board/{id}`, {
      //   headers: {
      //     'Authorization': `${jwt}`
      //   }
      // });

      // 임시 응답 (실제 서버 통신 코드 작성 시 이 부분을 삭제하거나 주석 처리)
      const response = {
        status: 'OK',
        message: '게시글 삭제 성공',
        data: {
          id: postId,
          userId: jwt,
          title: 'abc',
          content: 'qqq',
          recommend: 0,
          isrecommend: false,
          comments: null,
        },
      };
      return response;
    } catch (error) {
      console.error('Delete Post error:', error);
      Alert.alert('Delete Post Error', error.message);
      throw error;
    }
  },
  // (4) 댓글 작성하여 서버에 전송하는 메서드
  addComment: async (jwt, postId, commentContent, parentId = null) => {
    try {
      // 실제 서버와의 통신을 위한 코드 (현재 주석 처리)
      // const response = await axios.post(`${API_URL}/comment/save`,
      // headers: {
      //  'Content-Type': 'application/json',
      //  'Authorization': `${jwt}`
      // },
      //  body: JSON.stringify({
      //    postId: postId,
      //    content: commentContent,
      //    parentId: parentId
      // }));

      // 임시로 댓글 추가 결과 반환 (실제 서버 통신 코드 작성 시 이 부분을 삭제하거나 주석 처리)
      const response = {
        status: 'OK',
        message: '댓글 작성 성공',
        data: {
          id: Math.floor(Math.random() * 1000), // 임시 ID
          userId: jwt,
          boardId: postId,
          content: commentContent,
          regTime: new Date().toISOString(),
          updateTime: new Date().toISOString(),
          parentId: parentId,
          recommend: 0,
          isrecommend: false,
          children: [],
        },
      };
      console.log('댓글 서버 전송 완료');
      console.log(response);
      return response;
    } catch (error) {
      console.error('Add Comment error:', error);
      Alert.alert('Add Comment Error', error.message);
      throw error;
    }
  },

  // 댓글 수정하기
  editComment: async (jwt, commentId, newContent) => {
    try {
      // 실제 서버와의 통신을 위한 코드 (현재 주석 처리)
      // const response = await axios.put(`${API_URL/board/comments/{commentId}`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `${jwt}`
      //   },
      //   body: JSON.stringify({
      //     content: newContent
      //   })
      // });

      // 임시 응답 (실제 서버 통신 코드 작성 시 이 부분을 삭제하거나 주석 처리)
      const response = {
        status: 'OK',
        message: '댓글 수정 성공',
        data: {
          id: commentId,
          boardId: 14,
          userId: jwt,
          content: newContent,
          regTime: '2023-08-09T12:41:55.238108',
          updateTime: '2023-08-09T12:41:55.238108',
          parentId: null,
          children: null,
        },
      };
      return response;
    } catch (error) {
      console.error('Edit Comment error:', error);
      Alert.alert('Edit Comment Error', error.message);
      throw error;
    }
  },

  // 댓글 삭제하기
  deleteComment: async (jwt, commentId) => {
    try {
      // 실제 서버와의 통신을 위한 코드 (현재 주석 처리)
      // const response = await axios.delete(`${API_URL/board/comments/{commentId}`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `${jwt}`
      //   }
      // });

      // 임시 응답 (실제 서버 통신 코드 작성 시 이 부분을 삭제하거나 주석 처리)
      const response = {
        status: 'OK',
        message: '댓글 삭제 성공',
        data: {
          id: 10,
          boardId: 12,
          userId: 'aaa',
          content: '1',
          regTime: '2023-08-07T15:51:25.641841',
          updateTime: '2023-08-07T15:51:25.641841',
          parentId: null,
          children: null,
        },
      };
      return response;
    } catch (error) {
      console.error('Delete Comment error:', error);
      Alert.alert('Delete Comment Error', error.message);
      throw error;
    }
  },
  // 게시물 좋아요 토글하기
  toggleLike: async (jwt, postId) => {
    try {
      // 실제 서버와의 통신을 위한 코드 (현재 주석 처리)
      // const response = await axios.post(`${API_URL}/board/recommend/save/{postId}`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${jwt}`
      //   }
      // });

      // 임시 응답 (실제 서버 통신 코드 작성 시 이 부분을 삭제하거나 주석 처리)
      const response = {
        status: 'OK',
        message: '좋아요 저장 성공',
        data: {
          id: postId,
          userId: jwt,
          title: 'updateTitle1',
          content: 'updateContent1',
          recommend: 1,
          isrecommend: false,
          comments: null,
        },
      };

      return response;
    } catch (error) {
      console.error('Toggle Like error:', error);
      Alert.alert('Toggle Like Error', error.message);
      throw error;
    }
  },
};
