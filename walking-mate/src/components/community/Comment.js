import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatTimeAgo } from '../../utils/utils';
import { UserContext } from '../../contexts/User';
import { PostService } from '../../services/PostService';

// 댓글 컴포넌트 정의
function Comment({ comment, key, onReplyInitiate, onCommentEditInitiate }) {
  // 댓글 좋아요 상태 관리 (useState 훅 사용)
  const [isRecommended, setIsRecommended] = useState(comment.isrecommend);
  const [recommendCount, setRecommendCount] = useState(comment.recommend);
  const { user } = useContext(UserContext);
  const userId = user.id;

  // 좋아요 버튼 클릭 핸들러
  const handleLikePress = () => {
    if (isRecommended) {
      setIsRecommended(false);
      setRecommendCount(recommendCount - 1);
    } else {
      setIsRecommended(true);
      setRecommendCount(recommendCount + 1);
    }
  };

  const handleLongPress = () => {
    if (userId === comment.userId) {
      Alert.alert(
        '댓글 변경',
        '댓글을 수정하거나 삭제하시겠습니까?',
        [
          {
            text: '취소',
            onPress: () => console.log('취소'),
            style: 'cancel',
          },
          {
            text: '수정',
            onPress: () => {
              console.log('1111111111111111111111111111111');
              onCommentEditInitiate(comment.id, comment.content);
            },
          },
          {
            text: '삭제',
            onPress: () => {
              PostService.deleteComment(comment.id)
                .then((response) => {
                  if (response.status === 'OK') {
                    // Handle the comment deletion
                    console.log('Comment deleted');
                  }
                })
                .catch((error) => {
                  console.log('Failed to delete comment', error);
                });
              console.log('댓글 삭제');
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  // 답글 작성 핸들러
  const handleReplyPress = () => {
    onReplyInitiate(comment.id);
  };

  // 댓글 등록 시간 형식화
  const regTime = new Date(comment.regTime);
  const formattedRegTime = formatTimeAgo(regTime);

  return (
    <TouchableOpacity onLongPress={handleLongPress}>
      <View style={styles.commentContainer} key={key}>
        <View style={styles.commentUserInfo}>
          <Text style={styles.commentUserName}>{comment.userId}</Text>
        </View>
        <Text style={styles.commentText}>{comment.content}</Text>
        <View style={styles.commentFooter}>
          <Text style={styles.commentTime}>{formattedRegTime}</Text>
          <View style={styles.commentReactionRow}>
            <TouchableOpacity onPress={handleLikePress}>
              <Icon
                name={isRecommended ? 'heart' : 'heart-o'}
                size={20}
                color={isRecommended ? 'red' : 'black'}
              />
            </TouchableOpacity>
            <Text style={styles.commentLikeCount}>{recommendCount}</Text>
            <TouchableOpacity onPress={handleReplyPress}>
              <Text style={styles.commentReplyText}>답글달기</Text>
            </TouchableOpacity>
          </View>
        </View>
        {comment.children &&
          comment.children.map((reply) => {
            const replyRegTime = new Date(reply.regTime);
            const formattedReplyRegTime = formatTimeAgo(replyRegTime);

            return (
              <View key={reply.id} style={styles.replyContainer}>
                <View style={styles.commentUserInfo}>
                  <Text style={styles.commentUserName}>{reply.userId}</Text>
                </View>
                <View style={styles.replyContent}>
                  <Text style={styles.commentText}>{reply.content}</Text>
                  <View style={styles.replyLike}>
                    <Text style={styles.commentTime}>
                      {formattedReplyRegTime}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleReplyLikePress(reply)}>
                      <Icon
                        name={reply.isrecommend ? 'heart' : 'heart-o'}
                        size={20}
                        color={reply.isrecommend ? 'red' : 'black'}
                      />
                    </TouchableOpacity>
                    <Text style={styles.commentLikeCount}>
                      {reply.recommend}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    marginTop: 5,
    paddingHorizontal: 18,
    paddingBottom: 5,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
  },
  commentUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentUserName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 14,
    marginTop: 5,
  },
  commentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentTime: {
    fontSize: 12,
    marginRight: 10,
    color: '#C0C0C0',
  },
  commentReactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentLikeCount: {
    marginLeft: 5,
    marginRight: 15,
  },
  commentReplyText: {
    fontSize: 12,
    color: '#4C9AFF',
  },
  replyContainer: {
    marginTop: 10,
    paddingLeft: 0,
    paddingRight: 18,
    paddingBottom: 5,
  },

  replyInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 5,
  },
  replyButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#4C9AFF',
    borderRadius: 5,
  },
  replyButtonText: {
    color: 'white',
  },
  replyContent: {
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  replyLike: {
    marginTop: 10,
    flexDirection: 'row',
  },
});

export default Comment;
