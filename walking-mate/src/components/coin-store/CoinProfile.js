import { View, Text, StyleSheet } from 'react-native';

import RankingProfile from '../ranking/RankingProfile';

function CoinProfile({ name, coin, image }) {
  //CoinScreen에서 회원 프로필, 이름, 보유 코인 전송 필요.
  return (
    <View style={styles.rootContainer}>
      <View style={styles.subContainer}>
        <RankingProfile image={image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.coin}>{coin} coin</Text>
        </View>
      </View>
    </View>
  );
}

export default CoinProfile;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    width: '100%',
    paddingVertical: 20,
    paddingLeft: 20,
    marginVertical: 20,
  },
  subContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 5,
  },
  coin: {
    fontSize: 12,
    fontWeight: '500',
  },
});
