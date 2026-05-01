// // import React, { useState, useMemo } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { activateUserPackage, fundUserPackage } from "../api/userApi";
// // import { Loader2, Zap, DollarSign, X, ChevronLeft, ChevronRight } from "lucide-react";

// // const UserTable = ({ users, loading, searchTerm, filter, entriesPerPage, currentPage, setCurrentPage, onRefresh }) => {
// //   const [openModal, setOpenModal] = useState(false);
// //   const [modalType, setModalType] = useState(""); 
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [fundAmount, setFundAmount] = useState("");

// //   const filteredUsers = useMemo(() => {
// //     if (!users || !Array.isArray(users)) return [];
// //     const q = searchTerm.toLowerCase().trim();
// //     return users.filter((u) => {
// //       const match = [u.name, u.email, u.phone].some(f => f?.toLowerCase().includes(q));
// //       const roleMatch = filter === "All" || u.role?.toLowerCase() === filter.toLowerCase();
// //       return match && roleMatch;
// //     });
// //   }, [users, searchTerm, filter]);

// //   const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
// //   const paginatedUsers = filteredUsers.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

// //   const handleOpenModal = (user, type) => {
// //     setSelectedUser(user);
// //     setModalType(type);
// //     setOpenModal(true);
// //   };

// //   const handleCloseModal = () => {
// //     setOpenModal(false);
// //     setSelectedUser(null);
// //     setFundAmount("");
// //   };

// //   const handleAction = async (actionFn, successMsg) => {
// //     try {
// //       setActionLoading(true);
// //       await actionFn();
// //       alert(`✅ ${successMsg}`);
// //       handleCloseModal();
// //       onRefresh();
// //     } catch (err) {
// //       alert("Error: " + (err.message || "Operation failed"));
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-xl overflow-hidden">
// //       <div className="overflow-x-auto">
// //         <table className="w-full text-left border-collapse">
// //           <thead>
// //             <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
// //               {["S/N", "User Details", "Contact", "Role", "Actions"].map((h) => (
// //                 <th key={h} className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
// //                   {h}
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
// //             {loading ? (
// //               <tr>
// //                 <td colSpan="5" className="py-20 text-center">
// //                   <Loader2 className="w-8 h-8 text-green-500 animate-spin mx-auto mb-2" />
// //                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fetching Accounts...</p>
// //                 </td>
// //               </tr>
// //             ) : paginatedUsers.map((u, i) => (
// //               <tr key={u._id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
// //                 <td className="px-6 py-4 text-xs font-bold text-slate-400">
// //                   {((currentPage - 1) * entriesPerPage + i + 1).toString().padStart(2, '0')}
// //                 </td>
// //                 <td className="px-6 py-4">
// //                   <div className="font-bold text-slate-900 dark:text-white text-sm">{u.name || "Anonymous"}</div>
// //                   <div className="text-xs text-slate-500 font-medium">{u.email}</div>
// //                 </td>
// //                 <td className="px-6 py-4">
// //                   <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
// //                     {u.phone || "No Phone"}
// //                   </span>
// //                 </td>
// //                 <td className="px-6 py-4">
// //                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
// //                     u.role === 'admin' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
// //                   }`}>
// //                     {u.role}
// //                   </span>
// //                 </td>
// //                 <td className="px-6 py-4">
// //                   <div className="flex gap-2">
// //                     <button
// //                       onClick={() => handleOpenModal(u, "activate")}
// //                       className="p-2 bg-green-50 dark:bg-green-500/10 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all active:scale-90"
// //                       title="Activate Package"
// //                     >
// //                       <Zap size={16} />
// //                     </button>
// //                     <button
// //                       onClick={() => handleOpenModal(u, "fund")}
// //                       className="p-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:opacity-80 transition-all active:scale-90"
// //                       title="Fund Account"
// //                     >
// //                       <DollarSign size={16} />
// //                     </button>
// //                   </div>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Pagination Footer */}
// //       <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-transparent">
// //         <p className="text-xs font-bold text-slate-400 uppercase">Page {currentPage} of {totalPages || 1}</p>
// //         <div className="flex gap-2">
// //           <button
// //             onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
// //             disabled={currentPage === 1}
// //             className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-30"
// //           >
// //             <ChevronLeft size={18} className="text-slate-600 dark:text-slate-400" />
// //           </button>
// //           <button
// //             onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
// //             disabled={currentPage === totalPages}
// //             className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-30"
// //           >
// //             <ChevronRight size={18} className="text-slate-600 dark:text-slate-400" />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Modal Logic */}
// //       <AnimatePresence>
// //         {openModal && selectedUser && (
// //           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
// //             <motion.div 
// //               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
// //               onClick={handleCloseModal}
// //               className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
// //             />
// //             <motion.div
// //               initial={{ scale: 0.9, opacity: 0, y: 20 }}
// //               animate={{ scale: 1, opacity: 1, y: 0 }}
// //               exit={{ scale: 0.9, opacity: 0, y: 20 }}
// //               className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden border border-white/10"
// //             >
// //               <button onClick={handleCloseModal} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
// //                 <X size={20} className="text-slate-400" />
// //               </button>

