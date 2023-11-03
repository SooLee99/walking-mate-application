import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { BulletinContext } from '../../contexts/Bulletin';
import Colors from '../../themes/color';
import CustomAlert from '../../components/community/CustomAlert';
import { PostService } from '../../services/PostService';
<<<<<<< HEAD

function WritingScreen({ navigation, route }) {
  const userJWT = route.params.user.user.jwt;
  const { addBulletin } = useContext(BulletinContext);
  console.log('현재 게시물 작성 화면입니다.');
  console.log(userJWT);
=======
import { UserContext } from '../../contexts/User';

function WritingScreen({ navigation, route }) {
  const { user } = useContext(UserContext);
  const jwt = user.jwt;
  const { addBulletin } = useContext(BulletinContext);

>>>>>>> master
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // 현재 게시글 편집 상태인지, 게시글 작성 상태인지 판단하여 사용된다. (2023-08-28 이수 작성함.)
  useEffect(() => {
    // 게시글 편집 모드일 경우
    if (route.params && route.params.mode === 'edit') {
      setTitle(route.params.title);
      setContent(route.params.content);
    }
  }, []);

  function titleChangeHandler(enteredTitle) {
    setTitle(enteredTitle);
  }

  function contentChangeHandler(enteredContent) {
    setContent(enteredContent);
  }

  const handleCompleteButton = () => {
    if (title.trim().length === 0 || content.trim().length === 0) {
      // 제목 또는 내용이 비어있는 경우 경고창 표시
      setShowAlert(true);
      return;
    }

    if (route.params && route.params.mode === 'edit') {
      // 게시글 편집 API 호출
<<<<<<< HEAD
      PostService.editPost(userJWT, route.params.postId, title, content)
=======
      PostService.editPost(jwt, route.params.postId, title, content)
>>>>>>> master
        .then((response) => {
          if (response.status === 'OK') {
            Alert.alert('성공', '게시물이 수정되었습니다.', [
              { text: 'OK', onPress: () => navigation.navigate('커뮤니티') },
            ]);
          }
        })
        .catch((error) => {
          console.error('게시글 수정 실패:', error);
        });
    } else {
      // 게시글 작성인 경우.
<<<<<<< HEAD
      PostService.addPost(userJWT, title, content).then((response) => {
=======
      PostService.addPost(jwt, title, content).then((response) => {
>>>>>>> master
        if (response.status === 'OK') {
          // BulletinContext에도 게시물 추가
          addBulletin(response.data);

          // 여기서 새 게시물을 추가합니다:
          if (route.params && route.params.onPostAdded) {
            route.params.onPostAdded(response.data);
          }

          // 게시물 작성 완료 알림
          Alert.alert('성공', '게시물이 작성되었습니다.', [
            { text: 'OK', onPress: () => navigation.navigate('커뮤니티') },
          ]);
        } else {
          setShowAlert(true);
        }
      });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleCompleteButton}>
          <Text style={styles.headerButton}>완료</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, title, content]);

  useEffect(() => {
    let headerTitle = '게시물 작성';
    let headerRightButton = '완료';

    if (route.params && route.params.mode === 'edit') {
      headerTitle = '게시물 수정';
    }

    navigation.setOptions({
      title: headerTitle,
      headerRight: () => (
        <TouchableOpacity onPress={handleCompleteButton}>
          <Text style={styles.headerButton}>{headerRightButton}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, title, content, route.params]);

  return (
    <ScrollView contentContainerStyle={styles.rootContainer}>
      <TextInput
        style={styles.titleInput}
        placeholder="제목"
        underlineColorAndroid="transparent"
        value={title}
        onChangeText={titleChangeHandler}
        returnKeyType="done"
      />
      <TextInput
        style={styles.contentInput}
        placeholder="내용을 입력하세요"
        multiline
        underlineColorAndroid="transparent"
        value={content}
        onChangeText={contentChangeHandler}
        returnKeyType="done"
      />
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          message="제목과 내용을 입력하세요."
          onClose={() => setShowAlert(false)}
        />
      )}
    </ScrollView>
  );
}

export default WritingScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 25,
    backgroundColor: '#FFFFFF',
  },
  headerButton: {
    marginRight: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary500,
  },
  titleText: {
    fontSize: 16,
    marginBottom: 8,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: '700',
    height: 40,
    paddingLeft: 2,
    paddingLeft: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#DFDFDF',
    marginBottom: 20,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 4,
  },
  contentText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  contentInput: {
    borderColor: '#ccc',
    padding: 4,
  },
});
