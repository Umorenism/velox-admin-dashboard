
import React, { useState } from "react";
import { motion } from "framer-motion";
import { creditDailyRebate } from "../../api/transactionApi";

const RebateManagement = () => {
  const [formData, setFormData] = useState({
    totalAmount: "",
    percentage: 5,
    rebateType: "daily_gain",
    description: "Daily Rebate Distribution",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.totalAmount) return;

    const confirmMsg = `Confirm Distribution\n\nAmount: $${formData.totalAmount}\nPercentage: ${formData.percentage}%`;
    if (!window.confirm(confirmMsg)) return;

    setLoading(true);
    setError(null);

    try {
      const payload = {
        totalAmount: Number(formData.totalAmount), // ✅ FIXED
        percentage: Number(formData.percentage),
        rebateType: formData.rebateType,
        description: formData.description,
      };

      const res = await creditDailyRebate(payload);
      setResult(res);
      setFormData({ ...formData, totalAmount: "" });
    } catch (err) {
      setError(err?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Rebate Distribution Engine
          </h1>
          <p className="text-gray-500 text-sm">
            Smart weighted rebate distribution system
          </p>
        </div>

        {/* FORM */}
        <div className="bg-transparent dark:bg-gray-900 p-6 rounded-2xl border mb-6 grid md:grid-cols-4 gap-4">

          <input
            placeholder="Total Amount"
            type="number"
            value={formData.totalAmount}
            onChange={(e) =>
              setFormData({ ...formData, totalAmount: e.target.value })
            }
            className="input bg-gray-100 outline-none border dark:bg-gray-800 cursor-pointer"
          />

          <input
            placeholder="Percentage"
            type="number"
            value={formData.percentage}
            onChange={(e) =>
              setFormData({ ...formData, percentage: e.target.value })
            }
            className="input bg-gray-100 dark:bg-gray-800 outline-none border cursor-pointer"
          />

          <select
            value={formData.rebateType}
            onChange={(e) =>
              setFormData({ ...formData, rebateType: e.target.value })
            }
            className="input bg-gray-100 outline-none border dark:bg-gray-800 cursor-pointer"
          >
            <option value="daily_gain">Daily Gain</option>
            <option value="daily_loss">Daily Loss</option>
            <option value="weekly_gain">Weekly Gain</option>
            <option value="weekly_loss">Weekly Loss</option>
          </select>

          <button
            onClick={handleSubmit}
            className="bg-teal-600 text-white rounded-xl font-bold"
          >
            {loading ? "Processing..." : "Distribute"}
          </button>
        </div>

        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}

        {/* RESULT */}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >

            {/* CALCULATION */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">
              <h3 className="font-bold mb-3 text-teal-600">
                Calculation
              </h3>
              <p className="text-sm">
                {result.calculation.formula}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Total Rebate: ${result.calculation.calculatedRebateAmount}
              </p>
            </div>

            {/* SUMMARY */}
            <div className="grid md:grid-cols-4 gap-4">
              <Stat title="Total Distributed" value={`$${result.distribution.totalDistributed}`} />
              <Stat title="Users Credited" value={result.distribution.usersCredited} />
              <Stat title="Packages" value={result.distribution.packagesCredited} />
              <Stat title="Ratio" value={`${(result.distribution.rebateRatio * 100).toFixed(2)}%`} />
            </div>

            {/* TABLE */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3">Package</th>
                    <th className="p-3">Credit</th>
                    <th className="p-3">Total Earned</th>
                    <th className="p-3">Completion</th>
                  </tr>
                </thead>
                <tbody>
                  {result.details.map((d, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3 text-xs">{d.userEmail}</td>
                      <td className="p-3">${d.packagePrice}</td>
                      <td className="p-3 text-teal-600 font-bold">
                        ${d.creditAmount}
                      </td>
                      <td className="p-3">${d.totalEarned}</td>
                      <td className="p-3">
                        {d.packageCompleted ? "✅" : "❌"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border text-center">
    <p className="text-xs text-gray-500">{title}</p>
    <h3 className="font-bold text-lg">{value}</h3>
  </div>
);

export default RebateManagement;