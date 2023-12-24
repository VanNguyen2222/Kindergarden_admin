// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIHQLTkML7SXRj-ymXUFh3m6B7yi-SgB8",
  authDomain: "project-thht.firebaseapp.com",
  databaseURL: "https://project-thht-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-thht",
  storageBucket: "project-thht.appspot.com",
  messagingSenderId: "426319507617",
  appId: "1:426319507617:web:f81660bc4571948b4940e0",
  measurementId: "G-Z9SPCVQ9KG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getDatabase()
export const auth = getAuth()
export const storage = getStorage(app);
