// import React from "react";

// const transactions = [
//   {
//     id: "TXN-000124",
//     type: "Deposit",
//     username: "John Doe",
//     package: "Gold Plan",
//     amount: "$500",
//     method: "USDT",
//     status: "Completed",
//   },
//   {
//     id: "TXN-000124",
//     type: "Deposit",
//     username: "John Doe",
//     package: "Gold Plan",
//     amount: "$500",
//     method: "USDT",
//     status: "Completed",
//   },
//   {
//     id: "TXN-000124",
//     type: "Deposit",
//     username: "John Doe",
//     package: "Gold Plan",
//     amount: "$500",
//     method: "USDT",
//     status: "Completed",
//   },
//   {
//     id: "TXN-000124",
//     type: "Deposit",
//     username: "John Doe",
//     package: "Gold Plan",
//     amount: "$500",
//     method: "USDT",
//     status: "Completed",
//   },
//   {
//     id: "TXN-000124",
//     type: "Deposit",
//     username: "John Doe",
//     package: "Gold Plan",
//     amount: "$500",
//     method: "USDT",
//     status: "Completed",
//   },
//   {
//     id: "TXN-000124",
//     type: "Deposit",
//     username: "John Doe",
//     package: "Gold Plan",
//     amount: "$500",
//     method: "USDT",
//     status: "Completed",
//   },
//   {
//     id: "TXN-000124",
//     type: "Deposit",
//     username: "John Doe",
//     package: "Gold Plan",
//     amount: "$500",
//     method: "USDT",
//     status: "Completed",
//   },
//   {
//     id: "TXN-000124",
//     type: "Deposit",
//     username: "John Doe",
//     package: "Gold Plan",
//     amount: "$500",
//     method: "USDT",
//     status: "Completed",
//   },
// ];

// const TransactionTable = () => {
//   return (
//     <div className="p-5 bg-white dark:bg-neutral-800 min-h-auto dark:text-white rounded-xl shadow-md">
//       <div className="flex justify-between items-center mb-3">
//         <div className="flex dark:text-white items-center gap-2 text-sm text-gray-700">
//           <span>Showing</span>
//           <select
//             className="border dark:text-white border-gray-300 rounded-md text-sm px-2 py-1"
//             defaultValue="10"
//           >
//             <option>10</option>
//             <option>25</option>
//             <option>50</option>
//           </select>
//           <span>Entries</span>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full mt-5 border border-gray-200 text-sm">
//           <thead className="bg-gray-50 dark:bg-neutral-800  dark:text-white text-gray-700">
//             <tr>
//               {[
//                 "Transaction ID",
//                 "Date",
//                 "Username",
//                 "Package Name",
//                 "Amount",
//                 "Payment Method",
//                 "Action",
//               ].map((heading) => (
//                 <th
//                   key={heading}
//                   className="px-4 py-3 text-left font-medium border-b border-gray-200"
//                 >
//                   <div className="flex items-center gap-1">
//                     {heading}
//                     <span className="text-gray-400 cursor-pointer">⇅</span>
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody className="text-gray-700">
//             {transactions.map((tx, index) => (
//               <tr
//                 key={index}
//                 className="border-b hover:bg-gray-50 transition-colors dark:text-white"
//               >
//                 <td className="px-4 py-3">{tx.id}</td>
//                 <td className="px-4 py-3">{tx.type}</td>
//                 <td className="px-4 py-3">{tx.username}</td>
//                 <td className="px-4 py-3">{tx.package}</td>
//                 <td className="px-4 py-3">{tx.amount}</td>
//                 <td className="px-4 py-3">{tx.method}</td>
//                 <td className="px-4 py-3">
//                   <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full">
//                     {tx.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-white">
//         <div className="mt-5">
//           Page <span className="font-semibold">1</span> of{" "}
//           <span className="font-semibold">1</span>
//         </div>

//         <div className="flex mt-5 items-center gap-3">
//           <button className="text-gray-400 hover:text-gray-700">Previous</button>
//           <button className="bg-orange-500 text-white px-2 py-1 rounded-full">
//             1
//           </button>
//           <button className="text-gray-400 hover:text-gray-700">Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionTable;








// src/utils/TransactionTable.jsx
import React, { useEffect, useState } from "react";
import { getTransactions } from "../api/transactionApi"; // ✅ make sure path matches your setup

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const res = await getTransactions();
        // Adjust this depending on how your backend wraps data
        setTransactions(res.transactions || res);
      } catch (err) {
        console.error("Failed to load transactions:", err);
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center dark:text-white">
        <p>Loading transactions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 dark:text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-5 bg-white dark:bg-neutral-800 min-h-auto dark:text-white rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex dark:text-white items-center gap-2 text-sm text-gray-700">
          <span>Showing</span>
          <select
            className="border dark:text-white border-gray-300 rounded-md text-sm px-2 py-1"
            defaultValue="10"
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>Entries</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full mt-5 border border-gray-200 text-sm">
          <thead className="bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-white">
            <tr>
              {[
                "Transaction ID",
                "Date",
                "User ID",
                "Type",
                "Amount",
                "Status",
                "Action",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left font-medium border-b border-gray-200"
                >
                  <div className="flex items-center gap-1">
                    {heading}
                    <span className="text-gray-400 cursor-pointer">⇅</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-gray-700 dark:text-white">
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((tx, index) => (
                <tr
                  key={tx._id || index}
                  className="border-b hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
                >
                  <td className="px-4 py-3">{tx.orderId || "N/A"}</td>
                  <td className="px-4 py-3">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{tx.userId || "—"}</td>
                  <td className="px-4 py-3 capitalize">{tx.type}</td>
                  <td className="px-4 py-3">${tx.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        tx.status === "completed"
                          ? "bg-green-500 text-white"
                          : tx.status === "pending"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 dark:text-blue-400 hover:underline text-xs">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-white">
        <div className="mt-5">
          Page <span className="font-semibold">1</span> of{" "}
          <span className="font-semibold">1</span>
        </div>

        <div className="flex mt-5 items-center gap-3">
          <button className="text-gray-400 hover:text-gray-700">Previous</button>
          <button className="bg-orange-500 text-white px-2 py-1 rounded-full">
            1
          </button>
          <button className="text-gray-400 hover:text-gray-700">Next</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;

