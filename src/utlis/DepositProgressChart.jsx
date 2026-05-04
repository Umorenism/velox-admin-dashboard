



// import React, { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   ReferenceLine,
//   LabelList,
// } from "recharts";
// import { apiClient } from "../api/apiClient";

// // Helper to get short month name (e.g. "Feb")
// const getCurrentMonth = () => {
//   return new Date().toLocaleString("en-US", { month: "short" });
// };

// export const DepositProgressChart = () => {
//   const [chartData, setChartData] = useState([]);
//   const [target, setTarget] = useState(1000000000); // 1B fallback
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDepositData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await apiClient.get("/api/admin/graph/deposits");
//         console.log("Deposit API response:", response.data);

//         const apiDeposits = response.data?.totalDeposits ?? 0;
//         const apiTarget = response.data?.target ?? 1000000000;

//         setTarget(apiTarget);

//         const currentMonth = getCurrentMonth();

//         setChartData([
//           {
//             month: currentMonth,
//             Deposits: apiDeposits,
//           },
//         ]);
//       } catch (err) {
//         console.error("Failed to fetch deposit stats:", err);
//         setError("Could not load deposit progress");
        
//         // Fallback display
//         setChartData([
//           {
//             month: getCurrentMonth(),
//             Deposits: 0,
//           },
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDepositData();
//   }, []);

//   // Format large numbers (K, M, B)
//   const formatValue = (value) => {
//     if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
//     if (value >= 1_000_000)    return `${(value / 1_000_000).toFixed(1)}M`;
//     if (value >= 1_000)        return `${(value / 1_000).toFixed(1)}K`;
//     return value.toLocaleString();
//   };

//   const currentDeposits = chartData[0]?.Deposits ?? 0;
//   const progressPercent = target > 0 ? (currentDeposits / target) * 100 : 0;
//   const displayedPercent = Math.min(100, progressPercent).toFixed(1);

//   return (
//     <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm p-5 w-full">
//       {/* Header with progress summary */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
//         <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
//           Deposit Progress – {getCurrentMonth()} 2026
//         </h2>
//         <div className="text-sm font-medium">
//           <span className="text-emerald-700 dark:text-emerald-400">
//             {formatValue(currentDeposits)}
//           </span>
//           <span className="text-gray-500 dark:text-gray-400 mx-1.5">/</span>
//           <span className="text-gray-700 dark:text-gray-300">
//             {formatValue(target)}
//           </span>
//           <span className="ml-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
//             ({displayedPercent}%)
//           </span>
//         </div>
//       </div>

//       <hr className="border-gray-200 dark:border-neutral-800 mb-5" />

//       {loading ? (
//         <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400">
//           Loading deposit data...
//         </div>
//       ) : error ? (
//         <div className="h-80 flex items-center justify-center text-red-600 dark:text-red-400">
//           {error}
//         </div>
//       ) : (
//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={chartData}
//               margin={{ top: 30, right: 30, left: 10, bottom: 10 }}
//             >
//               <CartesianGrid
//                 strokeDasharray="3 3"
//                 vertical={false}
//                 stroke="#e5e7eb"
//                 className="dark:stroke-neutral-700"
//               />
//               <XAxis
//                 dataKey="month"
//                 tick={{ fill: "#6b7280", fontSize: 12 }}
//                 axisLine={false}
//                 tickLine={false}
//               />
//               <YAxis
//                 tickFormatter={formatValue}
//                 tick={{ fill: "#6b7280", fontSize: 12 }}
//                 axisLine={false}
//                 tickLine={false}
//                 domain={[0, Math.max(target * 1.15, currentDeposits * 1.4) || target * 1.15]}
//               />
//               <Tooltip
//                 formatter={(value) => [formatValue(value), "Deposits"]}
//                 contentStyle={{
//                   backgroundColor: "#111827",
//                   border: "none",
//                   borderRadius: "8px",
//                   color: "#f3f4f6",
//                   fontSize: "13px",
//                   padding: "10px 14px",
//                 }}
//               />

//               <Bar
//                 dataKey="Deposits"
//                 fill="#10b981"           // emerald-600
//                 radius={[6, 6, 0, 0]}
//                 barSize={50}
//                 maxBarSize={80}
//               >
//                 <LabelList
//                   dataKey="Deposits"
//                   position="top"
//                   formatter={formatValue}
//                   fill="#10b981"
//                   fontSize={13}
//                   fontWeight={600}
//                   offset={12}
//                 />
//               </Bar>

//               <ReferenceLine
//                 y={target}
//                 stroke="#dc2626"          // red-600
//                 strokeWidth={2}
//                 strokeDasharray="4 4"
//                 label={{
//                   value: "₦1B Target",
//                   position: "top",
//                   fill: "#dc2626",
//                   fontSize: 12,
//                   fontWeight: 500,
//                   offset: 18,
//                 }}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// };







// import React, { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LabelList,
// } from "recharts";
// import { getUsers } from "../api/userApi";

// export const AdminUserAnalyticsChart = () => {
//   const [data, setData] = useState([]);
//   const [summary, setSummary] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);

//         const res = await getUsers();
//         const users = res?.users || [];

//         // 🔥 ANALYTICS CALCULATION
//         let totalUsers = users.length;
//         let activeUsers = 0;
//         let restrictedUsers = 0;
//         let frozenUsers = 0;
//         let verifiedUsers = 0;
//         let totalReferrals = 0;

//         let totalDeposit = 0;
//         let totalBull = 0;
//         let totalBear = 0;

//         users.forEach((user) => {
//           if (user.userState === "trading") activeUsers++;
//           if (user.restrictionStatus?.isRestricted) restrictedUsers++;
//           if (user.freezeStatus?.isFrozen) frozenUsers++;
//           if (user.emailVerified) verifiedUsers++;

//           totalReferrals += user.referrals || 0;

//           totalDeposit += user.wallets?.deposit || 0;
//           totalBull += user.wallets?.bull || 0;
//           totalBear += user.wallets?.bear || 0;
//         });

//         // 📊 CHART DATA
//         const chart = [
//           { name: "Users", value: totalUsers },
//           { name: "Active", value: activeUsers },
//           { name: "Verified", value: verifiedUsers },
//           { name: "Restricted", value: restrictedUsers },
//           { name: "Frozen", value: frozenUsers },
//         ];

//         setData(chart);

//         setSummary({
//           totalUsers,
//           activeUsers,
//           verifiedUsers,
//           restrictedUsers,
//           frozenUsers,
//           totalReferrals,
//           totalDeposit,
//           totalBull,
//           totalBear,
//         });
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load analytics");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const format = (num) => {
//     if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
//     if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
//     return num;
//   };

//   return (
//     <div className="bg-white dark:bg-neutral-900 rounded-2xl border p-6 shadow-sm">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="font-semibold text-gray-800 dark:text-white">
        
//         </h2>
//         <span className="text-xs text-gray-500">
//           Real-time user insight
//         </span>
//       </div>

//       {loading ? (
//         <div className="h-72 flex items-center justify-center">
//           Loading analytics...
//         </div>
//       ) : error ? (
//         <div className="text-red-500">{error}</div>
//       ) : (
//         <>
//           {/* SUMMARY CARDS */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//             <Card title="Total Users" value={summary.totalUsers} />
//             <Card title="Active Traders" value={summary.activeUsers} />
//             <Card title="Verified" value={summary.verifiedUsers} />
//             <Card title="Referrals" value={summary.totalReferrals} />
//           </div>

//           {/* WALLET STATS */}
//           <div className="grid grid-cols-3 gap-4 mb-6">
//             <WalletCard title="Deposit Wallet" value={summary.totalDeposit} />
//             <WalletCard title="Bull Wallet" value={summary.totalBull} />
//             <WalletCard title="Bear Wallet" value={summary.totalBear} />
//           </div>

//           {/* CHART */}
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
                
//                 <XAxis
//                   dataKey="name"
//                   tick={{ fill: "#6b7280", fontSize: 12 }}
//                 />

//                 <YAxis
//                   tickFormatter={format}
//                   tick={{ fill: "#6b7280", fontSize: 12 }}
//                 />

//                 <Tooltip />

//                 <Bar
//                   dataKey="value"
//                   fill="#00A991"
//                   radius={[8, 8, 0, 0]}
//                 >
//                   <LabelList
//                     dataKey="value"
//                     position="top"
//                     formatter={format}
//                     fill="#00A991"
//                     fontSize={12}
//                   />
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// const Card = ({ title, value }) => (
//   <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border text-center">
//     <p className="text-xs text-gray-500">{title}</p>
//     <h3 className="text-lg font-bold">{value}</h3>
//   </div>
// );

