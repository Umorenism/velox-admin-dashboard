import React, { useState, useEffect, useMemo } from "react";
import { 
  ArrowDownCircle, CheckCircle2, XCircle, Clock, 
  Search, RefreshCw, Loader2, MoreHorizontal,
  ChevronLeft, ChevronRight, AlertCircle, Wallet,
  ExternalLink, ArrowUpRight
} from "lucide-react";
import { getAdminWithdrawals, approveWithdrawal, rejectWithdrawal } from "../api/withdrawalApi";
import { toast } from "react-hot-toast";

const ManageWithdrawal = () => {
  const [data, setData] = useState({ withdrawals: [], totals: {} });
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAdminWithdrawals();
      // Ensure data structure matches res: { withdrawals: [], totals: {} }
      setData(res);
    } catch (err) {
      toast.error("Financial Ledger Access Denied");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredData = useMemo(() => {
    return data.withdrawals.filter(w => {
      const matchesSearch = 
        w.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.withdrawalAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.amount.toString().includes(searchTerm);
      const matchesStatus = statusFilter === "all" || w.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data.withdrawals, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedResults = filteredData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  const handleAction = async (id, type) => {
    let reason = "";
    if (type === 'reject') {
      reason = window.prompt("Rejection Protocol: Enter Reason");
      if (!reason) return;
    }

    setProcessingId(id);
    try {
      const res = type === 'approve' 
        ? await approveWithdrawal(id) 
        : await rejectWithdrawal(id, reason);
      
      toast.success(res.message || "Transaction Status Updated");
      fetchData(); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Internal Protocol Error");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40">
      <Loader2 className="animate-spin text-emerald-500 mb-4" size={40} />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Syncing Liquidity Stream...</p>
    </div>
  );

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* 1. FINANCIAL SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Volume" value={data.totals?.totalWithdrawalAmount} color="blue" icon={<Wallet size={20} />} />
        <StatCard label="In Queue" value={data.totals?.pendingWithdrawalAmount} color="amber" icon={<Clock size={20} />} />
        <StatCard label="Settled" value={data.totals?.confirmedWithdrawalAmount} color="emerald" icon={<CheckCircle2 size={20} />} />
        <StatCard label="Rejected" value={data.totals?.rejectedWithdrawalAmount} color="rose" icon={<XCircle size={20} />} />
      </div>

      <div className="bg-white dark:bg-[#080d1a] border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden">
        {/* 2. FILTERS */}
        <div className="p-8 border-b border-slate-100 dark:border-white/5">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Withdrawal Ledger</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60">Velox Capital Markets Admin</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" placeholder="Search by Client or Address..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-white/[0.03] border-none rounded-2xl text-[11px] font-bold outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 dark:bg-white/[0.03] border-none rounded-2xl px-4 py-3 text-[10px] font-black uppercase outline-none dark:text-white"
              >
                <option value="all">Global View</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Settled</option>
                <option value="rejected">Rejected</option>
              </select>
              <button onClick={fetchData} className="p-3 bg-slate-50 dark:bg-white/[0.03] rounded-2xl text-slate-400 hover:text-emerald-500 transition-all active:scale-90">
                <RefreshCw size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 3. DATA TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/[0.01]">
                {["Client / Entity", "Financials", "Destination Address", "Status", "Authorization"].map((h) => (
                  <th key={h} className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-white/5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-white/5">
              {paginatedResults.map((w) => (
                <tr key={w._id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all">
                  <td className="px-8 py-5">
                    <div className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-tight">{w.userId?.name}</div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Wallet: {w.wallet}</div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      ${w.amount.toLocaleString()} <span className="text-[10px] text-slate-400 font-bold">USD</span>
                    </div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter mt-1">
                      Gross: ${w.metadata?.grossAmount} | Fee: ${w.metadata?.platformFee}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 break-all max-w-[180px]">
                        {w.withdrawalAddress}
                      </span>
                      <div className="flex gap-2">
                        <span className="bg-emerald-500/10 text-emerald-500 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">{w.network}</span>
                        <span className="bg-blue-500/10 text-blue-500 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">{w.payCurrency}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <StatusBadge status={w.status} />
                  </td>
                  <td className="px-8 py-5">
                    {w.status === "pending" ? (
                      <div className="flex items-center gap-2">
                        <ActionButton icon={<CheckCircle2 size={14}/>} color="emerald" onClick={() => handleAction(w._id, 'approve')} loading={processingId === w._id} />
                        <ActionButton icon={<XCircle size={14}/>} color="rose" onClick={() => handleAction(w._id, 'reject')} loading={processingId === w._id} />
                      </div>
                    ) : (
                      <div className="text-[9px] font-black uppercase text-slate-300 dark:text-slate-800 tracking-[0.2em] italic">Authorized</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && <EmptyState />}
        </div>

        {/* 4. FOOTER PAGINATION */}
        <div className="px-8 py-6 bg-slate-50/30 dark:bg-white/[0.01] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Stream {paginatedResults.length} of {filteredData.length} objects
          </p>
          <div className="flex items-center gap-2">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-400 disabled:opacity-10 transition-all">
              <ChevronLeft size={16} />
            </button>
            <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)} className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-400 disabled:opacity-10 transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- UI HELPERS --- */

const StatCard = ({ label, value, color, icon }) => (
  <div className="bg-white dark:bg-[#080d1a] p-6 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl">
    <div className="flex items-center gap-4">
      <div className={`p-3.5 rounded-2xl ${
        color === 'blue' ? 'bg-blue-500/10 text-blue-500' :
        color === 'amber' ? 'bg-amber-500/10 text-amber-500' :
        color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500' :
        'bg-rose-500/10 text-rose-500'
      }`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5">${value?.toLocaleString() || '0'}</p>
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    confirmed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    rejected: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest ${styles[status]}`}>
      <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
      {status}
    </div>
  );
};

const ActionButton = ({ icon, color, onClick, loading }) => (
  <button 
    onClick={onClick} disabled={loading}
    className={`p-2.5 rounded-xl text-white transition-all active:scale-90 disabled:opacity-50 ${
      color === 'emerald' ? 'bg-emerald-600 shadow-emerald-600/20' : 'bg-rose-600 shadow-rose-600/20'
    } shadow-lg`}
  >
    {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
  </button>
);

const EmptyState = () => (
  <div className="py-24 text-center">
    <AlertCircle className="text-slate-200 dark:text-slate-800 mx-auto mb-4" size={48} />
    <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">No Active Transaction Data</h3>
  </div>
);

export default ManageWithdrawal;