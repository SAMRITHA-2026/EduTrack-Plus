// src/lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmRSc4E-XQEr-Qo7swryOd25VYhjbT1Ko",
  authDomain: "edutrack-d6da1.firebaseapp.com",
  projectId: "edutrack-d6da1",
  storageBucket: "edutrack-d6da1.appspot.com", // FIXED
  messagingSenderId: "698751866481",
  appId: "1:698751866481:web:af29cd60fbf368bb452dd0",
  measurementId: "G-ZTL19XK0TE"
};

// Prevent duplicate initialization
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

