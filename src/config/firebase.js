// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa9iq3q_7deZQwflB-3kTuv9x1U0n1KOU",
  authDomain: "finaltodo33.firebaseapp.com",
  projectId: "finaltodo33",
  storageBucket: "finaltodo33.appspot.com",
  messagingSenderId: "537746863715",
  appId: "1:537746863715:web:93420bbd6ff4665ca2ea56",
  measurementId: "G-1W5E8CK06H"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);