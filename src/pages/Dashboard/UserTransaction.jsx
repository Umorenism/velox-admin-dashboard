import React, { useEffect, useState, useMemo } from "react";
import { getUserTransactions } from "../../api/transactionApi";

const UserTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const itemsPerPage = 8;

  // FETCH DATA
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const data = await getUserTransactions(
          currentPage,
          itemsPerPage,
          searchTerm,
          statusFilter
        );

        setTransactions(data.transactions || []);
        setTotalPages(data.totalPages || 1);
        setTotalItems(data.totalItems || 0);
      } catch (err) {
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchTransactions, 400);
    return () => clearTimeout(debounce);
  }, [currentPage, searchTerm, statusFilter]);

  // SCROLL TOP
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // FALLBACK FILTER (in case backend doesn't filter)
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const searchMatch =
        tx.userId?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        tx.userId?.email
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const statusMatch = statusFilter
        ? tx.status === statusFilter
        : true;

      return searchMatch && statusMatch;
    });
  }, [transactions, searchTerm, statusFilter]);

  const statusColor = (status) => {
    const map = {
      approved:
        "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400",
      pending:
        "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400",
      rejected:
        "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400",
    };
    return map[status] || "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 p-4 md:p-8 transition-colors">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Transactions
            </h1>
            <p className="text-sm text-slate-500 dark:text-gray-400">
              Showing {filteredTransactions.length} of {totalItems}
            </p>
          </div>

          {/* CONTROLS */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search name or email..."
              value={searchTerm}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchTerm(e.target.value);
              }}
              className="px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 text-sm text-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select
              value={statusFilter}
              onChange={(e) => {
                setCurrentPage(1);
                setStatusFilter(e.target.value);
              }}
              className="px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 text-sm text-slate-700 dark:text-white"
            >
              <option value="">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 animate-pulse">
            Loading transactions...
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : (
          <>
            {/* TABLE */}
            <div className="hidden md:block bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-gray-700 text-xs text-slate-400 dark:text-gray-300 uppercase">
                  <tr>
                    <th className="p-4 text-left">User</th>
                    <th className="p-4 text-left">Type</th>
                    <th className="p-4 text-left">Amount</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTransactions.map((tx) => (
                    <tr key={tx._id} className="border-t border-slate-100 dark:border-gray-700">
                      <td className="p-4">
                        <p className="font-medium text-sm text-slate-800 dark:text-white">
                          {tx.userId?.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {tx.userId?.email}
                        </p>
                      </td>

                      <td className="p-4 text-sm text-slate-600 dark:text-gray-300 capitalize">
                        {tx.type.replaceAll("_", " ")}
                      </td>

                      <td className={`p-4 font-bold ${tx.type.includes("credit") ? "text-emerald-500" : "text-rose-500"}`}>
                        ${tx.amount}
                      </td>

                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs border rounded-lg ${statusColor(tx.status)}`}>
                          {tx.status}
                        </span>
                      </td>

                      <td className="p-4 text-sm text-slate-500 dark:text-gray-400">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE */}
            <div className="md:hidden space-y-3">
              {filteredTransactions.map((tx) => (
                <div key={tx._id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-slate-200 dark:border-gray-700">
                  <div className="flex justify-between">
                    <p className="font-semibold text-slate-800 dark:text-white">
                      {tx.userId?.name}
                    </p>
                    <span className={`text-xs px-2 py-1 border rounded ${statusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    {tx.type.replaceAll("_", " ")}
                  </p>

                  <div className="flex justify-between mt-3">
                    <p className={`font-bold ${tx.type.includes("credit") ? "text-emerald-500" : "text-rose-500"}`}>
                      ${tx.amount}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2 flex-wrap">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded bg-white dark:bg-gray-800 dark:border-gray-700"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "bg-white dark:bg-gray-800 border dark:border-gray-700"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  if (page === currentPage - 2 || page === currentPage + 2)
                    return <span key={page}>...</span>;
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded bg-white dark:bg-gray-800 dark:border-gray-700"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserTransactions;