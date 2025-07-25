"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";

interface Student {
  id: string;
  name: string;
  attendance: string;
  assignmentsCompleted: string;
  averageGrade: string;
  studyHours: string;
}

export default function TeacherPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const router = useRouter();

  // Clear any old session (Rahul → Samritha issue fix)
  useEffect(() => {
    sessionStorage.removeItem("studentData");
  }, []);

  // Validate if teacher is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch students list
  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, "students"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Student, "id">),
      }));
      setStudents(data);
    };
    fetchStudents();
  }, []);

  // Navigate to student dashboard
  const handleStudentClick = (id: string) => {
    sessionStorage.removeItem("studentData"); // Ensure fresh session
    router.push(`/student?id=${id}`);
  };

  // Logout teacher
  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.clear();
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700 text-center">
          Teacher Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {students.map((student) => (
          <motion.div
            key={student.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleStudentClick(student.id)}
            className="p-6 bg-blue-100 rounded-xl shadow-md cursor-pointer border border-blue-300 hover:bg-blue-200 transition"
          >
            <h2 className="text-lg font-semibold text-blue-900">{student.name}</h2>
            <p className="text-sm text-gray-700">Grade: {student.averageGrade}</p>
            <p className="text-sm text-gray-700">Attendance: {student.attendance}%</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
