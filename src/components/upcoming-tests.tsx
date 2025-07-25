"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const tests = [
  { subject: "Math Midterm", date: "March 20, 2025", time: "10:00 AM" },
  { subject: "AI Lab Test", date: "March 28, 2025", time: "2:00 PM" },
  { subject: "DS Quiz", date: "April 5, 2025", time: "11:00 AM" },
];

export function UpcomingTests() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-5 rounded-xl shadow"
    >
      <h2 className="text-lg font-bold mb-3">Upcoming Tests</h2>
      <ul className="space-y-3">
        {tests.map((test, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center border-b pb-2 last:border-0"
          >
            <div>
              <p className="font-semibold">{test.subject}</p>
              <p className="text-xs text-gray-500">
                {test.date} • {test.time}
              </p>
            </div>
            <Calendar className="text-indigo-500 h-5 w-5" />
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
