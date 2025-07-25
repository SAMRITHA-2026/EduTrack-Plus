"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import { AssignmentProgress } from "@/components/assignment-progress";
import { PerformanceChart } from "@/components/performance-chart";
import { StudyInsights } from "@/components/study-insights";
import { UpcomingTests } from "@/components/upcoming-tests";

// Type for student dashboard data
interface DashboardData {
  name: string;
  attendance: string;
  assignmentsCompleted: string;
  averageGrade: string;
  studyHours: string;
}

export default function AcademicDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    const studentData = sessionStorage.getItem("studentData");

    if (role === "student" && studentData) {
      // Student is logged in → show their own data
      setData(JSON.parse(studentData));
      setLoading(false);
    } else if (role === "teacher") {
      // Teacher view → Check for student ID in query
      const studentId = searchParams.get("id");

      if (studentId) {
        // Option 1: Fetch student data from API or JSON (mocking here)
        fetch(`/student.json`)
          .then((res) => res.json())
          .then((students) => {
            const student = students.find((s: DashboardData) => s.name === studentId);
            if (student) setData(student);
            else router.push("/not-found");
          })
          .catch(() => router.push("/not-found"))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } else {
      // No login → Redirect
      router.push("/student-login");
    }
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-600">
        Loading student dashboard...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-red-600">
        No student data found.
      </div>
    );
  }

  // Weekly study/assignment mock data
  const weeklyData = [
    { day: "Mon", hours: 2, assignments: 1 },
    { day: "Tue", hours: 3, assignments: 1 },
    { day: "Wed", hours: 4, assignments: 0 },
    { day: "Thu", hours: 2, assignments: 2 },
    { day: "Fri", hours: 3, assignments: 1 },
    { day: "Sat", hours: 0, assignments: 0 },
    { day: "Sun", hours: 0, assignments: 0 },
  ];

  const upcomingAssignments = [
    { title: "Math Assignment", due: "March 25, 2025", status: "Pending" },
    { title: "AI Project Report", due: "March 28, 2025", status: "In Progress" },
    { title: "Data Science Quiz", due: "April 1, 2025", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-100 to-white px-6 py-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-indigo-900">
            Hi, {data.name}! 👋
          </h1>
          <p className="text-sm text-indigo-700">
            Welcome to your Smart Academic Dashboard — Track progress & AI insights 🎓
          </p>
        </div>
        <div className="flex gap-3">
          <button className="border border-indigo-400 bg-white hover:bg-indigo-50 px-4 py-2 rounded-lg shadow">
            Add Event
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow">
            Add Assignment
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card title="Attendance" value={`${data.attendance}%`} color="green" />
        <Card title="Assignments Completed" value={data.assignmentsCompleted} color="blue" />
        <Card title="Average Grade" value={data.averageGrade} color="purple" />
        <Card title="Study Hours" value={`${data.studyHours} hrs`} color="orange" />
      </div>

      {/* NAV TABS */}
      <div className="flex gap-4 border-b border-indigo-200 mb-4">
        {["Overview", "Trends", "Assignments", "Insights", "Lifestyle"].map((tab, idx) => (
          <button
            key={tab}
            className={`pb-2 font-medium ${
              idx === 0
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-indigo-500 hover:text-indigo-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-5 md:col-span-2">
          <h2 className="text-lg font-bold mb-3">Weekly Study Hours</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyData}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="hours" stroke="#6366F1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-bold mb-3">Upcoming Assignments</h2>
          <ul className="space-y-3">
            {upcomingAssignments.map((task, i) => (
              <li key={i} className="flex justify-between items-center border-b last:border-0 pb-2">
                <div>
                  <p className="font-semibold text-indigo-800">{task.title}</p>
                  <p className="text-xs text-gray-500">{task.due}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    task.status === "Pending"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BAR CHART */}
      <div className="mt-6 bg-white rounded-xl shadow p-5">
        <h2 className="text-lg font-bold mb-3">Assignments Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="assignments" fill="#3B82F6" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* EXTRA COMPONENTS */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssignmentProgress />
        <PerformanceChart />
        <StudyInsights />
        <UpcomingTests />
      </div>
    </div>
  );
}

// CARD COMPONENT
function Card({ title, value, color }: { title: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    green: "text-green-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
    >
      <h3 className="text-sm text-gray-600">{title}</h3>
      <p className={`text-2xl font-bold ${colors[color]}`}>{value}</p>
    </motion.div>
  );
}
