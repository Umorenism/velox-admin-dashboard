
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { creditDailyRebate } from "../../api/transactionApi";

// const RebateManagement = () => {
//   const [formData, setFormData] = useState({
//     totalAmount: "",
//     percentage: 5,
//     rebateType: "daily_gain",
//     description: "Daily Rebate Distribution",
//   });

//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.totalAmount) return;

//     const confirmMsg = `Confirm Distribution\n\nAmount: $${formData.totalAmount}\nPercentage: ${formData.percentage}%`;
//     if (!window.confirm(confirmMsg)) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const payload = {
//         totalAmount: Number(formData.totalAmount), // ✅ FIXED
//         percentage: Number(formData.percentage),
//         rebateType: formData.rebateType,
//         description: formData.description,
//       };

//       const res = await creditDailyRebate(payload);
//       setResult(res);
//       setFormData({ ...formData, totalAmount: "" });
//     } catch (err) {
//       setError(err?.message || "Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
//       <div className="max-w-6xl mx-auto">

//         {/* HEADER */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Rebate Distribution Engine
//           </h1>
//           <p className="text-gray-500 text-sm">
//             Smart weighted rebate distribution system
//           </p>
//         </div>

//         {/* FORM */}
//         <div className="bg-transparent dark:bg-gray-900 p-6 rounded-2xl border mb-6 grid md:grid-cols-4 gap-4">

//           <input
//             placeholder="Total Amount"
//             type="number"
//             value={formData.totalAmount}
//             onChange={(e) =>
//               setFormData({ ...formData, totalAmount: e.target.value })
//             }
//             className="input bg-gray-100 outline-none border dark:bg-gray-800 cursor-pointer"
//           />

//           <input
//             placeholder="Percentage"
//             type="number"
//             value={formData.percentage}
//             onChange={(e) =>
//               setFormData({ ...formData, percentage: e.target.value })
//             }
//             className="input bg-gray-100 dark:bg-gray-800 outline-none border cursor-pointer"
//           />

//           <select
//             value={formData.rebateType}
//             onChange={(e) =>
//               setFormData({ ...formData, rebateType: e.target.value })
//             }
//             className="input bg-gray-100 outline-none border dark:bg-gray-800 cursor-pointer"
//           >
//             <option value="daily_gain">Daily Gain</option>
//             <option value="daily_loss">Daily Loss</option>
//             <option value="weekly_gain">Weekly Gain</option>
//             <option value="weekly_loss">Weekly Loss</option>
//           </select>

//           <button
//             onClick={handleSubmit}
//             className="bg-teal-600 text-white rounded-xl font-bold"
//           >
//             {loading ? "Processing..." : "Distribute"}
//           </button>
//         </div>

//         {error && (
//           <div className="text-red-500 mb-4">{error}</div>
//         )}

//         {/* RESULT */}
//         {result && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="space-y-6"
//           >

//             {/* CALCULATION */}
//             <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">
//               <h3 className="font-bold mb-3 text-teal-600">
//                 Calculation
//               </h3>
//               <p className="text-sm">
//                 {result.calculation.formula}
//               </p>
//               <p className="text-xs text-gray-500 mt-1">
//                 Total Rebate: ${result.calculation.calculatedRebateAmount}
//               </p>
//             </div>

//             {/* SUMMARY */}
//             <div className="grid md:grid-cols-4 gap-4">
//               <Stat title="Total Distributed" value={`$${result.distribution.totalDistributed}`} />
//               <Stat title="Users Credited" value={result.distribution.usersCredited} />
//               <Stat title="Packages" value={result.distribution.packagesCredited} />
//               <Stat title="Ratio" value={`${(result.distribution.rebateRatio * 100).toFixed(2)}%`} />
//             </div>

