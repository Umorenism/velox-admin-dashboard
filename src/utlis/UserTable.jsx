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
  const [modalType, setModalType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [fundPackage, setFundPackage] = useState("");

  // Filter users with case-insensitive role comparison
  const filteredUsers = useMemo(() => {
    if (!users || !Array.isArray(users)) return [];

    // Debug: Log unique roles to check backend data
    const uniqueRoles = [...new Set(users.map((u) => u.role).filter(Boolean))];
    console.log("Unique Roles:", uniqueRoles);

    return users.filter((u) => {
      const q = searchTerm.toLowerCase();
      const match =
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone?.toLowerCase().includes(q) ||
        u.prefix?.toLowerCase().includes(q) ||
        u.role?.toLowerCase().includes(q);

      // Case-insensitive role filter
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
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
    setModalType("");
    setFundPackage("");
  };

  // Activate User Package
  const handleActivate = async () => {
    try {
      setActionLoading(true);
      await activateUserPackage(selectedUser._id);
      alert("✅ Package activated successfully!");
      handleCloseModal();
      onRefresh();
    } catch (err) {
      alert("Failed to activate package: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Fund User Package
  const handleFund = async () => {
    if (!fundPackage) return alert("Please select a package type!");
    try {
      setActionLoading(true);
      await fundUserPackage(selectedUser._id, { packageType: fundPackage });
      alert("💰 Package funded successfully!");
      handleCloseModal();
      onRefresh();
    } catch (err) {
      alert("Failed to fund package: " + err.message);
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
        <p>Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></p>
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
        {openModal && (
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
              <button onClick={handleCloseModal} className="absolute top-3 right-4 text-gray-400 hover:text-red-500">✕</button>

              {modalType === "activate" ? (
                <>
                  <h2 className="text-lg font-semibold mb-3">Activate Package</h2>
                  <p>Are you sure you want to activate <strong>{selectedUser?.name}</strong>’s package?</p>
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={handleActivate}
                      disabled={actionLoading}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg w-full flex justify-center"
                    >
                      {actionLoading ? <Loader2 size={18} className="animate-spin" /> : "Activate"}
                    </button>
                    <button onClick={handleCloseModal} className="border border-gray-400 text-gray-600 px-4 py-2 rounded-lg w-full">
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold mb-3">Fund Package</h2>
                  <select
                    value={fundPackage}
                    onChange={(e) => setFundPackage(e.target.value)}
                    className="border w-full p-2 rounded-lg mb-5 dark:bg-neutral-800 dark:text-white"
                  >
                    <option value="">Select Package Type</option>
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                    <option value="Gold">Gold</option>
                  </select>
                  <button
                    onClick={handleFund}
                    disabled={actionLoading}
                    className="bg-green-600 text-white w-full py-2 rounded-lg flex justify-center"
                  >
                    {actionLoading ? <Loader2 size={18} className="animate-spin" /> : "Fund Package"}
                  </button>
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