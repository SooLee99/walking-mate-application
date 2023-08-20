import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // 아이콘 라이브러리 가져오기
import { formatTimeAgo } from '../../utils/utils'; // 시간 형식화 유틸리티 가져오기

// 댓글 컴포넌트 정의
function Comment({ comment, key, onReplyInitiate }) {
  // 댓글 좋아요 상태 관리 (useState 훅 사용)
  const [isRecommended, setIsRecommended] = useState(comment.isrecommend);
  const [recommendCount, setRecommendCount] = useState(comment.recommend);

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

  // 답글 작성 핸들러
  const handleReplyPress = () => {
    onReplyInitiate(comment.id);
  };

  // 댓글 등록 시간 형식화
  const regTime = new Date(comment.regTime);
  const formattedRegTime = formatTimeAgo(regTime);

  return (
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
                  <TouchableOpacity onPress={() => handleReplyLikePress(reply)}>
                    <Icon
                      name={reply.isrecommend ? 'heart' : 'heart-o'}
                      size={20}
                      color={reply.isrecommend ? 'red' : 'black'}
                    />
                  </TouchableOpacity>
                  <Text style={styles.commentLikeCount}>{reply.recommend}</Text>
                </View>
              </View>
            </View>
          );
        })}
    </View>
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
