import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Filter } from "lucide-react";

const Reports = () => {
  const [type, setType] = useState("All");

  const reports = [
    { id: 1, title: "Monthly Earnings", date: "2025-09", type: "Earnings" },
    { id: 2, title: "Withdrawal Summary", date: "2025-08", type: "Finance" },
  ];

  const filtered = type === "All" ? reports : reports.filter(r => r.type === type);

  return (
    <motion.div
      className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Reports</h1>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 rounded-xl px-4 py-2 border border-neutral-200 dark:border-neutral-700"
        >
          <option>All</option>
          <option>Earnings</option>
          <option>Finance</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((r) => (
          <motion.div
            key={r.id}
            className="bg-white dark:bg-neutral-800 p-5 rounded-2xl shadow-sm"
            whileHover={{ scale: 1.03 }}
          >
            <FileText className="text-indigo-500 w-8 h-8 mb-3" />
            <h2 className="text-lg font-semibold">{r.title}</h2>
            <p className="text-sm text-neutral-500">{r.date}</p>
            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition">
              Download
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Reports;
