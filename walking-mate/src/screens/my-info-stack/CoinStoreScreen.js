import { View, StyleSheet } from 'react-native';

import ItemList from '../../components/coin-store/ItemList';
import CoinProfile from '../../components/coin-store/CoinProfile';

const DummyData = [
  // 나중에 백엔드에서 불러오는 데이터로 교체될 데이터.
  { id: 1, name: '인터벌', coin: 200 },
  { id: 2, name: '걷기', coin: 200 },
  { id: 3, name: '달리기', coin: 200 },
  { id: 4, name: '오래 달리기', coin: 300 },
  { id: 5, name: '달리기', coin: 400 },
  { id: 6, name: '달리기', coin: 500 },
  { id: 7, name: '달리기', coin: 600 },
  { id: 8, name: '달리기', coin: 600 },
  { id: 9, name: '달리기', coin: 600 },
  { id: 10, name: '달리기', coin: 600 },
];

<<<<<<< HEAD
function CoinStoreScreen({ route }) {
  console.log('코인 상점 화면으로 이동함.');
  console.log(route.params);
  return (
    <View style={styles.rootContainer}>
      <CoinProfile image={null} name="aaa@naver.com" coin="100" />
=======
function CoinStoreScreen() {
  return (
    <View style={styles.rootContainer}>
      <CoinProfile image={null} name="달리는 비룡이" coin="100" />
>>>>>>> master
      <ItemList data={DummyData} />
    </View>
  );
}

export default CoinStoreScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
