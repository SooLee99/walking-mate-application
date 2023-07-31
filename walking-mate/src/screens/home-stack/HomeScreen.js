import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import DailyStep from '../../components/home/main-home/DailyStep';
import HomeButton from '../../components/home/main-home/HomeButton';
import HomeDisplay from '../../components/home/main-home/HomeDisplay';
import { UserAuthService } from '../../services/UserAuthService';
import { UserContext } from '../../contexts/User';

function HomeScreen() {
  const { user } = useContext(UserContext);
  const userId = user.uid.uid;

  const [steps, setSteps] = useState(0);
  const [kcal, setKcal] = useState('000');
  const [km, setKm] = useState('000');
  const [bmi, setBmi] = useState('00.0');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const homeData = await UserAuthService.fetchHomeData(userId);
        const bmiData = await UserAuthService.fetchBMI(userId);

        setSteps(homeData.data.step);
        setKcal(String(homeData.data.kcal));
        setKm(String(homeData.data.distance));
        setBmi(String(bmiData.data.bmi));
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
          <HomeButton targetScreen="운동 설정">운동 시작</HomeButton>
        </View>
        <View style={styles.buttonWrapper}>
          <HomeButton targetScreen="대결 찾기">대결 현황</HomeButton>
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