// //               <div className="mb-6">
// //                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${modalType === 'activate' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-900'}`}>
// //                     {modalType === 'activate' ? <Zap size={28} /> : <DollarSign size={28} />}
// //                  </div>
// //                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
// //                     {modalType === "activate" ? "Activate Package" : "Fund User Account"}
// //                  </h3>
// //                  <p className="text-sm font-medium text-slate-500 mt-1">Target: {selectedUser.name || selectedUser.email}</p>
// //               </div>

// //               {modalType === "fund" && (
// //                 <div className="mb-8">
// //                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Deposit Amount (USD)</label>
// //                   <input
// //                     type="number"
// //                     value={fundAmount}
// //                     onChange={(e) => setFundAmount(e.target.value)}
// //                     placeholder="0.00"
// //                     className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-xl font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-green-500 transition-all outline-none"
// //                   />
// //                 </div>
// //               )}

// //               <div className="flex gap-3">
// //                 <button
// //                   onClick={() => modalType === 'activate' 
// //                     ? handleAction(() => activateUserPackage(selectedUser._id), "Package activated") 
// //                     : handleAction(() => fundUserPackage(selectedUser._id, { amount: Number(fundAmount) }), `Funded $${fundAmount}`)
// //                   }
// //                   disabled={actionLoading || (modalType === "fund" && !fundAmount)}
// //                   className="flex-1 py-4 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-green-600/20 transition-all active:scale-95"
// //                 >
// //                   {actionLoading ? <Loader2 className="animate-spin mx-auto" /> : "Confirm Action"}
// //                 </button>
// //                 <button onClick={handleCloseModal} className="px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
// //                   Cancel
// //                 </button>
// //               </div>
// //             </motion.div>
// //           </div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // };

// // export default UserTable;







// // import React, { useState, useMemo } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { activateUserPackage, fundUserPackage } from "../api/userApi";
// // import { 
// //   Loader2, Zap, DollarSign, X, 
// //   ChevronLeft, ChevronRight, PackageCheck, 
// //   AlertCircle, CheckCircle2 
// // } from "lucide-react";

// // // Mock available packages - replace with real data from your backend if available
// // const AVAILABLE_PACKAGES = [
// //   { id: "507f1f77bcf86cd799439012", name: "Bronze Plan ($100 - $500)" },
// //   { id: "607f1f77bcf86cd799439015", name: "Silver Plan ($1000 - $5000)" },
// //   { id: "707f1f77bcf86cd799439019", name: "Gold Plan ($10,000+)" },
// // ];

// // const UserTable = ({ users = [], loading, searchTerm, filter, entriesPerPage, currentPage, setCurrentPage, onRefresh }) => {
// //   const [openModal, setOpenModal] = useState(false);
// //   const [modalType, setModalType] = useState(""); 
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [fundAmount, setFundAmount] = useState("");
// //   const [selectedPackageId, setSelectedPackageId] = useState("");

// //   const filteredUsers = useMemo(() => {
// //     if (!users || !Array.isArray(users)) return [];
// //     const q = searchTerm.toLowerCase().trim();
// //     return users.filter((u) => {
// //       const match = [u.name, u.email, u.phone].some(f => f?.toLowerCase().includes(q));
// //       const roleMatch = filter === "All" || u.role?.toLowerCase() === filter.toLowerCase();
// //       return match && roleMatch;
// //     });
// //   }, [users, searchTerm, filter]);

// //   const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
// //   const paginatedUsers = filteredUsers.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

// //   const handleOpenModal = (user, type) => {
// //     setSelectedUser(user);
// //     setModalType(type);
// //     setOpenModal(true);
// //     if (type === 'activate') setSelectedPackageId(AVAILABLE_PACKAGES[0].id);
// //   };

// //   const handleCloseModal = () => {
// //     setOpenModal(false);
// //     setSelectedUser(null);
// //     setFundAmount("");
// //     setSelectedPackageId("");
// //   };

