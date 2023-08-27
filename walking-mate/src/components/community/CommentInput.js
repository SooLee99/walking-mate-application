import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { BulletinContext } from '../../contexts/Bulletin';
import { UserContext } from '../../contexts/User';
import { PostService } from '../../services/PostService';

function CommentInput({
  bulletinId,
  replyingTo,
  onCommentAdd,
  editingCommentId,
  editingCommentContent,
  handleCommentEditApply,
}) {
  const { addComment } = useContext(BulletinContext);
  const { user } = useContext(UserContext);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingCommentId) {
      setContent(editingCommentContent);
    } else {
      setContent('');
    }
  }, [editingCommentId, editingCommentContent]);

  const commentChangeHandler = (enteredContent) => {
    setContent(enteredContent);
  };

  const handleCommentSubmit = () => {
    if (content.trim() === '') {
      Alert.alert('Error', '문자를 입력해주세요.');
      return;
    }
    if (content.trim() !== '') {
      if (editingCommentId) {
        // 댓글 수정 로직
        PostService.editComment(user.jwt, editingCommentId, content)
          .then((response) => {
            if (response.message === '댓글 수정 성공') {
              Alert.alert('성공', '댓글이 수정되었습니다.');
              handleCommentEditApply(content);
            }
          })
          .catch((error) => {
            Alert.alert('실패', '댓글 수정에 실패했습니다.');
            console.log('Failed to edit comment:', error);
          });
      } else {
        const newComment = {
          id: Math.random(),
          profile: require('../../../assets/image/profile.png'), // 나중엔 백엔드에서
          nickName: '워킹메이트123', //백엔드에서 교체 필요
          content: content,
          createdAt: new Date().toISOString(),
          isReCommended: false,
          recommend: 0,
          comment: 0,
          replies: [],
        };

        addComment(bulletinId, newComment); // 댓글 추가.
        onCommentAdd(newComment);
      }
      setContent(''); // 입력창 초기화
    } else {
      Alert.alert('Error', '문자를 입력해주세요.');
      return;
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={replyingTo ? '답글을 입력하세요.' : '댓글을 입력하세요'}
          placeholderTextColor="#E0E0E0"
          returnKeyType="done"
          value={content}
          onChangeText={commentChangeHandler}
        />
        <TouchableOpacity style={styles.button} onPress={handleCommentSubmit}>
          <Text style={styles.buttonText}>
            {editingCommentId ? '수정 완료' : '작성'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CommentInput;

const styles = StyleSheet.create({
  rootContainer: {
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    //paddingHorizontal: 5,
    //marginVertical: 15,
    //marginHorizontal: 10,
  },
  input: {
    flex: 3,
    height: 50,
    paddingLeft: 10,
    backgroundColor: '#e5ffff',
    textAlignVertical: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    backgroundColor: '#b2ffff',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
});
