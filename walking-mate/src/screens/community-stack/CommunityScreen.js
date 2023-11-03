<<<<<<< HEAD
import React, { useEffect, useState, useContext } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> master
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../themes/color';
import BulletinItem from '../../components/community/BulletinItem';
import { PostService } from '../../services/PostService';
<<<<<<< HEAD
import { UserContext } from '../../contexts/User';

function CommunityScreen({ navigation }) {
  const [bulletins, setBulletins] = useState([]);
  const user = useContext(UserContext);
  console.log('커뮤니티 화면에 들어옴.');

  useEffect(() => {
    const fetchPosts = () => {
      PostService.getAllPosts(user.user.jwt).then((data) => {
        setBulletins(data.data);
      });
    };
=======

function CommunityScreen({ navigation }) {
  const [bulletins, setBulletins] = useState([]);

  const fetchPosts = () => {
    PostService.getAllPosts().then((data) => {
      setBulletins(data);
    });
  };

  useEffect(() => {
>>>>>>> master
    fetchPosts();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchPosts();
    });

<<<<<<< HEAD
    // 컴포넌트가 언마운트될 때 리스너를 제거합니다.
    return () => {
      unsubscribe();
    };
  }, [user.jwt, navigation]);

  function goToWritingHandler() {
    navigation.navigate('글 쓰기', { user });
=======
    return unsubscribe;
  }, [navigation]);

  function goToWritingHandler() {
    navigation.navigate('글 쓰기');
>>>>>>> master
  }

  return (
    <View style={styles.rootContainer}>
<<<<<<< HEAD
      {bulletins.length > 0 ? (
        <>
          <FlatList
            data={bulletins}
            renderItem={({ item }) => <BulletinItem bulletin={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      ) : (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>현재 작성된 게시물이 없습니다.</Text>
        </View>
      )}
=======
      <FlatList
        data={bulletins}
        renderItem={({ item }) => <BulletinItem bulletin={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
>>>>>>> master
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={goToWritingHandler}>
        <Icon name="pencil" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default CommunityScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: Colors.primary500,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
