import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

function Video({ thumbnail, title }) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={null} // 나중에는 영상볼 수 있는 함수 추가.
    >
      <View style={styles.thumbnailContainer}>
        <Image source={thumbnail} style={styles.thumbnail} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Video;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 20,
  },
  shadowContainer: {
    backgroundColor: '#FFFFFF', // 배경 색상 설정
  },
  thumbnailContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%', // 이미지 너비를 100%로 설정하여 썸네일 컨테이너에 맞추기
    height: '100%', // 이미지 높이도 100%로 설정
    resizeMode: 'cover',
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
