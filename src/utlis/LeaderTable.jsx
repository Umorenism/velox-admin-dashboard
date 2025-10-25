


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LeaderTable = ({ users }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleOpenModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
    setModalType("");
  };

  // Pagination logic
  const totalPages = Math.ceil(users.length / rowsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-5 bg-white dark:bg-neutral-800 min-h-auto dark:text-white rounded-xl shadow-md relative">
      <div className="flex justify-between items-center mb-3">
        <div className="flex dark:text-white items-center gap-2 text-sm text-gray-700">
          <span>Showing</span>
          <select
            className="border dark:text-white border-gray-300 rounded-md text-sm px-2 py-1"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
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
          <thead className="bg-gray-50 dark:bg-neutral-800 dark:text-white text-gray-700">
            <tr>
              {["S/N", "Username", "Email Address", "Phone Number", "Role", "Rank", "Action"].map((heading) => (
                <th key={heading} className="px-4 py-3 text-left font-medium border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    {heading}
                    <span className="text-gray-400 cursor-pointer">⇅</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-white">
            {paginatedUsers.map((user, index) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <td className="px-4 py-3">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{`${user.prefix} ${user.phone}`}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">{user.rank}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleOpenModal(user, "restrict")}
                      className="bg-[#00A991] text-[#ffff] hover:bg-[#00A991] hover:text-white text-xs font-medium px-4 py-1.5 rounded-full transition duration-200"
                    >
                      Restrict
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-white">
        <div className="mt-5">
          Show <span className="font-semibold">{paginatedUsers.length}</span> of{" "}
          <span className="font-semibold">{users.length}</span>
        </div>
        <div className="flex mt-5 items-center gap-3">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="text-gray-400 hover:text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="text-gray-400 hover:text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-white dark:bg-neutral-900 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>

              {/* Restrict Modal UI */}
              {modalType === "restrict" && (
                <>
                  <h1 className="text-xl font-semibold text-start dark:text-white text-black mb-4">
                    Restrict User {selectedUser?._id}
                  </h1>
                  <p>Are you sure you want to restrict this user?</p>
                  <div className="flex items-center justify-between gap-4 mt-6 w-full">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-medium px-10 py-2 rounded-lg shadow transition duration-300 w-full"
                    >
                      Yes, Restrict
                    </button>
                    <button
                      onClick={handleCloseModal}
                      className="bg-white w-full text-gray-700 border border-gray-300 hover:bg-gray-100 font-medium px-10 py-2 rounded-lg shadow transition duration-300"
                    >
                      No, Cancel
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

export default LeaderTable;