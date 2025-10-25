import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

const IncomeCalculator = () => {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [referral, setReferral] = useState("");
  const [income, setIncome] = useState(null);

  const calculate = () => {
    const base = parseFloat(amount) || 0;
    const monthly = base * (parseFloat(rate) / 100 || 0);
    const refBonus = base * (parseFloat(referral) / 100 || 0);
    setIncome(monthly + refBonus);
  };

  return (
    <motion.div
      className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-7 h-7 text-indigo-500" />
          <h1 className="text-2xl font-semibold">Income Calculator</h1>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Investment Amount ($)</label>
            <input
              type="number"
              className="w-full p-3 rounded-xl border dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Monthly ROI (%)</label>
            <input
              type="number"
              className="w-full p-3 rounded-xl border dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Referral Bonus (%)</label>
            <input
              type="number"
              className="w-full p-3 rounded-xl border dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={calculate}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
          >
            Calculate Income
          </motion.button>

          {income !== null && (
            <div className="mt-5 text-center text-lg font-semibold text-green-600 dark:text-green-400">
              Estimated Monthly Income: ${income.toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default IncomeCalculator;
