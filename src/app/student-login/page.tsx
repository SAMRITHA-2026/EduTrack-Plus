"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StudentLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // For loading state
  const [studentCredentials, setStudentCredentials] = useState<any[]>([]);
  const [studentData, setStudentData] = useState<any[]>([]);
  const router = useRouter();

  // Fetch JSON data from public folder
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [credRes, dataRes] = await Promise.all([
          fetch("/student-credential.json"),
          fetch("/students.json"),
        ]);

        if (!credRes.ok || !dataRes.ok) {
          throw new Error("Failed to load student data");
        }

        const creds = await credRes.json();
        const data = await dataRes.json();

        setStudentCredentials(creds);
        setStudentData(data);
      } catch (err) {
        console.error("Error loading JSON files:", err);
        setError("Failed to load student data. Contact admin.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStudentLogin = () => {
    if (loading) {
      setError("Student data is still loading. Please wait...");
      return;
    }

    setError("");

    // Validate credentials
    const matchedUser = studentCredentials.find(
      (student) =>
        student.email.toLowerCase() === email.toLowerCase() &&
        student.password === password
    );

    if (!matchedUser) {
      setError("Invalid email or password.");
      return;
    }

    // Match academic data
    const matchedData = studentData.find(
      (data) => data.name.toLowerCase() === matchedUser.name.toLowerCase()
    );

    if (!matchedData) {
      setError("Student data not found. Contact admin.");
      return;
    }

    // Save student data in sessionStorage
    sessionStorage.setItem("studentData", JSON.stringify(matchedData));
    sessionStorage.setItem("role", "student");

    // Redirect to student dashboard
    router.push("/student");
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
          <p className="text-gray-600 text-sm mt-2">Student Login Portal</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Student Login</h2>
        <p className="mb-4 text-sm text-gray-500">
          Use your email and password to access your dashboard.
        </p>

        {/* Show error */}
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

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

        <button
          onClick={handleStudentLogin}
          disabled={loading}
          className={`px-6 py-2 rounded-lg w-full max-w-sm text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>

      {/* RIGHT SIDE IMAGE/BRANDING */}
      <div className="hidden md:flex md:w-1/2 bg-blue-900 text-white items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-gray-300 text-sm">
            View your grades, attendance, and AI-powered insights.
          </p>
        </div>
      </div>
    </div>
  );
}
