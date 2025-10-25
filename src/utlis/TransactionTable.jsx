






// import React, { useState, useEffect, useMemo } from "react";
// import { apiClient } from "../api/apiClient";

// const TransactionTable = ({ searchTerm, filter, onExport }) => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const res = await apiClient.get("/api/admin/transactions");
//         const transformedData = res.data.map((tx) => ({
//           id: tx.orderId || tx._id,
//           type: tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
//           username: tx.username || "N/A",
//           package: tx.packageName || "N/A",
//           amount: Number(tx.amount).toFixed(2),
//           method: tx.paymentId ? "USDT" : "Unknown",
//           status: tx.status.charAt(0).toUpperCase() + tx.status.slice(1),
//           date: new Date(tx.createdAt).toLocaleDateString("en-US", {
//             month: "short",
//             day: "numeric",
//             year: "numeric",
//           }),
//         }));
//         setTransactions(transformedData);
//       } catch (err) {
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTransactions();
//   }, []);

//   const shortenId = (id) =>
//     id.length > 10 ? `${id.slice(0, 6)}...${id.slice(-4)}` : id;

//   // Filter + Search
//   const filteredData = useMemo(() => {
//     let data = [...transactions];
//     if (filter && filter !== "All") {
//       data = data.filter((tx) => tx.type.toLowerCase() === filter.toLowerCase());
//     }
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       data = data.filter(
//         (tx) =>
//           tx.id.toLowerCase().includes(term) ||
//           tx.username.toLowerCase().includes(term) ||
//           tx.amount.toString().includes(term)
//       );
//     }
//     return data;
//   }, [transactions, filter, searchTerm]);

//   // Pagination
//   const totalPages = Math.ceil(filteredData.length / entriesPerPage);
//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * entriesPerPage,
//     currentPage * entriesPerPage
//   );

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
//   };

//   // ✅ Listen for CSV export
//   useEffect(() => {
//     const handleExport = () => onExport(filteredData);
//     document.addEventListener("EXPORT_CSV", handleExport);
//     return () => document.removeEventListener("EXPORT_CSV", handleExport);
//   }, [filteredData, onExport]);

//   if (loading)
//     return (
//       <div className="p-5 bg-white dark:bg-neutral-800 text-center rounded-xl">
//         Loading...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="p-5 bg-white dark:bg-neutral-800 text-center rounded-xl text-red-500">
//         {error}
//       </div>
//     );

//   return (
//     <div className="p-5 bg-white dark:bg-neutral-800 min-h-auto dark:text-white rounded-xl shadow-md">
//       {/* Show Entries */}
//       <div className="flex justify-between items-center mb-3">
//         <div className="flex dark:text-white items-center gap-2 text-sm text-gray-700">
//           <span>Showing</span>
//           <select
//             className="border dark:text-white border-gray-300 rounded-md text-sm px-2 py-1"
//             value={entriesPerPage}
//             onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//           >
//             <option>10</option>
//             <option>25</option>
//             <option>50</option>
//           </select>
//           <span>Entries</span>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full mt-5 border border-gray-200 text-sm">
//           <thead className="bg-gray-50 dark:bg-neutral-800 dark:text-white text-gray-700">
//             <tr>
//               {[
//                 "Transaction ID",
//                 "Date",
//                 "Username",
//                 "Package Name",
//                 "Amount ($)",
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
//             {paginatedData.length === 0 ? (
//               <tr>
//                 <td colSpan="7" className="text-center py-4 text-gray-500">
//                   No matching transactions
//                 </td>
//               </tr>
//             ) : (
//               paginatedData.map((tx, index) => (
//                 <tr
//                   key={index}
//                   className="border-b hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
//                 >
//                   <td className="px-4 py-3">{shortenId(tx.id)}</td>
//                   <td className="px-4 py-3">{tx.date}</td>
//                   <td className="px-4 py-3">{tx.username}</td>
//                   <td className="px-4 py-3">{tx.package}</td>
//                   <td className="px-4 py-3">${tx.amount}</td>
//                   <td className="px-4 py-3">{tx.method}</td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`text-white text-xs px-3 py-1 rounded-full ${
//                         tx.status === "Pending"
//                           ? "bg-yellow-500"
//                           : tx.status === "Expired"
//                           ? "bg-red-500"
//                           : "bg-emerald-500"
//                       }`}
//                     >
//                       {tx.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-white">
//         <div>
//           Page <span className="font-semibold">{currentPage}</span> of{" "}
//           <span className="font-semibold">{totalPages}</span>
//         </div>

//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
//           >
//             Previous
//           </button>

//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => handlePageChange(i + 1)}
//               className={`px-2 py-1 rounded-full ${
//                 currentPage === i + 1
//                   ? "bg-orange-500 text-white"
//                   : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionTable;






import React, { useState, useEffect, useMemo } from "react";
import { apiClient } from "../api/apiClient";

const TransactionTable = ({ searchTerm, filter, onExport }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await apiClient.get("/api/admin/transactions");

        // ✅ Adjust to actual response structure
        const txList = Array.isArray(res.data)
          ? res.data
          : res.data.transactions || [];

        const transformedData = txList.map((tx) => ({
          id: tx.orderId || tx._id,
          type: tx.type
            ? tx.type.charAt(0).toUpperCase() + tx.type.slice(1)
            : "Unknown",
          username: tx.username || tx.userId?.name || "N/A",
          package: tx.packageName || "N/A",
          amount: Number(tx.amount || 0).toFixed(2),
          method: tx.paymentId ? "USDT" : tx.method || "Unknown",
          status: tx.status
            ? tx.status.charAt(0).toUpperCase() + tx.status.slice(1)
            : "Pending",
          date: new Date(tx.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        }));

        setTransactions(transformedData);
      } catch (err) {
        console.error("❌ Fetch Transactions Error:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const shortenId = (id) =>
    id?.length > 10 ? `${id.slice(0, 6)}...${id.slice(-4)}` : id;

  // ✅ Filter + Search Logic
  const filteredData = useMemo(() => {
    let data = [...transactions];
    if (filter && filter !== "All") {
      data = data.filter(
        (tx) => tx.type.toLowerCase() === filter.toLowerCase()
      );
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter(
        (tx) =>
          tx.id?.toLowerCase().includes(term) ||
          tx.username?.toLowerCase().includes(term) ||
          tx.amount?.toString().includes(term)
      );
    }
    return data;
  }, [transactions, filter, searchTerm]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  // ✅ Export Handler
  useEffect(() => {
    const handleExport = () => onExport(filteredData);
    document.addEventListener("EXPORT_CSV", handleExport);
    return () => document.removeEventListener("EXPORT_CSV", handleExport);
  }, [filteredData, onExport]);

  if (loading)
    return (
      <div className="p-5 bg-white dark:bg-neutral-800 text-center rounded-xl">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="p-5 bg-white dark:bg-neutral-800 text-center rounded-xl text-red-500">
        {error}
      </div>
    );

  return (
    <div className="p-5 bg-white dark:bg-neutral-800 dark:text-white rounded-xl shadow-md">
      {/* Entries Selector */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 text-sm">
          <span>Showing</span>
          <select
            className="border dark:bg-neutral-800 border-gray-300 rounded-md text-sm px-2 py-1"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
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
                "Username",
                "Package Name",
                "Amount ($)",
                "Payment Method",
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

          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No matching transactions
                </td>
              </tr>
            ) : (
              paginatedData.map((tx, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
                >
                  <td className="px-4 py-3">{shortenId(tx.id)}</td>
                  <td className="px-4 py-3">{tx.date}</td>
                  <td className="px-4 py-3">{tx.username}</td>
                  <td className="px-4 py-3">{tx.package}</td>
                  <td className="px-4 py-3">${tx.amount}</td>
                  <td className="px-4 py-3">{tx.method}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-white text-xs px-3 py-1 rounded-full ${
                        tx.status === "Pending"
                          ? "bg-yellow-500"
                          : tx.status === "Expired"
                          ? "bg-red-500"
                          : "bg-emerald-500"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-white">
        <div>
          Page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-2 py-1 rounded-full ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white"
                  : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
