




// import React, { useState, useMemo, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   activateUserPackage, 
//   fundUserPackage, 
//   getPackages, 
//   deductUserWallet 
// } from "../api/userApi";
// import { 
//   Loader2, Zap, DollarSign, X, 
//   PackageCheck, CheckCircle2, AlertCircle,
//   MinusCircle 
// } from "lucide-react";

// const UserTable = ({ users = [], loading, searchTerm, filter, entriesPerPage, currentPage, setCurrentPage, onRefresh }) => {
//   const [openModal, setOpenModal] = useState(false);
//   const [modalType, setModalType] = useState(""); // "activate", "fund", or "deduct"
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
  
//   // ✅ Form States initialized as empty strings
//   const [fundAmount, setFundAmount] = useState("");
//   const [deductRemark, setDeductRemark] = useState("");
//   const [selectedPackageId, setSelectedPackageId] = useState("");
  
//   const [dbPackages, setDbPackages] = useState([]);
//   const [notification, setNotification] = useState({ show: false, type: "", message: "" });

//   useEffect(() => {
//     const fetchPkgs = async () => {
//       try {
//         const data = await getPackages();
//         setDbPackages(data);
//       } catch (err) {
//         console.error("Failed to load packages:", err);
//       }
//     };
//     fetchPkgs();
//   }, []);

//   const triggerNotification = (type, message) => {
//     setNotification({ show: true, type, message });
//     setTimeout(() => {
//       setNotification({ show: false, type: "", message: "" });
//       if (type === "success") handleCloseModal();
//     }, 3000);
//   };

//   const handleCloseModal = () => {
//     if (actionLoading) return;
//     setOpenModal(false);
//     setSelectedUser(null);
//     setFundAmount("");    // Reset to empty
//     setDeductRemark("");  // Reset to empty
//     setNotification({ show: false, type: "", message: "" });
//   };

//   const handleAction = async (actionFn, defaultSuccessMsg) => {
//     try {
//       setActionLoading(true);
//       const response = await actionFn();
//       const data = response.data;

//       if (response.status === 200 || data.success) {
//         triggerNotification("success", data.message || defaultSuccessMsg);
//         onRefresh(); 
//       }
//     } catch (err) {
//       const errorMsg = err.response?.data?.error || err.response?.data?.message || "Operation Failed";
//       triggerNotification("error", errorMsg);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const filteredUsers = useMemo(() => {
//     if (!users || !Array.isArray(users)) return [];
//     const q = searchTerm.toLowerCase().trim();
//     return users.filter((u) => {
//       const match = [u.name, u.email, u.phone].some(f => f?.toLowerCase().includes(q));
//       const roleMatch = filter === "All" || u.role?.toLowerCase() === filter.toLowerCase();
//       return match && roleMatch;
//     });
//   }, [users, searchTerm, filter]);

//   const paginatedUsers = filteredUsers.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

//   return (
//     <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden font-sans">
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-white/5">
//               {["S/N", "Identity", "Communication", "Status", "Command"].map((h) => (
//                 <th key={h} className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-50 dark:divide-white/5">
//             {paginatedUsers.map((u, i) => (
//               <tr key={u._id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all">
//                 <td className="px-8 py-5 text-xs font-black text-slate-400">{((currentPage - 1) * entriesPerPage + i + 1).toString().padStart(2, '0')}</td>
//                 <td className="px-8 py-5">
//                   <div className="font-bold text-slate-900 dark:text-white text-sm">{u.name}</div>
//                   <div className="text-[10px] text-slate-500 font-mono mt-0.5">{u._id}</div>
//                 </td>
//                 <td className="px-8 py-5">
//                   <div className="text-xs font-bold text-slate-600 dark:text-slate-300">{u.email}</div>
//                 </td>
//                 <td className="px-8 py-5">
//                   <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500">{u.role}</span>
//                 </td>
//                 <td className="px-8 py-5">
//                   <div className="flex gap-2">
//                     <button 
//                       onClick={() => { setSelectedUser(u); setModalType("activate"); setSelectedPackageId(dbPackages[0]?._id); setOpenModal(true); }} 
//                       className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"
//                     ><Zap size={16} /></button>
                    
//                     <button 
//                       onClick={() => { setSelectedUser(u); setModalType("fund"); setOpenModal(true); }} 
//                       className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all"
//                     ><DollarSign size={16} /></button>

//                     <button 
//                       onClick={() => { setSelectedUser(u); setModalType("deduct"); setOpenModal(true); }} 
//                       className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
//                     ><MinusCircle size={16} /></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <AnimatePresence>
//         {openModal && selectedUser && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseModal} className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" />
            
//             <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-3xl border border-white/10 overflow-hidden">
              
