import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { activateUserPackage, fundUserPackage } from "../api/userApi";
import { Loader2 } from "lucide-react";

const UserTable = ({
  users,
  loading,
  searchTerm,
  filter,
  entriesPerPage,
  currentPage,
  setCurrentPage,
  onRefresh,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "activate" or "fund"
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  // For FUND modal only
  const [fundAmount, setFundAmount] = useState("");

  // Filter users
  const filteredUsers = useMemo(() => {
    if (!users || !Array.isArray(users)) return [];

    const q = searchTerm.toLowerCase();
    return users.filter((u) => {
      const match =
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone?.toLowerCase().includes(q) ||
        u.prefix?.toLowerCase().includes(q) ||
        u.role?.toLowerCase().includes(q);

      const roleMatch =
        filter === "All" ||
        (u.role && u.role.toLowerCase() === filter.toLowerCase());

      return match && roleMatch;
    });
  }, [users, searchTerm, filter]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleOpenModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
    setFundAmount(""); // reset amount
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
    setModalType("");
    setFundAmount("");
  };

  // Activate Package
  const handleActivate = async () => {
    if (!selectedUser?._id) return;
    try {
      setActionLoading(true);
      await activateUserPackage(selectedUser._id);
      alert("✅ Package activated successfully!");
      handleCloseModal();
      onRefresh();
    } catch (err) {
      alert("Failed to activate package: " + (err.message || "Unknown error"));
    } finally {
      setActionLoading(false);
    }
  };

  // Fund User (amount only)
  const handleFund = async () => {
    if (!selectedUser?._id) return alert("No user selected");
    if (!fundAmount || isNaN(fundAmount) || Number(fundAmount) <= 0) {
      return alert("Please enter a valid amount greater than 0");
    }

    try {
      setActionLoading(true);
      await fundUserPackage(selectedUser._id, { amount: Number(fundAmount) });
      alert(`💰 Successfully funded ${selectedUser.name} with $${fundAmount}`);
      handleCloseModal();
      onRefresh();
    } catch (err) {
      alert("Failed to fund user: " + (err.message || "Unknown error"));
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-neutral-800 rounded-xl shadow-md p-4 mt-6">
      <table className="min-w-full border border-gray-200 text-sm dark:text-white">
        <thead className="bg-gray-50 dark:bg-neutral-900">
          <tr>
            {["S/N", "Name", "Email", "Phone", "Prefix", "Role", "Action"].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-semibold border-b dark:border-neutral-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center py-6">Loading users...</td>
            </tr>
          ) : paginatedUsers.length > 0 ? (
            paginatedUsers.map((u, i) => (
              <tr key={u._id} className="border-b hover:bg-gray-50 dark:hover:bg-neutral-700">
                <td className="px-4 py-3">{(currentPage - 1) * entriesPerPage + i + 1}</td>
                <td className="px-4 py-3">{u.name || "N/A"}</td>
                <td className="px-4 py-3">{u.email || "N/A"}</td>
                <td className="px-4 py-3">{u.phone || "N/A"}</td>
                <td className="px-4 py-3">{u.prefix || "N/A"}</td>
                <td className="px-4 py-3 capitalize">{u.role || "N/A"}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => handleOpenModal(u, "activate")}
                    className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-xs font-medium px-4 py-1.5 rounded-full transition"
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => handleOpenModal(u, "fund")}
                    className="bg-green-600 text-white hover:bg-green-700 text-xs font-medium px-4 py-1.5 rounded-full transition"
                  >
                    Fund
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-6">
                {filter === "All" ? "No users found." : `No ${filter.toLowerCase()}s found.`}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-300">
        <p>Page <strong>{currentPage}</strong> of <strong>{totalPages || 1}</strong></p>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="text-gray-500 disabled:opacity-40"
          >
            Prev
          </button>
          <span className="bg-green-600 text-white px-3 py-1 rounded-full">{currentPage}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="text-gray-500 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openModal && selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-xl w-full max-w-md relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl"
              >
                ✕
              </button>

              {modalType === "activate" ? (
                <>
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Activate Package
                  </h2>
                  <p className="mb-6 text-gray-700 dark:text-gray-300">
                    Are you sure you want to activate a package for{" "}
                    <strong>{selectedUser.name || selectedUser.email}</strong>?
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={handleActivate}
                      disabled={actionLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 transition"
                    >
                      {actionLoading ? <Loader2 size={18} className="animate-spin" /> : "Confirm Activate"}
                    </button>
                    <button
                      onClick={handleCloseModal}
                      className="flex-1 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Fund User Account
                  </h2>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Enter amount to fund for <strong>{selectedUser.name || selectedUser.email}</strong>
                  </p>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Amount (USD)
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      value={fundAmount}
                      onChange={(e) => setFundAmount(e.target.value)}
                      placeholder="e.g. 100.00"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleFund}
                      disabled={actionLoading || !fundAmount || Number(fundAmount) <= 0}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 transition"
                    >
                      {actionLoading ? <Loader2 size={18} className="animate-spin" /> : "Confirm Funding"}
                    </button>
                    <button
                      onClick={handleCloseModal}
                      className="flex-1 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserTable;