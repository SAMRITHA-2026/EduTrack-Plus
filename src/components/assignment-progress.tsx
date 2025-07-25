"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { subject: "Math", completed: 6, total: 10 },
  { subject: "AI", completed: 4, total: 8 },
  { subject: "DS", completed: 5, total: 7 },
];

export function AssignmentProgress() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-5 rounded-xl shadow"
    >
      <h2 className="text-lg font-bold mb-3">Assignment Progress</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completed" fill="#6366F1" name="Completed" />
          <Bar dataKey="total" fill="#A5B4FC" name="Total" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
