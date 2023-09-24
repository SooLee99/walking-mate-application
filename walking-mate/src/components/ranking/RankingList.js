import { View, Text, StyleSheet, FlatList } from 'react-native';

import RankingItem from './RankingItem';

function RankingListTeam({ data }) {
  function renderHelperHandler(itemData) {
    return (
      <RankingItem
        name={itemData.item.teamId.toString()}
        km={itemData.item.winNum.toString()}
        index={itemData.index}
      />
    );
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.infoText}>팀 랭킹</Text>
      <FlatList
        data={data}
        renderItem={renderHelperHandler}
        keyExtractor={(item) => item.teamId.toString()}
      />
    </View>
  );
}

function RankingListIndividual({ data }) {
  function renderHelperHandler(itemData) {
    return (
      <RankingItem
        name={itemData.item.userId}
        km={itemData.item.runNum.toString()}
        index={itemData.index}
      />
    );
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.infoText}>개인 랭킹</Text>
      <FlatList
        data={data}
        renderItem={renderHelperHandler}
        keyExtractor={(item) => item.userId}
      />
    </View>
  );
}

export { RankingListTeam, RankingListIndividual };

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 15,
    marginBottom: 5,
    padding: 3,
    backgroundColor: '#E1F1F1',
    borderWidth: 1,
    borderColor: '#D1D1D1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  infoText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
});
