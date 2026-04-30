import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { DollarSign, Search, Filter, Upload, ChevronDown, ArrowUpRight, ArrowDownLeft, ArrowRightLeft } from "lucide-react";
import TransactionTable from "../../utlis/TransactionTable";
import { getTransactions } from "../../api/transactionApi";
import toast, { Toaster } from 'react-hot-toast';

export default function Transaction() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [stats, setStats] = useState({
    totalDepositAmount: 0,
    totalWithdrawalAmount: 0,
    totalTransferAmount: 0,
  });

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const res = await getTransactions();
        if (res?.totals) {
          setStats({
            totalDepositAmount: res.totals.totalDepositAmount || 0,
            totalWithdrawalAmount: res.totals.totalWithdrawalAmount || 0,
            totalTransferAmount: res.totals.totalTransferAmount || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching totals:", error);
        toast.error("Failed to sync transaction totals");
      }
    };
    fetchTotals();
  }, []);

  const statData = [
    { title: "Total Deposits", amount: stats.totalDepositAmount, color: "text-emerald-500", icon: <ArrowDownLeft className="text-emerald-500" size={20} />, bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { title: "Total Withdrawals", amount: stats.totalWithdrawalAmount, color: "text-rose-500", icon: <ArrowUpRight className="text-rose-500" size={20} />, bg: "bg-rose-50 dark:bg-rose-500/10" },
    { title: "Total Transfers", amount: stats.totalTransferAmount, color: "text-blue-500", icon: <ArrowRightLeft className="text-blue-500" size={20} />, bg: "bg-blue-50 dark:bg-blue-500/10" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const handleExportCSV = (transactions) => {
    if (!transactions || transactions.length === 0) {
      toast.error("No transactions available to export");
      return;
    }
    try {
      const headers = Object.keys(transactions[0]).join(",");
      const rows = transactions
        .map((tx) => Object.values(tx).map((v) => `"${v}"`).join(","))
        .join("\n");
      const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
      const link = document.createElement("a");
      link.href = encodeURI(csvContent);
      link.download = `transactions_${filter.toLowerCase()}_${new Date().toISOString().slice(0,10)}.csv`;
      link.click();
      toast.success("Export started");
    } catch (err) {
      toast.error("Export failed");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 sm:p-8 max-w-[1600px] mx-auto min-h-screen bg-gray-50 dark:bg-[#020617] transition-colors duration-300"
    >
      <Toaster position="top-right" />

      {/* HEADER */}
      <motion.div variants={itemVariants} className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Transactions</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Monitoring platform-wide financial flow</p>
          </div>
        </div>
      </motion.div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {statData.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">{item.title}</span>
              <div className={`p-2 rounded-xl ${item.bg}`}>
                {item.icon}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tighter ${item.color}`}>
                ${Number(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h2>
              <span className="text-xs font-bold text-slate-400">USD</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SEARCH & FILTERS BAR */}
      <motion.div 
        variants={itemVariants}
        className="bg-white dark:bg-slate-900/50 p-3 sm:p-4 rounded-[2rem] border border-slate-200 dark:border-white/5 mb-6 flex flex-col lg:flex-row items-center gap-4 shadow-sm"
      >
        <div className="relative w-full lg:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, recipient, or amount..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full flex items-center justify-between gap-3 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-emerald-500" />
                <span>{filter}</span>
              </div>
              <ChevronDown size={14} className={`transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden"
              >
                {["All", "Deposit", "Withdrawal", "Transfer"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setFilter(option);
                      setShowDropdown(false);
                    }}
                    className={`w-full px-5 py-3 text-left text-sm font-semibold transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                      filter === option ? "text-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10" : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <button
            onClick={() => document.dispatchEvent(new CustomEvent("EXPORT_CSV"))}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
          >
            <Upload size={16} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </motion.div>

      {/* TABLE SECTION */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-xl overflow-hidden">
        <TransactionTable
          searchTerm={searchTerm}
          filter={filter}
          onExport={handleExportCSV}
        />
      </motion.div>
    </motion.div>
  );
}