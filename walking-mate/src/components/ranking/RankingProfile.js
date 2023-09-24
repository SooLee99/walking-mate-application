import { View, Image, StyleSheet } from 'react-native';

function RankingProfile({image}) {
  // TeamRanking -> RankingItem - > RankingProfile로 이미지 전달 필요.
  const profileImage = 'https://images.unsplash.com/photo-1532009324734-20a7a5813719'; // Unsplash에서 제공하는 프로필 사진 URL

  return (
    <View style={styles.container}>
      <Image source={{ uri: profileImage }} style={styles.profileImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
});

export default RankingProfile;
