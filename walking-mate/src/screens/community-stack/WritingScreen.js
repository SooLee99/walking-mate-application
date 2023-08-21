import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { BulletinContext } from '../../contexts/Bulletin';
import Colors from '../../themes/color';
import CustomAlert from '../../components/community/CustomAlert';
import { PostService } from '../../services/PostService';
import { UserContext } from '../../contexts/User';

function WritingScreen({ navigation, route }) {
  const { user } = useContext(UserContext);

  const { addBulletin } = useContext(BulletinContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showAlert, setShowAlert] = useState(false);

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

    // 현재 사용자의 ID
    const userId = user.uid.uid;

    // 서버에 게시물 추가 요청
    PostService.addPost(userId, title, content).then((response) => {
      if (response.status === 'OK') {
        // BulletinContext에도 게시물 추가
        addBulletin(response.data);

        // 여기서 새 게시물을 추가합니다:
        if (route.params && route.params.onPostAdded) {
          route.params.onPostAdded(response.data);
        }

        navigation.navigate('커뮤니티');
      } else {
        setShowAlert(true);
      }
    });
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
