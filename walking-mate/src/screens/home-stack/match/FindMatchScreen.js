<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
// TODO(백엔드): [대결] 대결 리스트 조회 API => 현재 API에서 팀장 닉네임, 팀 티어, 팀 소개가 필요함. (이 내용이 있다는 가정을 하고 제작) //
// TODO(백엔드): [대결] 현재 유저의 대결 상황 조회 API => 대결 중이라면 대결 정보 뿌리기, 팀에만 소속 되어있으면 팀 소속 정보 뿌리기 //
// TODO(백엔드): [대결] 대결 신청 API => 현재 대결 리스트에서 대결을 신청할 수 있게 만들기. (이건 뭔지 모르겠음...?)
// TODO(백엔드): [운동 정보] 운동 검색 시, 운동 시간도 추가할 수 있도록 수정이 필요해 보임. //

// TODO(백엔드): [팀 모집] 회원 검색 API => 회원 ID를 통해 회원을 검색할 수 있고, 정보를 조회할 수 있도록 만들기
// TODO(프론트엔드): [팀 모집] 팀 회원 정보 화면 생성

import React, { useEffect, useState, useContext } from 'react';
>>>>>>> master
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
import { useNavigation } from '@react-navigation/native';

import { MatchService } from '../../../services/MatchService';
import { theme } from '../../../themes/theme';
import MatchList from '../../../components/home/match/MatchList';
<<<<<<< HEAD
=======
import { UserContext } from '../../../contexts/User';
>>>>>>> master

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
<<<<<<< HEAD
    .then((response) => {
      if (response && Array.isArray(response.data)) {
        console.log('(1) 모집 중인 팀 리스트의 정보들을 가져옴.');
        console.log(response.data);
        setTeams(response.data);
        setDisplayedTeams(response.data);
      } else {
        setTeams([]);
        setDisplayedTeams([]);
      }
    })
    .catch((error) => console.log(error));
};

