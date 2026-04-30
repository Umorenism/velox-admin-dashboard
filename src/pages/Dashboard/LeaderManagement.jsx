// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Search, Download, Crown, Zap, Loader2 } from "lucide-react";
// import { getTotalLeaders, getActiveLeaders, getleaderAllUsers } from "../../api/leaderApi";
// import * as XLSX from "xlsx";
// import LeaderTable from "../../utlis/LeaderTable";

// export default function LeaderManagement() {
//   const [stats, setStats] = useState({
//     totalLeaders: 0,
//     activeLeaders: 0,
//   });
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filter, setFilter] = useState({ rank: "all", role: "all" });

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [totalRes, activeRes, usersRes] = await Promise.all([
//           getTotalLeaders(),
//           getActiveLeaders(),
//           getleaderAllUsers(),
//         ]);

//         setStats({
//           totalLeaders: totalRes?.total || 0,
//           activeLeaders: activeRes?.total || 0,
//         });
        
//         const liveUsers = (usersRes || []).map(user => ({
//           ...user,
//           rank: determineRank(user),
//           // Normalizing phone search capability
//           fullPhone: [user.phone].filter(Boolean).join(" ")
//         }));
        
//         setUsers(liveUsers);
//       } catch (error) {
//         console.error("Critical: Data synchronization failed", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const determineRank = (user) => {
//     const count = Number(user.referrals) || 0;
//     if (count >= 10) return "Gold";
//     if (count >= 5) return "Silver";
//     if (count >= 1) return "Bronze";
//     return "None";
//   };

//   const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());
//   const handleFilter = (type, value) => setFilter((prev) => ({ ...prev, [type]: value }));

//   const filteredUsers = users.filter((user) => {
//     const searchStr = searchQuery.trim();
//     const matchesSearch = !searchStr || [
//       user.name, 
//       user.email, 
//       user._id, 
//       user.phone 
//     ].some(field => field?.toLowerCase().includes(searchStr));

//     const matchesRank = filter.rank === "all" || user.rank === filter.rank;
//     const matchesRole = filter.role === "all" || user.role === filter.role;
    
//     return matchesSearch && matchesRank && matchesRole;
//   });

//   const exportToCSV = () => {
//     if (filteredUsers.length === 0) return;
    
//     const worksheet = XLSX.utils.json_to_sheet(
//       filteredUsers.map((user) => ({
//         "System ID": user._id,
//         "Full Name": user.name,
//         "Email Address": user.email,
//         "Contact": user.phone,
//         "Account Role": user.role,
//         "Achievement Rank": user.rank,
//         "Total Referrals": user.referrals || 0,
//       }))
//     );
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Live_Leader_Report");
//     XLSX.writeFile(workbook, `Leader_Analytics_${Date.now()}.xlsx`);
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617]">
//         <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
//         <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Synchronizing Live Data...</p>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="p-4 sm:p-8 max-w-[1600px] mx-auto min-h-screen bg-gray-50 dark:bg-[#020617] transition-colors duration-300"
//     >
//       <div className="mb-10">
//         <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Leader Management</h1>
//         <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Real-time oversight of platform influencers</p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
//         <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none">
//           <div className="flex items-center justify-between mb-4">
//             <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total Leaders</span>
//             <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/10"><Crown size={20} className="text-amber-500" /></div>
//           </div>
//           <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{stats.totalLeaders}</h2>
//         </div>

//         <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none">
//           <div className="flex items-center justify-between mb-4">
//             <span className="text-xs font-black uppercase tracking-widest text-slate-400">Active Leaders</span>
//             <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10"><Zap size={20} className="text-emerald-500" /></div>
//           </div>
//           <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{stats.activeLeaders}</h2>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-slate-900/50 p-4 rounded-[2rem] border border-slate-200 dark:border-white/5 mb-6 flex flex-col xl:flex-row items-center gap-4 shadow-sm">
//         <div className="relative w-full xl:flex-1">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//           <input
//             type="text"
//             placeholder="Search verified records..."
//             className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white transition-all font-medium"
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//         </div>

//         <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
//           <select
//             onChange={(e) => handleFilter("rank", e.target.value)}
//             className="flex-1 sm:flex-none px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
//           >
//             <option value="all">All Achievement Tiers</option>
//             <option value="Gold">Gold Tier</option>
//             <option value="Silver">Silver Tier</option>
//             <option value="Bronze">Bronze Tier</option>
//             <option value="None">Unranked</option>
//           </select>

//           <button
//             onClick={exportToCSV}
//             disabled={filteredUsers.length === 0}
//             className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <Download size={16} />
//             <span>Export Analytics</span>
//           </button>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-xl overflow-hidden">
//         <LeaderTable users={filteredUsers} />
//       </div>
//     </motion.div>
//   );
// }






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

        setStats({
          totalLeaders: totalRes?.total || 0,
          activeLeaders: activeRes?.total || 0,
        });
        
        const liveUsers = (usersRes || []).map(user => ({
          ...user,
          // 1. Fix: Ensure rank is never undefined/none-cased
          rank: determineRank(user),
          // 2. Fix: Maintenance of phone only, handling potential nulls
          phone: user.phone || "N/A"
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
    // If the API already provides a rank string like "none", capitalize it
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
      user.phone // Matches the phone field directly
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
        "System ID": user._id,
        "Full Name": user.name,
        "Email Address": user.email,
        "Contact": user.phone, // Maintained phone only
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
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Leader Management</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Real-time oversight of platform influencers</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total Leaders</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/10"><Crown size={20} className="text-amber-500" /></div>
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{stats.totalLeaders}</h2>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Active Leaders</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10"><Zap size={20} className="text-emerald-500" /></div>
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{stats.activeLeaders}</h2>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="bg-white dark:bg-slate-900/50 p-4 rounded-[2rem] border border-slate-200 dark:border-white/5 mb-6 flex flex-col xl:flex-row items-center gap-4 shadow-sm">
        <div className="relative w-full xl:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search verified records..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white transition-all font-medium"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <select
            onChange={(e) => handleFilter("rank", e.target.value)}
            className="flex-1 sm:flex-none px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Achievement Tiers</option>
            <option value="Gold">Gold Tier</option>
            <option value="Silver">Silver Tier</option>
            <option value="Bronze">Bronze Tier</option>
            <option value="None">Unranked</option>
          </select>

          <button
            onClick={exportToCSV}
            disabled={filteredUsers.length === 0}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={16} />
            <span>Export Analytics</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-xl overflow-hidden">
        <LeaderTable users={filteredUsers} />
      </div>
    </motion.div>
  );
}