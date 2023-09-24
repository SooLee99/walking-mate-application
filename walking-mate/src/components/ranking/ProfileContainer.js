import { View, Text, StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Profile from '../my-info/Profile';

function ProfileContainer({ name, teamName, rank }) {
  return (
    <View style={styles.profileContainer}>
      <Profile style={styles.profile} textStyle={styles.profileText} />
      <View>
        <View style={styles.pfDetailContainer}>
          <MaterialCommunityIcons
            name="human-queue"
            size={30}
            color="#444444"
          />
          <Text style={styles.pfDetailText}>{teamName || '팀 없음'}</Text>
        </View>
        <View style={styles.pfDetailContainer}>
          <MaterialCommunityIcons name="podium" size={30} color="#444444" />
          <Text style={styles.pfDetailText}>{rank || '티어'}</Text>
        </View>
      </View>
    </View>
  );
}

export default ProfileContainer;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: '#E1F1F1',
    borderWidth: 1,
    borderColor: '#D1D1D1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profile: {
    width: 90,
    height: 90,
  },
  profileText: {
    fontSize: 15,
  },
  pfDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 5,
    height: 50,
  },
  pfDetailText: {
    marginLeft: 10,
    fontSize: 13,
    color: '#333333',
  },
});
