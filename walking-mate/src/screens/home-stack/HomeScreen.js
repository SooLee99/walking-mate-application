<<<<<<< HEAD
// TODO: 운동 설정화면 들어갈 때, UserContext 정보가 전달되어야 함. 그래야 운동화면에서 백엔드로 정보를 조회할 수 있음. (2023-09-13 이수)

=======
>>>>>>> master
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import DailyStep from '../../components/home/main-home/DailyStep';
import HomeButton from '../../components/home/main-home/HomeButton';
import HomeDisplay from '../../components/home/main-home/HomeDisplay';
import { UserAuthService } from '../../services/UserAuthService';
import { UserContext } from '../../contexts/User';

function HomeScreen() {
  const { user } = useContext(UserContext);
  const userJwt = user.jwt;

  const [steps, setSteps] = useState(0);
  const [kcal, setKcal] = useState('000');
  const [km, setKm] = useState('000');
  const [bmi, setBmi] = useState('00.0');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const homeData = await UserAuthService.fetchHomeData(userJwt);
        const bmiData = await UserAuthService.fetchBMI(userJwt);
<<<<<<< HEAD
        console.log(homeData);

        setSteps(homeData.step);
        setKcal(String(Math.floor(homeData.kcal * 100) / 100));
        setKm(String(homeData.distance));
        setBmi(String(bmiData.bmi));
=======

        setSteps(homeData.data.step);
        setKcal(String(homeData.data.kcal));
        setKm(String(homeData.data.distance));
        setBmi(String(bmiData.data.bmi));
>>>>>>> master
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.firstContainer}>
        <DailyStep steps={steps} />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
<<<<<<< HEAD
          <HomeButton targetScreen="운동 설정" user={user}>
            운동 시작
          </HomeButton>
        </View>
        <View style={styles.buttonWrapper}>
          <HomeButton targetScreen="대결 찾기" user={user}>
            대결 현황
          </HomeButton>
=======
          <HomeButton targetScreen="운동 설정">운동 시작</HomeButton>
        </View>
        <View style={styles.buttonWrapper}>
          <HomeButton targetScreen="대결 찾기">대결 현황</HomeButton>
>>>>>>> master
        </View>
      </View>
      <View style={styles.displayContainer}>
        <View style={styles.display}>
          <HomeDisplay info="kcal" text={kcal} style={styles.kcal} />
        </View>
        <View style={styles.display}>
          <HomeDisplay info="km" text={km} style={styles.km} />
        </View>
        <View style={styles.display}>
          <HomeDisplay info="BMI" text={bmi} style={styles.bmi} />
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FAFA',
  },
  firstContainer: {
    flex: 4,
    marginTop: 25,
    marginBottom: 1,
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  buttonWrapper: {
    marginHorizontal: 20,
  },
  displayContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  display: {
    marginHorizontal: 3,
  },
  kcal: {
    borderColor: '#FE2624',
    color: '#FE2624',
  },
  km: {
    borderColor: '#D0FD3E',
    color: '#D0FD3E',
  },
  bmi: {
    borderColor: '#E79332',
    color: '#E79332',
  },
});
