const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.authNewUser = functions.auth.user().onCreate((user) => {
  console.log('user created', user.email, user.uid);
});
exports.authDeleteUser = functions.auth.user().onDelete((user) => {
  console.log('user DELETED', user.email, user.uid);
});
