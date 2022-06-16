import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import "firebase/compat/firestore";
import "firebase/compat/functions";

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

firebase.initializeApp(clientCredentials);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

// if (window.location.hostname.includes("localhost")) {
    // auth.useEmulator("http://localhost:9099");
    // firestore.useEmulator("localhost", 8080);
    // functions.useEmulator("localhost", 5001);
// }

export default firebase;