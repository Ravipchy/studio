// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwL2hIqLoeL5Qn-Rre7L2fCgoPDktscSE",
  authDomain: "arogya-sathi-web.firebaseapp.com",
  projectId: "arogya-sathi-web",
  storageBucket: "arogya-sathi-web.appspot.com",
  messagingSenderId: "98089851553",
  appId: "1:98089851553:web:e960614b8b7159539beee0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
