// TODO: 내 정보 수정, 신체 정보 수정 => 완료 시 화면 종료.
// TODO: 앱 문의 커뮤니티 문의 => 키보드 인풋 수정 필요.
// TODO: 회원 탈퇴 서버에 요청하기.

import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../themes/color';
import {
  RankingListIndividual,
  RankingListTeam,
} from '../../components/ranking/RankingList';
import ProfileContainer from '../../components/ranking/ProfileContainer';
import { RankService } from '../../services/RankService';
<<<<<<< HEAD

function RankingScreen({ route }) {
=======
import { UserContext } from '../../contexts/User';

function RankingScreen() {
>>>>>>> master
  const [selected, setSelected] = useState('팀');
  const [userInfo, setUserInfo] = useState(null);
  const [teamRanking, setTeamRanking] = useState(null);
  const [individualRanking, setIndividualRanking] = useState(null);
<<<<<<< HEAD
  console.log('랭킹 화면에 들어옴.');
  console.log(route.params);
=======
  const { user } = useContext(UserContext);
>>>>>>> master

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfoResponse = await RankService.getUserInfo();
        setUserInfo(userInfoResponse.data);

        const teamRankingResponse = await RankService.getTeamRanking();
        setTeamRanking(teamRankingResponse.data);

        const individualRankingResponse =
          await RankService.getIndividualRanking();
        setIndividualRanking(individualRankingResponse.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'There was an error fetching the data.');
      }
    };

    fetchData();
  }, []);

  function PressTeamHandler() {
    setSelected('팀');
  }

  function PressIndividualHandler() {
    setSelected('개인');
  }

  return (
    <View style={styles.rootContainer}>
      <ProfileContainer
<<<<<<< HEAD
        name={route.params.user.user.id}
=======
        name={user.uid.uid}
>>>>>>> master
        teamName={userInfo ? userInfo.name : null}
        rank={
          userInfo && userInfo.teamRankResponseDTO
            ? userInfo.teamRankResponseDTO.tear
            : null
        }
      />
      <View style={styles.selectContainer}>
        <TouchableOpacity
          style={[styles.tab, selected === '팀' ? styles.selectedTab : null]}
          onPress={PressTeamHandler}>
          <Text
            style={[
              styles.tabText,
              selected === '팀' ? styles.selectedTabText : null,
            ]}>
            팀
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={[styles.tab, selected === '개인' ? styles.selectedTab : null]}
          onPress={PressIndividualHandler}>
          <Text
            style={[
              styles.tabText,
              selected === '개인' ? styles.selectedTabText : null,
            ]}>
            개인
          </Text>
        </TouchableOpacity>
      </View>
      {selected === '팀' ? (
        <RankingListTeam data={teamRanking ? teamRanking : []} />
      ) : (
        <RankingListIndividual
          data={individualRanking ? individualRanking : []}
        />
      )}
    </View>
  );
}

export default RankingScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1D1D1',
    borderRadius: 4,
    overflow: 'hidden',
    margin: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
  },
  selectedTab: {
    backgroundColor: Colors.primary200,
  },
  selectedTabText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  divider: {
    width: 1,
  },
});
