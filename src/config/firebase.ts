import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 



const firebaseConfig = {
  apiKey: "AIzaSyCYvoJtwvmdzdp2fDXv63xBu_dDZRo5BmY",
  authDomain: "chat-app-d09e9.firebaseapp.com",
  projectId: "chat-app-d09e9",
  storageBucket: "chat-app-d09e9.appspot.com",
  messagingSenderId: "1075834819179",
  appId: "1:1075834819179:web:79056bf0959a23806a972e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const db = getFirestore(app);