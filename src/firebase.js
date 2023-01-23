// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
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
export default app;


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID
// }
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
