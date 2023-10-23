import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import TeamCard from '../../components/team-management/TeamCard';
import BottomButton from '../../components/common/BottomButton';
import TeamInfoCard from '../../components/team-management/TeamIntroCard';
import { UserContext } from '../../contexts/index';
import { TeamService } from '../../services/TeamService';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderWidth: 1,
    borderColor: '#b0b0b0',
  },
  memberItem: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    borderColor: '#b0b0b0',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  ItemLine: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#b0b0b0',
  },

  bottomButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const TeamTierImage = ({ tier }) => {
  const getImageByTier = (tier) => {
    switch (tier) {
      case '실버':
        return require('../../../assets/image/tier/Silver.png');
      case '브론즈':
        return require('../../../assets/image/tier/Bronze.png');
      case '골드':
        return require('../../../assets/image/tier/Gold.png');
      default:
        return require('../../../assets/image/tier/Bronze.png');
    }
  };
  const imageSource = getImageByTier(tier);
  console.log('현재 티어는? ' + tier);
  return (
    <View>
      {imageSource && (
        <Image
          key={tier}
          source={imageSource}
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />
      )}
      <Text style={{ textAlign: 'center' }}>{tier}</Text>
    </View>
  );
};

export default function TeamInfo({ route, navigation }) {
  const { user } = useContext(UserContext);
  const { team } = route.params;

  const teamLeader = team.teamMembers.find((member) => member.teamLeader);
  const userIds = team.teamMembers.map((member) => member.userId);

  const isUserLeader = teamLeader.userId === user.id;

  const [isTeamMember, setIsTeamMember] = useState(false);

  // 사용자가 해당 방에 있는 참가자인지 확인하는 함수
  const checkIsTeamMember = () => {
    const isMember = team.teamMembers.some(
      (member) => member.userId === user.id
    );
    setIsTeamMember(isMember);
  };

  // 페이지 진입 시 사용자가 해당 방에 있는 참가자인지 확인
  useEffect(() => {
    console.log(userIds);
    checkIsTeamMember();
  }, []);

  // (5) 방 나가기
  const kickMember = (member) => {
    Alert.alert(
      '멤버 강퇴',
      `정말로 ${member.userId}를 강퇴하시겠습니까?`,
      [
        {
          text: '예',
          onPress: () => {
            TeamService.kickMember(team.id, member.userId, user.jwt);
            Alert.alert(`${member.userId}를 강퇴했습니다.`);
            navigation.goBack();
          },
        },
        {
          text: '아니오',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  // (5) 방 나가기
  const exitTeam = (navigation) => {
    console.log(`${team.id} : ${user.id} 방 나가기`);
    Alert.alert(
      '방 나가기',
      `현재 해당 방을 나가시겠습니까?`,
      [
        {
          text: '예',
          onPress: async () => {
            try {
              const result = await TeamService.kickMember(
                team.id,
                user.id,
                user.jwt
              );

              if (result.status === 'OK') {
                Alert.alert('나가기 완료', '해당 방을 나갔습니다.');
                navigation.goBack();
              } else {
                Alert.alert(
                  '나가기 실패',
                  result.message || '알 수 없는 오류가 발생했습니다.'
                );
              }
            } catch (error) {
              console.error('나가기 중 오류 발생:', error);
              Alert.alert('나가기 실패', '알 수 없는 오류가 발생했습니다.');
            }
          },
        },
        {
          text: '아니오',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  // (4) 팀 가입하기
  const joinTeam = () => {
    console.log(`${user.jwt} 팀 가입하기`);
    Alert.alert(
      '팀 가입하기',
      `현재 해당 방에 가입하시겠습니까?`,
      [
        {
          text: '예',
          onPress: async () => {
            try {
              const result = await TeamService.joinMember(team.id, user.jwt);

              if (result.status === 'OK') {
                Alert.alert('팀 가입 성공', '팀 가입이 완료되었습니다.');
                navigation.goBack();
              } else {
                Alert.alert(
                  '팀 가입 실패',
                  result.message || '알 수 없는 오류가 발생했습니다.'
                );
              }
            } catch (error) {
              console.error('가입 중 오류 발생:', error);
              Alert.alert('가입 실패', '알 수 없는 오류가 발생했습니다.');
            }
          },
        },
        {
          text: '아니오',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  // (3) 팀 삭제
  const deleteTeam = (navigation) => {
    console.log(`${team.id} 팀 삭제하기`);
    Alert.alert(
      '팀 삭제하기',
      `해당 방에 삭제하시겠습니까?`,
      [
        {
          text: '예',
          onPress: async () => {
            try {
              const result = await TeamService.deleteTeam(team.id, user.jwt);

              if (result.status === 'OK') {
                Alert.alert('팀 삭제 성공', '팀 삭제가 완료되었습니다.');
                navigation.goBack();
              } else {
                Alert.alert(
                  '팀 삭제 실패',
                  result.message || '알 수 없는 오류가 발생했습니다.'
                );
              }
            } catch (error) {
              console.error('팀 삭제 중 오류 발생:', error);
              Alert.alert('삭제 실패', '알 수 없는 오류가 발생했습니다.');
            }
          },
        },
        {
          text: '아니오',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  // 팀원을 눌렀을 때, 팀원 상세화면으로 이동
  const renderTeamMember = ({ item }) => (
    <TouchableOpacity
      style={styles.memberItem}
      onPress={() => {
        console.log('팀원을 눌렀습니다.');
        console.log(item);
        navigation.navigate('MemberInfo', { item });
      }}
      onLongPress={() => {
        // 사용자가 팀장이고, 선택된 멤버가 팀장이 아니며, 선택된 멤버가 현재 사용자가 아닌 경우
        if (isUserLeader && !item.teamLeader && user.email !== item.userId) {
          // 비교하는 값이 올바른지 확인
          kickMember(item);
        }
      }}>
      <Text>
        {item.userId} {item.teamLeader ? '(Leader)' : ''}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.header}>
        <TeamInfoCard
          name={team.name}
          introduction={team.intro || '소개글이 없습니다.'}
        />
        <View style={styles.TeamIntro}>
          <TeamTierImage tier={team.teamRankResponseDTO.tier} />
        </View>
      </View>
      <TeamCard
        leaderName={teamLeader ? teamLeader.userId : '리더 정보 없음'}
        totalMembers={team.teamNum}
        currentMembers={team.teamMembers.length}
        createdDate={team.date}
      />
      <View style={styles.ItemLine}>
        <Text
          style={{
            marginBottom: 10,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Walking Mate
        </Text>
        <FlatList
          data={team.teamMembers}
          renderItem={renderTeamMember}
          keyExtractor={(item) => item.userId}
        />
      </View>
      <View style={styles.bottomButtonContainer}>
        {isTeamMember && (
          <BottomButton
            BottomText="방 나가기"
            pressed={true}
            onPress={() => {
              exitTeam(navigation);
            }}
          />
        )}
        {isTeamMember && (
          <BottomButton
            BottomText="팀 가입하기"
            pressed={true}
            onPress={() => {
              joinTeam();
            }}
          />
        )}
        {isUserLeader && (
          <BottomButton
            BottomText="팀 삭제하기"
            pressed={true}
            onPress={() => {
              deleteTeam(navigation);
            }}
          />
        )}
      </View>
      {/*
      <Text>{team.state}</Text>
      <Text>{`Coin: ${team.teamRankResponseDTO.coin}`}</Text>*/}
    </View>
  );
}
