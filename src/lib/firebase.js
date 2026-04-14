import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_kMJp0ghxsnS-gkSP5awkl56bNftXbQc",
  authDomain: "hard75-tracker-aditya-pro.firebaseapp.com",
  projectId: "hard75-tracker-aditya-pro",
  storageBucket: "hard75-tracker-aditya-pro.firebasestorage.app",
  messagingSenderId: "176713652938",
  appId: "1:176713652938:web:a9da5f8441c9f279bab233"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