// //   const handleAction = async (actionFn, defaultSuccessMsg) => {
// //     try {
// //       setActionLoading(true);
// //       const response = await actionFn();
// //       const data = response.data;

// //       // Handle the specific "Package activated" success response
// //       if (data.message === "Package activated" || data.success) {
// //         alert(`✅ SUCCESS: ${data.message || defaultSuccessMsg}`);
// //         handleCloseModal();
// //         onRefresh(); // Refresh to sync new wallet balances returned in the user object
// //       }
// //     } catch (err) {
// //       // Handle specific error: {"error": "User or package not found"}
// //       const errorMsg = err.response?.data?.error || err.response?.data?.message || "Critical System Error";
// //       alert(`❌ FAILED: ${errorMsg}`);
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden">
// //       <div className="overflow-x-auto">
// //         <table className="w-full text-left border-collapse">
// //           <thead>
// //             <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-white/5">
// //               {["S/N", "Identity", "Communication", "Status", "Command"].map((h) => (
// //                 <th key={h} className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
// //                   {h}
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-slate-50 dark:divide-white/5">
// //             {loading ? (
// //               <tr>
// //                 <td colSpan="5" className="py-32 text-center">
// //                   <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mx-auto mb-4" />
// //                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accessing Secure Ledger...</p>
// //                 </td>
// //               </tr>
// //             ) : paginatedUsers.map((u, i) => (
// //               <tr key={u._id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all">
// //                 <td className="px-8 py-5 text-xs font-black text-slate-400">
// //                   {((currentPage - 1) * entriesPerPage + i + 1).toString().padStart(2, '0')}
// //                 </td>
// //                 <td className="px-8 py-5">
// //                   <div className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">{u.name || "System User"}</div>
// //                   <div className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter mt-0.5">{u._id}</div>
// //                 </td>
// //                 <td className="px-8 py-5">
// //                   <div className="text-xs font-bold text-slate-600 dark:text-slate-300">{u.email}</div>
// //                   <div className="text-[10px] text-slate-400 font-medium mt-0.5">{u.phone || "No Phone Verified"}</div>
// //                 </td>
// //                 <td className="px-8 py-5">
// //                   <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
// //                     u.role === 'admin' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
// //                   }`}>
// //                     {u.role}
// //                   </span>
// //                 </td>
// //                 <td className="px-8 py-5">
// //                   <div className="flex gap-2 opacity-100 xl:opacity-40 group-hover:opacity-100 transition-opacity">
// //                     <button
// //                       onClick={() => handleOpenModal(u, "activate")}
// //                       className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all active:scale-90"
// //                       title="Provision Package"
// //                     >
// //                       <Zap size={16} />
// //                     </button>
// //                     <button
// //                       onClick={() => handleOpenModal(u, "fund")}
// //                       className="p-2.5 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-xl hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all active:scale-90"
// //                       title="Direct Funding"
// //                     >
// //                       <DollarSign size={16} />
// //                     </button>
// //                   </div>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Pagination */}
// //       <div className="p-8 border-t border-slate-50 dark:border-white/5 flex justify-between items-center bg-slate-50/20 dark:bg-slate-900/20">
// //         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Viewing Page {currentPage} / {totalPages || 1}</p>
// //         <div className="flex gap-3">
// //           <button
// //             onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
// //             disabled={currentPage === 1}
// //             className="p-3 rounded-2xl border border-slate-200 dark:border-white/10 disabled:opacity-20 hover:bg-white dark:hover:bg-white/5 transition-all"
// //           >
// //             <ChevronLeft size={18} className="text-slate-900 dark:text-white" />
// //           </button>
// //           <button
// //             onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
// //             disabled={currentPage === totalPages}
// //             className="p-3 rounded-2xl border border-slate-200 dark:border-white/10 disabled:opacity-20 hover:bg-white dark:hover:bg-white/5 transition-all"
// //           >
// //             <ChevronRight size={18} className="text-slate-900 dark:text-white" />
// //           </button>
// //         </div>
// //       </div>

// //       {/* MODAL SYSTEM */}
// //       <AnimatePresence>
// //         {openModal && selectedUser && (
// //           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
// //             <motion.div 
// //               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
// //               onClick={handleCloseModal}
// //               className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" 
// //             />
// //             <motion.div
// //               initial={{ scale: 0.95, opacity: 0, y: 30 }}
// //               animate={{ scale: 1, opacity: 1, y: 0 }}
// //               exit={{ scale: 0.95, opacity: 0, y: 30 }}
// //               className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-3xl overflow-hidden border border-white/10"
// //             >
// //               <div className="mb-8">
// //                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-2xl ${
// //                    modalType === 'activate' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-slate-900/20'
// //                  }`}>
// //                     {modalType === 'activate' ? <PackageCheck size={32} /> : <DollarSign size={32} />}
// //                  </div>
// //                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
// //                     {modalType === "activate" ? "Provision Package" : "Manual Injection"}
// //                  </h3>
// //                  <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-widest">
// //                    Admin override for: <span className="text-emerald-500">{selectedUser.email}</span>
// //                  </p>
// //               </div>

// //               {/* INPUT FIELDS */}
// //               {modalType === "activate" ? (
// //                 <div className="mb-10">
// //                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Deployment Tier</label>
// //                   <select
// //                     value={selectedPackageId}
// //                     onChange={(e) => setSelectedPackageId(e.target.value)}
// //                     className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-emerald-500 rounded-[1.25rem] px-6 py-4 text-sm font-bold text-slate-900 dark:text-white transition-all outline-none appearance-none cursor-pointer"
// //                   >
// //                     {AVAILABLE_PACKAGES.map((pkg) => (
// //                       <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
// //                     ))}
// //                   </select>
// //                 </div>
// //               ) : (
// //                 <div className="mb-10">
// //                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Funding Value (USD)</label>
// //                   <input
// //                     type="number"
// //                     value={fundAmount}
// //                     onChange={(e) => setFundAmount(e.target.value)}
// //                     placeholder="0.00"
// //                     className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-emerald-500 rounded-[1.25rem] px-6 py-5 text-2xl font-black text-slate-900 dark:text-white transition-all outline-none"
// //                   />
// //                 </div>
// //               )}

// //               {/* ACTION BUTTONS */}
// //               <div className="flex flex-col gap-4">
// //                 <button
// //                   onClick={() => modalType === 'activate' 
// //                     ? handleAction(() => activateUserPackage(selectedUser._id, selectedPackageId), "Package activated") 
// //                     : handleAction(() => fundUserPackage(selectedUser._id, { amount: Number(fundAmount) }), `Credited $${fundAmount}`)
// //                   }
// //                   disabled={actionLoading || (modalType === "fund" && !fundAmount) || (modalType === "activate" && !selectedPackageId)}
// //                   className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-600/20 transition-all active:scale-95 flex items-center justify-center gap-3"
// //                 >
// //                   {actionLoading ? <Loader2 className="animate-spin" size={18} /> : (
// //                     <>
// //                       <CheckCircle2 size={18} />
// //                       Execute Command
// //                     </>
// //                   )}
// //                 </button>
// //                 <button 
// //                   onClick={handleCloseModal} 
// //                   className="w-full py-5 bg-transparent border-2 border-slate-100 dark:border-white/5 text-slate-500 dark:text-slate-400 rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
// //                 >
// //                   Abort Operation
// //                 </button>
// //               </div>
// //             </motion.div>
// //           </div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // };

// // export default UserTable;







// import React, { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { activateUserPackage, fundUserPackage } from "../api/userApi";
// import { 
//   Loader2, Zap, DollarSign, X, 
//   ChevronLeft, ChevronRight, PackageCheck, 
//   CheckCircle2 
// } from "lucide-react";

// /** * IMPORTANT: Replace these IDs with ACTUAL IDs from your MongoDB/Database.
//  * The "User or package not found" error occurs because these mock IDs 
//  * likely don't exist in your backend.
//  */
// const AVAILABLE_PACKAGES = [
//   { id: "678e3f45a1b2c3d4e5f67890", name: "Standard Plan" },
//   { id: "678e3f45a1b2c3d4e5f67891", name: "Premium Plan" },
//   { id: "678e3f45a1b2c3d4e5f67892", name: "Elite Plan" },
// ];

// const UserTable = ({ users = [], loading, searchTerm, filter, entriesPerPage, currentPage, setCurrentPage, onRefresh }) => {
//   const [openModal, setOpenModal] = useState(false);
//   const [modalType, setModalType] = useState(""); 
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [fundAmount, setFundAmount] = useState("");
//   const [selectedPackageId, setSelectedPackageId] = useState("");

//   const filteredUsers = useMemo(() => {
//     if (!users || !Array.isArray(users)) return [];
//     const q = searchTerm.toLowerCase().trim();
//     return users.filter((u) => {
//       const match = [u.name, u.email, u.phone].some(f => f?.toLowerCase().includes(q));
//       const roleMatch = filter === "All" || u.role?.toLowerCase() === filter.toLowerCase();
//       return match && roleMatch;
//     });
//   }, [users, searchTerm, filter]);

