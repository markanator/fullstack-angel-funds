/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../utils/Firebase';

const AuthContext = React.createContext();

// hook
export function useAuth() {
  return useContext(AuthContext);
}

// main provider for auth
export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // signup logic
  function signup(email, password) {
    // returns a promise
    return auth.createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  // these are the exports we ca use with useAuth()
  // ie: const {currentuser, signup} = useAuth()
  const authState = {
    currentUser,
    signup,
  };

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}
