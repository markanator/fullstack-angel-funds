/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import md5 from 'md5';
import app, { auth } from '../utils/Firebase';

const AuthContext = React.createContext();

// hook
export function useAuth() {
  return useContext(AuthContext);
}

// to be used with gravatar
function md5Email(email) {
  return md5(email);
}

// main provider for auth
export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // sign up logic
  async function signup(email, password, username) {
    // returns a promise
    const newUser = await auth.createUserWithEmailAndPassword(email, password);

    const newEmail = md5Email(email);

    const newUserDoc = app.functions().httpsCallable('newUserDoc');
    newUserDoc({
      email,
      username,
      photoURL: `https://www.gravatar.com/avatar/${newEmail}?s=500`,
      userID: newUser.user.uid,
    });

    // eslint-disable-next-line no-return-await
    return await newUser.user.updateProfile({
      displayName: username,
      photoURL: `https://www.gravatar.com/avatar/${newEmail}?s=500`,
    });
  }
  // sign in function
  function login(email, password) {
    // CALL JWT
    return auth.signInWithEmailAndPassword(email, password);
  }
  // sign out
  function signout() {
    // REMOVE JWT
    return auth.signOut();
  }
  // forgot password
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  // update email
  function updateEmail(email) {
    return auth.currentUser.updateEmail(email);
  }
  // update password
  function updatePassword(password) {
    return auth.currentUser.updatePassword(password);
  }
  // set user func

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
