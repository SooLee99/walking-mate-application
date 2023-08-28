// TODO(백엔드): [대결] 대결 리스트 조회 API => 현재 API에서 팀장 닉네임, 팀 티어, 팀 소개가 필요함. (이 내용이 있다는 가정을 하고 제작) //
// TODO(백엔드): [대결] 현재 유저의 대결 상황 조회 API => 대결 중이라면 대결 정보 뿌리기, 팀에만 소속 되어있으면 팀 소속 정보 뿌리기 //
// TODO(백엔드): [대결] 대결 신청 API => 현재 대결 리스트에서 대결을 신청할 수 있게 만들기. (이건 뭔지 모르겠음...?)
// TODO(백엔드): [운동 정보] 운동 검색 시, 운동 시간도 추가할 수 있도록 수정이 필요해 보임. //

// TODO(백엔드): [팀 모집] 회원 검색 API => 회원 ID를 통해 회원을 검색할 수 있고, 정보를 조회할 수 있도록 만들기
// TODO(프론트엔드): [팀 모집] 팀 회원 정보 화면 생성

import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Dialog from 'react-native-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { MatchService } from '../../../services/MatchService';
import { theme } from '../../../themes/theme';
import MatchList from '../../../components/home/match/MatchList';
import { UserContext } from '../../../contexts/User';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
    borderRadius: 5,
    paddingLeft: 5,
  },
  floatingButton: {
    backgroundColor: theme.btnBackground,
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 30,
  },
  dialogRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingLeft: 12,
    paddingRight: 12,
  },
  dialogLabel: {
    flex: 1,
  },
  dialogInput: {
    flex: 3,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 5,
  },
});

// (1) 모집 중인 팀 리스트의 정보를 가져오는 함수
const fetchMatch = (setTeams, setDisplayedTeams) => {
  MatchService.getRecruitingMatchList()
    .then((teams) => {
      const recruitingTeams = teams.filter(
        (team) => team.battleCheck === '대결 팀 모집 중'
      );
      setTeams(recruitingTeams);
      setDisplayedTeams(recruitingTeams);
    })
    .catch((error) => console.error(error));
};

export default function FindMatchScreen() {
  const navigation = useNavigation();

  const [teams, setTeams] = useState([]);
  const [userTeam, setUserTeam] = useState();
  const [displayedTeams, setDisplayedTeams] = useState([]);
  const [createTeamDialogVisible, setCreateTeamDialogVisible] = useState(false);

  const [searchText, setSearchText] = useState('');
  const { user } = useContext(UserContext);

  const [showCreateButton, setShowCreateButton] = useState(false);

  // 현재 유저의 대결상태를 조회해봄.
  useEffect(() => {
    MatchService.isUserInMatch(user.jwt)
      .then((response) => {
        if (response.status === 'OK' && response) {
          setUserTeam(response.data);
          if (response.data.battleCheck === '대결 진행 중') {
            navigation.navigate('대결 정보', {
              team: response.data,
              userTeam: response.data,
            });
            setShowCreateButton(false);
          } else if (response.data.battleCheck === '팀 생성 완료') {
            setShowCreateButton(true);
          }
        }
        fetchMatch(setTeams, setDisplayedTeams);
      })
      .catch((error) => {
        console.error('Error in checking if user is in a team:', error);
      });
  }, [navigation]);

  // 대결 생성
  const handleCreateMatch = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}${String(
        currentDate.getMonth() + 1
      ).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}`;

      // 백엔드에 대결방 생성 요청
      const response = await MatchService.createMatch(user.jwt, formattedDate);

      // 요청이 성공적으로 처리되었는지 확인
      if (response.status === 'OK') {
        Alert.alert('대결방이 성공적으로 생성되었습니다.');
        fetchMatch(setTeams, setDisplayedTeams);
      } else {
        Alert.alert('대결방 생성 중 오류가 발생했습니다.', response.message);
      }
      setShowCreateButton(false);
      setCreateTeamDialogVisible(false);

      // 대결방 목록을 새로 가져옴
      fetchMatch(setTeams, setDisplayedTeams);
    } catch (error) {
      console.error('Create match error:', error);
      Alert.alert('대결방 생성 중 오류가 발생했습니다.');
    }
  };

  const handleSearch = () => {
    const results =
      searchText === ''
        ? teams
        : teams.filter((team) =>
            team.name.toLowerCase().includes(searchText.toLowerCase())
          );
    setDisplayedTeams(results);
  };

  const handleMatchPress = (team) => {
    navigation.navigate('대결 정보', { team, userTeam });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="검색"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          style={{
            backgroundColor: theme.btnBackground,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
          }}
          onPress={handleSearch}>
          <Icon name="search" size={20} color={theme.btnTitle} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={displayedTeams}
        keyExtractor={(team) => team.id.toString()}
        renderItem={({ item }) => {
          console.log('Team Info:', item);
          return (
            <MatchList
              name={item.battleRivals[0]?.teamName}
              leaderName={item.battleRivals[0]?.teamLeader}
              totalMembers={item.battleRivals[0]?.peopleNum.toString()}
              createdDate={item.createdDate}
              onPress={() => handleMatchPress(item)}
            />
          );
        }}
      />

      {showCreateButton && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => {
            setCreateTeamDialogVisible(true);
          }}>
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      )}

      <Dialog.Container visible={createTeamDialogVisible}>
        <Dialog.Title>대결방을 생성하시겠습니까?</Dialog.Title>
        <Dialog.Button label="생성" onPress={handleCreateMatch} />
        <Dialog.Button
          label="취소"
          onPress={() => setCreateTeamDialogVisible(false)}
        />
      </Dialog.Container>
    </View>
  );
}