// const WalletCard = ({ title, value }) => (
//   <div className="bg-white dark:bg-gray-900 border rounded-xl p-4 text-center shadow-sm">
//     <p className="text-xs text-gray-500">{title}</p>
//     <h3 className="font-bold text-[#00A991]">
//       ₦{value.toLocaleString()}
//     </h3>
//   </div>
// );







// import React, { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LabelList,
//   Cell,
// } from "recharts";
// import { getUsers } from "../api/userApi";

// export const AdminUserAnalyticsChart = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);

//         const res = await getUsers();

//         // ✅ handle both possible structures
//         const users = res?.users || res?.data || [];

//         let totalDeposit = 0;
//         let totalTrading = 0;
//         let totalBonus = 0;

//         users.forEach((user) => {
//           const transactions = user.transactions || [];

//           transactions.forEach((tx) => {
//             if (tx.status !== "approved") return;

//             switch (tx.type) {
//               case "package_purchase":
//                 totalDeposit += tx.amount;
//                 break;

//               case "bear_trading_pool":
//                 totalTrading += tx.amount;
//                 break;

//               case "fast_start_bonus":
//               case "unilevel_bonus":
//               case "leadership_bonus":
//                 totalBonus += tx.amount;
//                 break;

//               default:
//                 break;
//             }
//           });
//         });

//         // 📊 Chart Data
//         const chartData = [
//           { name: "Deposits", value: totalDeposit },
//           { name: "Trading", value: totalTrading },
//           { name: "Bonuses", value: totalBonus },
//         ];

//         setData(chartData);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load transaction analytics");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const format = (num) => {
//     if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
//     if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
//     return num;
//   };

//   const colors = ["#10B981", "#3B82F6", "#F59E0B"];

//   return (
//     <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-gray-200 dark:border-white/5 p-6 shadow-sm">
      
//       {/* HEADER */}
//       <div className="mb-6">
//         <h2 className="text-lg font-bold text-gray-800 dark:text-white">
//           Transaction Overview
//         </h2>
//         <p className="text-xs text-gray-500">
//           System financial flow (Deposits, Trading, Bonuses)
//         </p>
//       </div>

//       {loading ? (
//         <div className="h-96 flex items-center justify-center text-gray-500">
//           Loading chart...
//         </div>
//       ) : error ? (
//         <div className="text-red-500 text-center">{error}</div>
//       ) : (
//         <div className="h-96">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data}>
//               <CartesianGrid
//                 strokeDasharray="3 3"
//                 vertical={false}
//                 strokeOpacity={0.2}
//               />

//               <XAxis
//                 dataKey="name"
//                 tick={{ fill: "#6b7280", fontSize: 12 }}
//                 axisLine={false}
//                 tickLine={false}
//               />

//               <YAxis
//                 tickFormatter={format}
//                 tick={{ fill: "#6b7280", fontSize: 12 }}
//                 axisLine={false}
//                 tickLine={false}
//               />

//               <Tooltip
//                 formatter={(value) => `₦${value.toLocaleString()}`}
//                 contentStyle={{
//                   borderRadius: "12px",
//                   border: "none",
//                   background: "#0f172a",
//                   color: "#fff",
//                 }}
//               />

//               <Bar dataKey="value" radius={[10, 10, 0, 0]}>
//                 <LabelList
//                   dataKey="value"
//                   position="top"
//                   formatter={(v) => `₦${format(v)}`}
//                   className="fill-gray-700 dark:fill-gray-300 text-xs"
//                 />

//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={colors[index]} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// };





// import React, { useState, useEffect } from "react";
// import {
//   PieChart,
//   Pie,
//   Tooltip,
//   Cell,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { getUsers } from "../api/userApi";

// export const AdminUserAnalyticsChart = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);

//         const res = await getUsers();
//         const users = res?.users || res?.data || [];

//         let totalDeposit = 0;
//         let totalTrading = 0;
//         let totalBonus = 0;

