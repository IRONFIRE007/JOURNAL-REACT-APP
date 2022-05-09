import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider,getAuth } from 'firebase/auth';
 
 
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqYg-4zb8mFD9fYeZ8QhYL_JhqLI2p_Ak",
    authDomain: "react-curso-966e6.firebaseapp.com",
    projectId: "react-curso-966e6",
    storageBucket: "react-curso-966e6.appspot.com",
    messagingSenderId: "1525598176",
    appId: "1:1525598176:web:685f9f1ceed1c897358d85"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
    db,
    googleAuthProvider
}

export const auth = getAuth(app);


