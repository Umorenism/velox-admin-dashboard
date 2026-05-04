// import React, { useState, useEffect } from 'react';
// import { apiClient } from '../../api/apiClient'; // Adjust path as needed
// import { 
//   Users, Wallet, Package, TrendingUp, 
//   ChevronDown, ChevronRight, Search, AlertCircle 
// } from 'lucide-react';

// const UnilevelDashboard = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedUsers, setExpandedUsers] = useState({});
  
//   // Pagination State
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);
//         const response = await apiClient.get('/api/admin/stats');
//         setData(response.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch dashboard data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const toggleExpand = (id) => {
//     setExpandedUsers(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-[#0a0f14] flex items-center justify-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//     </div>
//   );

//   if (error) return (
//     <div className="min-h-screen bg-[#0a0f14] flex items-center justify-center p-4">
//       <div className="bg-red-900/20 border border-red-500 text-red-200 p-4 rounded-lg flex items-center gap-3">
//         <AlertCircle /> {error}
//       </div>
//     </div>
//   );

//   const { summary, users } = data;
  
//   // Basic Pagination Logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <div className="min-h-screen bg-[#0a0f14] text-slate-200 p-4 md:p-8 font-sans">
//       {/* Header */}
//       <header className="mb-8 border-b border-teal-900/30 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-amber-400">
//             Unilevel Analysis
//           </h1>
//           <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest">Velox Capital Markets Admin</p>
//         </div>
//         <div className="flex items-center gap-2 text-xs font-bold px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full border border-teal-500/20">
//           <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div> LIVE STATS
//         </div>
//       </header>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <StatCard title="Total Network Users" value={summary.totalUsers} icon={<Users size={20}/>} color="teal" />
//         <StatCard title="Total Deposited" value={`$${summary.totalDeposited.toLocaleString()}`} icon={<Wallet size={20}/>} color="gold" />
//         <StatCard title="Active Packages" value={summary.totalActivePackages} icon={<Package size={20}/>} color="teal" />
//         <StatCard title="Bull Wallet Total" value={`$${summary.totalBullWallet}`} icon={<TrendingUp size={20}/>} color="gold" />
//       </div>

//       {/* Main Hierarchy Table */}
//       <div className="bg-[#111821] border border-teal-900/20 rounded-xl overflow-hidden shadow-2xl">
//         <div className="p-5 border-b border-teal-900/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <h2 className="text-lg font-semibold text-teal-100 flex items-center gap-2">
//             Network Hierarchy <span className="text-xs bg-teal-900/50 px-2 py-1 rounded text-teal-400">{users.length} Leaders</span>
//           </h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-[#161e29] text-teal-500 uppercase text-[10px] font-bold tracking-widest">
//               <tr>
//                 <th className="p-4">User Details</th>
//                 <th className="p-4">Rank & Role</th>
//                 <th className="p-4">Referrals</th>
//                 <th className="p-4">Wallet Balance</th>
//                 <th className="p-4 text-right">View Downline</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-teal-900/10">
//               {currentUsers.map((user) => (
//                 <React.Fragment key={user.id}>
//                   <tr className="hover:bg-teal-900/5 transition-colors group">
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-teal-900 flex items-center justify-center font-bold text-white shadow-lg">
//                           {user.name.charAt(0).toUpperCase()}
//                         </div>
//                         <div className="flex flex-col">
//                           <span className="font-medium text-white capitalize">{user.name}</span>
//                           <span className="text-xs text-slate-500">{user.email}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       <div className="flex flex-col gap-1">
//                         <span className="px-2 py-0.5 bg-teal-950 text-teal-400 rounded border border-teal-500/30 text-[10px] w-fit font-bold uppercase">
//                           {user.role}
//                         </span>
//                         <span className="text-xs text-amber-500 font-bold uppercase italic">
//                           {user.rank}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-2 text-sm">
//                          <div className="p-1.5 bg-slate-800 rounded text-slate-400 group-hover:text-teal-400">
//                            <Users size={14}/>
//                          </div>
//                          <span>{user.downlines.directCount} Directs</span>
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       <span className="text-amber-400 font-mono font-bold">
//                         ${user.totalWalletBalance.toLocaleString()}
//                       </span>
//                     </td>
//                     <td className="p-4 text-right">
//                       <button 
//                         onClick={() => toggleExpand(user.id)}
//                         className={`p-2 rounded-lg transition-all ${expandedUsers[user.id] ? 'bg-amber-500 text-black' : 'bg-teal-500/10 text-teal-500 hover:bg-teal-500/20'}`}
//                       >
//                         {expandedUsers[user.id] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
//                       </button>
//                     </td>
//                   </tr>

