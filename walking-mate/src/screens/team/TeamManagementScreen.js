import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Dialog from 'react-native-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { TeamService } from '../../services/TeamService';
import { theme } from '../../themes/theme';
import TeamList from '../../components/team-management/TeamList';
import { UserContext } from '../../contexts/User';

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

// (1) 팀 목록 받는 함수
const fetchTeams = (setTeams, setDisplayedTeams) => {
  TeamService.getRecruitingTeams()
    .then((teams) => {
<<<<<<< HEAD
      console.log('Received teams:', teams);
=======
>>>>>>> master
      setTeams(teams);
      setDisplayedTeams(teams);
    })
    .catch((error) => console.error(error));
};

export default function TeamManagement() {
  const navigation = useNavigation();
  const newTeamNameRef = useRef(null);
  const newTeamIntroductionRef = useRef(null);
  const newTeamMaxMembersRef = useRef(null);

  const [teams, setTeams] = useState([]);
  const [displayedTeams, setDisplayedTeams] = useState([]);
  const [createTeamDialogVisible, setCreateTeamDialogVisible] = useState(false);

  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamIntroduction, setNewTeamIntroduction] = useState('');
  const [newTeamMaxMembers, setNewTeamMaxMembers] = useState('');

  const [searchText, setSearchText] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
<<<<<<< HEAD
    fetchTeams(setTeams, setDisplayedTeams);
=======
    fetchTeams(setTeams, setDisplayedTeams); // 팀 리스트 받기
    /*TeamService.isUserInTeam()
      .then((response) => {
        // 'OK'를 확인하는 방식으로 변경
        if (response.status === 'OK') {
          navigation.navigate('TeamInfo', {
            team: response.data,
            teamMemberCount: response.data.teamMembers.length,
          });
        } else { //}
        fetchTeams(setTeams, setDisplayedTeams);
      })
      .catch((error) => {
        console.error('Error in checking if user is in a team:', error);
      });*/
>>>>>>> master
  }, [navigation]);

  // 뒤로가기를 진행된 상태
  useFocusEffect(
    React.useCallback(() => {
      fetchTeams(setTeams, setDisplayedTeams);
<<<<<<< HEAD
=======
      /*TeamService.isUserInTeam()
        .then((response) => {
          fetchTeams(setTeams, setDisplayedTeams);
        })
        .catch((error) => {
          console.error('Error in checking if user is in a team:', error);
        });*/
>>>>>>> master
    }, [navigation])
  );

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  // (2) 팀 생성하기
  const handleCreateTeam = async () => {
    try {
      if (!newTeamName || !newTeamIntroduction) {
        alert('모든 내용을 작성해 주세요.');
        return;
      }

      const maxMembers = parseInt(newTeamMaxMembers, 10);

      if (isNaN(maxMembers) || maxMembers <= 0 || maxMembers >= 5) {
        alert('팀 인원은 1에서 4 사이의 값이어야 합니다.');
        return;
      }

<<<<<<< HEAD
      const result = await TeamService.createTeam(
        user.jwt,
        newTeamName,
        newTeamIntroduction,
        newTeamMaxMembers,
        getCurrentDate()
=======
      const date = getCurrentDate();
      console.log(newTeamName);
      console.log(newTeamIntroduction);
      console.log(newTeamMaxMembers);
      console.log(date);

      const result = await TeamService.createTeam(
        newTeamName,
        newTeamIntroduction,
        newTeamMaxMembers,
        date
>>>>>>> master
      );

      if (result.status === 'OK') {
        alert('팀 생성이 완료되었습니다.');
<<<<<<< HEAD
        setCreateTeamDialogVisible(false); // 팀 생성 버튼 제거
=======
>>>>>>> master
      } else {
        alert('팀 생성 중 오류가 발생했습니다: ' + result.message);
      }

<<<<<<< HEAD
=======
      setCreateTeamDialogVisible(false);
>>>>>>> master
      TeamService.getRecruitingTeams()
        .then((teams) => {
          setTeams(teams);
          setDisplayedTeams(teams);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error('Create team error:', error);
      alert('팀 생성 중 오류가 발생했습니다.');
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

  // TeamInfo 화면으로 이동하는 이벤트 핸들러
  const handleTeamPress = (team) => {
<<<<<<< HEAD
    console.log('팀 화면으로 이동할 때, 가져가는 정보');
    console.log(team);
=======
>>>>>>> master
    navigation.navigate('TeamInfo', { team });
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

=======
>>>>>>> master
      <FlatList
        data={displayedTeams}
        keyExtractor={(team) => team.id.toString()}
        renderItem={({ item }) => (
          <TeamList
            name={item.name}
            leaderName={
              item.teamMembers.find((member) => member.teamLeader)?.userId
            }
<<<<<<< HEAD
            totalMembers={item.teamNum}
=======
            totalMembers={item.peopleNum}
>>>>>>> master
            currentMembers={item.teamMembers.length}
            createdDate={item.date}
            onPress={() => handleTeamPress(item)}
          />
        )}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          setCreateTeamDialogVisible(true);
        }}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      <Dialog.Container visible={createTeamDialogVisible}>
        <Dialog.Title>팀 생성하기</Dialog.Title>

        <View style={styles.dialogRow}>
          <Dialog.Description style={styles.dialogLabel}>
            팀 이름
          </Dialog.Description>
          <TextInput
            placeholder="팀 이름을 입력하세요."
            returnKeyType="next"
            onSubmitEditing={() => newTeamIntroductionRef.current?.focus()}
            ref={newTeamNameRef}
            value={newTeamName}
            onChangeText={setNewTeamName}
            style={styles.dialogInput}
          />
        </View>

        <View style={styles.dialogRow}>
          <Dialog.Description style={styles.dialogLabel}>
            팀 소개
          </Dialog.Description>
          <TextInput
            placeholder="팀을 소개글을 입력하세요."
            returnKeyType="next"
            onSubmitEditing={() => newTeamMaxMembersRef.current?.focus()}
            ref={newTeamIntroductionRef}
            value={newTeamIntroduction}
            onChangeText={setNewTeamIntroduction}
            style={styles.dialogInput}
          />
        </View>

        <View style={styles.dialogRow}>
          <Dialog.Description style={styles.dialogLabel}>
            팀 인원
          </Dialog.Description>
          <TextInput
            placeholder="팀 인원을 설정해주세요."
            keyboardType="numeric"
            returnKeyType="done"
            ref={newTeamMaxMembersRef}
            value={newTeamMaxMembers}
            onChangeText={setNewTeamMaxMembers}
            style={styles.dialogInput}
          />
        </View>

        <Dialog.Button
          label="취소"
          onPress={() => setCreateTeamDialogVisible(false)}
        />
        <Dialog.Button label="생성" onPress={handleCreateTeam} />
      </Dialog.Container>
    </View>
  );
}