//   const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
//   const paginatedUsers = filteredUsers.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

//   const handleOpenModal = (user, type) => {
//     setSelectedUser(user);
//     setModalType(type);
//     setOpenModal(true);
//     if (type === 'activate') {
//       // Set default package if list isn't empty
//       setSelectedPackageId(AVAILABLE_PACKAGES[0]?.id || "");
//     }
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setSelectedUser(null);
//     setFundAmount("");
//     setSelectedPackageId("");
//   };

//   const handleAction = async (actionFn, defaultSuccessMsg) => {
//     try {
//       setActionLoading(true);
//       const response = await actionFn();
//       const data = response.data;

//       // Handle expected success: { "message": "Package activated", "user": {...} }
//       if (data.message === "Package activated" || data.success) {
//         alert(`✅ SUCCESS: ${data.message || defaultSuccessMsg}`);
//         handleCloseModal();
//         onRefresh(); 
//       }
//     } catch (err) {
//       // Capture the specific {"error": "User or package not found"} response
//       const errorMsg = err.response?.data?.error || err.response?.data?.message || "Operation Failed";
//       alert(`❌ ERROR: ${errorMsg}`);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-white/5">
//               {["S/N", "Identity", "Communication", "Status", "Command"].map((h) => (
//                 <th key={h} className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-50 dark:divide-white/5">
//             {loading ? (
//               <tr>
//                 <td colSpan="5" className="py-32 text-center">
//                   <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mx-auto mb-4" />
//                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accessing Ledger...</p>
//                 </td>
//               </tr>
//             ) : paginatedUsers.map((u, i) => (
//               <tr key={u._id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all">
//                 <td className="px-8 py-5 text-xs font-black text-slate-400">
//                   {((currentPage - 1) * entriesPerPage + i + 1).toString().padStart(2, '0')}
//                 </td>
//                 <td className="px-8 py-5">
//                   <div className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">{u.name || "User"}</div>
//                   <div className="text-[10px] text-slate-500 font-mono mt-0.5">{u._id}</div>
//                 </td>
//                 <td className="px-8 py-5">
//                   <div className="text-xs font-bold text-slate-600 dark:text-slate-300">{u.email}</div>
//                   <div className="text-[10px] text-slate-400 font-medium mt-0.5">{u.phone || "No Phone"}</div>
//                 </td>
//                 <td className="px-8 py-5">
//                   <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
//                     u.role === 'admin' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
//                   }`}>
//                     {u.role}
//                   </span>
//                 </td>
//                 <td className="px-8 py-5">
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleOpenModal(u, "activate")}
//                       className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all active:scale-90"
//                     >
//                       <Zap size={16} />
//                     </button>
//                     <button
//                       onClick={() => handleOpenModal(u, "fund")}
//                       className="p-2.5 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-xl hover:bg-slate-900 hover:text-white transition-all active:scale-90"
//                     >
//                       <DollarSign size={16} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* MODAL SYSTEM */}
//       <AnimatePresence>
//         {openModal && selectedUser && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseModal} className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" />
//             <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-3xl border border-white/10">
//               <div className="mb-8">
//                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-2xl ${modalType === 'activate' ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}>
//                     {modalType === 'activate' ? <PackageCheck size={32} /> : <DollarSign size={32} />}
//                  </div>
//                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
//                     {modalType === "activate" ? "Provision Package" : "Manual Injection"}
//                  </h3>
//                  <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-widest">Target: {selectedUser.email}</p>
//               </div>

