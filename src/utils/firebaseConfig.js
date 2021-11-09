// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNWIIzdGh8Pu_KeUsLTzQMMqA7RW3jsf4",
  authDomain: "psicofi.firebaseapp.com",
  projectId: "psicofi",
  storageBucket: "psicofi.appspot.com",
  messagingSenderId: "634974951648",
  appId: "1:634974951648:web:6a108f58cb011d6df05885",
  measurementId: "G-C63D99EY54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = app.firestore()
export const auth = app.auth()
export const storage = app.storage()

// const analytics = getAnalytics(app);