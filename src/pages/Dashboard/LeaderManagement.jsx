





import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Download, Crown, Zap, Loader2 } from "lucide-react";
import { getTotalLeaders, getActiveLeaders, getleaderAllUsers } from "../../api/leaderApi";
import * as XLSX from "xlsx";
import LeaderTable from "../../utlis/LeaderTable";

export default function LeaderManagement() {
  const [stats, setStats] = useState({
    totalLeaders: 0,
    activeLeaders: 0,
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ rank: "all", role: "all" });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [totalRes, activeRes, usersRes] = await Promise.all([
          getTotalLeaders(),
          getActiveLeaders(),
          getleaderAllUsers(),
        ]);

        // Updated mapping to handle "totalLeaders" and "total" keys from API
        setStats({
          totalLeaders: totalRes?.totalLeaders ?? totalRes?.total ?? 0,
          activeLeaders: activeRes?.totalLeaders ?? activeRes?.total ?? 0,
        });

        // Strict filter for 'leader' role
        const onlyLeaders = (usersRes || []).filter(
          (user) => user.role?.toLowerCase() === "leader"
        );

        const liveUsers = onlyLeaders.map((user) => ({
          ...user,
          rank: determineRank(user),
          phone: user.phone || "N/A",
        }));

        setUsers(liveUsers);
      } catch (error) {
        console.error("Critical: Data synchronization failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const determineRank = (user) => {
    if (user.rank && typeof user.rank === 'string' && user.rank.toLowerCase() === 'none') {
       const count = Number(user.referrals) || 0;
       if (count >= 10) return "Gold";
       if (count >= 5) return "Silver";
       if (count >= 1) return "Bronze";
       return "Unranked";
    }
    return user.rank || "Unranked";
  };

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());
  const handleFilter = (type, value) => setFilter((prev) => ({ ...prev, [type]: value }));

  const filteredUsers = users.filter((user) => {
    const searchStr = searchQuery.trim();
    const matchesSearch = !searchStr || [
      user.name, 
      user.email, 
      user._id, 
      user.phone 
    ].some(field => field?.toString().toLowerCase().includes(searchStr));

    const matchesRank = filter.rank === "all" || 
      (filter.rank === "None" ? user.rank === "Unranked" : user.rank === filter.rank);
    
    const matchesRole = filter.role === "all" || user.role === filter.role;
    
    return matchesSearch && matchesRank && matchesRole;
  });

  const exportToCSV = () => {
    if (filteredUsers.length === 0) return;
    
    const worksheet = XLSX.utils.json_to_sheet(
      filteredUsers.map((user) => ({
        "System ID": user._id || user.id,
        "Full Name": user.name,
        "Email Address": user.email,
        "Contact": user.phone,
        "Account Role": user.role,
        "Achievement Rank": user.rank,
        "Total Referrals": user.referrals || 0,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Live_Leader_Report");
    XLSX.writeFile(workbook, `Leader_Analytics_${Date.now()}.xlsx`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617]">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
        <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Synchronizing Live Data...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 sm:p-8 max-w-[1600px] mx-auto min-h-screen bg-gray-50 dark:bg-[#020617] transition-colors duration-300"
    >
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">Leader Management</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-wide">Strategic Platform Influencers & Network Oversight</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border-b-4 border-amber-500 shadow-xl dark:shadow-none transition-all hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Database Count</span>
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 shadow-inner">
              <Crown size={24} />
            </div>
          </div>
          <p className="text-xs font-bold text-amber-600 mb-1">Total Verified Leaders</p>
          <h2 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">{stats.totalLeaders}</h2>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border-b-4 border-emerald-500 shadow-xl dark:shadow-none transition-all hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Activity Pulse</span>
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 shadow-inner">
              <Zap size={24} />
            </div>
          </div>
          <p className="text-xs font-bold text-emerald-600 mb-1">Active Influencers</p>
          <h2 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">{stats.activeLeaders}</h2>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="bg-white dark:bg-slate-900/50 p-5 rounded-[2.5rem] border border-slate-200 dark:border-white/5 mb-8 flex flex-col xl:flex-row items-center gap-6 shadow-sm">
        <div className="relative w-full xl:flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, Name, Email or Phone..."
            className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white transition-all font-bold placeholder:font-medium"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
          <select
            onChange={(e) => handleFilter("rank", e.target.value)}
            className="flex-1 sm:flex-none px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-all"
          >
            <option value="all">All Tiers</option>
            <option value="Gold">Gold Tier</option>
            <option value="Silver">Silver Tier</option>
            <option value="Bronze">Bronze Tier</option>
            <option value="None">Unranked</option>
          </select>

          <button
            onClick={exportToCSV}
            disabled={filteredUsers.length === 0}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={18} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-blur-sm">
        <LeaderTable users={filteredUsers} />
      </div>
    </motion.div>
  );
}