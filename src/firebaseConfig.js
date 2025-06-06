import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmRRc6sjWD4WPGewXxKdUfaug0sh496UQ",
  authDomain: "ecommerce-freya.firebaseapp.com",
  projectId: "ecommerce-freya",
  storageBucket: "ecommerce-freya.firebasestorage.app",
  messagingSenderId: "686739826574",
  appId: "1:686739826574:web:42c4dbd6646a2799d326df",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };
