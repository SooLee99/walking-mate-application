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
    flexDirection: 'column',
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  TeamLine: {
    flex: 1,
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  TeamInfo: { flexDirection: 'row', alignItems: 'center' },
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
        return null;
    }
  };

  const imageSource = getImageByTier(tier);

  return (
    <View>
      {imageSource && (
        <Image
          key={tier}
          source={imageSource}
          style={{ width: 45, height: 45 }}
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
        duration={500}>
        {() => <Text>{team1Percentage}%</Text>}
      </AnimatedCircularProgress>
    </View>
  );
};

export default function MatchInfoScreen({ route }) {
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
      const response = await MatchService.deleteMatch(route.params.team.id);

      if (response.message === '대결 삭제 성공') {
        Alert.alert('성공', '대결이 성공적으로 삭제되었습니다.', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert(
          '오류',
          '대결 삭제 중 오류가 발생했습니다. 다시 시도해주세요.'
        );
      }
    } catch (error) {
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
          <BottomButton
            BottomText="대결하기"
            pressed={true}
            onPress={handleBattleRequest}
          />
        )}
      {route.params.userTeam.id === route.params.team.id &&
        route.params.userTeam.battleCheck === '팀 생성 완료' && (
          <BottomButton
            BottomText="대결 삭제하기"
            pressed={true}
            onPress={handleDeleteBattle}
          />
        )}
    </View>
  );
}
