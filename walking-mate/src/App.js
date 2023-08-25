/**
 * @파일명 App.js
 * @작성자 이수
 * @작성일 2023-07-23
 */
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, Platform, PermissionsAndroid } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './themes/theme';
import Navigation from './navigations';
import { UserProvider, ProgressProvider } from './contexts';

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 권한 요청',
          message: '이 앱은 귀하의 위치에 접근할 권한이 필요합니다.',
          buttonNeutral: '나중에 묻기',
          buttonNegative: '취소',
          buttonPositive: '확인',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('위치 접근이 허용되었습니다.');
      } else {
        console.log('위치 권한이 거부되었습니다.');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <ProgressProvider>
          <UserProvider>
            <StatusBar
              backgroundColor={theme.background}
              barStyle="dark-content"
            />
            <Navigation />
          </UserProvider>
        </ProgressProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
