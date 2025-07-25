"use client";

import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { week: "Week 1", grade: 75 },
  { week: "Week 2", grade: 80 },
  { week: "Week 3", grade: 78 },
  { week: "Week 4", grade: 85 },
];

export function PerformanceChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-5 rounded-xl shadow"
    >
      <h2 className="text-lg font-bold mb-3">Performance Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="grade" stroke="#10B981" strokeWidth={3} dot />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
