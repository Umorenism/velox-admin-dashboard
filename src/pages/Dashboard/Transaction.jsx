
// import React, { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { RiMenuFoldLine } from "react-icons/ri";
// import { DollarSign, Search, Filter, Upload, ChevronDown } from "lucide-react";
// import TransactionTable from "../../utlis/TransactionTable";

// export default function Transaction() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   const data = [
//     { title: "Deposit", amount: "0.00", currency: "USD" },
//     { title: "Withdrawal", amount: "700", currency: "USD" },
//     { title: "Transfers", amount: "560", currency: "USD" },
//   ];

//   // Animation variants
//   const fadeUp = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };

//   // ✅ Export Filtered Transactions as CSV
//   const handleExportCSV = (transactions) => {
//     if (!transactions || transactions.length === 0) {
//       alert("No transactions to export.");
//       return;
//     }

//     const headers = Object.keys(transactions[0]).join(",");
//     const rows = transactions
//       .map((tx) => Object.values(tx).map((v) => `"${v}"`).join(","))
//       .join("\n");
//     const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;

//     const link = document.createElement("a");
//     link.href = encodeURI(csvContent);
//     link.download = "transactions_export.csv";
//     link.click();
//   };

//   // Dropdown toggle
//   const toggleDropdown = () => setShowDropdown((prev) => !prev);

//   // Close dropdown when clicked outside
//   React.useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <motion.div
//       initial="hidden"
//       animate="show"
//       className="flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-screen px-4 sm:px-6 lg:px-8"
//     >
//       <motion.div
//         variants={fadeUp}
//         className="w-full max-w-[1500px] mt-6 dark:bg-neutral-900"
//       >
//         {/* Header */}
//         <div className="space-y-5">
//           <RiMenuFoldLine size={30} className="text-gray-700 dark:text-white" />
//           <h1 className="text-[20px] sm:text-[24px] font-[700] text-[#000000] dark:text-white">
//             Transactions
//           </h1>
//         </div>

