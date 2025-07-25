"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError("");

      // Sign in via Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

      if (!userDoc.exists()) {
        setError("User data not found. Contact admin.");
        return;
      }

      const userData = userDoc.data();

      // Role-based routing
      switch (userData.role) {
        case "teacher":
          router.push("/teacher");
          break;
        case "admin":
          router.push("/");
          break;
        case "student":
          router.push("/student-login"); // Will redirect to student dashboard
          break;
        default:
          setError("Role not recognized. Contact admin.");
      }
    } catch (err: any) {
      // Handle Firebase auth errors
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        setError("Invalid email or password.");
      } else {
        setError("Login failed. Try again later.");
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDE FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-50 p-8">
        {/* Branding */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">
            EduTrack<span className="text-pink-500">+</span>
          </h1>
          <p className="text-gray-600 text-sm mt-2">Smart Academic Login Portal</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Admin/Staff Login</h2>
        <p className="mb-4 text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        {/* Inputs */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-3 w-full max-w-sm mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-3 w-full max-w-sm mb-4"
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg w-full max-w-sm"
        >
          Login
        </button>

        <div className="flex justify-between w-full max-w-sm text-sm mt-4">
          <Link href="#" className="text-gray-600 hover:underline">
            Forgot Password?
          </Link>
          <Link href="#" className="text-gray-600 hover:underline">
            Get Activation Link
          </Link>
        </div>

        {/* Student Login Shortcut */}
        <div className="mt-6">
          <p className="text-sm text-gray-600">Are you a student?</p>
          <button
            onClick={() => router.push("/student-login")}
            className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg w-full max-w-sm"
          >
            Student Login
          </button>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE/BRANDING */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-900 text-white items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Welcome to EduTrack+</h2>
          <p className="text-gray-300 text-sm">
            Monitor performance, attendance, and insights with AI-driven analytics.
          </p>
        </div>
      </div>
    </div>
  );
}
