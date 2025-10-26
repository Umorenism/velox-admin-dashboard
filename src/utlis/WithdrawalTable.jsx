





import React, { useState, useMemo } from "react";

const WithdrawalTable = ({ withdrawals, searchTerm, filter }) => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Filter + Search
  const filteredData = useMemo(() => {
    return withdrawals.filter((tx) => {
      const q = searchTerm.toLowerCase();
      const matchSearch =
        tx.userId?.name?.toLowerCase().includes(q) ||
        tx._id?.toLowerCase().includes(q) ||
        tx.amount?.toString().includes(q);

      const matchFilter = filter === "All" || tx.status === filter;
      return matchSearch && matchFilter;
    });
  }, [withdrawals, searchTerm, filter]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="p-5 bg-white dark:bg-neutral-800 dark:text-white rounded-xl shadow-md">
      {/* 🔢 Entries Selector */}
      <div className="flex justify-between items-center mb-3 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <span>Show</span>
          <select
            className="border border-gray-300 rounded-md text-sm px-2 py-1 dark:bg-neutral-800 dark:text-white"
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>
      </div>

      {/* 📊 Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-50 dark:bg-neutral-900 text-gray-700 dark:text-white">
            <tr>
              {["ID", "Name", "Amount", "Date", "Status"].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left font-medium border-b"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-neutral-700"
                >
                  <td className="px-4 py-3">{tx._id}</td>
                  <td className="px-4 py-3">{tx.userId?.name || "—"}</td>
                  <td className="px-4 py-3">
                    ${Number(tx.amount).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 capitalize">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        tx.status === "pending"
                          ? "bg-yellow-500 text-white"
                          : tx.status === "approved" ||
                            tx.status === "confirmed"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No withdrawals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ⏩ Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-white">
        <div>
          Page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "text-gray-400"
                : "text-blue-500 hover:text-blue-700"
            }`}
          >
            Previous
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "text-gray-400"
                : "text-blue-500 hover:text-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalTable;

