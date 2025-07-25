import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import * as path from "path";
import { readFileSync } from "fs";

// Load students.json using absolute path (from project root)
const studentsPath = path.resolve(__dirname, "../students.json");
const students = JSON.parse(readFileSync(studentsPath, "utf-8"));

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBmRSc4E-XQEr-Qo7swryOd25VYhjbT1Ko",
  authDomain: "edutrack-d6da1.firebaseapp.com",
  projectId: "edutrack-d6da1",
  storageBucket: "edutrack-d6da1.firebasestorage.app",
  messagingSenderId: "698751866481",
  appId: "1:698751866481:web:af29cd60fbf368bb452dd0",
  measurementId: "G-ZTL19XK0TE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedStudents() {
  if (!students || students.length === 0) {
    throw new Error("No student data found in JSON file.");
  }

  for (const student of students) {
    await addDoc(collection(db, "students"), student);
    console.log(`Added ${student.name}`);
  }

  console.log("Seeding completed!");
}

seedStudents().catch((err) => {
  console.error("Error seeding data:", err);
});
