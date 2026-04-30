import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { activateUserPackage, fundUserPackage } from "../api/userApi";
import { Loader2, Zap, DollarSign, X, ChevronLeft, ChevronRight } from "lucide-react";

const UserTable = ({ users, loading, searchTerm, filter, entriesPerPage, currentPage, setCurrentPage, onRefresh }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [fundAmount, setFundAmount] = useState("");

  const filteredUsers = useMemo(() => {
    if (!users || !Array.isArray(users)) return [];
    const q = searchTerm.toLowerCase().trim();
    return users.filter((u) => {
      const match = [u.name, u.email, u.phone].some(f => f?.toLowerCase().includes(q));
      const roleMatch = filter === "All" || u.role?.toLowerCase() === filter.toLowerCase();
      return match && roleMatch;
    });
  }, [users, searchTerm, filter]);

  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  const handleOpenModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
    setFundAmount("");
  };

  const handleAction = async (actionFn, successMsg) => {
    try {
      setActionLoading(true);
      await actionFn();
      alert(`✅ ${successMsg}`);
      handleCloseModal();
      onRefresh();
    } catch (err) {
      alert("Error: " + (err.message || "Operation failed"));
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              {["S/N", "User Details", "Contact", "Role", "Actions"].map((h) => (
                <th key={h} className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading ? (
              <tr>
                <td colSpan="5" className="py-20 text-center">
                  <Loader2 className="w-8 h-8 text-green-500 animate-spin mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fetching Accounts...</p>
                </td>
              </tr>
            ) : paginatedUsers.map((u, i) => (
              <tr key={u._id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 text-xs font-bold text-slate-400">
                  {((currentPage - 1) * entriesPerPage + i + 1).toString().padStart(2, '0')}
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{u.name || "Anonymous"}</div>
                  <div className="text-xs text-slate-500 font-medium">{u.email}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                    {u.phone || "No Phone"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                    u.role === 'admin' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(u, "activate")}
                      className="p-2 bg-green-50 dark:bg-green-500/10 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all active:scale-90"
                      title="Activate Package"
                    >
                      <Zap size={16} />
                    </button>
                    <button
                      onClick={() => handleOpenModal(u, "fund")}
                      className="p-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:opacity-80 transition-all active:scale-90"
                      title="Fund Account"
                    >
                      <DollarSign size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-transparent">
        <p className="text-xs font-bold text-slate-400 uppercase">Page {currentPage} of {totalPages || 1}</p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-30"
          >
            <ChevronLeft size={18} className="text-slate-600 dark:text-slate-400" />
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-30"
          >
            <ChevronRight size={18} className="text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>

      {/* Modal Logic */}
      <AnimatePresence>
        {openModal && selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden border border-white/10"
            >
              <button onClick={handleCloseModal} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                <X size={20} className="text-slate-400" />
              </button>

              <div className="mb-6">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${modalType === 'activate' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-900'}`}>
                    {modalType === 'activate' ? <Zap size={28} /> : <DollarSign size={28} />}
                 </div>
                 <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {modalType === "activate" ? "Activate Package" : "Fund User Account"}
                 </h3>
                 <p className="text-sm font-medium text-slate-500 mt-1">Target: {selectedUser.name || selectedUser.email}</p>
              </div>

              {modalType === "fund" && (
                <div className="mb-8">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Deposit Amount (USD)</label>
                  <input
                    type="number"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-xl font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-green-500 transition-all outline-none"
                  />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => modalType === 'activate' 
                    ? handleAction(() => activateUserPackage(selectedUser._id), "Package activated") 
                    : handleAction(() => fundUserPackage(selectedUser._id, { amount: Number(fundAmount) }), `Funded $${fundAmount}`)
                  }
                  disabled={actionLoading || (modalType === "fund" && !fundAmount)}
                  className="flex-1 py-4 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-green-600/20 transition-all active:scale-95"
                >
                  {actionLoading ? <Loader2 className="animate-spin mx-auto" /> : "Confirm Action"}
                </button>
                <button onClick={handleCloseModal} className="px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserTable;