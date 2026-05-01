// import React, { useState, useEffect } from "react";
// import { 
//   ShieldAlert, ShieldCheck, Lock, Unlock, 
//   Loader2, Search, UserX, RefreshCw 
// } from "lucide-react";
// import { 
//   getUsersForAdmin, 
//   freezeUserWithdrawal, 
//   unfreezeUserWithdrawal 
// } from "../api/withdrawalApi";
// import { toast } from "react-hot-toast";

// const WithdrawalManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [processingId, setProcessingId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   // FETCH DATA ON LOAD
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const data = await getUsersForAdmin();
//       // Handle both { users: [] } and direct array [ ] responses
//       const userList = Array.isArray(data) ? data : (data.users || []);
//       setUsers(userList);
//     } catch (err) {
//       toast.error("Failed to load user ledger");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // FILTER LOGIC
//   const filteredUsers = users.filter(u => {
//     const searchStr = searchTerm.toLowerCase();
//     return (
//       u.name?.toLowerCase().includes(searchStr) || 
//       u.email?.toLowerCase().includes(searchStr) ||
//       (u._id || u.id)?.includes(searchStr)
//     );
//   });

//   // ACTION LOGIC
//   const handleToggleFreeze = async (user) => {
//     const userId = user._id || user.id;
//     const isCurrentlyFrozen = user.withdrawalFrozen;
    
//     let reason = "";
//     if (!isCurrentlyFrozen) {
//       reason = window.prompt("Reason for freeze:", "Leadership Account - Admin Frozen");
//       if (reason === null) return; 
//     }

//     setProcessingId(userId);
//     try {
//       const res = isCurrentlyFrozen 
//         ? await unfreezeUserWithdrawal(userId)
//         : await freezeUserWithdrawal(userId, reason || "Admin Frozen");

//       if (res.success) {
//         // Update local state with the returned user object
//         setUsers(prev => prev.map(u => 
//           (u._id === userId || u.id === userId) ? { ...u, ...res.user } : u
//         ));
//         toast.success(res.message);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Action failed");
//     } finally {
//       setProcessingId(null);
//     }
//   };

//   if (loading) return (
//     <div className="flex flex-col items-center justify-center py-20">
//       <Loader2 className="animate-spin text-emerald-500 mb-4" size={32} />
//       <p className="text-slate-500 font-bold text-xs tracking-widest uppercase">Fetching Security Protocols...</p>
//     </div>
//   );

//   return (
//     <div className="w-full bg-white dark:bg-slate-950 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-2xl overflow-hidden">
//       {/* HEADER */}
//       <div className="p-6 md:p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/20">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//           <div className="flex items-center gap-4">
//             <div className="bg-emerald-500 p-3 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
//               <ShieldCheck size={24} />
//             </div>
//             <div>
//               <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Withdrawal Control</h2>
//               <p className="text-slate-500 text-xs font-medium">Manage global payout permissions</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 w-full md:w-auto">
//             <div className="relative flex-1 md:w-80">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//               <input 
//                 type="text" 
//                 placeholder="Search users..."
//                 className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 text-sm outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <button onClick={fetchData} className="p-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl text-slate-400 transition-colors">
//               <RefreshCw size={20} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto p-4 md:p-6">
//         <table className="w-full text-left border-separate border-spacing-y-2">
//           <thead>
//             <tr className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
//               <th className="px-6 py-3">User Identity</th>
//               <th className="px-6 py-3">Payout Status</th>
//               <th className="px-6 py-3">Reason</th>
//               <th className="px-6 py-3 text-right">Administrative Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => {
//               const uId = user._id || user.id;
//               const isFrozen = user.withdrawalFrozen;
//               const isWorking = processingId === uId;

//               return (
//                 <tr key={uId} className="group bg-slate-50/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.05] transition-all">
//                   <td className="px-6 py-5 rounded-l-3xl border-y border-l border-transparent hover:border-slate-200 dark:hover:border-white/10">
//                     <div className="flex flex-col">
//                       <span className="text-sm font-bold text-slate-900 dark:text-white">{user.name || "Unknown User"}</span>
//                       <span className="text-[10px] text-slate-500 font-mono truncate max-w-[120px]">{user.email}</span>
//                     </div>
//                   </td>
                  
//                   <td className="px-6 py-5 border-y border-transparent">
//                     <div className={`flex items-center gap-2 text-[9px] font-black uppercase px-3 py-1 rounded-full w-fit ${
//                       isFrozen ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'
//                     }`}>
//                       {isFrozen ? <Lock size={12} /> : <Unlock size={12} />}
//                       {isFrozen ? "Frozen" : "Active"}
//                     </div>
//                   </td>

