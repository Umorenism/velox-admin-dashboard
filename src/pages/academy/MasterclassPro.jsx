import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Video, BookOpen } from "lucide-react";

export default function MasterclassPro() {
  const modules = [
    { title: "Advanced Technical Analysis", videos: 12 },
    { title: "Smart Money Concepts", videos: 10 },
    { title: "Liquidity Zones & Entry Models", videos: 8 },
    { title: "Trading Psychology Mastery", videos: 5 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white dark:bg-neutral-900 min-h-screen"
    >
      <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
        Masterclass (Pro)
      </h1>
      <p className="text-gray-500 dark:text-gray-300 mb-8">
        Deepen your understanding with professional strategies, smart money concepts,
        and advanced tools.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {modules.map((m, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl bg-gray-50 dark:bg-neutral-800 shadow-sm border dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-3">
              <TrendingUp className="text-[#00A991]" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {m.videos} Videos
              </span>
            </div>
            <h3 className="text-lg font-semibold dark:text-white mb-2">
              {m.title}
            </h3>
            <button className="flex items-center gap-2 text-[#00A991] text-sm font-medium hover:underline">
              <Video size={15} /> View Content
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
