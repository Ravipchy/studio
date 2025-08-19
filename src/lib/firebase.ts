
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCaNgCa9ViyRhAOx54YWrDcCrg2MXMiEE",
  authDomain: "arogya-sathi-web.firebaseapp.com",
  projectId: "arogya-sathi-web",
  storageBucket: "arogya-sathi-web.appspot.com",
  messagingSenderId: "98089851553",
  appId: "1:98089851553:web:430edb32ccf018f79beee0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
