/**
 * @파일명 User.js
 * @작성자 이수
 * @작성일 2023-07-23
 * @코드설명
 *   앱에서 사용하는 사용자 정보를 관리하기 위한 context와 provider를 생성합니다.
 *   이 컨텍스트는 앱에서 사용자 정보를 전역적으로 관리하는 데 사용됩니다.
 */

import React, { useState, createContext } from 'react';

const UserContext = createContext({
  user: {},
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUserInfo] = useState({ uid: null });

  // 사용자 정보를 업데이트하는 함수입니다.
  const setUser = (uid) => {
    setUserInfo({ uid });
    console.log(uid);
  };

  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