//               {/* Notification Overlay */}
//               <AnimatePresence>
//                 {notification.show && (
//                   <motion.div initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }} className={`absolute top-0 left-0 right-0 p-6 flex items-center justify-center gap-3 z-50 ${notification.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
//                     {notification.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
//                     <span className="text-xs font-black uppercase tracking-widest">{notification.message}</span>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <div className="mb-8">
//                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 ${
//                    modalType === 'activate' ? 'bg-emerald-500 text-white' : 
//                    modalType === 'fund' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'
//                  }`}>
//                     {modalType === 'activate' ? <PackageCheck size={32} /> : modalType === 'fund' ? <DollarSign size={32} /> : <MinusCircle size={32} />}
//                  </div>
//                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
//                     {modalType === "activate" ? "Deploy Package" : modalType === "fund" ? "Manual Funding" : "Deduct Funds"}
//                  </h3>
//                  <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-widest">{selectedUser.email}</p>
//               </div>

//               {modalType === "activate" ? (
//                 <div className="mb-10">
//                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Select Real Package</label>
//                   <select value={selectedPackageId} onChange={(e) => setSelectedPackageId(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-[1.25rem] px-6 py-4 text-sm font-bold text-slate-900 dark:text-white outline-none appearance-none">
//                     {dbPackages.map((pkg) => <option key={pkg._id} value={pkg._id}>{pkg.name} — ${pkg.price}</option>)}
//                   </select>
//                 </div>
//               ) : (
//                 <div className="space-y-6 mb-10">
//                   <div>
//                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Amount (USD)</label>
//                     <input 
//                       type="number" 
//                       value={fundAmount} 
//                       onChange={(e) => setFundAmount(e.target.value)} 
//                       placeholder="0.00" 
//                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-[1.25rem] px-6 py-5 text-2xl font-black text-slate-900 dark:text-white outline-none" 
//                     />
//                   </div>
                  
//                   {modalType === "deduct" && (
//                     <div>
//                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Deduction Remark</label>
//                       <input 
//                         type="text" 
//                         value={deductRemark} 
//                         onChange={(e) => setDeductRemark(e.target.value)} 
//                         placeholder="e.g. Penalty or Correction" 
//                         className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-[1.25rem] px-6 py-4 text-sm font-bold text-slate-900 dark:text-white outline-none" 
//                       />
//                     </div>
//                   )}
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <button
//                   onClick={() => {
//                     if (modalType === 'activate') {
//                       handleAction(() => activateUserPackage(selectedUser._id, selectedPackageId), "Package Activated");
//                     } else if (modalType === 'fund') {
//                       handleAction(() => fundUserPackage(selectedUser._id, { amount: fundAmount }), "Funds Injected");
//                     } else {
//                       handleAction(() => deductUserWallet(selectedUser._id, { amount: fundAmount, remark: deductRemark }), "Funds Deducted");
//                     }
//                   }}
//                   disabled={actionLoading || (modalType !== 'activate' && !fundAmount)}
//                   className={`w-full py-5 rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 ${
//                     modalType === 'deduct' ? 'bg-red-600 text-white' : 
//                     modalType === 'fund' ? 'bg-blue-600 text-white' :
//                     'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
//                   }`}
//                 >
//                   {actionLoading ? <Loader2 className="animate-spin" size={18} /> : "Execute Transaction"}
//                 </button>
//                 <button onClick={handleCloseModal} className="w-full py-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors">Cancel and Return</button>
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
// import { motion, AnimatePresence } from "framer-motion"; // Fix: Standard import
// import { 
//   activateUserPackage, 
//   fundUserPackage, 
//   getPackages, 
//   deductUserWallet 
// } from "../api/userApi";
// import { 
//   freezeUserWithdrawal, 
//   unfreezeUserWithdrawal, 
//   restrictUser, 
//   unrestrictUser 
// } from "../api/withdrawalApi";
// import { 
//   Loader2, Zap, DollarSign, 
//   PackageCheck, CheckCircle2, AlertCircle,
//   MinusCircle, ShieldAlert, Lock, Unlock, Ban, UserCheck
// } from "lucide-react";

// const UserTable = ({ users = [], loading, searchTerm, filter, entriesPerPage, currentPage, onRefresh }) => {
//   const [openModal, setOpenModal] = useState(false);
//   const [modalType, setModalType] = useState(""); 
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
  
//   const [fundAmount, setFundAmount] = useState("");
//   const [deductRemark, setDeductRemark] = useState("");
//   const [selectedPackageId, setSelectedPackageId] = useState("");
  
//   const [dbPackages, setDbPackages] = useState([]);
//   const [notification, setNotification] = useState({ show: false, type: "", message: "" });

//   useEffect(() => {
//     const fetchPkgs = async () => {
//       try {
//         const data = await getPackages();
//         setDbPackages(data);
//       } catch (err) {
//         console.error("Failed to load packages:", err);
//       }
//     };
//     fetchPkgs();
//   }, []);

//   const triggerNotification = (type, message) => {
//     setNotification({ show: true, type, message });
//     setTimeout(() => {
//       setNotification({ show: false, type: "", message: "" });
//       if (type === "success") handleCloseModal();
//     }, 3000);
//   };

