import { View, Text, StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import Colors from '../../themes/color';

function MyInfoBox({ height, weight, teamName, bmi }) {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.outContainer}>
        <View style={styles.detailContainer1}>
          <MaterialCommunityIcons
            name="human-male-height-variant"
            size={18}
            color="black"
          />
          <Text style={styles.text}>{height}cm</Text>
        </View>
        <View style={styles.detailContainer1}>
          <MaterialCommunityIcons name="human-queue" size={18} color="black" />
          <Text style={styles.text}>{teamName}</Text>
        </View>
      </View>
      <View style={styles.outContainer}>
        <View style={styles.detailContainer2}>
          <FontAwesome5 name="weight" size={18} color="black" />
          <Text style={styles.text}>{weight}kg</Text>
        </View>
        <View style={styles.detailContainer2}>
          <MaterialCommunityIcons
            name="scale-bathroom"
            size={18}
            color="black"
          />
          <Text style={styles.text}>{bmi}</Text>
        </View>
      </View>
    </View>
  );
}

export default MyInfoBox;

const styles = StyleSheet.create({
  rootContainer: {
    borderRadius: 5,
    backgroundColor: Colors.primary100,
    shadowColor: Colors.primary200,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    marginBottom: 10,
  },
  outContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  detailContainer1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  detailContainer2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  text: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#8B8B8B',
  },
});
