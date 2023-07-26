/**
 * @파일명 Auth.js
 * @작성자 이수
 * @작성일 2023-07-23
 */

import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Login,
  SignUpVerify,
  SignUp,
  Home,
  ResetPwVerify,
  ResetPw,
} from '../screens';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const Auth = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: theme.backgroundColor },
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpVerify"
        component={SignUpVerify}
        options={({}) => ({
          headerTitle: '회원가입',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTintColor: theme.text,
          headerLeft: ({ onPress, tintColor }) => (
            <MaterialIcons
              name="keyboard-arrow-left"
              size={38}
              color={tintColor}
              onPress={onPress}
            />
          ),
        })}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={({}) => ({
          headerTitle: '회원가입',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTintColor: theme.text,
          headerLeft: ({ onPress, tintColor }) => (
            <MaterialIcons
              name="keyboard-arrow-left"
              size={38}
              color={tintColor}
              onPress={onPress}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ResetPwVerify"
        component={ResetPwVerify}
        options={({}) => ({
          headerTitle: '비밀번호 재설정',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTintColor: theme.text,
          headerLeft: ({ onPress, tintColor }) => (
            <MaterialIcons
              name="keyboard-arrow-left"
              size={38}
              color={tintColor}
              onPress={onPress}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ResetPw"
        component={ResetPw}
        options={({}) => ({
          headerTitle: '비밀번호 재설정',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTintColor: theme.text,
          headerLeft: ({ onPress, tintColor }) => (
            <MaterialIcons
              name="keyboard-arrow-left"
              size={38}
              color={tintColor}
              onPress={onPress}
            />
          ),
        })}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Auth;
