import React, { useState, createContext } from 'react';

const initialState = {
  isOnline: false,
  userInfo: {
    id: 0,
    username: 'andreas',
    email: 'andreas@example.com',
    password: process.env.REACT_APP_LOGIN_PASS_EXAMPLE,
    avatar: 'https://uifaces.co/our-content/donated/gPZwCbdS.jpg',
  },
};

export const UserContext = createContext();

// component to wrap

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState(initialState);
  return (
    <UserContext.Provider value={[userState, setUserState]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
