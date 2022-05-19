const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.createUserDocument = functions.auth.user().onCreate(async (user) => {
  const { email, displayName, uid, photoURL } = user;
  await db.collection("users")
    .doc(user.uid)
    .set({ email, displayName, uid, photoURL });
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send({
      "data": {
          "message": `Hello, World!`
      }
  });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
