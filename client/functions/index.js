const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const USERS = 'users';
const PROJECTS = 'projects';
const DONOS = 'donations';

exports.authNewUser = functions.auth
  .user()
  .onCreate((user) => console.log('user Created!', user.email, user.uid));

exports.newUserDoc = functions.https.onCall((data, ctx) => {
  const { email, username, photoURL, userID } = data;

  return admin.firestore().collection(USERS).doc(userID).set({
    displayName: username,
    photoURL,
    email,
    role: 'basic',
    access_token: '',
  });
});

exports.authDeleteUser = functions.auth.user().onDelete((user) => {
  // console.log('user DELETED', user.email, user.uid);
  const doc = admin.firestore().collection(USERS).doc(user.uid);
  return doc.delete();
});
