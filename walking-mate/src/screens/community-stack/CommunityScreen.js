import React, { useEffect, useState } from 'react';
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

function CommunityScreen({ navigation }) {
  const [bulletins, setBulletins] = useState([]);

  const fetchPosts = () => {
    PostService.getAllPosts().then((data) => {
      setBulletins(data);
    });
  };

  useEffect(() => {
    fetchPosts();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchPosts();
    });

    return unsubscribe;
  }, [navigation]);

  function goToWritingHandler() {
    navigation.navigate('글 쓰기');
  }

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={bulletins}
        renderItem={({ item }) => <BulletinItem bulletin={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
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