//               {modalType === "activate" ? (
//                 <div className="mb-10">
//                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Deployment Tier</label>
//                   <select
//                     value={selectedPackageId}
//                     onChange={(e) => setSelectedPackageId(e.target.value)}
//                     className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-[1.25rem] px-6 py-4 text-sm font-bold text-slate-900 dark:text-white transition-all outline-none"
//                   >
//                     {AVAILABLE_PACKAGES.map((pkg) => (
//                       <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
//                     ))}
//                   </select>
//                 </div>
//               ) : (
//                 <div className="mb-10">
//                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Amount (USD)</label>
//                   <input
//                     type="number"
//                     value={fundAmount}
//                     onChange={(e) => setFundAmount(e.target.value)}
//                     placeholder="0.00"
//                     className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-[1.25rem] px-6 py-5 text-2xl font-black text-slate-900 dark:text-white outline-none"
//                   />
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <button
//                   onClick={() => modalType === 'activate' 
//                     ? handleAction(() => activateUserPackage(selectedUser._id, selectedPackageId), "Package activated") 
//                     : handleAction(() => fundUserPackage(selectedUser._id, { amount: Number(fundAmount) }), `Credited $${fundAmount}`)
//                   }
//                   disabled={actionLoading || (modalType === "fund" && !fundAmount) || (modalType === "activate" && !selectedPackageId)}
//                   className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 transition-all"
//                 >
//                   {actionLoading ? <Loader2 className="animate-spin" size={18} /> : <><CheckCircle2 size={18} /> Execute Command</>}
//                 </button>
//                 <button onClick={handleCloseModal} className="w-full py-5 text-slate-500 font-black text-xs uppercase tracking-[0.2em]">Abort</button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default UserTable;






// import React, { useState, useMemo, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { activateUserPackage, fundUserPackage, getPackages } from "../api/userApi";
// import { 
//   Loader2, Zap, DollarSign, X, 
//   ChevronLeft, ChevronRight, PackageCheck, 
//   CheckCircle2, AlertTriangle
// } from "lucide-react";

// const UserTable = ({ users = [], loading, searchTerm, filter, entriesPerPage, currentPage, setCurrentPage, onRefresh }) => {
//   const [openModal, setOpenModal] = useState(false);
//   const [modalType, setModalType] = useState(""); 
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [fundAmount, setFundAmount] = useState("");
//   const [selectedPackageId, setSelectedPackageId] = useState("");
  
//   // Dynamic Packages State
//   const [dbPackages, setDbPackages] = useState([]);
//   const [fetchingPkgs, setFetchingPkgs] = useState(false);

//   // Fetch real packages from backend on mount
//   useEffect(() => {
//     const fetchPkgs = async () => {
//       try {
//         setFetchingPkgs(true);
//         const data = await getPackages();
//         setDbPackages(data);
//       } catch (err) {
//         console.error("Failed to load packages:", err);
//       } finally {
//         setFetchingPkgs(false);
//       }
//     };
//     fetchPkgs();
//   }, []);

//   const filteredUsers = useMemo(() => {
//     if (!users || !Array.isArray(users)) return [];
//     const q = searchTerm.toLowerCase().trim();
//     return users.filter((u) => {
//       const match = [u.name, u.email, u.phone].some(f => f?.toLowerCase().includes(q));
//       const roleMatch = filter === "All" || u.role?.toLowerCase() === filter.toLowerCase();
//       return match && roleMatch;
//     });
//   }, [users, searchTerm, filter]);

//   const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
//   const paginatedUsers = filteredUsers.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

//   const handleOpenModal = (user, type) => {
//     setSelectedUser(user);
//     setModalType(type);
//     setOpenModal(true);
//     if (type === 'activate' && dbPackages.length > 0) {
//       setSelectedPackageId(dbPackages[0]._id); // Set first real ID as default
//     }
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setSelectedUser(null);
//     setFundAmount("");
//     setSelectedPackageId(dbPackages[0]?._id || "");
//   };

//   const handleAction = async (actionFn, defaultSuccessMsg) => {
//     try {
//       setActionLoading(true);
//       const response = await actionFn();
//       const data = response.data;

//       if (data.message === "Package activated" || data.success) {
//         alert(`✅ SUCCESS: ${data.message || defaultSuccessMsg}`);
//         handleCloseModal();
//         onRefresh(); 
//       }
//     } catch (err) {
//       // Handles {"error": "User or package not found"}
//       const errorMsg = err.response?.data?.error || "System Error";
//       alert(`❌ FAILED: ${errorMsg}`);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-white/5">
//               {["S/N", "Identity", "Communication", "Status", "Command"].map((h) => (
//                 <th key={h} className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-50 dark:divide-white/5">
//             {loading ? (
//               <tr>
//                 <td colSpan="5" className="py-32 text-center">
//                   <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mx-auto mb-4" />
//                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syncing Nodes...</p>
//                 </td>
//               </tr>
//             ) : paginatedUsers.map((u, i) => (
//               <tr key={u._id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all">
//                 <td className="px-8 py-5 text-xs font-black text-slate-400">
//                   {((currentPage - 1) * entriesPerPage + i + 1).toString().padStart(2, '0')}
//                 </td>
//                 <td className="px-8 py-5">
//                   <div className="font-bold text-slate-900 dark:text-white text-sm">{u.name || "User"}</div>
//                   <div className="text-[10px] text-slate-500 font-mono mt-0.5">{u._id}</div>
//                 </td>
//                 <td className="px-8 py-5">
//                   <div className="text-xs font-bold text-slate-600 dark:text-slate-300">{u.email}</div>
//                   <div className="text-[10px] text-slate-400 font-medium mt-0.5">{u.phone || "Hidden"}</div>
//                 </td>
//                 <td className="px-8 py-5">
//                   <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
//                     u.role === 'admin' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
//                   }`}>
//                     {u.role}
//                   </span>
//                 </td>
//                 <td className="px-8 py-5">
//                   <div className="flex gap-2">
//                     <button onClick={() => handleOpenModal(u, "activate")} className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"><Zap size={16} /></button>
//                     <button onClick={() => handleOpenModal(u, "fund")} className="p-2.5 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-xl hover:bg-slate-900 hover:text-white transition-all"><DollarSign size={16} /></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* MODAL SYSTEM */}
//       <AnimatePresence>
//         {openModal && selectedUser && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseModal} className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" />
//             <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-3xl border border-white/10">
              