//             {/* TABLE */}
//             <div className="bg-white dark:bg-gray-900 rounded-2xl border overflow-hidden">
//               <table className="w-full text-sm">
//                 <thead className="bg-gray-100 dark:bg-gray-800">
//                   <tr>
//                     <th className="p-3 text-left">User</th>
//                     <th className="p-3">Package</th>
//                     <th className="p-3">Credit</th>
//                     <th className="p-3">Total Earned</th>
//                     <th className="p-3">Completion</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {result.details.map((d, i) => (
//                     <tr key={i} className="border-t">
//                       <td className="p-3 text-xs">{d.userEmail}</td>
//                       <td className="p-3">${d.packagePrice}</td>
//                       <td className="p-3 text-teal-600 font-bold">
//                         ${d.creditAmount}
//                       </td>
//                       <td className="p-3">${d.totalEarned}</td>
//                       <td className="p-3">
//                         {d.packageCompleted ? "✅" : "❌"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// const Stat = ({ title, value }) => (
//   <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border text-center">
//     <p className="text-xs text-gray-500">{title}</p>
//     <h3 className="font-bold text-lg">{value}</h3>
//   </div>
// );

// export default RebateManagement;




// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { creditDailyRebate } from "../../api/transactionApi";

// const RebateManagement = () => {
//   const [formData, setFormData] = useState({
//     totalAmount: "",
//     percentage: 5,
//     rebateType: "daily_gain",
//     description: "Daily Rebate Distribution",
//   });

//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.totalAmount) return;

//     const confirmMsg = `Confirm Distribution

// Amount: $${formData.totalAmount}
// Percentage: ${formData.percentage}%
// Description: ${formData.description}`;

//     if (!window.confirm(confirmMsg)) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const payload = {
//         totalAmount: Number(formData.totalAmount),
//         percentage: Number(formData.percentage),
//         rebateType: formData.rebateType,
//         description: formData.description,
//       };

//       const res = await creditDailyRebate(payload);
//       setResult(res);
//       setFormData({ ...formData, totalAmount: "" });
//     } catch (err) {
//       setError(err?.message || "Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 md:p-8">
//       <div className="max-w-6xl mx-auto">

//         {/* HEADER */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Rebate Distribution
//           </h1>
//           <p className="text-gray-500 text-sm">
//             Control daily & weekly rebate payouts
//           </p>
//         </div>

//         {/* FORM */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white dark:bg-gray-900 p-6 rounded-2xl border shadow-md grid md:grid-cols-5 gap-4"
//         >

//           {/* Amount */}
//           <div>
//             <label className="label">Total Amount</label>
//             <input
//               type="number"
//               value={formData.totalAmount}
//               onChange={(e) =>
//                 setFormData({ ...formData, totalAmount: e.target.value })
//               }
//               className="input"
//               placeholder="Enter amount"
//             />
//           </div>

//           {/* Percentage */}
//           <div className="relative">
//             <label className="label">Percentage</label>
//             <input
//               type="number"
//               value={formData.percentage}
//               onChange={(e) =>
//                 setFormData({ ...formData, percentage: e.target.value })
//               }
//               className="input pr-8"
//             />
//             <span className="absolute right-3 top-9 text-gray-500 dark:text-gray-400">
//               %
//             </span>
//           </div>

//           {/* Rebate Type */}
//           <div>
//             <label className="label">Rebate Type</label>
//             <select
//               value={formData.rebateType}
//               onChange={(e) =>
//                 setFormData({ ...formData, rebateType: e.target.value })
//               }
//               className="input"
//             >
//               <option value="daily_gain">Daily Gain</option>
//               <option value="daily_loss">Daily Loss</option>
//               <option value="weekly_gain">Weekly Gain</option>
//               <option value="weekly_loss">Weekly Loss</option>
//             </select>
//           </div>

//           {/* ✅ DESCRIPTION (INDEPENDENT DROPDOWN) */}
//           <div>
//             <label className="label">Description</label>
//             <select
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               className="input"
//             >
//               <option value="Daily Rebate Distribution">
//                 Daily Rebate Distribution
//               </option>
//               <option value="Weekly Rebate Distribution">
//                 Weekly Rebate Distribution
//               </option>
//             </select>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="bg-[#00A991] hover:bg-[#01917c] text-white font-bold rounded-xl mt-6 transition"
//           >
//             {loading ? "Processing..." : "Distribute"}
//           </button>
//         </form>

