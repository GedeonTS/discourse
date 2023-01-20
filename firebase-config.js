// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuFxw_RKdTuHLIzI4dyaONOHXgp3hKNDE",
  authDomain: "discourse-65912.firebaseapp.com",
  projectId: "discourse-65912",
  storageBucket: "discourse-65912.appspot.com",
  messagingSenderId: "871579182589",
  appId: "1:871579182589:web:25369e6300b8248b1da594",
  measurementId: "G-Q33LRG8L3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