//               <div className="mb-8 text-center sm:text-left">
//                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 mx-auto sm:mx-0 ${modalType === 'activate' ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}>
//                     {modalType === 'activate' ? <PackageCheck size={32} /> : <DollarSign size={32} />}
//                  </div>
//                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
//                     {modalType === "activate" ? "Deploy Package" : "Inject Funds"}
//                  </h3>
//                  <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-widest">{selectedUser.email}</p>
//               </div>

//               {modalType === "activate" ? (
//                 <div className="mb-10">
//                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Real-time Packages</label>
//                   {fetchingPkgs ? (
//                     <div className="flex items-center gap-2 text-slate-400 animate-pulse"><Loader2 size={14} className="animate-spin"/> Syncing catalog...</div>
//                   ) : dbPackages.length > 0 ? (
//                     <select
//                       value={selectedPackageId}
//                       onChange={(e) => setSelectedPackageId(e.target.value)}
//                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-[1.25rem] px-6 py-4 text-sm font-bold text-slate-900 dark:text-white outline-none"
//                     >
//                       {dbPackages.map((pkg) => (
//                         <option key={pkg._id} value={pkg._id}>
//                           {pkg.name} — ${pkg.price}
//                         </option>
//                       ))}
//                     </select>
//                   ) : (
//                     <div className="p-4 bg-red-500/10 text-red-500 rounded-xl text-xs font-bold flex gap-2">
//                       <AlertTriangle size={14}/> No packages found in database.
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="mb-10">
//                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Amount (USD)</label>
//                   <input
//                     type="number"
//                     value={fundAmount}
//                     onChange={(e) => setFundAmount(e.target.value)}
//                     placeholder="0.00"
//                     className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-[1.25rem] px-6 py-5 text-2xl font-black text-slate-900 dark:text-white outline-none"
//                   />
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <button
//                   onClick={() => modalType === 'activate' 
//                     ? handleAction(() => activateUserPackage(selectedUser._id, selectedPackageId), "Package activated") 
//                     : handleAction(() => fundUserPackage(selectedUser._id, { amount: Number(fundAmount) }), `Credited $${fundAmount}`)
//                   }
//                   disabled={actionLoading || (modalType === "activate" && dbPackages.length === 0)}
//                   className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 transition-all"
//                 >
//                   {actionLoading ? <Loader2 className="animate-spin" size={18} /> : <><CheckCircle2 size={18} /> Execute Command</>}
//                 </button>
//                 <button onClick={handleCloseModal} className="w-full py-3 text-slate-500 font-bold text-xs uppercase tracking-widest">Abort</button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default UserTable;






import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { activateUserPackage, fundUserPackage, getPackages } from "../api/userApi";
import { 
  Loader2, Zap, DollarSign, X, 
  ChevronLeft, ChevronRight, PackageCheck, 
  CheckCircle2, AlertTriangle, AlertCircle
} from "lucide-react";

