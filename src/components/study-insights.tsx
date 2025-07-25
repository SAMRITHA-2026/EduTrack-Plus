"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, Target } from "lucide-react";

const tips = [
  {
    icon: <BookOpen className="text-indigo-600" />,
    title: "Daily Revision",
    desc: "Revise notes for 15 minutes every evening.",
  },
  {
    icon: <Target className="text-green-600" />,
    title: "Weekly Goals",
    desc: "Set clear targets for assignments & projects.",
  },
  {
    icon: <Brain className="text-yellow-600" />,
    title: "Practice Tests",
    desc: "Take mock quizzes to test understanding.",
  },
];

export function StudyInsights() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-5 rounded-xl shadow"
    >
      <h2 className="text-lg font-bold mb-3">AI Study Insights</h2>
      <ul className="space-y-3">
        {tips.map((tip, idx) => (
          <li key={idx} className="flex items-start gap-3 border-b pb-2 last:border-0">
            <div>{tip.icon}</div>
            <div>
              <p className="font-semibold">{tip.title}</p>
              <p className="text-sm text-gray-500">{tip.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
