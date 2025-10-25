import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const CompoundCalculator = () => {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");
  const [total, setTotal] = useState(null);

  const calculateCompound = () => {
    const principal = parseFloat(amount);
    const monthlyRate = (parseFloat(rate) / 100) || 0;
    const n = parseFloat(months) || 0;
    const compound = principal * Math.pow(1 + monthlyRate, n);
    setTotal(compound);
  };

  return (
    <motion.div
      className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-green-500" />
          <h1 className="text-2xl font-semibold">Compound Calculator</h1>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Initial Amount ($)</label>
            <input
              type="number"
              className="w-full p-3 rounded-xl border dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Monthly Growth Rate (%)</label>
            <input
              type="number"
              className="w-full p-3 rounded-xl border dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Number of Months</label>
            <input
              type="number"
              className="w-full p-3 rounded-xl border dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={calculateCompound}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
          >
            Calculate
          </motion.button>

          {total !== null && (
            <div className="mt-5 text-center text-lg font-semibold text-green-600 dark:text-green-400">
              Future Value after {months} months: ${total.toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CompoundCalculator;
