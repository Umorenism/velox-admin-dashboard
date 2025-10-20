









import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { DollarSign, Search, Filter, Upload } from "lucide-react";

import WithdrawalTable from "../../utlis/WithdrawalTable";

export default function Withdrawal() {
  const data = [
    { title: "Total Withdrawals Amount", amount: "0.00", currency: "USD" },
    { title: "Pending Withdrawals", amount: "7000", currency: "USD" },
    { title: "Paid Withdrawals", amount: "7000", currency: "USD" },
    { title: "Rejected Withdrawals", amount: "560", currency: "USD" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-[400px] px-3 sm:px-5"
    >
      <motion.div
        variants={fadeUp}
        className="w-full max-w-[1500px] mt-5 dark:bg-neutral-900"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <RiMenuFoldLine size={28} className="cursor-pointer" />
          <h1 className="text-[22px] sm:text-[26px] font-[700] text-[#000000] dark:text-white">
            Withdrawals
          </h1>
        </div>

        {/* Cards Section */}
        <div
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {data.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="flex flex-col items-start justify-between h-[180px] w-full 
                         rounded-xl p-4 shadow-md bg-white dark:bg-neutral-900 dark:text-white
                         border border-gray-100 dark:border-neutral-800 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between w-full mb-2">
                <h3 className="text-[14px] sm:text-[15px] font-semibold text-left">
                  {item.title}
                </h3>

                <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-neutral-800 
                                flex justify-center items-center border border-gray-300 dark:border-neutral-700">
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
                <span className="text-[36px] sm:text-[44px] font-bold text-green-600 dark:text-green-400">
                  {item.amount}
                  <span className="text-[14px] ml-1 text-green-600 dark:text-green-400">
                    {item.currency}
                  </span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search & Actions */}
        <div className="flex flex-col sm:flex-row flex-wrap mb-10 mt-6 items-center gap-3 dark:bg-neutral-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800">
          {/* Search */}
          <div className="flex items-center w-full sm:w-1/3 bg-white dark:bg-neutral-800 rounded-lg border border-gray-300 dark:border-neutral-700 px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-500 transition-all">
            <Search size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search users, packages..."
              className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-1.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 px-3 py-2.5 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all w-full sm:w-auto">
              <Filter size={16} />
              Filter
            </button>

            <button className="flex items-center justify-center gap-1.5 bg-[#00A991] hover:bg-green-700 text-white px-3 py-2.5 rounded-lg text-sm shadow-md transition-all w-full sm:w-auto">
              <Upload size={16} />
              Import CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <WithdrawalTable />
        </div>
      </motion.div>
    </motion.div>
  );
}

