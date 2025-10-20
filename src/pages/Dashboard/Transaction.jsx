
import React from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { DollarSign, Search, Filter, Upload } from "lucide-react";
import TransactionTable from "../../utlis/TransactionTable";

export default function Transaction() {
  const data = [
    { title: "Deposit", amount: "0.00", currency: "USD" },
    { title: "Withdrawal", amount: "700", currency: "USD" },
    { title: "Transfers", amount: "560", currency: "USD" },
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-screen px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={fadeUp}
        className="w-full max-w-[1500px] mt-6 dark:bg-neutral-900"
      >
        {/* Header */}
        <div className="space-y-5">
          <RiMenuFoldLine
            size={30}
            className="text-gray-700 dark:text-white"
          />
          <h1 className="text-[20px] sm:text-[24px] font-[700] text-[#000000] dark:text-white">
            Transactions
          </h1>
        </div>

        {/* Stat Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index}
              className="flex flex-col justify-between rounded-xl p-5 shadow-md
                         bg-white dark:bg-neutral-900 dark:text-white
                         border border-gray-100 dark:border-neutral-800
                         hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[15px] font-semibold">{item.title}</h3>
                <div
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-800 
                             flex justify-center items-center border border-gray-300 dark:border-neutral-700"
                >
                  <DollarSign
                    size={16}
                    color={
                      window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? "#ccc"
                        : "#333"
                    }
                  />
                </div>
              </div>

              <div className="border-t border-neutral-200 dark:border-neutral-800 w-full mt-3 pt-2 text-left">
                <span className="text-[36px] sm:text-[50px] font-bold text-green-600 dark:text-green-400">
                  {item.amount}
                  <span className="text-[14px] ml-1 text-green-600 dark:text-green-400">
                    {item.currency}
                  </span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search + Actions */}
        <div className="flex flex-col lg:flex-row mb-10 mt-8 flex-wrap items-center gap-3 dark:bg-neutral-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800">
          {/* 🔍 Search Bar */}
          <div className="flex items-center w-full sm:w-1/2 lg:w-1/3 bg-white dark:bg-neutral-800 rounded-lg border border-gray-300 dark:border-neutral-700 px-3 py-3 focus-within:ring-2 focus-within:ring-green-500 transition-all">
            <Search
              size={16}
              className="text-gray-500 dark:text-gray-400 mr-2"
            />
            <input
              type="text"
              placeholder="Search users, packages..."
              className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* 🔘 Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-1.5 w-full sm:w-auto bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 px-3 py-3 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all">
              <Filter size={16} />
              Filter
            </button>

            <button className="flex items-center justify-center gap-1.5 w-full sm:w-auto bg-[#00A991] text-white px-3 py-3 rounded-lg text-sm shadow-md hover:bg-[#00957F] transition-all">
              <Upload size={16} />
              Import CSV
            </button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto">
          <TransactionTable />
        </div>
      </motion.div>
    </motion.div>
  );
}

