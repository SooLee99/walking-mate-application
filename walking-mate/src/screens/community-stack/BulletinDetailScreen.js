import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatTimeAgo } from '../../utils/utils';
import { BulletinContext } from '../../contexts/Bulletin';
import CommentInput from '../../components/community/CommentInput';
import Comment from '../../components/community/Comment';
import { UserContext } from '../../contexts/User';
import { PostService } from '../../services/PostService';

// BulletinDetailScreen 컴포넌트 정의
function BulletinDetailScreen({ route, navigation }) {
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const { currentUserId, postAuthorId } = route.params;
  const { user } = useContext(UserContext);
  const jwt = user.jwt;

  const toggleMenuModal = () => {
    setMenuModalVisible(!menuModalVisible);
  };

  useEffect(() => {
    if (currentUserId === postAuthorId) {
      navigation.setOptions({
        headerRight: () => (
          <View style={{ flexDirection: 'row', marginRight: 10 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('글 쓰기', {
                  mode: 'edit',
                  title: bulletin.title,
                  content: bulletin.content,
                });
              }}>
              <Icon
                name="pencil"
                size={30}
                color="black"
                style={{ marginRight: 20 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  '게시물 삭제',
                  '이 게시물을 삭제하시겠습니까?',
                  [
                    {
                      text: '확인',
                      onPress: () => {
                        PostService.deletePost(jwt, bulletin.id)
                          .then((response) => {
                            if (response.status === 'OK') {
                              Alert.alert('성공', '게시물이 삭제되었습니다.', [
                                {
                                  text: 'OK',
                                  onPress: () =>
                                    navigation.navigate('커뮤니티'),
                                },
                              ]);
                            }
                          })
                          .catch((error) => {
                            console.error('게시글 삭제 실패:', error);
                          });
                      },
                    },
                    {
                      text: '취소',
                      onPress: () => console.log('게시물 삭제 취소'),
                      style: 'cancel',
                    },
                  ],
                  { cancelable: false }
                );
              }}>
              <Icon name="trash" size={30} color="black" />
            </TouchableOpacity>
          </View>
        ),
      });
    }
  }, [currentUserId, postAuthorId]);

  const renderMenuModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={menuModalVisible}
      onRequestClose={toggleMenuModal}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
          }}></View>
      </View>
    </Modal>
  );

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
    PostService.toggleLike(jwt, bulletin.id)
      .then((response) => {
        if (response.status === 200) {
          // 로컬 상태 업데이트
          setIsReCommended(!isReCommended);
          setRecommend((prevRecommend) =>
            isReCommended ? prevRecommend - 1 : prevRecommend + 1
          );
        }
      })
      .catch((error) => {
        console.error('Failed to toggle like:', error);
      });
  };

  // 현재 답글을 작성 중인 댓글의 ID
  const [replyingTo, setReplyingTo] = useState(null);

  const handleReplyInitiate = (commentId) => {
    setReplyingTo(commentId);
  };

  const handleCommentAdd = (commentContent) => {
    // 댓글 작성 API 호출
    PostService.addComment(jwt, bulletin.id, commentContent)
      .then((response) => {
        if (response.status === 'OK') {
          const newComment = response.data;
          setComments([...comments, newComment]);
          setCommentCount(commentCount + 1);
        }
      })
      .catch((error) => {
        console.error('댓글 작성 실패:', error);
      });
  };

  const handleCommentEdit = (commentId, newContent) => {
    // 댓글 수정 API 호출
    PostService.editComment(jwt, commentId, newContent)
      .then((response) => {
        if (response.status === 'OK') {
          // 댓글 배열 업데이트
          const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
              return { ...comment, content: newContent };
            }
            return comment;
          });
          setComments(updatedComments);
          // 댓글 수정 성공 알림
          Alert.alert('성공', '댓글이 수정되었습니다.');
        }
      })
      .catch((error) => {
        console.error('댓글 수정 실패:', error);
        Alert.alert('실패', '댓글 수정에 실패했습니다.');
      });
  };

  // 현재 수정 중인 댓글의 ID와 내용
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');

  // 댓글 수정을 초기화하는 함수
  const handleCommentEditInitiate = (commentId, commentContent) => {
    setEditingCommentId(commentId);
    setEditingCommentContent(commentContent);
  };

  // 댓글 수정을 적용하는 함수
  const handleCommentEditApply = (newContent) => {
    if (editingCommentId && newContent) {
      handleCommentEdit(editingCommentId, newContent);
      setEditingCommentId(null);
      setEditingCommentContent('');
    }
  };

  // 댓글 입력창에 댓글 내용을 로드
  useEffect(() => {
    if (editingCommentId) {
      const commentToEdit = comments.find(
        (comment) => comment.id === editingCommentId
      );
      if (commentToEdit) {
        setEditingCommentContent(commentToEdit.content);
      }
    }
  }, [editingCommentId, comments]);

  // 댓글 수정 상태 해제
  const handleCommentEditCancel = () => {
    setEditingCommentId(null);
    setEditingCommentContent('');
  };

  const handleCommentDelete = (commentId) => {
    // 댓글 삭제 API 호출
    PostService.deleteComment(jwt, commentId)
      .then((response) => {
        if (response.status === 'OK') {
          // 댓글 배열에서 삭제된 댓글 제거
          const updatedComments = comments.filter(
            (comment) => comment.id !== commentId
          );
          setComments(updatedComments);
          setCommentCount(commentCount - 1);
          // 댓글 삭제 성공 알림
          Alert.alert('성공', '댓글이 삭제되었습니다.');
        }
      })
      .catch((error) => {
        console.error('댓글 삭제 실패:', error);
        Alert.alert('실패', '댓글 삭제에 실패했습니다.');
      });
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
      {renderMenuModal()}
      <FlatList
        contentContainerStyle={styles.scrollContentContainer}
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <Comment
            comment={item}
            onReplyInitiate={handleReplyInitiate}
            currentUserId={currentUserId}
            onCommentEdit={handleCommentEdit}
            onCommentDelete={handleCommentDelete}
            onCommentEditInitiate={handleCommentEditInitiate}
          />
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
          onCommentEditInitiate={handleCommentEditInitiate}
          editingCommentId={editingCommentId}
          editingCommentContent={editingCommentContent}
          handleCommentEditApply={handleCommentEditApply}
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