//         users.forEach((user) => {
//           // ✅ PRIORITY 1: USE WALLET (REAL VALUE)
//           if (user.wallets) {
//             totalDeposit += user.wallets.deposit || 0;
//             totalTrading += user.wallets.bear || 0;
//             totalBonus += user.wallets.bull || 0;
//           }

//           // ✅ PRIORITY 2: FALLBACK TO TRANSACTIONS (FLOW)
//           const transactions = user.transactions || [];

//           transactions.forEach((tx) => {
//             if (tx.status !== "approved") return;

//             switch (tx.type) {
//               case "package_purchase":
//                 totalDeposit += tx.amount;
//                 break;

//               case "bear_trading_pool":
//                 totalTrading += tx.amount;
//                 break;

//               case "fast_start_bonus":
//               case "unilevel_bonus":
//               case "leadership_bonus":
//                 totalBonus += tx.amount;
//                 break;

//               default:
//                 break;
//             }
//           });
//         });

//         const chartData = [
//           { name: "Deposits", value: totalDeposit },
//           { name: "Trading", value: totalTrading },
//           { name: "Bonuses", value: totalBonus },
//         ];

//         setData(chartData);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load analytics");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const format = (num) => {
//     if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
//     if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
//     return num;
//   };

//   const COLORS = ["#10B981", "#3B82F6", "#F59E0B"];

//   return (
//     <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-gray-200 dark:border-white/5 p-6 shadow-sm">

//       {/* HEADER */}
//       <div className="mb-6">
//         <h2 className="text-lg font-bold text-gray-800 dark:text-white">
//           Financial Overview
//         </h2>
//         <p className="text-xs text-gray-500">
//           Wallet + Transaction combined analytics
//         </p>
//       </div>

//       {loading ? (
//         <div className="h-80 flex items-center justify-center text-gray-500">
//           Loading chart...
//         </div>
//       ) : error ? (
//         <div className="text-red-500 text-center">{error}</div>
//       ) : (
//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 dataKey="value"
//                 nameKey="name"
//                 innerRadius={60}
//                 outerRadius={100}
//                 paddingAngle={5}
//                 label={({ value }) => `₦${format(value)}`}
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                 ))}
//               </Pie>

//               <Tooltip
//                 formatter={(value) => `₦${value.toLocaleString()}`}
//                 contentStyle={{
//                   borderRadius: "12px",
//                   border: "none",
//                   background: "#0f172a",
//                   color: "#fff",
//                 }}
//               />

//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// };







// import React, { useState, useEffect } from "react";
// import {
//   PieChart,
//   Pie,
//   Tooltip,
//   Cell,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { getUsers } from "../api/userApi";

// export const AdminUserAnalyticsChart = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);

//         const res = await getUsers();
//         // Handle different possible response structures
//         const users = res?.users || res?.data || (Array.isArray(res) ? res : []);

//         let totalDeposit = 0;
//         let totalTrading = 0;
//         let totalBonus = 0;

//         users.forEach((user) => {
//           // 1. Snapshot of current Wallet Balances
//           if (user.wallets) {
//             totalDeposit += user.wallets.deposit || 0;
//             totalTrading += user.wallets.bear || 0;
//             totalBonus += user.wallets.bull || 0;
//           }

//           // 2. Summing approved Transaction History for volume analysis
//           const transactions = user.transactions || [];
//           transactions.forEach((tx) => {
//             if (tx.status !== "approved") return;

//             switch (tx.type) {
//               case "package_purchase":
//                 // Tracks total volume processed through deposits
//                 break;
//               case "bear_trading_pool":
//                 totalTrading += tx.amount;
//                 break;
//               case "fast_start_bonus":
//               case "unilevel_bonus":
//               case "leadership_bonus":
//                 totalBonus += tx.amount;
//                 break;
//               default:
//                 break;
//             }
//           });
//         });

//         const chartData = [
//           { name: "Deposits", value: totalDeposit },
//           { name: "Trading Vol", value: totalTrading },
//           { name: "Total Bonuses", value: totalBonus },
//         ];

//         setData(chartData);
//       } catch (err) {
//         console.error("Chart Error:", err);
//         setError("Failed to load analytics");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const formatCurrency = (num) => {
//     if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M`;
//     if (num >= 1_000) return `$${(num / 1_000).toFixed(1)}K`;
//     return `$${num.toLocaleString()}`;
//   };

