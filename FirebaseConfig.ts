// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGdXw-qTS1tO1MyXE7fGTejyEmqev633k",
  authDomain: "manual-f1c5e.firebaseapp.com",
  projectId: "manual-f1c5e",
  storageBucket: "manual-f1c5e.firebasestorage.app",
  messagingSenderId: "639864772030",
  appId: "1:639864772030:web:df67ac2c6a96039dbd15ef",
  measurementId: "G-KD51D3W09W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  } else {
    console.warn("Firebase Analytics is not supported in this environment.");
  }
});

export { app, analytics, auth }