//                   <td className="px-6 py-5 border-y border-transparent">
//                     <p className="text-[11px] text-slate-400 italic">
//                       {isFrozen ? (user.frozenReason || "System Restricted") : "No restrictions"}
//                     </p>
//                   </td>

//                   <td className="px-6 py-5 text-right rounded-r-3xl border-y border-r border-transparent">
//                     <button
//                       onClick={() => handleToggleFreeze(user)}
//                       disabled={isWorking}
//                       className={`
//                         inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
//                         ${isFrozen ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-rose-600 text-white hover:bg-rose-500'}
//                         disabled:opacity-40 active:scale-95
//                       `}
//                     >
//                       {isWorking ? <Loader2 size={14} className="animate-spin" /> : (isFrozen ? "Restore Payouts" : "Freeze Payouts")}
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
        
//         {filteredUsers.length === 0 && (
//           <div className="py-20 text-center">
//             <UserX className="mx-auto text-slate-200 dark:text-slate-800 mb-4" size={48} />
//             <p className="text-slate-500 font-bold uppercase text-xs tracking-tighter">No users found matching query</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WithdrawalManagement;





// import React, { useState, useEffect } from "react";
// import { 
//   ShieldAlert, ShieldCheck, Lock, Unlock, 
//   Loader2, Search, UserX, RefreshCw, ShieldOff 
// } from "lucide-react";
// import { 
//   getUsersForAdmin, 
//   freezeUserWithdrawal, 
//   unfreezeUserWithdrawal 
// } from "../api/withdrawalApi";
// import { toast } from "react-hot-toast";

// const WithdrawalManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [processingId, setProcessingId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   // 1. DATA FETCHING WITH ADMIN EXCLUSION
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const data = await getUsersForAdmin();
      
//       // Get raw list from either data or data.users
//       const rawList = Array.isArray(data) ? data : (data.users || []);

//       // EXCLUDE ADMINS: Only keep users who are NOT admins
//       const onlyClients = rawList.filter(user => {
//         const isAdminRole = user.role?.toLowerCase() === "admin";
//         const isAdminFlag = user.isAdmin === true;
//         return !isAdminRole && !isAdminFlag;
//       });

//       setUsers(onlyClients);
//     } catch (err) {
//       toast.error("Failed to load user ledger");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // 2. SEARCH FILTERING
//   const filteredUsers = users.filter(u => {
//     const searchStr = searchTerm.toLowerCase();
//     return (
//       u.name?.toLowerCase().includes(searchStr) || 
//       u.email?.toLowerCase().includes(searchStr) ||
//       (u._id || u.id)?.includes(searchStr)
//     );
//   });

//   // 3. TOGGLE FREEZE LOGIC
//   const handleToggleFreeze = async (user) => {
//     const userId = user._id || user.id;
//     const isCurrentlyFrozen = user.withdrawalFrozen;
    
//     let reason = "";
//     if (!isCurrentlyFrozen) {
//       reason = window.prompt("Reason for freeze:", "Leadership Account - Admin Frozen");
//       if (reason === null) return; 
//     }

//     setProcessingId(userId);
//     try {
//       const res = isCurrentlyFrozen 
//         ? await unfreezeUserWithdrawal(userId)
//         : await freezeUserWithdrawal(userId, reason || "Admin Frozen");

//       if (res.success) {
//         // Update local state with the returned user object from API
//         setUsers(prev => prev.map(u => 
//           (u._id === userId || u.id === userId) ? { ...u, ...res.user } : u
//         ));
//         toast.success(res.message);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Action failed");
//     } finally {
//       setProcessingId(null);
//     }
//   };

//   if (loading) return (
//     <div className="flex flex-col items-center justify-center py-32">
//       <Loader2 className="animate-spin text-emerald-500 mb-4" size={32} />
//       <p className="text-slate-500 font-bold text-[10px] tracking-[0.2em] uppercase">Initializing Secure Ledger...</p>
//     </div>
//   );

//   return (
//     <div className="w-full bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl overflow-hidden">
      
