import React from "react";
import { motion } from "framer-motion";
import { Medal, Trophy, ArrowUpCircle } from "lucide-react";

const ranks = [
  { id: 1, name: "Bronze", progress: 100, color: "text-amber-600" },
  { id: 2, name: "Silver", progress: 65, color: "text-gray-400" },
  { id: 3, name: "Gold", progress: 40, color: "text-yellow-400" },
  { id: 4, name: "Diamond", progress: 10, color: "text-blue-400" },
];

const Ranks = () => (
  <motion.div
    className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h1 className="text-3xl font-semibold text-neutral-800 dark:text-neutral-100 mb-10">
      Ranks & Achievements
    </h1>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {ranks.map((rank) => (
        <motion.div
          key={rank.id}
          className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-5 hover:shadow-lg transition"
          whileHover={{ scale: 1.03 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${rank.color}`}>{rank.name}</h2>
            <Trophy className={`w-6 h-6 ${rank.color}`} />
          </div>

          <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-3 rounded-xl overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r from-indigo-500 to-purple-500`}
              style={{ width: `${rank.progress}%` }}
            />
          </div>

          <p className="text-sm text-neutral-500 mt-3">
            {rank.progress}% progress towards next rank
          </p>

          {rank.progress < 100 && (
            <button className="mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition w-full">
              <ArrowUpCircle className="w-4 h-4" />
              Improve Rank
            </button>
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default Ranks;