//   const handleCloseModal = () => {
//     if (actionLoading) return;
//     setOpenModal(false);
//     setSelectedUser(null);
//     setFundAmount("");
//     setDeductRemark("");
//     setNotification({ show: false, type: "", message: "" });
//   };

//   const handleAction = async (actionFn, defaultSuccessMsg) => {
//     try {
//       setActionLoading(true);
//       const response = await actionFn();
//       const data = response.data || response;

//       if (response.status === 200 || data.success) {
//         triggerNotification("success", data.message || defaultSuccessMsg);
//         onRefresh(); 
//       }
//     } catch (err) {
//       const errorMsg = err.response?.data?.error || err.response?.data?.message || "Operation Failed";
//       triggerNotification("error", errorMsg);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const filteredUsers = useMemo(() => {
//     if (!users || !Array.isArray(users)) return [];
//     const q = searchTerm.toLowerCase().trim();
//     return users.filter((u) => {
//       const match = [u.name, u.email, u.phone].some(f => f?.toLowerCase().includes(q));
//       const roleMatch = filter === "All" || u.role?.toLowerCase() === filter.toLowerCase();
//       return match && roleMatch;
//     });
//   }, [users, searchTerm, filter]);

//   const paginatedUsers = filteredUsers.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

//   return (
//     <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden font-sans">
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-separate border-spacing-0">
//           <thead>
//             <tr className="bg-slate-50/50 dark:bg-slate-900/50">
//               {["S/N", "Identity", "Communication", "Security Status", "Command"].map((h) => (
//                 <th key={h} className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-white/5">{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-50 dark:divide-white/5">
//             {paginatedUsers.map((u, i) => (
//               <tr key={u._id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all">
//                 <td className="px-8 py-5 text-xs font-black text-slate-400">{((currentPage - 1) * entriesPerPage + i + 1).toString().padStart(2, '0')}</td>
//                 <td className="px-8 py-5">
//                   <div className="font-bold text-slate-900 dark:text-white text-sm uppercase">{u.name}</div>
//                   <div className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase tracking-tighter">{u._id}</div>
//                 </td>
//                 <td className="px-8 py-5">
//                   <div className="text-xs font-bold text-slate-600 dark:text-slate-300">{u.email}</div>
//                   <div className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">{u.role}</div>
//                 </td>
//                 <td className="px-8 py-5">
//                   <div className="flex flex-col gap-1.5">
//                     <div className={`flex items-center gap-2 text-[9px] font-black uppercase px-2 py-0.5 rounded-md w-fit ${u.withdrawalFrozen ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
//                       {u.withdrawalFrozen ? <Lock size={10} /> : <Unlock size={10} />}
//                       {u.withdrawalFrozen ? "Payout Locked" : "Payout Active"}
//                     </div>
//                     <div className={`flex items-center gap-2 text-[9px] font-black uppercase px-2 py-0.5 rounded-md w-fit ${u.adminFrozen ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'}`}>
//                       {u.adminFrozen ? <Ban size={10} /> : <UserCheck size={10} />}
//                       {u.adminFrozen ? "Access Restricted" : "Full Access"}
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-8 py-5">
//                   <div className="flex gap-2">
//                     <button onClick={() => { setSelectedUser(u); setModalType("activate"); setSelectedPackageId(dbPackages[0]?._id); setOpenModal(true); }} className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"><Zap size={16} /></button>
//                     <button onClick={() => { setSelectedUser(u); setModalType("fund"); setOpenModal(true); }} className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all"><DollarSign size={16} /></button>
//                     <button onClick={() => { setSelectedUser(u); setModalType("security"); setOpenModal(true); }} className="p-2.5 bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white rounded-xl hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"><ShieldAlert size={16} /></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <AnimatePresence>
//         {openModal && selectedUser && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseModal} className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" />
            
//             <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-3xl border border-white/10 overflow-hidden">
              
//               <AnimatePresence>
//                 {notification.show && (
//                   <motion.div initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }} className={`absolute top-0 left-0 right-0 p-6 flex items-center justify-center gap-3 z-50 ${notification.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
//                     {notification.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
//                     <span className="text-xs font-black uppercase tracking-widest">{notification.message}</span>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <div className="mb-8">
//                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 ${
//                    modalType === 'activate' ? 'bg-emerald-500 text-white' : 
//                    modalType === 'fund' ? 'bg-blue-600 text-white' : 
//                    modalType === 'security' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'bg-red-600 text-white'
//                  }`}>
//                     {modalType === 'activate' ? <PackageCheck size={32} /> : modalType === 'fund' ? <DollarSign size={32} /> : modalType === 'security' ? <ShieldAlert size={32} /> : <MinusCircle size={32} />}
//                  </div>
//                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
//                     {modalType === "activate" ? "Deploy Package" : modalType === "fund" ? "Manual Funding" : modalType === "security" ? "Security Admin" : "Deduct Funds"}
//                  </h3>
//                  <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-widest truncate">{selectedUser.email}</p>
//               </div>

