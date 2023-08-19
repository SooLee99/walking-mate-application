import { StyleSheet } from 'react-native';
import VideoList from '../../components/community/VideoList';
import { ScrollView } from 'react-native-gesture-handler';

const dummyVideoData = [
  // 나중애 백엔드에서 교체 필요.
  {
    id: 1,
    thumbnail: require('../../../assets/image/video1.jpg'),
    title: 'Video Title 1',
  },
  {
    id: 2,
    thumbnail: require('../../../assets/image/video2.jpg'),
    title: 'Video Title 2',
  },
  {
    id: 3,
    thumbnail: require('../../../assets/image/video3.jpg'),
    title: 'Video Title 3',
  },
  {
    id: 4,
    thumbnail: require('../../../assets/image/video1.jpg'),
    title: 'Video Title 4',
  },
  {
    id: 5,
    thumbnail: require('../../../assets/image/video2.jpg'),
    title: 'Video Title 5',
  },
  {
    id: 6,
    thumbnail: require('../../../assets/image/video3.jpg'),
    title: 'Video Title 6',
  },
];

function VideoScreen() {
  // 나중애 백엔드에서 영상 불러오기 필요.
  return (
    <ScrollView style={styles.rootContainer}>
      <VideoList data={dummyVideoData} type="런닝" />
      <VideoList data={dummyVideoData} type="인터벌" />
      <VideoList data={dummyVideoData} type="걷기" />
    </ScrollView>
  );
}

export default VideoScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
