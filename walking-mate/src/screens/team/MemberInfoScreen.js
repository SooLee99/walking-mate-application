import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import RecordContainer from '../../components/team-management/RecordContainer';
import { TeamService } from '../../services/TeamService';

const dummyData = [
  {
    id: '1',
    date: '2023-09-15',
    distance: '6.24',
    time: '30:54',
    pace: "7'10''",
    calories: '200',
    gpsPhoto: require('../../../assets/image/team/maps.png'),
  },
  {
    id: '2',
    date: '2023-09-14',
    distance: '5.50',
    time: '28:30',
    pace: "7'30''",
    calories: '180',
    gpsPhoto: require('../../../assets/image/team/maps.png'),
  },
  {
    id: '3',
    date: '2023-09-13',
    distance: '5.00',
    time: '25:00',
    pace: "5'00''",
    calories: '200',
    gpsPhoto: require('../../../assets/image/team/maps.png'),
  },
];

const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Image
      source={require('../../../assets/image/team/maps.png')}
      style={styles.gpsImage}
    />
    <View style={styles.itemTextContainer}>
      <Text style={styles.itemDate}>{item.date}</Text>
      <Text style={styles.itemDetail}>
        {item.startTime} ~ {item.endTime}
      </Text>
      <Text style={styles.itemDetail}>
        {item.distance}km | {item.time} | {item.step}걸음 | {item.calories} kcal
      </Text>
    </View>
  </View>
);

function MemberInfoScreen({ route }) {
  const [runRecords, setRunRecords] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalStep, setTotalStep] = useState(0);
  const [totalKcal, setTotalKcal] = useState(0);

  console.log('현재 MemberInfo 화면에 들어왔음.');
  console.log(route.params.item.userId);
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const memberData = await TeamService.getMemberById(
          route.params.item.userId
        );
        if (memberData.status === 'OK') {
          console.log('memberData 성공');
          console.log(memberData);
          setTotalTime(memberData.data.totalTime);
          setTotalDistance(memberData.data.totalDistance);
          setTotalStep(memberData.data.totalStep);
          setTotalKcal(memberData.data.totalKcal);

          setRunRecords(memberData.data.runRecordResponseDTOList);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchMemberData();
  }, []);

  return (
    <View style={styles.rootContainer}>
      {/* 팀원 프로필 및 닉네임 */}
      <View style={styles.profileImage}>
        <Image source={require('../../../assets/image/profile.png')} />
        <Text style={styles.userName}>{route.params.item.userId}</Text>
      </View>

      {/* 운동 기록 */}
      <RecordContainer
        boldText1={totalTime}
        lightText1="시간"
        boldText2={Math.floor(totalDistance)}
        lightText2="거리(km)"
      />
      <RecordContainer
        boldText1={totalStep}
        lightText1="걸음수"
        boldText2={Math.floor(totalKcal)}
        lightText2="칼로리"
      />

      {/* 중간 구분선 */}
      <View style={styles.horizontalLine}></View>

      {/* 운동 포스트 항목 */}
      <View style={styles.postContainer}>
        <Text style={styles.postText}>운동 포스트</Text>
        <FlatList
          data={runRecords}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

export default MemberInfoScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileImage: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  userName: {
    marginTop: 17,
    fontSize: 16,
    fontWeight: '700',
  },
  postContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },

  horizontalLine: {
    height: 0.4,
    backgroundColor: '#B0B0B0',
    marginTop: 10,
    marginBottom: 20,
  },
  postText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 20,
  },
  itemContainer: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.6,
    borderColor: '#B0B0B0',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  gpsImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemDate: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  itemDetail: {
    fontSize: 12,
    color: '#B0B0B0',
  },
});
