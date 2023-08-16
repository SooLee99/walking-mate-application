import { View, Text, StyleSheet } from 'react-native';
import RankingProfile from './RankingProfile';

function RankingItem({ name, km, index }) {
  if (!name || !km || index === undefined) {
    return null; // or some placeholder
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.indexContainer}>
        <Text style={styles.index}>{index + 1}</Text>
      </View>
      <RankingProfile image={null} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.km}>{km}km</Text>
      </View>
    </View>
  );
}

export default RankingItem;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  indexContainer: {
    width: 40,
  },
  index: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '300',
    marginLeft: 5,
  },
  km: {
    fontSize: 13,
    fontWeight: '500',
    marginRight: 5,
  },
});