//         {/* Stat Cards */}
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {data.map((item, index) => (
//             <motion.div
//               key={index}
//               variants={fadeUp}
//               custom={index}
//               className="flex flex-col justify-between rounded-xl p-5 shadow-md
//                          bg-white dark:bg-neutral-900 dark:text-white
//                          border border-gray-100 dark:border-neutral-800
//                          hover:shadow-lg transition-all duration-300"
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="text-[15px] font-semibold">{item.title}</h3>
//                 <div
//                   className="w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-800 
//                              flex justify-center items-center border border-gray-300 dark:border-neutral-700"
//                 >
//                   <DollarSign
//                     size={16}
//                     color={
//                       window.matchMedia("(prefers-color-scheme: dark)").matches
//                         ? "#ccc"
//                         : "#333"
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="border-t border-neutral-200 dark:border-neutral-800 w-full mt-3 pt-2 text-left">
//                 <span className="text-[36px] sm:text-[50px] font-bold text-green-600 dark:text-green-400">
//                   {item.amount}
//                   <span className="text-[14px] ml-1 text-green-600 dark:text-green-400">
//                     {item.currency}
//                   </span>
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Search + Actions */}
//         <div className="flex flex-col lg:flex-row mb-10 mt-8 flex-wrap items-center gap-3 dark:bg-neutral-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800">
//           {/* 🔍 Search Bar */}
//           <div className="flex items-center w-full sm:w-1/2 lg:w-1/3 bg-white dark:bg-neutral-800 rounded-lg border border-gray-300 dark:border-neutral-700 px-3 py-3 focus-within:ring-2 focus-within:ring-green-500 transition-all">
//             <Search size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Search by ID, name, or amount..."
//               className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* 🔘 Action Buttons */}
//           <div className="flex items-center gap-2 w-full sm:w-auto relative" ref={dropdownRef}>
//             {/* Filter Dropdown */}
//             <button
//               onClick={toggleDropdown}
//               className="flex items-center justify-center gap-1.5 w-full sm:w-auto bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 px-3 py-3 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all"
//             >
//               <Filter size={16} />
//               Filter
//               <ChevronDown size={14} className="ml-1" />
//             </button>

//             {showDropdown && (
//               <div className="absolute top-12 left-0 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-md z-50 w-40">
//                 {["All", "Deposit", "Withdrawal", "Transfer"].map((option) => (
//                   <div
//                     key={option}
//                     onClick={() => {
//                       setFilter(option);
//                       setShowDropdown(false);
//                     }}
//                     className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 ${
//                       filter === option ? "text-green-600 font-semibold" : ""
//                     }`}
//                   >
//                     {option}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Export CSV */}
//             <button
//               onClick={() => document.dispatchEvent(new CustomEvent("EXPORT_CSV"))}
//               className="flex items-center justify-center gap-1.5 w-full sm:w-auto bg-[#00A991] text-white px-3 py-3 rounded-lg text-sm shadow-md hover:bg-[#00957F] transition-all"
//             >
//               <Upload size={16} />
//               Export CSV
//             </button>
//           </div>
//         </div>

//         {/* Transaction Table */}
//         <div className="overflow-x-auto">
//           <TransactionTable
//             searchTerm={searchTerm}
//             filter={filter}
//             onExport={handleExportCSV}
//           />
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }




import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { DollarSign, Search, Filter, Upload, ChevronDown } from "lucide-react";
import TransactionTable from "../../utlis/TransactionTable";
import { getTransactions } from "../../api/transactionApi"; // ✅ import your API

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

  // ✅ Fetch Totals
  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const res = await getTransactions();
        console.log("Fetched Transactions:", res);

        if (res?.totals) {
          setStats({
            totalDepositAmount: res.totals.totalDepositAmount || 0,
            totalWithdrawalAmount: res.totals.totalWithdrawalAmount || 0,
            totalTransferAmount: res.totals.totalTransferAmount || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching totals:", error);
      }
    };

    fetchTotals();
  }, []);

  // ✅ Dynamic stats data
  const data = [
    { title: "Deposit", amount: stats.totalDepositAmount.toFixed(2), currency: "USD" },
    { title: "Withdrawal", amount: stats.totalWithdrawalAmount.toFixed(2), currency: "USD" },
    { title: "Transfers", amount: stats.totalTransferAmount.toFixed(2), currency: "USD" },
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // ✅ Export Filtered Transactions as CSV
  const handleExportCSV = (transactions) => {
    if (!transactions || transactions.length === 0) {
      alert("No transactions to export.");
      return;
    }

    const headers = Object.keys(transactions[0]).join(",");
    const rows = transactions
      .map((tx) => Object.values(tx).map((v) => `"${v}"`).join(","))
      .join("\n");
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "transactions_export.csv";
    link.click();
  };

  // Dropdown toggle
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Close dropdown when clicked outside
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
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-screen px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={fadeUp}
        className="w-full max-w-[1500px]  dark:bg-neutral-900"
      >
        {/* Header */}
        <div className="space-y-5">
          <RiMenuFoldLine size={30} className="text-gray-700 dark:text-white" />
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
            <Search size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by ID, name, or amount..."
              className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 🔘 Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto relative" ref={dropdownRef}>
            {/* Filter Dropdown */}
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center gap-1.5 w-full sm:w-auto bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 px-3 py-3 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all"
            >
              <Filter size={16} />
              Filter
              <ChevronDown size={14} className="ml-1" />
            </button>

            {showDropdown && (
              <div className="absolute top-12 left-0 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-md z-50 w-40">
                {["All", "Deposit", "Withdrawal", "Transfer"].map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setFilter(option);
                      setShowDropdown(false);
                    }}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 ${
                      filter === option ? "text-green-600 font-semibold" : ""
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}

            {/* Export CSV */}
            <button
              onClick={() => document.dispatchEvent(new CustomEvent("EXPORT_CSV"))}
              className="flex items-center justify-center gap-1.5 w-full sm:w-auto bg-[#00A991] text-white px-3 py-3 rounded-lg text-sm shadow-md hover:bg-[#00957F] transition-all"
            >
              <Upload size={16} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto">
          <TransactionTable
            searchTerm={searchTerm}
            filter={filter}
            onExport={handleExportCSV}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
