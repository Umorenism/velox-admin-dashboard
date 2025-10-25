import React from "react";
import { motion } from "framer-motion";
import { Target, Code2, Brain } from "lucide-react";

export default function MasterclassAdvance() {
  const topics = [
    { title: "Algorithmic Trading Systems", icon: <Code2 size={18} /> },
    { title: "Institutional Order Flow", icon: <Brain size={18} /> },
    { title: "Advanced Hedging Strategies", icon: <Target size={18} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white dark:bg-neutral-900 min-h-screen"
    >
      <h1 className="text-2xl font-bold mb-2 dark:text-white">
        Masterclass (Advance)
      </h1>
      <p className="text-gray-500 dark:text-gray-300 mb-8">
        For elite traders ready to automate, optimize, and scale their trading edge.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="p-6 bg-gray-50 dark:bg-neutral-800 rounded-2xl border dark:border-gray-700 flex flex-col gap-3 shadow-sm"
          >
            <div className="text-[#00A991]">{topic.icon}</div>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
              {topic.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Explore advanced institutional-grade frameworks and execution models.
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