//   // Velox Capital Palette: Teal, Blue-ish Slate, Amber/Gold
//   const COLORS = ["#14b8a6", "#3b82f6", "#f59e0b"];

//   return (
//     <div className="bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-teal-900/20 p-6 shadow-xl backdrop-blur-sm">
//       {/* HEADER */}
//       <div className="mb-6">
//         <h2 className="text-lg font-bold text-slate-800 dark:text-teal-100 flex items-center gap-2">
//           Financial Distribution
//         </h2>
//         <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
//           Combined Wallet & Transaction Volume
//         </p>
//       </div>

//       {loading ? (
//         <div className="h-80 flex flex-col items-center justify-center text-slate-500 gap-3">
//           <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-teal-500"></div>
//           <span className="text-sm font-medium">Calculating stats...</span>
//         </div>
//       ) : error ? (
//         <div className="h-80 flex items-center justify-center text-red-400 bg-red-400/5 rounded-2xl border border-red-400/20">
//           {error}
//         </div>
//       ) : (
//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 dataKey="value"
//                 nameKey="name"
//                 innerRadius={70}
//                 outerRadius={100}
//                 paddingAngle={8}
//                 stroke="none"
//               >
//                 {data.map((entry, index) => (
//                   <Cell 
//                     key={`cell-${index}`} 
//                     fill={COLORS[index % COLORS.length]} 
//                     className="hover:opacity-80 transition-opacity cursor-pointer"
//                   />
//                 ))}
//               </Pie>

//               <Tooltip
//                 formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]}
//                 contentStyle={{
//                   borderRadius: "16px",
//                   border: "1px solid rgba(20, 184, 166, 0.2)",
//                   background: "#0f172a",
//                   boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
//                 }}
//                 itemStyle={{ color: "#f8fafc", fontSize: "12px", fontWeight: "bold" }}
//                 labelStyle={{ display: "none" }}
//               />

//               <Legend 
//                 verticalAlign="bottom" 
//                 height={36}
//                 formatter={(value) => (
//                   <span className="text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-tighter">
//                     {value}
//                   </span>
//                 )}
//               />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// };







import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getUsers } from "../api/userApi";

export const AdminUserAnalyticsChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await getUsers();
        const users = res?.users || res?.data || (Array.isArray(res) ? res : []);

        let totalDeposit = 0;
        let totalTrading = 0;
        let totalBonus = 0;

        users.forEach((user) => {
          // Current Wallet States
          if (user.wallets) {
            totalDeposit += user.wallets.deposit || 0;
          }

          // Historical Transaction Volume
          const transactions = user.transactions || [];
          transactions.forEach((tx) => {
            if (tx.status !== "approved") return;
            if (tx.type === "bear_trading_pool") totalTrading += tx.amount;
            if (["fast_start_bonus", "unilevel_bonus", "leadership_bonus"].includes(tx.type)) {
              totalBonus += tx.amount;
            }
          });
        });

        setData([
          { name: "Deposits", value: totalDeposit, color: "#14b8a6" },
          { name: "Trading Vol", value: totalTrading, color: "#3b82f6" },
          { name: "Bonuses", value: totalBonus, color: "#f59e0b" },
        ]);
      } catch (err) {
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const formatYAxis = (num) => {
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`;
    return `$${num}`;
  };

  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-teal-900/20 p-6 shadow-xl backdrop-blur-sm">
      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-800 dark:text-teal-100">
          Financial Growth Analysis
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          Transaction Volume by Category
        </p>
      </div>

      {loading ? (
        <div className="h-72 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-teal-500"></div>
        </div>
      ) : error ? (
        <div className="h-72 flex items-center justify-center text-red-400">{error}</div>
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="rgba(20, 184, 166, 0.1)" 
              />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                hide={false}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatYAxis}
                tick={{ fill: '#94a3b8', fontSize: 10 }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(20, 184, 166, 0.05)' }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid rgba(20, 184, 166, 0.2)",
                  background: "#636874",
                }}
                itemStyle={{ fontSize: "13px", fontWeight: "bold" }}
                formatter={(value) => [`$${value.toLocaleString()}`, "Total"]}
              />
              <Bar 
                dataKey="value" 
                radius={[6, 6, 0, 0]} 
                barSize={50}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};