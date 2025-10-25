import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Play, Clock } from "lucide-react";

export default function MasterclassBasic() {
  const lessons = [
    { id: 1, title: "Introduction to Forex", duration: "15 min" },
    { id: 2, title: "Understanding Market Structure", duration: "22 min" },
    { id: 3, title: "Chart Basics and Tools", duration: "18 min" },
    { id: 4, title: "Simple Risk Management", duration: "20 min" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white dark:bg-neutral-900 min-h-screen"
    >
      <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
        Masterclass (Basic)
      </h1>
      <p className="text-gray-500 dark:text-gray-300 mb-6">
        Start your trading journey with the fundamentals. Learn how markets move,
        basic tools, and trading psychology.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <motion.div
            key={lesson.id}
            whileHover={{ scale: 1.03 }}
            className="p-5 border rounded-2xl dark:border-gray-700 shadow-sm bg-gray-50 dark:bg-neutral-800 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <BookOpen className="text-[#00A991]" />
              <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock size={14} className="mr-1" /> {lesson.duration}
              </span>
            </div>
            <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
              {lesson.title}
            </h2>
            <button className="flex items-center gap-2 text-sm text-[#00A991] font-medium hover:underline">
              <Play size={15} /> Watch Lesson
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
