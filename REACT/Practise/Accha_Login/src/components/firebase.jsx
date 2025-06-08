// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Importing the getAuth file --- Line no. 21
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5QHfJxQmwnLd-S7Sr14n5grGO05P-1rU",
  authDomain: "accha-login.firebaseapp.com",
  projectId: "accha-login",
  storageBucket: "accha-login.firebasestorage.app",
  messagingSenderId: "1035915157928",
  appId: "1:1035915157928:web:93ba34fdaf39f430cdbd9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Here it get the property of the new user 
// and we send the auth details to the register.js file and print there
export const auth =getAuth();

// To add the database from the firebase
export const db= getFirestore(app);
export default app;