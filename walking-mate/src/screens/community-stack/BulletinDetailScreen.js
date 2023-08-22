import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView, // 사용되지 않았음, 제거 가능
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatTimeAgo } from '../../utils/utils';
import { BulletinContext } from '../../contexts/Bulletin';
import CommentInput from '../../components/community/CommentInput';
import CommentList from '../../components/community/CommentList'; // 사용되지 않았음, 제거 가능
import Comment from '../../components/community/Comment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// BulletinDetailScreen 컴포넌트 정의
function BulletinDetailScreen({ route }) {
  // 전달된 route 매개변수에서 bulletin 데이터 추출
  const { bulletin } = route.params;

  // BulletinContext를 사용하여 toggleLike 함수에 접근
  const { toggleLike } = useContext(BulletinContext);

  // bulletin의 생성 시간을 형식화된 문자열로 변환
  const createdAt = new Date(bulletin.regTime);
  const formattedCreatedAt = formatTimeAgo(createdAt);

  // 댓글, 추천 및 bulletin의 기타 속성을 관리하기 위한 로컬 상태
  const [comments, setComments] = useState(bulletin.comments);
  const [isReCommended, setIsReCommended] = useState(bulletin.isrecommend);
  const [recommend, setRecommend] = useState(bulletin.recommend);
  const [commentCount, setCommentCount] = useState(bulletin.comments.length);

  // 추천/좋아요 토글 처리
  const handleToggleLike = () => {
    toggleLike(bulletin.id);
    setIsReCommended(!isReCommended);
    setRecommend((prevRecommend) =>
      isReCommended ? prevRecommend - 1 : prevRecommend + 1
    );
  };

  // 현재 답글을 작성 중인 댓글의 ID
  const [replyingTo, setReplyingTo] = useState(null);

  const handleReplyInitiate = (commentId) => {
    setReplyingTo(commentId);
  };

  const handleCommentAdd = (newComment) => {
    if (replyingTo) {
      // 답글을 추가하는 로직
      const updatedComments = comments.map((comment) => {
        if (comment.id === replyingTo) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newComment],
          };
        }
        return comment;
      });
      setComments(updatedComments);
    } else {
      setComments([...comments, newComment]);
    }
    setReplyingTo(null); // 답글 작성 상태 초기화
  };

  // bulletin의 헤더 섹션 렌더링
  const renderHeader = () => (
    <View>
      <View style={styles.upSeparator}>
        <View style={styles.userProfile}>
          <Image source={bulletin.profile} style={styles.profileImage} />
          <Text style={styles.userName}>{bulletin.userId}</Text>
        </View>
        <Text style={styles.title}>{bulletin.title}</Text>
        <Text style={styles.timestamp}>{formattedCreatedAt}</Text>
        <Text style={styles.content}>{bulletin.content}</Text>
        <View style={styles.reactionRow}>
          <TouchableOpacity onPress={handleToggleLike}>
            <Icon
              name={isReCommended ? 'heart' : 'heart-o'}
              size={27}
              color={isReCommended ? 'red' : 'black'}
            />
          </TouchableOpacity>
          <Text style={styles.reactionCount}>{commentCount}</Text>
          <View style={styles.reaction}>
            <Icon name="comment-o" size={25} color="black" />
            <Text style={styles.reactionCount}>{commentCount}</Text>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );

  return (
    <View style={styles.rootContainer}>
      <FlatList
        contentContainerStyle={styles.scrollContentContainer}
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <Comment comment={item} onReplyInitiate={handleReplyInitiate} />
        )}
        keyboardDismissMode="on-drag"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={styles.commentInput}>
        <CommentInput
          bulletinId={bulletin.id}
          replyingTo={replyingTo}
          onCommentAdd={handleCommentAdd}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
export default BulletinDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 110,
  },
  upSeparator: {
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    marginTop: 10,
  },
  timestamp: {
    marginTop: 5,
    fontWeight: '700',
    color: '#C0C0C0',
  },
  content: {
    marginTop: 20,
    fontSize: 16,
    marginBottom: 10,
  },
  reactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  reaction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionCount: {
    marginLeft: 5,
    marginRight: 25,
    color: 'black',
  },
  separator: {
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
  },
  commentInput: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
});
