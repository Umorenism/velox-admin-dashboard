import React from "react";
import { motion } from "framer-motion";

import { Users, TrendingUp, Activity } from "lucide-react";


const tradersData = [
  {
    id: 1,
    name: "CryptoKing",
    roi: 145,
    followers: 1200,
    risk: "Low",
    avatar: "/avatars/trader1.png",
    description: "Steady BTC & ETH long-term swing strategy.",
  },
  {
    id: 2,
    name: "BullMaster",
    roi: 98,
    followers: 850,
    risk: "Medium",
    avatar: "/avatars/trader2.png",
    description: "Balanced portfolio with medium leverage.",
  },
  {
    id: 3,
    name: "ProfitNinja",
    roi: 212,
    followers: 1500,
    risk: "High",
    avatar: "/avatars/trader3.png",
    description: "High volatility scalp trader for altcoins.",
  },
  {
    id: 4,
    name: "StableJoe",
    roi: 65,
    followers: 640,
    risk: "Low",
    avatar: "/avatars/trader4.png",
    description: "Focuses on safe DeFi yield strategies.",
  },
];


const MediumRisk = () => {
  const mediumRiskTraders = tradersData.filter((t) => t.risk === "Medium");

  return (
    <motion.div
      className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
        <Activity className="text-yellow-500" /> Medium Risk Traders
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediumRiskTraders.map((t) => (
          <motion.div
            key={t.id}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full" />
              <div>
                <h2 className="text-lg font-semibold">{t.name}</h2>
                <p className="text-sm text-yellow-500">{t.risk} Risk</p>
              </div>
            </div>

            <p className="text-sm text-neutral-500 mb-4">{t.description}</p>

            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1 text-yellow-600">
                <TrendingUp size={14} /> ROI: {t.roi}%
              </span>
              <span className="flex items-center gap-1 text-blue-500">
                <Users size={14} /> {t.followers}
              </span>
            </div>

            <button className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 transition">
              Copy This Trader
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MediumRisk;
