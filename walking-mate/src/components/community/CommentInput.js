import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useState, useContext } from 'react';
import { BulletinContext } from '../../contexts/Bulletin';

function CommentInput({ bulletinId, replyingTo, onCommentAdd }) {
  const { addComment } = useContext(BulletinContext);

  const [comment, setComment] = useState('');

  const commentChangeHandler = (enteredComment) => {
    setComment(enteredComment);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== '') {
      const newComment = {
        id: Math.random(),
        profile: require('../../../assets/image/profile.png'), // 나중엔 백엔드에서
        nickName: '워킹메이트123', //백엔드에서 교체 필요
        content: comment,
        createdAt: new Date().toISOString(),
        isReCommended: false,
        recommend: 0,
        comment: 0,
        replies: [],
      };

      addComment(bulletinId, newComment); // 댓글 추가.
      onCommentAdd(newComment);
      setComment(''); // 댓글 리셋.
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
          value={comment}
          onChangeText={commentChangeHandler}
        />
        <TouchableOpacity style={styles.button} onPress={handleCommentSubmit}>
          <Text style={styles.buttonText}>게시</Text>
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