//       {/* HEADER */}
//       <div className="p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-slate-900/10">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//           <div className="flex items-center gap-5">
//             <div className="bg-rose-600 p-3.5 rounded-2xl text-white shadow-xl shadow-rose-600/20">
//               <ShieldAlert size={24} />
//             </div>
//             <div>
//               <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Payout Security</h2>
//               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 opacity-70">
//                 {users.length} Active Client Accounts
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 w-full md:w-auto">
//             <div className="relative flex-1 md:w-80">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//               <input 
//                 type="text" 
//                 placeholder="Filter by Name, Email or ID..."
//                 className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 text-sm font-medium outline-none focus:ring-2 focus:ring-rose-500 transition-all dark:text-white"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <button 
//               onClick={fetchData} 
//               className="p-4 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl text-slate-400 transition-all active:scale-90"
//             >
//               <RefreshCw size={20} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* USER TABLE */}
//       <div className="overflow-x-auto p-4 md:p-8">
//         <table className="w-full text-left border-separate border-spacing-y-3">
//           <thead>
//             <tr className="text-slate-400 text-[10px] uppercase tracking-[0.25em] font-black">
//               <th className="px-6 py-4">Client Information</th>
//               <th className="px-6 py-4">Status</th>
//               <th className="px-6 py-4">Security Note</th>
//               <th className="px-6 py-4 text-right">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => {
//               const uId = user._id || user.id;
//               const isFrozen = user.withdrawalFrozen;
//               const isWorking = processingId === uId;

//               return (
//                 <tr key={uId} className="group bg-slate-50/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.05] transition-all duration-300">
//                   <td className="px-6 py-5 rounded-l-[1.5rem] border-y border-l border-transparent group-hover:border-slate-200 dark:group-hover:border-white/10">
//                     <div className="flex flex-col">
//                       <span className="text-sm font-black text-slate-900 dark:text-white">{user.name || "N/A"}</span>
//                       <span className="text-[10px] text-slate-500 font-mono mt-0.5">{user.email}</span>
//                     </div>
//                   </td>
                  
//                   <td className="px-6 py-5 border-y border-transparent">
//                     <div className={`flex items-center gap-2 text-[9px] font-black uppercase px-3.5 py-1.5 rounded-full w-fit ${
//                       isFrozen ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
//                     }`}>
//                       {isFrozen ? <Lock size={12} strokeWidth={3} /> : <Unlock size={12} strokeWidth={3} />}
//                       {isFrozen ? "Frozen" : "Active"}
//                     </div>
//                   </td>

//                   <td className="px-6 py-5 border-y border-transparent">
//                     <p className="text-[11px] text-slate-400 font-medium">
//                       {isFrozen ? (user.frozenReason || "Administrative Lock") : "No restrictions"}
//                     </p>
//                   </td>

//                   <td className="px-6 py-5 text-right rounded-r-[1.5rem] border-y border-r border-transparent">
//                     <button
//                       onClick={() => handleToggleFreeze(user)}
//                       disabled={isWorking}
//                       className={`
//                         inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
//                         ${isFrozen 
//                           ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/20' 
//                           : 'bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-600/20'}
//                         disabled:opacity-40 active:scale-95
//                       `}
//                     >
//                       {isWorking ? (
//                         <Loader2 size={14} className="animate-spin" />
//                       ) : isFrozen ? (
//                         <> <ShieldCheck size={14} /> Unfreeze </>
//                       ) : (
//                         <> <ShieldOff size={14} /> Freeze </>
//                       )}
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
        
//         {/* EMPTY STATE */}
//         {filteredUsers.length === 0 && (
//           <div className="py-24 text-center flex flex-col items-center">
//             <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-full mb-4">
//               <UserX className="text-slate-300 dark:text-slate-700" size={48} />
//             </div>
//             <h3 className="text-slate-900 dark:text-white font-black uppercase text-sm tracking-widest">No Clients Found</h3>
//             <p className="text-slate-500 text-xs mt-2">Admins are excluded from this list by default.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WithdrawalManagement;






import React, { useState, useEffect, useMemo } from "react";
import { 
  ShieldAlert, ShieldCheck, Lock, Unlock, 
  Loader2, Search, UserX, RefreshCw, ShieldOff,
  ChevronLeft, ChevronRight 
} from "lucide-react";
import { 
  getUsersForAdmin, 
  freezeUserWithdrawal, 
  unfreezeUserWithdrawal 
} from "../api/withdrawalApi";
import { toast } from "react-hot-toast";

const WithdrawalManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  // 1. DATA FETCHING WITH ADMIN EXCLUSION
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getUsersForAdmin();
      const rawList = Array.isArray(data) ? data : (data.users || []);

      const onlyClients = rawList.filter(user => {
        const isAdminRole = user.role?.toLowerCase() === "admin";
        const isAdminFlag = user.isAdmin === true;
        return !isAdminRole && !isAdminFlag;
      });

      setUsers(onlyClients);
    } catch (err) {
      toast.error("Failed to load user ledger");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Reset to page 1 when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // 2. SEARCH FILTERING
  const filteredUsers = useMemo(() => {
    const searchStr = searchTerm.toLowerCase().trim();
    return users.filter(u => 
      u.name?.toLowerCase().includes(searchStr) || 
      u.email?.toLowerCase().includes(searchStr) ||
      (u._id || u.id)?.includes(searchStr)
    );
  }, [users, searchTerm]);

  // 3. PAGINATION CALCULATION
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * entriesPerPage, 
    currentPage * entriesPerPage
  );

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  // 4. TOGGLE FREEZE LOGIC
  const handleToggleFreeze = async (user) => {
    const userId = user._id || user.id;
    const isCurrentlyFrozen = user.withdrawalFrozen;
    
    let reason = "";
    if (!isCurrentlyFrozen) {
      reason = window.prompt("Reason for freeze:", "Leadership Account - Admin Frozen");
      if (reason === null) return; 
    }

    setProcessingId(userId);
    try {
      const res = isCurrentlyFrozen 
        ? await unfreezeUserWithdrawal(userId)
        : await freezeUserWithdrawal(userId, reason || "Admin Frozen");

      if (res.success) {
        setUsers(prev => prev.map(u => 
          (u._id === userId || u.id === userId) ? { ...u, ...res.user } : u
        ));
        toast.success(res.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32">
      <Loader2 className="animate-spin text-emerald-500 mb-4" size={32} />
      <p className="text-slate-500 font-bold text-[10px] tracking-[0.2em] uppercase">Initializing Secure Ledger...</p>
    </div>
  );

  return (
    <div className="w-full bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl overflow-hidden">
      
      {/* HEADER */}
      <div className="p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-slate-900/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="bg-rose-600 p-3.5 rounded-2xl text-white shadow-xl shadow-rose-600/20">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Payout Security</h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 opacity-70">
                {filteredUsers.length} Filtered Clients
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Filter by Name, Email or ID..."
                className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 text-sm font-medium outline-none focus:ring-2 focus:ring-rose-500 transition-all dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={fetchData} 
              className="p-4 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl text-slate-400 transition-all active:scale-90"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* USER TABLE */}
      <div className="overflow-x-auto p-4 md:p-8">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-slate-400 text-[10px] uppercase tracking-[0.25em] font-black">
              <th className="px-6 py-4">Client Information</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Security Note</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => {
              const uId = user._id || user.id;
              const isFrozen = user.withdrawalFrozen;
              const isWorking = processingId === uId;

              return (
                <tr key={uId} className="group bg-slate-50/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.05] transition-all duration-300">
                  <td className="px-6 py-5 rounded-l-[1.5rem] border-y border-l border-transparent group-hover:border-slate-200 dark:group-hover:border-white/10">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-900 dark:text-white">{user.name || "N/A"}</span>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5">{user.email}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-5 border-y border-transparent">
                    <div className={`flex items-center gap-2 text-[9px] font-black uppercase px-3.5 py-1.5 rounded-full w-fit ${
                      isFrozen ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                    }`}>
                      {isFrozen ? <Lock size={12} strokeWidth={3} /> : <Unlock size={12} strokeWidth={3} />}
                      {isFrozen ? "Frozen" : "Active"}
                    </div>
                  </td>

                  <td className="px-6 py-5 border-y border-transparent">
                    <p className="text-[11px] text-slate-400 font-medium">
                      {isFrozen ? (user.frozenReason || "Administrative Lock") : "No restrictions"}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-right rounded-r-[1.5rem] border-y border-r border-transparent">
                    <button
                      onClick={() => handleToggleFreeze(user)}
                      disabled={isWorking}
                      className={`
                        inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                        ${isFrozen 
                          ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/20' 
                          : 'bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-600/20'}
                        disabled:opacity-40 active:scale-95
                      `}
                    >
                      {isWorking ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : isFrozen ? (
                        <> <ShieldCheck size={14} /> Unfreeze </>
                      ) : (
                        <> <ShieldOff size={14} /> Freeze </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {/* EMPTY STATE */}
        {filteredUsers.length === 0 && (
          <div className="py-24 text-center flex flex-col items-center">
            <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-full mb-4">
              <UserX className="text-slate-300 dark:text-slate-700" size={48} />
            </div>
            <h3 className="text-slate-900 dark:text-white font-black uppercase text-sm tracking-widest">No Clients Found</h3>
            <p className="text-slate-500 text-xs mt-2">Admins are excluded from this list by default.</p>
          </div>
        )}
      </div>

      {/* --- PAGINATION FOOTER --- */}
      <div className="px-8 py-6 bg-slate-50/50 dark:bg-white/[0.01] border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center sm:text-left">
          Displaying <span className="text-slate-900 dark:text-white">{paginatedUsers.length}</span> of {filteredUsers.length} Security Profiles
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
    </div>
  );
};

export default WithdrawalManagement;