import React, { useState } from "react";
import { motion } from "framer-motion";
import { Megaphone, Search } from "lucide-react";

const mockAnnouncements = [
  {
    id: 1,
    title: "System Upgrade Completed",
    date: "2025-10-20",
    content: "Our trading system has been upgraded for better performance.",
  },
  {
    id: 2,
    title: "New Bonus Program",
    date: "2025-09-18",
    content: "Earn 5% more from referrals this month!",
  },
];

const Announcements = () => {
  const [search, setSearch] = useState("");
  const filtered = mockAnnouncements.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
          Announcements
        </h1>
        <div className="flex items-center bg-white dark:bg-neutral-800 rounded-xl px-4 py-2">
          <Search className="text-neutral-500 mr-2" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-neutral-700 dark:text-neutral-200"
          />
        </div>
      </div>

      <div className="space-y-5">
        {filtered.map((a) => (
          <motion.div
            key={a.id}
            className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Megaphone className="text-indigo-500" /> {a.title}
              </h2>
              <span className="text-sm text-neutral-500">{a.date}</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300">{a.content}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Announcements;