//               {modalType === "security" ? (
//                 <div className="space-y-4 mb-10">
//                   <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl flex items-center justify-between border border-slate-100 dark:border-white/5">
//                     <div>
//                       <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Financial Status</p>
//                       <p className={`text-xs font-black uppercase ${selectedUser.withdrawalFrozen ? 'text-rose-500' : 'text-emerald-500'}`}>
//                         {selectedUser.withdrawalFrozen ? 'Withdrawal Locked' : 'Withdrawal Active'}
//                       </p>
//                     </div>
//                     <button 
//                       onClick={() => {
//                         const uId = selectedUser._id || selectedUser.id;
//                         if(selectedUser.withdrawalFrozen) {
//                           handleAction(() => unfreezeUserWithdrawal(uId), "Payouts Restored");
//                         } else {
//                           const r = window.prompt("Freeze Reason:", "Compliance Check Required");
//                           if(r) handleAction(() => freezeUserWithdrawal(uId, r), "Payouts Frozen");
//                         }
//                       }}
//                       className={`p-3 rounded-2xl transition-all ${selectedUser.withdrawalFrozen ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-rose-500/10 text-rose-500'}`}
//                     >
//                       {selectedUser.withdrawalFrozen ? <Unlock size={20} /> : <Lock size={20} />}
//                     </button>
//                   </div>

//                   <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl flex items-center justify-between border border-slate-100 dark:border-white/5">
//                     <div>
//                       <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Account Access</p>
//                       <p className={`text-xs font-black uppercase ${selectedUser.adminFrozen ? 'text-amber-500' : 'text-blue-500'}`}>
//                         {selectedUser.adminFrozen ? 'Login Restricted' : 'Access Granted'}
//                       </p>
//                     </div>
//                     <button 
//                       onClick={() => {
//                         const uId = selectedUser._id || selectedUser.id;
//                         if(selectedUser.adminFrozen) {
//                           handleAction(() => unrestrictUser(uId), "Access Restored");
//                         } else {
//                           const r = window.prompt("Restriction Reason:", "Pending Verification");
//                           if(r) handleAction(() => restrictUser(uId, r), "Access Terminated");
//                         }
//                       }}
//                       className={`p-3 rounded-2xl transition-all ${selectedUser.adminFrozen ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-amber-500/10 text-amber-500'}`}
//                     >
//                       {selectedUser.adminFrozen ? <UserCheck size={20} /> : <Ban size={20} />}
//                     </button>
//                   </div>

