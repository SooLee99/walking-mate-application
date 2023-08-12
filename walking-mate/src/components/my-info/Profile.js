import { View, Text, StyleSheet, Image } from 'react-native';

function Profile({ image, name, style, textStyle }) {
  // MyInfoScreen에서 이미지, 닉네임 받아와서 동적으로 설정
  return (
    <View style={styles.container}>
      <Image
        style={[styles.image, style]}
        source={require('../../../assets/image/profile.png')}
      />
      <Text style={[styles.nameText, textStyle]}>{name}</Text>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'gray',
    overflow: 'hidden',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
