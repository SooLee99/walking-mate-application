import React, { useState, createContext, useEffect } from 'react';

const UserContext = createContext({
  user: {},
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUserInfo] = useState({ id: null, jwt: null });

  const setUser = (userId, jwtToken) => {
    console.log('userId: ' + userId);
    console.log('jwtToken: ' + jwtToken);
    setUserInfo({ id: userId, jwt: jwtToken });
  };

  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