//                   <button onClick={() => setModalType("deduct")} className="w-full py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:text-rose-500 transition-all border border-dashed border-slate-200 dark:border-white/10">
//                     Switch to Funds Deduction
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-6 mb-10">
//                   {modalType === "activate" ? (
//                     <div>
//                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Package Selection</label>
//                       <select value={selectedPackageId} onChange={(e) => setSelectedPackageId(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-[1.25rem] px-6 py-4 text-sm font-bold text-slate-900 dark:text-white outline-none">
//                         {dbPackages.map((pkg) => <option key={pkg._id} value={pkg._id}>{pkg.name} — ${pkg.price}</option>)}
//                       </select>
//                     </div>
//                   ) : (
//                     <>
//                       <div>
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Amount (USD)</label>
//                         <input type="number" value={fundAmount} onChange={(e) => setFundAmount(e.target.value)} placeholder="0.00" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-[1.25rem] px-6 py-5 text-2xl font-black text-slate-900 dark:text-white outline-none" />
//                       </div>
//                       {modalType === "deduct" && (
//                         <div>
//                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Deduction Remark</label>
//                           <input type="text" value={deductRemark} onChange={(e) => setDeductRemark(e.target.value)} placeholder="e.g. Penalty" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-[1.25rem] px-6 py-4 text-sm font-bold text-slate-900 dark:text-white outline-none" />
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 {modalType !== "security" && (
//                   <button
//                     onClick={() => {
//                       if (modalType === 'activate') handleAction(() => activateUserPackage(selectedUser._id, selectedPackageId), "Package Activated");
//                       else if (modalType === 'fund') handleAction(() => fundUserPackage(selectedUser._id, { amount: fundAmount }), "Funds Injected");
//                       else handleAction(() => deductUserWallet(selectedUser._id, { amount: fundAmount, remark: deductRemark }), "Funds Deducted");
//                     }}
//                     disabled={actionLoading || (modalType !== 'activate' && !fundAmount)}
//                     className={`w-full py-5 rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 ${
//                       modalType === 'deduct' ? 'bg-rose-600 text-white' : 
//                       modalType === 'fund' ? 'bg-blue-600 text-white' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
//                     }`}
//                   >
//                     {actionLoading ? <Loader2 className="animate-spin" size={18} /> : "Execute Request"}
//                   </button>
//                 )}
//                 <button onClick={handleCloseModal} className="w-full py-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors">Close Portal</button>
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
// import { 
//   activateUserPackage, fundUserPackage, getPackages, deductUserWallet 
// } from "../api/userApi";
// import { 
//   freezeUserWithdrawal, unfreezeUserWithdrawal, restrictUser, unrestrictUser 
// } from "../api/withdrawalApi";
// import { 
//   Loader2, Zap, DollarSign, PackageCheck, CheckCircle2, AlertCircle,
//   MinusCircle, ShieldAlert, Lock, Unlock, Ban, UserCheck, Trash2
// } from "lucide-react";

// const UserTable = ({ users = [], loading, searchTerm, filter, entriesPerPage, currentPage, onRefresh }) => {
//   const [openModal, setOpenModal] = useState(false);
//   const [modalType, setModalType] = useState(""); 
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
  
//   const [fundAmount, setFundAmount] = useState("");
//   const [deductRemark, setDeductRemark] = useState("");
//   const [selectedPackageId, setSelectedPackageId] = useState("");
  
//   const [dbPackages, setDbPackages] = useState([]);
//   const [notification, setNotification] = useState({ show: false, type: "", message: "" });

//   useEffect(() => {
//     const fetchPkgs = async () => {
//       try {
//         const data = await getPackages();
//         setDbPackages(data);
//       } catch (err) { console.error(err); }
//     };
//     fetchPkgs();
//   }, []);

//   const triggerNotification = (type, message) => {
//     setNotification({ show: true, type, message });
//     setTimeout(() => {
//       setNotification({ show: false, type: "", message: "" });
//       if (type === "success") handleCloseModal();
//     }, 3000);
//   };

//   const handleCloseModal = () => {
//     if (actionLoading) return;
//     setOpenModal(false);
//     setSelectedUser(null);
//     setFundAmount("");
//     setDeductRemark("");
//   };

//   const handleAction = async (actionFn, defaultSuccessMsg) => {
//     try {
//       setActionLoading(true);
//       const response = await actionFn();
//       triggerNotification("success", response.data?.message || defaultSuccessMsg);
//       onRefresh(); 
//     } catch (err) {
//       triggerNotification("error", err.response?.data?.message || "Operation Failed");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const filteredUsers = useMemo(() => {
//     const q = searchTerm.toLowerCase().trim();
//     return users.filter((u) => {
//       const match = [u.name, u.email, u.userName].some(f => f?.toLowerCase().includes(q));
//       return match && (filter === "All" || u.role?.toLowerCase() === filter.toLowerCase());
//     });
//   }, [users, searchTerm, filter]);

//   const paginatedUsers = filteredUsers.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

//   return (
//     <div className="bg-white dark:bg-[#080d1a] border border-slate-200 dark:border-white/5 rounded-[2rem] shadow-2xl overflow-hidden font-sans">
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-separate border-spacing-0">
//           <thead>
//             <tr className="bg-slate-50/50 dark:bg-white/[0.02]">
//               {["Member Info", "Status", "Command Center"].map((h) => (
//                 <th key={h} className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-white/5">{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-50 dark:divide-white/5">
//             {paginatedUsers.map((u) => (
//               <tr key={u._id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all">
//                 <td className="px-8 py-5">
//                   <div className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-tight">{u.name}</div>
//                   <div className="text-[10px] text-slate-400 mt-0.5 lowercase font-medium opacity-60">{u.email}</div>
//                 </td>
//                 <td className="px-8 py-5">
//                   <div className="flex flex-wrap gap-2">
//                     <StatusBadge active={!u.withdrawalFrozen} label="Payout" />
//                     <StatusBadge active={!u.adminFrozen} label="Access" color="amber" />
//                   </div>
//                 </td>
//                 <td className="px-8 py-5">
//                   <div className="flex items-center gap-2">
//                     {/* BUTTON 1: ACTIVATE */}
//                     <ActionBtn 
//                        onClick={() => { setSelectedUser(u); setModalType("activate"); setSelectedPackageId(dbPackages[0]?._id); setOpenModal(true); }}
//                        icon={<Zap size={14} />} label="Activate" color="emerald" 
//                     />
                    
//                     {/* BUTTON 2: FUND */}
//                     <ActionBtn 
//                        onClick={() => { setSelectedUser(u); setModalType("fund"); setOpenModal(true); }}
//                        icon={<DollarSign size={14} />} label="Fund" color="blue" 
//                     />

//                     {/* BUTTON 3: RESTRICT (THE SEPARATE BUTTON) */}
//                     <ActionBtn 
//                        onClick={() => { setSelectedUser(u); setModalType("restrict"); setOpenModal(true); }}
//                        icon={u.adminFrozen ? <UserCheck size={14} /> : <Ban size={14} />} 
//                        label={u.adminFrozen ? "Restore" : "Restrict"} 
//                        color={u.adminFrozen ? "emerald" : "amber"} 
//                     />

//                     {/* BUTTON 4: DEDUCT */}
//                     <ActionBtn 
//                        onClick={() => { setSelectedUser(u); setModalType("deduct"); setOpenModal(true); }}
//                        icon={<MinusCircle size={14} />} label="Deduct" color="rose" 
//                     />
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <AnimatePresence>
//         {openModal && selectedUser && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseModal} className="absolute inset-0 bg-[#050810]/90 backdrop-blur-xl" />
            
//             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-md bg-white dark:bg-[#0f172a] rounded-[3rem] p-10 shadow-3xl border border-white/5 overflow-hidden text-center">
              
//               {notification.show && (
//                 <div className={`absolute top-0 left-0 right-0 p-4 text-[10px] font-black uppercase tracking-widest ${notification.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
//                   {notification.message}
//                 </div>
//               )}

//               <div className="mb-8 flex flex-col items-center">
//                 <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-4 shadow-2xl ${
//                   modalType === 'activate' ? 'bg-emerald-500' : 
//                   modalType === 'fund' ? 'bg-blue-600' : 
//                   modalType === 'restrict' ? 'bg-amber-500' : 'bg-rose-600'
//                 } text-white`}>
//                   {modalType === 'activate' ? <PackageCheck size={32} /> : modalType === 'fund' ? <DollarSign size={32} /> : modalType === 'restrict' ? <ShieldAlert size={32} /> : <MinusCircle size={32} />}
//                 </div>
//                 <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
//                   {modalType.toUpperCase()} USER
//                 </h3>
//                 <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{selectedUser.email}</p>
//               </div>

//               {/* MODAL BODY CONTENT */}
//               <div className="mb-10 text-left">
//                 {modalType === "restrict" ? (
//                   <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-[2rem] border border-dashed border-slate-200 dark:border-white/10">
//                     <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-medium">
//                       {selectedUser.adminFrozen 
//                         ? "Restoring access will allow the user to log in and use all platform features immediately."
//                         : "Restricting access will terminate current sessions and prevent the user from logging back in."}
//                     </p>
//                     {!selectedUser.adminFrozen && (
//                       <input 
//                         type="text" 
//                         placeholder="Reason for restriction..." 
//                         className="w-full bg-white dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-xs font-bold outline-none ring-1 ring-slate-200 dark:ring-white/5" 
//                         onChange={(e) => setDeductRemark(e.target.value)}
//                       />
//                     )}
//                   </div>
//                 ) : modalType === "activate" ? (
//                   <div className="space-y-2">
//                     <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Select Plan</label>
//                     <select value={selectedPackageId} onChange={(e) => setSelectedPackageId(e.target.value)} className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-5 py-4 text-sm font-bold dark:text-white outline-none">
//                       {dbPackages.map((pkg) => <option key={pkg._id} value={pkg._id}>{pkg.name} — ${pkg.price}</option>)}
//                     </select>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     <div className="space-y-2">
//                       <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Amount (USD)</label>
//                       <input type="number" value={fundAmount} onChange={(e) => setFundAmount(e.target.value)} placeholder="0.00" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-6 py-5 text-2xl font-black dark:text-white outline-none" />
//                     </div>
//                     {modalType === "deduct" && (
//                       <input type="text" value={deductRemark} onChange={(e) => setDeductRemark(e.target.value)} placeholder="Deduction Remark..." className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-4 py-3 text-sm font-bold dark:text-white outline-none" />
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* EXECUTION BUTTON */}
//               <button
//                 onClick={() => {
//                   const uId = selectedUser._id;
//                   if (modalType === 'activate') handleAction(() => activateUserPackage(uId, selectedPackageId), "Provisioned");
//                   else if (modalType === 'fund') handleAction(() => fundUserPackage(uId, { amount: fundAmount }), "Capitalized");
//                   else if (modalType === 'deduct') handleAction(() => deductUserWallet(uId, { amount: fundAmount, remark: deductRemark }), "Debited");
//                   else if (modalType === 'restrict') {
//                     selectedUser.adminFrozen ? handleAction(() => unrestrictUser(uId), "Restored") : handleAction(() => restrictUser(uId, deductRemark || "Admin Action"), "Restricted");
//                   }
//                 }}
//                 disabled={actionLoading}
//                 className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 shadow-2xl ${
//                   modalType === 'restrict' ? 'bg-amber-500 text-white' : 
//                   modalType === 'deduct' ? 'bg-rose-600 text-white' : 
//                   modalType === 'fund' ? 'bg-blue-600 text-white' : 'bg-slate-900 dark:bg-white text-white dark:text-black'
//                 }`}
//               >
//                 {actionLoading ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Confirm Action"}
//               </button>
              
//               <button onClick={handleCloseModal} className="mt-6 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Abort Mission</button>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// /* Internal UI Helpers */
// const ActionBtn = ({ onClick, icon, label, color }) => (
//   <button 
//     onClick={onClick} 
//     className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all 
//       ${color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500' : ''}
//       ${color === 'blue' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500' : ''}
//       ${color === 'amber' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500' : ''}
//       ${color === 'rose' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500' : ''}
//       hover:text-white hover:shadow-lg active:scale-90`}
//   >
//     {icon} <span>{label}</span>
//   </button>
// );

// const StatusBadge = ({ active, label, color = "emerald" }) => (
//   <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider 
//     ${active ? `bg-emerald-500/10 text-emerald-500` : `bg-rose-500/10 text-rose-500`}`}>
//     <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-500' : 'bg-rose-500'}`} />
//     {label}: {active ? "OK" : "NO"}
//   </div>
// );

// export default UserTable;





import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  activateUserPackage, fundUserPackage, getPackages, deductUserWallet 
} from "../api/userApi";
import { 
  freezeUserWithdrawal, unfreezeUserWithdrawal, restrictUser, unrestrictUser 
} from "../api/withdrawalApi";
import { 
  Loader2, Zap, DollarSign, PackageCheck, CheckCircle2, AlertCircle,
  MinusCircle, ShieldAlert, Lock, Unlock, Ban, UserCheck, Trash2,
  ChevronLeft, ChevronRight
} from "lucide-react";

