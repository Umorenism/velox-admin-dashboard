import React, { useState } from "react";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Loader2, 
  Search,
  UserX
} from "lucide-react";
import { freezeUserWithdrawal, unfreezeUserWithdrawal } from "../api/withdrawalApi";
import { toast } from "react-hot-toast";

// 1. users = [] handles the case where the prop is missing or undefined
const WithdrawalManagement = ({ users = [], setUsers }) => {
  const [processingId, setProcessingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Defensive check for filteredUsers to prevent crash
  const filteredUsers = (users || []).filter(u => {
    if (!u) return false;
    const searchStr = searchTerm.toLowerCase();
    return (
      u.name?.toLowerCase().includes(searchStr) || 
      u.email?.toLowerCase().includes(searchStr) ||
      u.id?.includes(searchStr) ||
      u._id?.includes(searchStr)
    );
  });

  const handleToggleFreeze = async (user) => {
    const userId = user._id || user.id;
    const isCurrentlyFrozen = user.withdrawalFrozen;
    const reason = "Leadership Account - Admin Frozen";

    setProcessingId(userId);
    
    try {
      let res;
      if (isCurrentlyFrozen) {
        res = await unfreezeUserWithdrawal(userId);
      } else {
        res = await freezeUserWithdrawal(userId, reason);
      }

      if (res.success) {
        // Optimistic UI Update
        setUsers((prev) =>
          prev.map((u) =>
            (u._id === userId || u.id === userId) 
              ? { ...u, withdrawalFrozen: !isCurrentlyFrozen, frozenReason: isCurrentlyFrozen ? "" : reason }
              : u
          )
        );
        toast.success(res.message || `Status updated for ${user.name}`);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Operation failed";
      toast.error(msg);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-950 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-2xl overflow-hidden">
      {/* HEADER SECTION */}
      <div className="p-6 md:p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Withdrawal Management
            </h2>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Freeze or unfreeze user payouts globally
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search ID, Name or Email..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-emerald-500 text-sm outline-none transition-all dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-x-auto p-4 md:p-6">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
              <th className="px-4 py-3">Account Information</th>
              <th className="px-4 py-3">Payout Status</th>
              <th className="px-4 py-3">Reasoning</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              const uId = user._id || user.id;
              const isFrozen = user.withdrawalFrozen;
              const isWorking = processingId === uId;

              return (
                <tr key={uId} className="group bg-white dark:bg-slate-900 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none transition-all">
                  <td className="px-4 py-4 rounded-l-2xl border-y border-l border-slate-100 dark:border-white/5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono uppercase">{uId}</span>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4 border-y border-slate-100 dark:border-white/5">
                    <div className={`flex items-center gap-2 text-[10px] font-black uppercase px-3 py-1 rounded-full w-fit ${
                      isFrozen ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {isFrozen ? <Lock size={12} /> : <Unlock size={12} />}
                      {isFrozen ? "Frozen" : "Active"}
                    </div>
                  </td>

                  <td className="px-4 py-4 border-y border-slate-100 dark:border-white/5">
                    <p className="text-xs text-slate-400 max-w-[200px] truncate">
                      {isFrozen ? (user.frozenReason || "System Restricted") : "—"}
                    </p>
                  </td>

                  <td className="px-4 py-4 text-right rounded-r-2xl border-y border-r border-slate-100 dark:border-white/5">
                    <button
                      onClick={() => handleToggleFreeze(user)}
                      disabled={isWorking}
                      className={`
                        inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                        ${isFrozen 
                          ? 'bg-emerald-600 text-white hover:bg-emerald-500' 
                          : 'bg-rose-600 text-white hover:bg-rose-500'}
                        disabled:opacity-40 active:scale-95 shadow-lg ${isFrozen ? 'shadow-emerald-500/20' : 'shadow-rose-500/20'}
                      `}
                    >
                      {isWorking ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : isFrozen ? (
                        <ShieldCheck size={14} />
                      ) : (
                        <ShieldAlert size={14} />
                      )}
                      {isFrozen ? "Unfreeze" : "Freeze"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {/* EMPTY STATE */}
        {filteredUsers.length === 0 && (
          <div className="py-32 text-center flex flex-col items-center justify-center">
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-full mb-4">
              <UserX className="text-slate-300 dark:text-slate-700" size={40} />
            </div>
            <h3 className="text-slate-900 dark:text-white font-bold">No Records Found</h3>
            <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Adjust your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalManagement;