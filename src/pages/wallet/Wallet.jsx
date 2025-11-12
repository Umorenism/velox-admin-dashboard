
// Wallet.jsx
import React, { useState, useEffect } from "react";
import { apiClient } from "../../api/apiClient";
import { Loader2, CreditCard, X, ArrowUpDown } from "lucide-react";

export default function Wallet() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  // ─── Fetch users ─────────────────────────────────────
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/api/admin/users");
      const fetchedUsers = Array.isArray(res.data) ? res.data : [res.data];

      // Normalize: ensure every user has an `id` field (use _id)
      const normalized = fetchedUsers.map(u => ({
        ...u,
        id: u._id, // <-- critical: make `id` available for UI
      }));

      const sorted = sortUsersAlphabetically(normalized, sortOrder);
      setUsers(sorted);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // ─── Sort ───────────────────────────────────────────
  const sortUsersAlphabetically = (userList, order = "asc") => {
    const sorted = [...userList].sort((a, b) => {
      const nameA = a.name?.toLowerCase() || "";
      const nameB = b.name?.toLowerCase() || "";
      return nameA.localeCompare(nameB);
    });
    return order === "desc" ? sorted.reverse() : sorted;
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    setUsers(sortUsersAlphabetically(users, newOrder));
  };

  // ─── Modal ───────────────────────────────────────────
  const openCreditModal = (user) => {
    setSelectedUser(user);
    setAmount("");
    setModalOpen(true);
  };

  // ─── Submit (only userId + amount) ───────────────────
  const handleCreditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !amount || amount <= 0) return;

    try {
      setSubmitting(true);

      const payload = {
        userId: selectedUser._id, // ← use _id
        amount: parseFloat(amount),
      };

      await apiClient.post("/api/admin/users/credit-deposit", payload);

      alert(`$${amount} credited to ${selectedUser.name || selectedUser.email}`);
      setModalOpen(false);

      // Refresh list to show updated deposit wallet
      await fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to credit user");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Render ──────────────────────────────────────────
  return (
    <div className="p-4 sm:p-6 max-w-[1600px] mx-auto">
      {/* HEADER */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
            Admin Wallet Credit
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm sm:text-base">
            Credit deposit wallet for any user
          </p>
        </div>

        <button
          onClick={toggleSortOrder}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-100 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-600 transition font-medium"
        >
          <ArrowUpDown className="w-4 h-4" />
          Sort {sortOrder === "asc" ? "A to Z" : "Z to A"}
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300 p-4 rounded-lg text-sm">
          {error}
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-600 shadow-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm sm:text-base">
              <thead className="bg-gray-100 dark:bg-neutral-700 border-b border-gray-200 dark:border-neutral-500">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Referrals
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Deposit Wallet
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-500">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 dark:hover:bg-neutral-700 transition"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900 dark:text-gray-100 font-medium">
                        {user.name || "—"}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-700 dark:text-gray-200">
                      {user.email}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs font-mono text-gray-600 dark:text-gray-300">
                      {user._id}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {user.rank || "none"}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-center font-medium text-purple-600 dark:text-purple-400">
                      {user.referrals ?? 0}
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-semibold text-green-600 dark:text-green-400">
                      ${user.wallets?.deposit ?? 0}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <button
                        onClick={() => openCreditModal(user)}
                        className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-orange-700"
                      >
                        Credit User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MINIMAL CREDIT MODAL */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-700 rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Credit User Wallet
            </h2>

            <div className="mb-4 p-3 bg-gray-50 dark:bg-neutral-600 rounded-lg space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-300">Crediting:</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {selectedUser.name || "User"} ({selectedUser.email})
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                ID: <span className="font-mono">{selectedUser._id}</span>
              </p>
            </div>

            <form onSubmit={handleCreditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-500 dark:bg-neutral-600 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="100"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-neutral-500 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !amount || amount <= 0}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Crediting...
                    </>
                  ) : (
                    "Credit Wallet"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}