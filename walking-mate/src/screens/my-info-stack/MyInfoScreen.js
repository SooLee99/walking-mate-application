import React, { useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Profile from '../../components/my-info/Profile';
import MyInfoBox from '../../components/my-info/MyInfoBox';
import Button from '../../components/my-info/Button';
import { UserContext } from '../../contexts';
import { UserAuthService } from '../../services/UserAuthService';

function MyInfoScreen({ navigation }) {
  const user = useContext(UserContext);
  const [bodyInfo, setBodyInfo] = useState(null);
  const [isPressed1, setIsPressed1] = useState(false);
  const [isPressed2, setIsPressed2] = useState(false);

  useEffect(() => {
    const fetchBodyData = async () => {
      try {
        const data = await UserAuthService.fetchBodyInfo(user.jwt);
        setBodyInfo(data);
      } catch (error) {
        console.error('Error fetching body info:', error);
      }
    };
    fetchBodyData();
  }, [user]);

  const goNextScreen = (screen) => navigation.navigate(screen);

  const showAlert = (title, message, confirmAction) => {
    Alert.alert(
      title,
      message,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          onPress: confirmAction,
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const logoutHandler = () => {
    showAlert('로그아웃', '로그아웃 하시겠습니까?', () => user.setUser(null));
  };

  const withDrawalHandler = () => {
    showAlert('회원탈퇴', '회원탈퇴 하시겠습니까?', () => {
      user.setUser(null);
      // 회원 탈퇴관련 로직 필요.
    });
  };

  const PressableComponent = ({
    onPress,
    isPressed,
    setIsPressed,
    style,
    text,
  }) => {
    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.modifyContainer,
          style,
          { flexDirection: 'row', justifyContent: 'flex-end' },
        ]}>
        <Text style={[styles.modifyText, isPressed && styles.pressedText]}>
          {text}
        </Text>
      </Pressable>
    );
  };

  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <PressableComponent
          onPress={() => goNextScreen('내 정보 수정')}
          isPressed={isPressed1}
          setIsPressed={setIsPressed1}
          style={{ marginRight: 25 }}
          text="내 정보 수정 &gt;"
        />
        <View style={styles.outLine}>
          <Profile name={[user.id]} />
        </View>
        <PressableComponent
          onPress={() => goNextScreen('신체 정보 수정')}
          isPressed={isPressed2}
          setIsPressed={setIsPressed2}
          style={{ marginRight: 0, marginTop: 10 }}
          text="신체 정보 수정 &gt;"
        />
        <MyInfoBox
          height={bodyInfo ? [bodyInfo.height.toString()] : ['00']}
          weight={bodyInfo ? [bodyInfo.weight.toString()] : ['00']}
          teamName={bodyInfo ? [bodyInfo.teamName] : ['teamName']}
          bmi={bodyInfo ? [bodyInfo.bmi.toString()] : ['00']}
        />
        <View style={styles.buttons}>
          <Button onPress={() => goNextScreen('랭킹 관리')}>랭킹 관리</Button>
          <Button onPress={() => goNextScreen('코인')}>코인</Button>
          <Button onPress={() => goNextScreen('앱 문의')}>앱 문의(AI)</Button>
          <Button onPress={logoutHandler}>로그아웃</Button>
          <Button onPress={withDrawalHandler}>회원 탈퇴</Button>
        </View>
      </View>
    </ScrollView>
  );
}

const PressableComponent = ({ onPress, isPressed, setIsPressed, text }) => (
  <Pressable
    onPressIn={handlePress(setIsPressed, true)}
    onPressOut={handlePress(setIsPressed, false)}
    onPress={onPress}
    style={styles.modifyContainer}>
    <Text style={[styles.modifyText, isPressed && styles.pressedText]}>
      {text}
    </Text>
  </Pressable>
);

export default MyInfoScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
  },
  outLine: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },

  modifyContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
    textAlign: 'right',
    width: '100%',
  },
  modifyText: {
    textAlign: 'right',
    minWidth: 100,
    color: '#C0C0C0',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  pressedText: {
    color: 'black',
  },
  buttons: {
    marginTop: 10,
  },
});