//         {error && <p className="text-red-500 mt-4">{error}</p>}

//         {/* RESULT */}
//         {result && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="space-y-6 mt-8"
//           >

//             <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">
//               <h3 className="font-bold text-[#00A991] mb-2">Calculation</h3>
//               <p className="text-sm">{result.calculation.formula}</p>
//               <p className="text-xs text-gray-500 mt-1">
//                 Total Rebate: ${result.calculation.calculatedRebateAmount}
//               </p>
//             </div>

//             <div className="grid md:grid-cols-4 gap-4">
//               <Stat title="Total Distributed" value={`$${result.distribution.totalDistributed}`} />
//               <Stat title="Users Credited" value={result.distribution.usersCredited} />
//               <Stat title="Packages" value={result.distribution.packagesCredited} />
//               <Stat title="Ratio" value={`${(result.distribution.rebateRatio * 100).toFixed(2)}%`} />
//             </div>

//             <div className="bg-white dark:bg-gray-900 rounded-2xl border overflow-hidden">
//               <table className="w-full text-sm">
//                 <thead className="bg-gray-100 dark:bg-gray-800">
//                   <tr>
//                     <th className="p-3 text-left">User</th>
//                     <th className="p-3">Package</th>
//                     <th className="p-3">Credit</th>
//                     <th className="p-3">Total Earned</th>
//                     <th className="p-3">Completion</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {result.details.map((d, i) => (
//                     <tr key={i} className="border-t">
//                       <td className="p-3 text-xs">{d.userEmail}</td>
//                       <td className="p-3">${d.packagePrice}</td>
//                       <td className="p-3 text-[#00A991] font-bold">
//                         ${d.creditAmount}
//                       </td>
//                       <td className="p-3">${d.totalEarned}</td>
//                       <td className="p-3">
//                         {d.packageCompleted ? "✅" : "❌"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//           </motion.div>
//         )}
//       </div>

//       {/* CLEAN INPUT STYLE */}
//       <style>
//         {`
//           .label {
//             font-size: 11px;
//             font-weight: 600;
//             color: #6b7280;
//             margin-bottom: 4px;
//             display: block;
//           }

//           .input {
//             width: 100%;
//             padding: 10px 12px;
//             border-radius: 10px;
//             border: 1px solid #e5e7eb;
//             background: #f9fafb;
//             color: #111827;
//             font-size: 13px;
//             outline: none;
//             transition: all 0.2s ease;
//           }

//           .dark .input {
//             background: #1f2937;
//             border: 1px solid #374151;
//             color: #f9fafb;
//           }

//           .input:focus {
//             border-color: #00A991;
//             box-shadow: 0 0 0 2px rgba(0,169,145,0.2);
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// const Stat = ({ title, value }) => (
//   <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border text-center">
//     <p className="text-xs text-gray-500">{title}</p>
//     <h3 className="font-bold text-lg">{value}</h3>
//   </div>
// );

// export default RebateManagement;





