
import React from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { DollarSign, Search, Filter, Upload } from "lucide-react";
import LeaderTable from "../../utlis/leaderTable";

export default function LeaderManagement() {
  const data = [
    { title: "Total Deposit", amount: "700", currency: "USD" },
    { title: "Total Free Packages", amount: "200", currency: "USD" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="flex flex-col items-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-screen"
    >
      <div className="w-full max-w-[1500px] px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <RiMenuFoldLine size={28} />
            <h1 className="text-xl sm:text-2xl font-bold">Leader Management</h1>
          </div>
        </div>

        {/* Statistic Cards */}
        <div className="flex flex-col md:flex-row justify-center sm:justify-start gap-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index}
              className="flex flex-col items-start w-full sm:w-[58%] lg:w-[80%] rounded-xl p-4 shadow-md bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800"
            >
              <div className="flex items-center justify-between w-full mb-2">
                <h3 className="text-[15px] font-semibold">{item.title}</h3>
                <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex justify-center items-center border border-gray-300 dark:border-neutral-700">
                  <DollarSign size={16} />
                </div>
              </div>
              <div className="border-t border-neutral-200 dark:border-neutral-800 w-full mt-3 pt-2">
                <span className="text-[28px] sm:text-[32px] font-bold text-green-600 dark:text-green-400">
                  {item.amount}
                  <span className="text-[14px] ml-1">{item.currency}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="flex flex-wrap gap-3 items-center p-4 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl">
          {/* Search Bar */}
          <div className="flex items-center w-full sm:w-1/3 bg-gray-50 dark:bg-neutral-800 rounded-lg border border-gray-300 dark:border-neutral-700 px-3 py-2">
            <Search size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search users, packages..."
              className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-1.5 w-full sm:w-auto bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-neutral-700 transition">
              <Filter size={16} /> Filter
            </button>

            <button className="flex items-center gap-1.5 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm shadow-md transition">
              <Upload size={16} /> Import CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <LeaderTable />
      </div>
    </motion.div>
  );
}
