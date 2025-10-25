import React from "react";
import { motion } from "framer-motion";
import { LineChart, TrendingUp } from "lucide-react";

export default function MarketReview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white dark:bg-neutral-900 min-h-screen"
    >
      <h1 className="text-2xl font-bold mb-2 dark:text-white">
        Market Review
      </h1>
      <p className="text-gray-500 dark:text-gray-300 mb-6">
        Get insights on weekly and monthly performance reports, key market trends, and price outlooks.
      </p>

      <div className="border dark:border-gray-700 rounded-2xl p-6 bg-gray-50 dark:bg-neutral-800 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <LineChart className="text-[#00A991]" />
          <h2 className="text-lg font-semibold dark:text-white">
            Weekly Technical Overview
          </h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Current market momentum shows strong bullish tendencies on major pairs.
          The EUR/USD continues consolidating around key support zones.
        </p>
        <button className="bg-[#00A991] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#00907E] transition">
          View Detailed Analysis
        </button>
      </div>
    </motion.div>
  );
}
