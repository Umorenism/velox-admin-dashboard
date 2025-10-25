import React from "react";
import { motion } from "framer-motion";
import { Calendar, Video, Users } from "lucide-react";

export default function LiveMentorship() {
  const sessions = [
    { date: "Nov 3, 2025", topic: "Identifying Institutional Moves", mentor: "Alex Gray" },
    { date: "Nov 10, 2025", topic: "Liquidity Grab Strategies", mentor: "Sarah Lim" },
    { date: "Nov 17, 2025", topic: "Advanced Risk Control", mentor: "Dr. Kelechi N." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white dark:bg-neutral-900 min-h-screen"
    >
      <h1 className="text-2xl font-bold mb-2 dark:text-white">
        Live Mentorship
      </h1>
      <p className="text-gray-500 dark:text-gray-300 mb-8">
        Join weekly live mentorship sessions with expert traders and analysts.
      </p>

      <div className="space-y-4">
        {sessions.map((s, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            className="p-5 bg-gray-50 dark:bg-neutral-800 rounded-2xl border dark:border-gray-700 shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {s.topic}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <Calendar size={14} className="inline mr-1" /> {s.date} •{" "}
                <Users size={14} className="inline mr-1" /> {s.mentor}
              </p>
            </div>
            <button className="flex items-center gap-2 text-sm text-[#00A991] font-medium hover:underline">
              <Video size={15} /> Join Live
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