const UserTable = ({ users = [], loading, searchTerm, filter, entriesPerPage, currentPage, setCurrentPage, onRefresh }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState("");
  
  // Feedback States
  const [dbPackages, setDbPackages] = useState([]);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });

  useEffect(() => {
    const fetchPkgs = async () => {
      try {
        const data = await getPackages();
        setDbPackages(data);
      } catch (err) {
        console.error("Failed to load packages:", err);
      }
    };
    fetchPkgs();
  }, []);

  // Utility to show notification and auto-hide
  const triggerNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
      if (type === "success") handleCloseModal();
    }, 3000);
  };

  const handleCloseModal = () => {
    if (actionLoading) return;
    setOpenModal(false);
    setSelectedUser(null);
    setFundAmount("");
    setNotification({ show: false, type: "", message: "" });
  };

  const handleAction = async (actionFn, defaultSuccessMsg) => {
    try {
      setActionLoading(true);
      const response = await actionFn();
      const data = response.data;

      if (data.message === "Package activated" || data.success || response.status === 200) {
        triggerNotification("success", data.message || defaultSuccessMsg);
        onRefresh(); 
      }
    } catch (err) {
      // Handles {"error": "User or package not found"}
      const errorMsg = err.response?.data?.error || err.response?.data?.message || "Operation Failed";
      triggerNotification("error", errorMsg);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!users || !Array.isArray(users)) return [];
    const q = searchTerm.toLowerCase().trim();
    return users.filter((u) => {
      const match = [u.name, u.email, u.phone].some(f => f?.toLowerCase().includes(q));
      const roleMatch = filter === "All" || u.role?.toLowerCase() === filter.toLowerCase();
      return match && roleMatch;
    });
  }, [users, searchTerm, filter]);

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden">
      {/* ... Table Header & Body (Same as previous) ... */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-white/5">
              {["S/N", "Identity", "Communication", "Status", "Command"].map((h) => (
                <th key={h} className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-white/5">
            {paginatedUsers.map((u, i) => (
              <tr key={u._id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all">
                <td className="px-8 py-5 text-xs font-black text-slate-400">{((currentPage - 1) * entriesPerPage + i + 1).toString().padStart(2, '0')}</td>
                <td className="px-8 py-5">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{u.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{u._id}</div>
                </td>
                <td className="px-8 py-5">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">{u.email}</div>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500">{u.role}</span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedUser(u); setModalType("activate"); setSelectedPackageId(dbPackages[0]?._id); setOpenModal(true); }} className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"><Zap size={16} /></button>
                    <button onClick={() => { setSelectedUser(u); setModalType("fund"); setOpenModal(true); }} className="p-2.5 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-xl hover:bg-slate-900 hover:text-white transition-all"><DollarSign size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL SYSTEM WITH INTEGRATED NOTIFICATIONS */}
      <AnimatePresence>
        {openModal && selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseModal} className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" />
            
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-3xl border border-white/10 overflow-hidden">
              
              {/* STATUS OVERLAY (SUCCESS/ERROR) */}
              <AnimatePresence>
                {notification.show && (
                  <motion.div 
                    initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }}
                    className={`absolute top-0 left-0 right-0 p-6 flex items-center justify-center gap-3 z-50 ${
                      notification.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {notification.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <span className="text-xs font-black uppercase tracking-widest">{notification.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mb-8">
                 <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 ${modalType === 'activate' ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}>
                    {modalType === 'activate' ? <PackageCheck size={32} /> : <DollarSign size={32} />}
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                    {modalType === "activate" ? "Deploy Package" : "Manual Funding"}
                 </h3>
                 <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-widest">{selectedUser.email}</p>
              </div>

              {modalType === "activate" ? (
                <div className="mb-10">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Select Real Package</label>
                  <select
                    value={selectedPackageId}
                    onChange={(e) => setSelectedPackageId(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-[1.25rem] px-6 py-4 text-sm font-bold text-slate-900 dark:text-white outline-none appearance-none"
                  >
                    {dbPackages.map((pkg) => (
                      <option key={pkg._id} value={pkg._id}>{pkg.name} — ${pkg.price}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="mb-10">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Amount to Inject (USD)</label>
                  <input
                    type="number"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-[1.25rem] px-6 py-5 text-2xl font-black text-slate-900 dark:text-white outline-none"
                  />
                </div>
              )}

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => modalType === 'activate' 
                    ? handleAction(() => activateUserPackage(selectedUser._id, selectedPackageId), "Package Activated Successfully") 
                    : handleAction(() => fundUserPackage(selectedUser._id, { amount: Number(fundAmount) }), "Funds Injected Successfully")
                  }
                  disabled={actionLoading || (modalType === "fund" && !fundAmount)}
                  className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
                >
                  {actionLoading ? <Loader2 className="animate-spin" size={18} /> : "Execute Transaction"}
                </button>
                <button 
                  onClick={handleCloseModal} 
                  className="w-full py-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors"
                >
                  Cancel and Return
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