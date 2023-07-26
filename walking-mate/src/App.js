/**
 * @파일명 App.js
 * @작성자 이수
 * @작성일 2023-07-23
 */

import React, { useEffect, useState } from 'react';
import { StatusBar, BackHandler, Alert } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './themes/theme';
import Navigation from './navigations';
import { UserProvider, ProgressProvider } from './contexts';

const App = () => {
  const [exitApp, setExitApp] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (exitApp == false) {
        setExitApp(true);
        setTimeout(() => {
          setExitApp(false);
        }, 2000);
        return true;
      } else {
        BackHandler.exitApp();
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [exitApp]);

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <UserProvider>
          <StatusBar
            backgroundColor={theme.background}
            barStyle="dark-content"
          />
          <Navigation />
        </UserProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
