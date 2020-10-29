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
  const [loading, setLoading] = useState(true);

  // sign up logic
  function signup(email, password) {
    // returns a promise
    return auth.createUserWithEmailAndPassword(email, password);
  }
  // sign in function
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  // sign out
  function signout() {
    return auth.signOut();
  }
  // forgot password
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  // upadet email
  function updateEmail(email) {
    return auth.currentUser.updateEmail(email);
  }
  // update password
  function updatePassword(password) {
    return auth.currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // set user before we set loading
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // these are the exports we ca use with useAuth()
  // ie: const {currentuser, signup} = useAuth()
  const authState = {
    currentUser,
    signup,
    login,
    signout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={authState}>
      {/* only render if we're done loading */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
