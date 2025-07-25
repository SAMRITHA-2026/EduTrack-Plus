"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !name) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Save user details in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        role,
        attendance: "0",
        assignmentsCompleted: "0",
        averageGrade: "N/A",
        studyHours: "0",
      });

      // Redirect to login page after successful registration
      router.push("/login");
    } catch (err: unknown) {
      setError("Registration failed. Email may already be in use.");
      if (err instanceof Error) {
        console.error("Registration Error:", err.message);
      } else {
        console.error("Registration Error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

        {/* Name Field */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />

        {/* Email Field */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />

        {/* Password Field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />

        {/* Role Selection */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Link to Login */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