//                   {/* Expanded Downline View */}
//                   {expandedUsers[user.id] && (
//                     <tr className="bg-[#0c1219] border-l-4 border-amber-500">
//                       <td colSpan="5" className="p-4 md:p-6">
//                         <div className="space-y-4">
//                           <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-4">Direct Downline Members</h4>
//                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {user.downlines.downlineDetails.map(dl => (
//                               <div key={dl.id} className="bg-[#161e29] p-4 rounded-xl border border-teal-900/20 hover:border-teal-500/40 transition-all">
//                                 <div className="flex justify-between items-start mb-3">
//                                   <div className="text-xs font-bold text-teal-400 capitalize">{dl.name}</div>
//                                   <div className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded font-bold uppercase">{dl.role}</div>
//                                 </div>
//                                 <div className="flex justify-between items-center text-slate-400">
//                                   <div className="text-[10px]">
//                                     <p>Deposit: <span className="text-white">${dl.wallets.deposit}</span></p>
//                                     <p>Earned: <span className="text-white">${dl.totalRebatesEarned}</span></p>
//                                   </div>
//                                   <div className="text-right">
//                                     <p className="text-[10px] text-slate-500">Total Balance</p>
//                                     <p className="text-sm font-mono font-bold text-amber-400">${dl.totalWalletBalance}</p>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="p-4 bg-[#161e29]/50 border-t border-teal-900/20 flex flex-col sm:flex-row justify-between items-center gap-4">
//           <p className="text-xs text-slate-500">
//             Showing <span className="text-teal-400">{indexOfFirstItem + 1}</span> to <span className="text-teal-400">{Math.min(indexOfLastItem, users.length)}</span> of {users.length} Leaders
//           </p>
//           <div className="flex gap-2">
//             <button 
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(prev => prev - 1)}
//               className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-teal-900/20 border border-teal-800 rounded disabled:opacity-30 hover:bg-teal-800 transition-colors"
//             >
//               Prev
//             </button>
//             <button 
//               disabled={indexOfLastItem >= users.length}
//               onClick={() => setCurrentPage(prev => prev + 1)}
//               className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-teal-600 text-white rounded hover:bg-teal-500 transition-colors shadow-lg shadow-teal-900/20"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Internal StatCard Component
// const StatCard = ({ title, value, icon, color }) => {
//   const isTeal = color === 'teal';
//   return (
//     <div className={`p-5 rounded-xl border transition-all hover:scale-[1.02] ${isTeal ? 'border-teal-900/30 bg-teal-950/10' : 'border-amber-900/30 bg-amber-950/10'}`}>
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{title}</p>
//           <h3 className={`text-2xl font-mono font-bold ${isTeal ? 'text-teal-400' : 'text-amber-500'}`}>{value}</h3>
//         </div>
//         <div className={`p-3 rounded-xl shadow-inner ${isTeal ? 'bg-teal-500/10 text-teal-400' : 'bg-amber-500/10 text-amber-500'}`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UnilevelDashboard;








import React, { useState, useEffect } from 'react';
import { apiClient } from '../../api/apiClient'; 
import { 
  Users, Wallet, Package, TrendingUp, 
  ChevronDown, ChevronRight, Search, AlertCircle 
} from 'lucide-react';

const UnilevelDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedUsers, setExpandedUsers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/api/admin/stats');
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const toggleExpand = (id) => {
    setExpandedUsers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-slate-900/50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-white dark:bg-slate-900/50 flex items-center justify-center p-4">
      <div className="bg-red-900/20 border border-red-500 text-red-200 p-4 rounded-lg flex items-center gap-3">
        <AlertCircle /> {error}
      </div>
    </div>
  );

  const { summary, users } = data;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 p-4 md:p-8 font-sans transition-colors duration-300">
      {/* Header */}
      <header className="mb-8 border-b border-slate-200 dark:border-teal-900/30 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-amber-500">
            Unilevel Analysis
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 uppercase tracking-widest">Velox Capital Markets Admin</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold px-3 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full border border-teal-500/20">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div> LIVE STATS
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Network Users" value={summary.totalUsers} icon={<Users size={20}/>} color="teal" />
        <StatCard title="Total Deposited" value={`$${summary.totalDeposited.toLocaleString()}`} icon={<Wallet size={20}/>} color="gold" />
        <StatCard title="Active Packages" value={summary.totalActivePackages} icon={<Package size={20}/>} color="teal" />
        <StatCard title="Bull Wallet Total" value={`$${summary.totalBullWallet}`} icon={<TrendingUp size={20}/>} color="gold" />
      </div>

      {/* Main Hierarchy Table */}
      <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-teal-900/20 rounded-xl overflow-hidden shadow-xl backdrop-blur-sm">
        <div className="p-5 border-b border-slate-200 dark:border-teal-900/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-teal-100 flex items-center gap-2">
            Network Hierarchy <span className="text-xs bg-teal-100 dark:bg-teal-900/50 px-2 py-1 rounded text-teal-700 dark:text-teal-400">{users.length} Leaders</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800/50 text-teal-700 dark:text-teal-500 uppercase text-[10px] font-bold tracking-widest">
              <tr>
                <th className="p-4">User Details</th>
                <th className="p-4">Rank & Role</th>
                <th className="p-4">Referrals</th>
                <th className="p-4">Wallet Balance</th>
                <th className="p-4 text-right">View Downline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-teal-900/10">
              {currentUsers.map((user) => (
                <React.Fragment key={user.id}>
                  <tr className="hover:bg-slate-100 dark:hover:bg-teal-900/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center font-bold text-white shadow-md">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900 dark:text-white capitalize">{user.name}</span>
                          <span className="text-xs text-slate-500">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className="px-2 py-0.5 bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 rounded border border-teal-200 dark:border-teal-500/30 text-[10px] w-fit font-bold uppercase">
                          {user.role}
                        </span>
                        <span className="text-xs text-amber-600 dark:text-amber-500 font-bold uppercase italic">
                          {user.rank}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                         <div className="p-1.5 bg-slate-200 dark:bg-slate-800 rounded text-slate-500 dark:text-slate-400 group-hover:text-teal-500">
                           <Users size={14}/>
                         </div>
                         <span>{user.downlines.directCount} Directs</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-amber-600 dark:text-amber-400 font-mono font-bold text-lg">
                        ${user.totalWalletBalance.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => toggleExpand(user.id)}
                        className={`p-2 rounded-lg transition-all ${expandedUsers[user.id] ? 'bg-amber-500 text-white dark:text-slate-900' : 'bg-teal-500/10 text-teal-600 dark:text-teal-500 hover:bg-teal-500/20'}`}
                      >
                        {expandedUsers[user.id] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Downline View */}
                  {expandedUsers[user.id] && (
                    <tr className="bg-slate-50/50 dark:bg-slate-900/80 border-l-4 border-amber-500">
                      <td colSpan="5" className="p-4 md:p-6">
                        <div className="space-y-4">
                          <h4 className="text-[10px] font-black text-amber-600 dark:text-amber-500 uppercase tracking-[0.2em] mb-4">Direct Downline Members</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {user.downlines.downlineDetails.map(dl => (
                              <div key={dl.id} className="bg-white dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-teal-900/20 hover:border-teal-500/40 transition-all shadow-sm">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="text-xs font-bold text-teal-600 dark:text-teal-400 capitalize">{dl.name}</div>
                                  <div className="text-[10px] px-2 py-0.5 bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-500 rounded font-bold uppercase">{dl.role}</div>
                                </div>
                                <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                                  <div className="text-[10px]">
                                    <p>Deposit: <span className="text-slate-900 dark:text-white">${dl.wallets.deposit}</span></p>
                                    <p>Earned: <span className="text-slate-900 dark:text-white">${dl.totalRebatesEarned}</span></p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[10px]">Total Balance</p>
                                    <p className="text-sm font-mono font-bold text-amber-600 dark:text-amber-400">${dl.totalWalletBalance}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 bg-slate-100/50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-teal-900/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            Showing <span className="text-teal-600 dark:text-teal-400 font-bold">{indexOfFirstItem + 1}</span> to <span className="text-teal-600 dark:text-teal-400 font-bold">{Math.min(indexOfLastItem, users.length)}</span> of {users.length} Leaders
          </p>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 text-xs font-bold uppercase bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Prev
            </button>
            <button 
              disabled={indexOfLastItem >= users.length}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 text-xs font-bold uppercase bg-teal-600 text-white rounded hover:bg-teal-500 transition-all shadow-lg shadow-teal-900/20"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  const isTeal = color === 'teal';
  return (
    <div className={`p-5 rounded-xl border transition-all hover:translate-y-[-2px] shadow-sm ${
      isTeal 
      ? 'border-teal-100 dark:border-teal-900/30 bg-white dark:bg-slate-900/40' 
      : 'border-amber-100 dark:border-amber-900/30 bg-white dark:bg-slate-900/40'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{title}</p>
          <h3 className={`text-2xl font-mono font-bold ${isTeal ? 'text-teal-600 dark:text-teal-400' : 'text-amber-600 dark:text-amber-500'}`}>{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${isTeal ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500'}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default UnilevelDashboard;