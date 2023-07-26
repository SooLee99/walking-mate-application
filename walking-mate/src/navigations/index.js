/**
 * @파일명 index.js
 * @작성자 이수
 * @작성일 2023-07-23
 */

import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import { UserContext, ProgressContext } from '../contexts';
import Main from './Main';
import { Spinner } from '../components';

const Navigation = () => {
  const { user } = useContext(UserContext);
  const { inProgress } = useContext(ProgressContext);

  return (
    <NavigationContainer>
      {user.uid ? <Main /> : <Auth />}
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