import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { creditDailyRebate,getAllRebateTransactions } from "../../api/transactionApi";

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

  // ✅ TRANSACTIONS STATE
  const [transactions, setTransactions] = useState([]);
  const [txLoading, setTxLoading] = useState(false);

  // ✅ PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ FETCH TRANSACTIONS
  const fetchTransactions = async () => {
  try {
    setTxLoading(true);

    const res = await getAllRebateTransactions();

    setTransactions(res.transactions || []);
  } catch (err) {
    console.error(err);
  } finally {
    setTxLoading(false);
  }
};

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ✅ PAGINATION LOGIC
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedData = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.totalAmount) return;

    const confirmMsg = `Confirm Distribution

Amount: $${formData.totalAmount}
Percentage: ${formData.percentage}%
Description: ${formData.description}`;

    if (!window.confirm(confirmMsg)) return;

    setLoading(true);
    setError(null);

    try {
      const payload = {
        totalAmount: Number(formData.totalAmount),
        percentage: Number(formData.percentage),
        rebateType: formData.rebateType,
        description: formData.description,
      };

      const res = await creditDailyRebate(payload);
      setResult(res);
      setFormData({ ...formData, totalAmount: "" });

      // ✅ refresh transactions after distribution
      fetchTransactions();
    } catch (err) {
      setError(err?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Rebate Distribution
          </h1>
          <p className="text-gray-500 text-sm">
            Control daily & weekly rebate payouts
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 p-6 rounded-2xl border shadow-md grid md:grid-cols-5 gap-4"
        >

          <div>
            <label className="label">Total Amount</label>
            <input
              type="number"
              value={formData.totalAmount}
              onChange={(e) =>
                setFormData({ ...formData, totalAmount: e.target.value })
              }
              className="input"
              placeholder="Enter amount"
            />
          </div>

          <div className="relative">
            <label className="label">Percentage</label>
            <input
              type="number"
              value={formData.percentage}
              onChange={(e) =>
                setFormData({ ...formData, percentage: e.target.value })
              }
              className="input pr-8"
            />
            <span className="absolute right-3 top-9 text-gray-500">%</span>
          </div>

          <div>
            <label className="label">Rebate Type</label>
            <select
              value={formData.rebateType}
              onChange={(e) =>
                setFormData({ ...formData, rebateType: e.target.value })
              }
              className="input"
            >
              <option value="daily_gain">Daily Gain</option>
              <option value="daily_loss">Daily Loss</option>
              <option value="weekly_gain">Weekly Gain</option>
              <option value="weekly_loss">Weekly Loss</option>
            </select>
          </div>

          <div>
            <label className="label">Description</label>
            <select
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="input"
            >
              <option value="Daily Rebate Distribution">
                Daily Rebate Distribution
              </option>
              <option value="Weekly Rebate Distribution">
                Weekly Rebate Distribution
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-[#00A991] hover:bg-[#01917c] text-white font-bold rounded-xl mt-6 transition"
          >
            {loading ? "Processing..." : "Distribute"}
          </button>
        </form>

        {/* TRANSACTIONS TABLE */}
        <div className="mt-10 bg-white dark:bg-gray-900 rounded-2xl border overflow-hidden">
          <div className="p-4 font-bold text-gray-800 dark:text-white">
            Rebate Transactions
          </div>

          {txLoading ? (
            <p className="p-6 text-center text-gray-500">Loading...</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((tx) => (
                  <tr key={tx.transactionId} className="border-t">
                    <td className="p-3 text-xs">
                      {tx.userName}
                      <div className="text-gray-400 text-[10px]">
                        {tx.userEmail}
                      </div>
                    </td>

                    <td className="p-3 font-bold text-[#00A991]">
                      ${tx.amount}
                    </td>

                    <td className="p-3">{tx.rebateType}</td>

                    <td className="p-3">{tx.description}</td>

                    <td className="p-3 text-xs">
                      {new Date(tx.date).toLocaleString()}
                    </td>

                    <td className="p-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-600">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* PAGINATION */}
          <div className="flex justify-between items-center p-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* INPUT STYLE */}
      <style>
        {`
          .label {
            font-size: 11px;
            font-weight: 600;
            color: #6b7280;
            margin-bottom: 4px;
            display: block;
          }

          .input {
            width: 100%;
            padding: 10px 12px;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
            background: #f9fafb;
            color: #111827;
            font-size: 13px;
            outline: none;
            transition: all 0.2s ease;
          }

          .dark .input {
            background: #1f2937;
            border: 1px solid #374151;
            color: #f9fafb;
          }

          .input:focus {
            border-color: #00A991;
            box-shadow: 0 0 0 2px rgba(0,169,145,0.2);
          }
        `}
      </style>
    </div>
  );
};

export default RebateManagement;