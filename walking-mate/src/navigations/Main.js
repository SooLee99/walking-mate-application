import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../themes/color';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import { BackHandler, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  SettingScreen,
  FindMatchScreen,
  MatchInfoScreen,
  MyInfoStacks,
  TeamManagementScreen,
  TeamInfoScreen,
  ExerciseDetailScreen,
  Schedule,
  HomeScreen,
  RunScreen,
  CommunityStack,
  CounselingTalkScreen,
  BulletinDetailScreen,
  WritingScreen,
  MyInfoEditScreen,
  PhysicalInfoEditScreen,
  RankingScreen,
  CoinStoreScreen,
  AppInquiryScreen,
} from '../screens/index';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function Main() {
  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      if (!navigation.isFocused()) {
        return false;
      }

      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      } else {
        return false; // 새로운 창에서는 기본 뒤로 가기 동작 수행.
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <RootStack.Navigator initialRouteName="MainTab">
      <RootStack.Screen
        name="Main"
        component={RootStackNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ExerciseDetail"
        component={ExerciseDetailScreen}
        options={{ headerShown: true, headerTitle: '운동 세부 정보' }}
      />
      <RootStack.Screen
        name="TeamInfo"
        component={TeamInfoScreen}
        options={{ headerShown: true, headerTitle: '팀 상세정보' }}
      />
      <RootStack.Screen
        name="운동 설정"
        component={SettingScreen}
        options={{
          title: '운동 설정',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <RootStack.Screen
        name="대결 찾기"
        component={FindMatchScreen}
        options={{
          title: 'Walking 대결 찾기',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <RootStack.Screen
        name="대결 정보"
        component={MatchInfoScreen}
        options={{
          title: 'Walking 대결 정보',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <RootStack.Screen
        name="RunScreen"
        component={RunScreen}
        options={({ navigation, route }) => ({
          title: '운동 화면',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                if (route.params && route.params.handleBackPress) {
                  route.params.handleBackPress();
                } else {
                  navigation.goBack();
                }
              }}
            />
          ),
        })}
      />
      <RootStack.Screen
        name="글 쓰기"
        component={WritingScreen}
        options={({ navigation }) => ({
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerLeft: () => (
            <>
              <TouchableOpacity
                style={{ marginLeft: 5, paddingBottom: 5 }}
                onPress={() => navigation.goBack()}>
                <Icon name="times" size={35} color="black" />
              </TouchableOpacity>
            </>
          ),
        })}
      />
      <RootStack.Screen
        name="게시물 자세히 보기"
        component={BulletinDetailScreen}
        options={({ navigation }) => ({
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 6, paddingBottom: 5 }}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={33} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <RootStack.Screen
        name="워킹메이트 상담톡"
        component={CounselingTalkScreen}
        options={({ navigation }) => ({
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        })}
      />

      <RootStack.Screen
        name="내 정보 수정"
        component={MyInfoEditScreen}
        options={{
          title: '내 정보 수정',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      />
      <RootStack.Screen
        name="신체 정보 수정"
        component={PhysicalInfoEditScreen}
        options={{
          title: '신체 정보 수정',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      />
      <RootStack.Screen
        name="랭킹 관리"
        component={RankingScreen}
        options={{
          title: 'Walking Mate 랭킹',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      />
      <RootStack.Screen
        name="코인"
        component={CoinStoreScreen}
        options={{
          title: '코인 상점',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      />
      <RootStack.Screen
        name="앱 문의"
        component={AppInquiryScreen}
        options={{
          title: '워킹 메이트 상담톡',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      />
    </RootStack.Navigator>
  );
}

function RootStackNavigator() {
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (isBackButtonPressed) {
        BackHandler.exitApp(); // 앱 종료
      } else {
        ToastAndroid.show(
          '앱을 종료하려면 한 번 더 뒤로 가기 버튼을 누르세요.',
          ToastAndroid.SHORT
        );
        setIsBackButtonPressed(true);
        setTimeout(() => {
          setIsBackButtonPressed(false);
        }, 2000); // 2초 동안 '뒤로가기' 상태를 유지
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // 컴포넌트가 unmount될 때 이벤트 리스너 제거
  }, [isBackButtonPressed]);

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          headerShown: true,
          headerTitle: '일정 관리',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/image/calendar.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
          tabBarLabel: '일정 관리',
          tabBarActiveTintColor: Colors.primary400,
        }}
      />
      <Tab.Screen
        name="TeamManagementScreen"
        component={TeamManagementScreen}
        options={{
          headerShown: true,
          headerTitle: '팀 정보',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/image/team.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
          tabBarLabel: '팀 정보',
          tabBarActiveTintColor: Colors.primary400,
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: 'Walking Mate',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/image/home-2.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
          tabBarLabel: '홈',
          tabBarActiveTintColor: Colors.primary400,
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityStack}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/image/community.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
          tabBarLabel: '커뮤니티',
          tabBarActiveTintColor: Colors.primary400,
        }}
      />
      <Tab.Screen
        name="InfoStack"
        component={MyInfoStacks}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/image/user.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
          tabBarLabel: '내 정보',
          tabBarActiveTintColor: Colors.primary400,
        }}
      />
    </Tab.Navigator>
  );
}

export default Main;