export default function FindMatchScreen({ route }) {
  const navigation = useNavigation();
  const [teams, setTeams] = useState([]);
  const [displayedTeams, setDisplayedTeams] = useState([]);
  const [createTeamDialogVisible, setCreateTeamDialogVisible] = useState(false);
  const [isUserTeam, setIsUserTeam] = useState(true);
  const [userTeam, setUserTeam] = useState();

  const [searchText, setSearchText] = useState('');
  const { user } = route.params;
  const [battleMessage, setBattleMessage] = useState('');
  const [isTeamLeader, setIsTeamLeader] = useState(false);

  const [showCreateButton, setShowCreateButton] = useState(false);

  // 현재 이용자의 팀 정보를 가져옴(2023-09-15 이수)
  useEffect(() => {
    MatchService.isUserInMatch(user.jwt)
      .then((response) => {
        console.log('출력 결과');
        console.log(response);

        if (response.status === 'OK') {
          console.log('response 정보:', response);
          console.log(
            '현재 이용자의 팀 정보 데이터:',
            response.data.userTeamMember
          );
          setUserTeam(response.data.userTeamMember);
          setBattleMessage(response.message);
          setIsTeamLeader(response.data.userTeamMember.teamLeader);
          console.log('현재 이용자의 팀 정보:', response.message);

          setShowCreateButton(false);

          console.log(response.data.userTeamMember);
          if (response.message === '대결 생성 완료') {
            console.log("response.message === '대결 생성 완료'");
            setIsUserTeam(true);
            console.log(response.data.userTeamMember);
            console.log(response.data.battleResponses.battleRivals[0]);
            console.log(response.data.battleResponses.battleRivals[1]);
            navigation.navigate('대결 정보', {
              userTeam: response.data.userTeamMember,
              team1: response.data.battleResponses.battleRivals[0],
              team2: response.data.battleResponses.battleRivals[1],
              battleId: response.data.battleResponses.id,
              battleMessage: battleMessage,
              isTeamLeader: isTeamLeader,
              userJWT: user.jwt,
            });
          } else if (response.message === '팀 생성 완료') {
            console.log("response.message === '팀 생성 완료'");
            setShowCreateButton(true);
            setIsUserTeam(true);
          } else if (response.message === '팀 소속이 아님') {
            console.log("response.message === '팀 소속이 아님'");
            setIsUserTeam(false);
=======
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
>>>>>>> master
          }
        }
        fetchMatch(setTeams, setDisplayedTeams);
      })
      .catch((error) => {
<<<<<<< HEAD
        console.log('Error in checking if user is in a team:', error);
=======
        console.error('Error in checking if user is in a team:', error);
>>>>>>> master
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
<<<<<<< HEAD
      console.log('대결 생성함.');
      console.log(response.message);
      // 요청이 성공적으로 처리되었는지 확인
      if (response.message === '대결 생성 성공') {
        Alert.alert('요청 성공', '대결방이 성공적으로 생성되었습니다.');
        console.log('대결 생성 성공함.');

        MatchService.isUserInMatch(user.jwt)
          .then((response) => {
            if (response.status === 'OK') {
              console.log('response 정보:', response);
              console.log(
                '현재 이용자의 팀 정보 데이터:',
                response.data.userTeamMember
              );
              setUserTeam(response.data.userTeamMember);
              setBattleMessage(response.message);
              setIsTeamLeader(response.data.userTeamMember.teamLeader);
              console.log('현재 이용자의 팀 정보:', response.message);

              setShowCreateButton(false);

              console.log(response.data.userTeamMember);
              if (response.message === '대결 생성 완료') {
                console.log("response.message === '대결 생성 완료'");
                setIsUserTeam(true);
                console.log(response.data.userTeamMember);
                console.log(response.data.battleResponses.battleRivals[0]);
                console.log(response.data.battleResponses.battleRivals[1]);
                navigation.navigate('대결 정보', {
                  userTeam: response.data.userTeamMember,
                  team1: response.data.battleResponses.battleRivals[0],
                  team2: response.data.battleResponses.battleRivals[1],
                  battleId: response.data.battleResponses.id,
                  battleMessage: battleMessage,
                  isTeamLeader: isTeamLeader,
                  userJWT: user.jwt,
                });
              } else if (response.message === '팀 생성 완료') {
                console.log("response.message === '팀 생성 완료'");
                setShowCreateButton(true);
                setIsUserTeam(true);
              } else if (response.message === '팀 소속이 아님') {
                console.log("response.message === '팀 소속이 아님'");
                setIsUserTeam(false);
              }
            }
            fetchMatch(setTeams, setDisplayedTeams);
          })
          .catch((error) => {
            console.log('Error in checking if user is in a team:', error);
          });
      } else {
        Alert.alert('대결방 생성 중 오류가 발생했습니다.', response.message);
      }
=======

      // 요청이 성공적으로 처리되었는지 확인
      if (response.status === 'OK') {
        Alert.alert('대결방이 성공적으로 생성되었습니다.');
        fetchMatch(setTeams, setDisplayedTeams);
      } else {
        Alert.alert('대결방 생성 중 오류가 발생했습니다.', response.message);
      }
      setShowCreateButton(false);
>>>>>>> master
      setCreateTeamDialogVisible(false);

      // 대결방 목록을 새로 가져옴
      fetchMatch(setTeams, setDisplayedTeams);
    } catch (error) {
<<<<<<< HEAD
      console.log('Create match error:', error);
=======
      console.error('Create match error:', error);
      Alert.alert('대결방 생성 중 오류가 발생했습니다.');
>>>>>>> master
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
<<<<<<< HEAD
    console.log('팀 정보 화면으로 들어감!');
    console.log(team.battleRivals[0]);
    console.log(team.battleRivals[1]);
    console.log(userTeam);
    if (isUserTeam) {
      navigation.navigate('대결 정보', {
        userTeam: userTeam || '팀 정보가 없습니다.',
        team1: team.battleRivals[0],
        team2: team.battleRivals[1] ? team.battleRivals[1] : '',
        battleId: team.id ? team.id : 0,
        battleMessage: battleMessage,
        isTeamLeader: isTeamLeader,
        userJWT: user.jwt,
      });
    } else {
      Alert.alert('대결 정보는 팀에 소속되어 있어야 확인이 가능합니다.');
    }
=======
    navigation.navigate('대결 정보', { team, userTeam });
>>>>>>> master
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
<<<<<<< HEAD
      {displayedTeams.length > 0 ? (
        <FlatList
          data={displayedTeams}
          keyExtractor={(team) => {
            console.log('로그를 통해 team 객체 확인 : ', team);

            if (team && 'id' in team && team.id !== null) {
              return team.id.toString();
            } else {
              console.log('team이 undefined이거나 id 속성이 없습니다:', team);
              return 'undefined';
            }
          }}
          renderItem={({ item }) => {
            console.log('현재 가져온 item 리스트');
            console.log(item.battleRivals[0]);
            return (
              <MatchList
                name={item.battleRivals[0]?.teamName}
                leaderName={item.battleRivals[0]?.leaderName}
                totalMembers={item.battleRivals[0]?.peopleNum.toString()}
                createdDate={item.createdDate}
                onPress={() => handleMatchPress(item)}
              />
            );
          }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>현재 모집 중인 팀이 없습니다.</Text>
        </View>
      )}
=======
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
>>>>>>> master

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
