import React from "react";
import { motion } from "framer-motion";
import { PiggyBank, Calendar, Wallet } from "lucide-react";

const RetirementBlock = () => {
  const data = {
    status: "Active",
    balance: 15200,
    nextWithdrawal: "2026-03-15",
    plan: "Gold Plan",
  };

  return (
    <motion.div
      className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-semibold mb-6 text-neutral-800 dark:text-neutral-100">
        Retirement Block
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm">
          <PiggyBank className="text-indigo-500 w-8 h-8 mb-2" />
          <h2 className="text-lg font-semibold">Plan</h2>
          <p className="text-neutral-500">{data.plan}</p>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm">
          <Wallet className="text-green-500 w-8 h-8 mb-2" />
          <h2 className="text-lg font-semibold">Retirement Balance</h2>
          <p className="text-neutral-500">${data.balance.toLocaleString()}</p>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm">
          <Calendar className="text-amber-500 w-8 h-8 mb-2" />
          <h2 className="text-lg font-semibold">Next Withdrawal Date</h2>
          <p className="text-neutral-500">{data.nextWithdrawal}</p>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        className="mt-10 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-md"
      >
        Request Early Withdrawal
      </motion.button>
    </motion.div>
  );
};

export default RetirementBlock;
