<<<<<<< HEAD
// TODO: 현재 팀 아이디와 배틀 아이디가 다를 경우 + 배틀 팀이 하나만 존재하는 경우 대결 신청 할 수 있게 처리해야함.
=======
>>>>>>> master
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import BottomButton from '../../../components/common/BottomButton';
import TeamIntro from '../../../components/team-management/TeamIntro';
import { MatchService } from '../../../services/MatchService';
import { TeamService } from '../../../services/TeamService';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  Headers: {
    backgroundColor: 'white',
    flexGrow: 1,
<<<<<<< HEAD
    flex: 1,
=======
>>>>>>> master
    flexDirection: 'column',
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  TeamLine: {
<<<<<<< HEAD
=======
    flex: 1,
>>>>>>> master
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#b0b0b0',
    alignItems: 'center',
  },
  TierLine: {
<<<<<<< HEAD
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 0,
    padding: 0,
    shadowColor: '#000',
=======
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
>>>>>>> master
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
<<<<<<< HEAD
  TeamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
    margin: 0,
    padding: 0,
    paddingVertical: 0,
  },
=======
  TeamInfo: { flexDirection: 'row', alignItems: 'center' },
>>>>>>> master
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'grey',
    paddingBottom: 5,
  },
  TeamIntro: {
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    flex: 0.3,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  TeamItem: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const TeamTierImage = ({ tier }) => {
  const getImageByTier = (tier) => {
    switch (tier) {
      case '실버':
        return require('../../../../assets/image/tier/Silver.png');
      case '브론즈':
        return require('../../../../assets/image/tier/Bronze.png');
      case '골드':
        return require('../../../../assets/image/tier/Gold.png');
      default:
<<<<<<< HEAD
        return require('../../../../assets/image/tier/Bronze.png');
=======
        return null;
>>>>>>> master
    }
  };

  const imageSource = getImageByTier(tier);

  return (
    <View>
      {imageSource && (
        <Image
          key={tier}
          source={imageSource}
<<<<<<< HEAD
          style={{
            width: 45,
            height: 45,
            alignContent: 'flex-start',
            alignItems: 'center',
          }}
=======
          style={{ width: 45, height: 45 }}
>>>>>>> master
          resizeMode="contain"
        />
      )}
      <Text style={{ textAlign: 'center' }}>{tier}</Text>
    </View>
  );
};

const renderProgressBar = (team1Percentage, team2Percentage) => {
  return (
    <View
      style={{
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <AnimatedCircularProgress
        size={180}
        width={20}
        fill={team1Percentage}
        rotation={0}
        tintColor="red"
        backgroundColor="blue"
        lineCap="round"
<<<<<<< HEAD
        duration={500}></AnimatedCircularProgress>
=======
        duration={500}>
        {() => <Text>{team1Percentage}%</Text>}
      </AnimatedCircularProgress>
>>>>>>> master
    </View>
  );
};

export default function MatchInfoScreen({ route }) {
<<<<<<< HEAD
  console.log('현재 대결 상세페이지 들어왔음');
  console.log(route.params);
  const navigation = useNavigation();

  const userTeam = route.params.userTeam;
  const userJWT = route.params.userJWT;
  const battleId = route.params.battleId;
  const team1 = route.params.team1;
  const team2 = route.params.team2;
  const battleMessage = route.params.battleMessage;
  const isTeamLeader = route.params.isTeamLeader;
  console.log(battleMessage);
  console.log(isTeamLeader);

  const team1Id = team1 ? team1.teamId || 0 : 0;
  console.log('team1Id : ', team1Id);
  const team2Id = team2 ? team2.teamId || 0 : 0;
  console.log('team2Id: ', team2Id);

  const team1Name = team1 ? team1.teamName || ' ' : ' ';
  console.log('team1Name: ', team1Name);
  const team2Name = team2 ? team2.teamName || ' ' : ' ';
  console.log('team2Name : ', team2Name);

  const team1Intro = team1 ? team1.intro || ' ' : ' ';
  console.log('team1Intro: ', team1Intro);
  const team2Intro = team2 ? team2.intro || ' ' : ' ';
  console.log('team2Intro : ', team2Intro);

  const team1Tier = team1 ? team1.tear || '' : '';
  console.log('team1Tier : ', team1Tier);
  const team2Tier = team2 ? team2.tear || '' : '';
  console.log('team2Tier : ', team2Tier);

  const team1TotalSteps = team1 ? team1.step || 0 : 0;
  console.log('team1TotalSteps : ', team1TotalSteps);
  const team2TotalSteps = team2 ? team2.step || 0 : 0;
  console.log('team2TotalSteps : ', team2TotalSteps);

  const sumTotalSteps = team1TotalSteps + team2TotalSteps;
  const team1Percentage = (team1TotalSteps / sumTotalSteps) * 100;
  const team2Percentage = (team2TotalSteps / sumTotalSteps) * 100;
  console.log('여기까지는 괜찮음!');

  const handleBattleRequest = async () => {
    try {
      const response = await MatchService.requestMatch(userJWT, battleId);
      console.log('Response status:', response.status);
      if (response.status === 200) {
        Alert.alert('성공', '대결 요청이 성공적으로 완료되었습니다.', [
          {
            text: 'OK',
            onPress: () => navigation.popToTop(),
=======
  const navigation = useNavigation();
  const totalSteps = route.params.team.totalStep || 1;
  const team1Steps =
    route.params.team.battleRivals && route.params.team.battleRivals[0]
      ? route.params.team.battleRivals[0].step
      : 0;
  const team2Steps =
    route.params.team.battleRivals && route.params.team.battleRivals[1]
      ? route.params.team.battleRivals[1].step
      : 0;

  const team1Percentage = (team1Steps / totalSteps) * 100;
  const team2Percentage = (team2Steps / totalSteps) * 100;

  const handleBattleRequest = async () => {
    try {
      const response = await MatchService.requestMatch(
        route.params.userTeam.id,
        route.params.team.id
      );

      if (response.message === '대결 라이벌 생성 성공') {
        Alert.alert('성공', '대결 요청이 성공적으로 완료되었습니다.', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
>>>>>>> master
          },
        ]);
      } else {
        Alert.alert(
          '오류',
          '대결 요청 중 오류가 발생했습니다. 다시 시도해주세요.'
        );
      }
    } catch (error) {
      Alert.alert(
        '오류',
        '대결 요청 중 오류가 발생했습니다. 다시 시도해주세요.'
      );
    }
  };

  const handleDeleteBattle = async () => {
    try {
<<<<<<< HEAD
      console.log('대결 삭제 버튼 눌름');
      const response = await MatchService.deleteMatch(battleId);

      console.log(response);
      console.log('Response status:', response.status);

      if (response.status === 200) {
        Alert.alert('성공', '대결이 성공적으로 삭제되었습니다.', [
          {
            text: 'OK',
            onPress: () => navigation.popToTop(),
=======
      const response = await MatchService.deleteMatch(route.params.team.id);

      if (response.message === '대결 삭제 성공') {
        Alert.alert('성공', '대결이 성공적으로 삭제되었습니다.', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
>>>>>>> master
          },
        ]);
      } else {
        Alert.alert(
          '오류',
          '대결 삭제 중 오류가 발생했습니다. 다시 시도해주세요.'
        );
      }
    } catch (error) {
<<<<<<< HEAD
      //console.error('Error occurred:', error);
=======
>>>>>>> master
      Alert.alert(
        '오류',
        '대결 삭제 중 오류가 발생했습니다. 다시 시도해주세요.'
      );
    }
  };

  const handleTeamInfoPress = async (selectedTeam) => {
    try {
      const response = await TeamService.getTeamById(selectedTeam.teamId);
      if (response.status === 'OK') {
        console.log(response.data);
        navigation.navigate('TeamInfo', { team: response.data });
      } else {
        console.error('Team not found or error in response:', response.message);
        Alert.alert(
          '오류',
          response.message || '해당 팀 정보를 찾을 수 없습니다.'
        );
      }
    } catch (error) {
      console.error('Error fetching team info:', error);
      Alert.alert('오류', '팀 정보를 가져오는 중에 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles.Headers}>
<<<<<<< HEAD
      <View style={styles.TeamLine}>
        <Text style={styles.title}> &lt; 대결 정보 &gt;</Text>
        <TouchableOpacity
          key={team1Id}
          onPress={() => handleTeamInfoPress(team1)}
          style={styles.TeamInfo}>
          <TeamIntro name={team1Name} introduction={team1Intro} />
          <View style={styles.TierLine}>
            <TeamTierImage tier={team1Tier} />
          </View>
        </TouchableOpacity>
        {team2Id != 0 && (
          <TouchableOpacity
            key={team2Id}
            onPress={() => handleTeamInfoPress(team2)}
            style={styles.TeamInfo}>
            <TeamIntro name={team2Name} introduction={team2Intro} />
            <View style={styles.TierLine}>
              <TeamTierImage tier={team2Tier} />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.TeamLine}>
        <Text style={styles.title}> &lt; 대결 현황 &gt;</Text>
        <Text>{`총 걸음 수: ${sumTotalSteps}`}</Text>
        {renderProgressBar(team1Percentage, team2Percentage)}
        <Text key={team1Id}>
          {team1Name}:{team1TotalSteps} 걸음
        </Text>
        {team2Id != 0 && (
          <Text key={team2Id}>
            {team2Name}:{team2TotalSteps} 걸음
          </Text>
        )}
      </View>

      {userTeam.team !== team1Id &&
        battleMessage === '팀 생성 완료' &&
        team2Id === 0 &&
        isTeamLeader && (
=======
      <View style={styles.container}>
        <View style={styles.TeamLine}>
          <Text style={styles.title}> &lt; 대결 정보 &gt;</Text>
          {route.params.team.battleRivals.map((rival, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTeamInfoPress(rival)}
              style={styles.TeamInfo}>
              <TeamIntro
                name={rival.teamName || '팀 정보가 없습니다.'}
                introduction={rival.xintro || '팀의 소개가 없습니다.'}
              />
              <View style={styles.TierLine}>
                <TeamTierImage tier={rival.teamTier} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.TeamLine}>
          <Text style={styles.title}> &lt; 대결 현황 &gt;</Text>
          <Text>{`총 걸음 수: ${route.params.team.totalStep}`}</Text>
          {renderProgressBar(team1Percentage, team2Percentage)}
          {route.params.team.battleRivals.map((rival, index) => (
            <Text key={index}>
              {rival.teamName}: {rival.step}걸음
            </Text>
          ))}
        </View>
      </View>
      {route.params.userTeam.id !== route.params.team.id &&
        route.params.userTeam.battleCheck === '팀 생성 완료' && (
>>>>>>> master
          <BottomButton
            BottomText="대결하기"
            pressed={true}
            onPress={handleBattleRequest}
          />
        )}
<<<<<<< HEAD
      {(userTeam.team === team1Id || userTeam.team === team2Id) &&
        battleMessage === '대결 생성 완료' &&
        battleMessage && (
=======
      {route.params.userTeam.id === route.params.team.id &&
        route.params.userTeam.battleCheck === '팀 생성 완료' && (
>>>>>>> master
          <BottomButton
            BottomText="대결 삭제하기"
            pressed={true}
            onPress={handleDeleteBattle}
          />
        )}
    </View>
  );
}