const UserTable = ({ 
  users = [], 
  loading, 
  searchTerm, 
  filter, 
  entriesPerPage, 
  currentPage, 
  setCurrentPage, // Added this prop
  onRefresh 
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  const [fundAmount, setFundAmount] = useState("");
  const [deductRemark, setDeductRemark] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState("");
  
  const [dbPackages, setDbPackages] = useState([]);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });

  useEffect(() => {
    const fetchPkgs = async () => {
      try {
        const data = await getPackages();
        setDbPackages(data);
      } catch (err) { console.error(err); }
    };
    fetchPkgs();
  }, []);

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
    setDeductRemark("");
  };

  const handleAction = async (actionFn, defaultSuccessMsg) => {
    try {
      setActionLoading(true);
      const response = await actionFn();
      triggerNotification("success", response.data?.message || defaultSuccessMsg);
      onRefresh(); 
    } catch (err) {
      triggerNotification("error", err.response?.data?.message || "Operation Failed");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return users.filter((u) => {
      const match = [u.name, u.email, u.userName].some(f => f?.toLowerCase().includes(q));
      return match && (filter === "All" || u.role?.toLowerCase() === filter.toLowerCase());
    });
  }, [users, searchTerm, filter]);

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  return (
    <div className="bg-white dark:bg-[#080d1a] border border-slate-200 dark:border-white/5 rounded-[2rem] shadow-2xl overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-white/[0.02]">
              {["Member Info", "Status", "Command Center"].map((h) => (
                <th key={h} className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-white/5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-white/5">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((u) => (
                <tr key={u._id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all">
                  <td className="px-8 py-5">
                    <div className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-tight">{u.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 lowercase font-medium opacity-60">{u.email}</div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge active={!u.withdrawalFrozen} label="Payout" />
                      <StatusBadge active={!u.adminFrozen} label="Access" color="amber" />
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <ActionBtn 
                         onClick={() => { setSelectedUser(u); setModalType("activate"); setSelectedPackageId(dbPackages[0]?._id); setOpenModal(true); }}
                         icon={<Zap size={14} />} label="Activate" color="emerald" 
                      />
                      <ActionBtn 
                         onClick={() => { setSelectedUser(u); setModalType("fund"); setOpenModal(true); }}
                         icon={<DollarSign size={14} />} label="Fund" color="blue" 
                      />
                      <ActionBtn 
                         onClick={() => { setSelectedUser(u); setModalType("restrict"); setOpenModal(true); }}
                         icon={u.adminFrozen ? <UserCheck size={14} /> : <Ban size={14} />} 
                         label={u.adminFrozen ? "Restore" : "Restrict"} 
                         color={u.adminFrozen ? "emerald" : "amber"} 
                      />
                      <ActionBtn 
                         onClick={() => { setSelectedUser(u); setModalType("deduct"); setOpenModal(true); }}
                         icon={<MinusCircle size={14} />} label="Deduct" color="rose" 
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-8 py-20 text-center text-slate-400 text-xs font-black uppercase tracking-widest italic opacity-40">
                  No Users Found in the Directory
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- PAGINATION FOOTER --- */}
      <div className="px-8 py-6 bg-slate-50/30 dark:bg-white/[0.01] border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center sm:text-left">
          Showing <span className="text-slate-900 dark:text-white">{paginatedUsers.length}</span> of {filteredUsers.length} Members
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-white/5 text-slate-400 hover:bg-white dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-1.5">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-xl text-[10px] font-black transition-all ${
                  currentPage === i + 1 
                    ? "bg-slate-900 dark:bg-white text-white dark:text-black shadow-xl" 
                    : "text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                {i + 1}
              </button>
            )).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))}
          </div>

          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-white/5 text-slate-400 hover:bg-white dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {openModal && selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseModal} className="absolute inset-0 bg-[#050810]/90 backdrop-blur-xl" />
            
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-md bg-white dark:bg-[#0f172a] rounded-[3rem] p-10 shadow-3xl border border-white/5 overflow-hidden text-center">
              
              {notification.show && (
                <div className={`absolute top-0 left-0 right-0 p-4 text-[10px] font-black uppercase tracking-widest ${notification.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                  {notification.message}
                </div>
              )}

              <div className="mb-8 flex flex-col items-center">
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-4 shadow-2xl ${
                  modalType === 'activate' ? 'bg-emerald-500' : 
                  modalType === 'fund' ? 'bg-blue-600' : 
                  modalType === 'restrict' ? 'bg-amber-500' : 'bg-rose-600'
                } text-white`}>
                  {modalType === 'activate' ? <PackageCheck size={32} /> : modalType === 'fund' ? <DollarSign size={32} /> : modalType === 'restrict' ? <ShieldAlert size={32} /> : <MinusCircle size={32} />}
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                  {modalType.toUpperCase()} USER
                </h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{selectedUser.email}</p>
              </div>

              <div className="mb-10 text-left">
                {modalType === "restrict" ? (
                  <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-[2rem] border border-dashed border-slate-200 dark:border-white/10">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-medium">
                      {selectedUser.adminFrozen 
                        ? "Restoring access will allow the user to log in and use all platform features immediately."
                        : "Restricting access will terminate current sessions and prevent the user from logging back in."}
                    </p>
                    {!selectedUser.adminFrozen && (
                      <input 
                        type="text" 
                        placeholder="Reason for restriction..." 
                        className="w-full bg-white dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-xs font-bold outline-none ring-1 ring-slate-200 dark:ring-white/5" 
                        onChange={(e) => setDeductRemark(e.target.value)}
                      />
                    )}
                  </div>
                ) : modalType === "activate" ? (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Select Plan</label>
                    <select value={selectedPackageId} onChange={(e) => setSelectedPackageId(e.target.value)} className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-5 py-4 text-sm font-bold dark:text-white outline-none">
                      {dbPackages.map((pkg) => <option key={pkg._id} value={pkg._id}>{pkg.name} — ${pkg.price}</option>)}
                    </select>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Amount (USD)</label>
                      <input type="number" value={fundAmount} onChange={(e) => setFundAmount(e.target.value)} placeholder="0.00" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-6 py-5 text-2xl font-black dark:text-white outline-none" />
                    </div>
                    {modalType === "deduct" && (
                      <input type="text" value={deductRemark} onChange={(e) => setDeductRemark(e.target.value)} placeholder="Deduction Remark..." className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-4 py-3 text-sm font-bold dark:text-white outline-none" />
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  const uId = selectedUser._id;
                  if (modalType === 'activate') handleAction(() => activateUserPackage(uId, selectedPackageId), "Provisioned");
                  else if (modalType === 'fund') handleAction(() => fundUserPackage(uId, { amount: fundAmount }), "Capitalized");
                  else if (modalType === 'deduct') handleAction(() => deductUserWallet(uId, { amount: fundAmount, remark: deductRemark }), "Debited");
                  else if (modalType === 'restrict') {
                    selectedUser.adminFrozen ? handleAction(() => unrestrictUser(uId), "Restored") : handleAction(() => restrictUser(uId, deductRemark || "Admin Action"), "Restricted");
                  }
                }}
                disabled={actionLoading}
                className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 shadow-2xl ${
                  modalType === 'restrict' ? 'bg-amber-500 text-white' : 
                  modalType === 'deduct' ? 'bg-rose-600 text-white' : 
                  modalType === 'fund' ? 'bg-blue-600 text-white' : 'bg-slate-900 dark:bg-white text-white dark:text-black'
                }`}
              >
                {actionLoading ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Confirm Action"}
              </button>
              
              <button onClick={handleCloseModal} className="mt-6 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Abort Mission</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* Internal UI Helpers */
const ActionBtn = ({ onClick, icon, label, color }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all 
      ${color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500' : ''}
      ${color === 'blue' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500' : ''}
      ${color === 'amber' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500' : ''}
      ${color === 'rose' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500' : ''}
      hover:text-white hover:shadow-lg active:scale-90`}
  >
    {icon} <span>{label}</span>
  </button>
);

const StatusBadge = ({ active, label, color = "emerald" }) => (
  <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider 
    ${active ? `bg-emerald-500/10 text-emerald-500` : `bg-rose-500/10 text-rose-500`}`}>
    <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-500' : 'bg-rose-500'}`} />
    {label}: {active ? "OK" : "NO"}
  </div>
);

export default UserTable;