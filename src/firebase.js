// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLavoGCQHWwLMYRXdwHQEH2KOCIZ22FyI",
  authDomain: "cityhospital-e0a47.firebaseapp.com",
  projectId: "cityhospital-e0a47",
  storageBucket: "cityhospital-e0a47.appspot.com",
  messagingSenderId: "201025043585",
  appId: "1:201025043585:web:4228943f6890c834ad6180",
  measurementId: "G-Y7BHM5M1Z7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
export const db = getFirestore(app);