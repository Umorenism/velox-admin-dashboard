



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







import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { getUsers } from "../api/userApi";

export const AdminUserAnalyticsChart = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await getUsers();
        const users = res?.users || [];

        // 🔥 ANALYTICS CALCULATION
        let totalUsers = users.length;
        let activeUsers = 0;
        let restrictedUsers = 0;
        let frozenUsers = 0;
        let verifiedUsers = 0;
        let totalReferrals = 0;

        let totalDeposit = 0;
        let totalBull = 0;
        let totalBear = 0;

        users.forEach((user) => {
          if (user.userState === "trading") activeUsers++;
          if (user.restrictionStatus?.isRestricted) restrictedUsers++;
          if (user.freezeStatus?.isFrozen) frozenUsers++;
          if (user.emailVerified) verifiedUsers++;

          totalReferrals += user.referrals || 0;

          totalDeposit += user.wallets?.deposit || 0;
          totalBull += user.wallets?.bull || 0;
          totalBear += user.wallets?.bear || 0;
        });

        // 📊 CHART DATA
        const chart = [
          { name: "Users", value: totalUsers },
          { name: "Active", value: activeUsers },
          { name: "Verified", value: verifiedUsers },
          { name: "Restricted", value: restrictedUsers },
          { name: "Frozen", value: frozenUsers },
        ];

        setData(chart);

        setSummary({
          totalUsers,
          activeUsers,
          verifiedUsers,
          restrictedUsers,
          frozenUsers,
          totalReferrals,
          totalDeposit,
          totalBull,
          totalBear,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const format = (num) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num;
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border p-6 shadow-sm">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-gray-800 dark:text-white">
        
        </h2>
        <span className="text-xs text-gray-500">
          Real-time user insight
        </span>
      </div>

      {loading ? (
        <div className="h-72 flex items-center justify-center">
          Loading analytics...
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card title="Total Users" value={summary.totalUsers} />
            <Card title="Active Traders" value={summary.activeUsers} />
            <Card title="Verified" value={summary.verifiedUsers} />
            <Card title="Referrals" value={summary.totalReferrals} />
          </div>

          {/* WALLET STATS */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <WalletCard title="Deposit Wallet" value={summary.totalDeposit} />
            <WalletCard title="Bull Wallet" value={summary.totalBull} />
            <WalletCard title="Bear Wallet" value={summary.totalBear} />
          </div>

          {/* CHART */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />

                <YAxis
                  tickFormatter={format}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#00A991"
                  radius={[8, 8, 0, 0]}
                >
                  <LabelList
                    dataKey="value"
                    position="top"
                    formatter={format}
                    fill="#00A991"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border text-center">
    <p className="text-xs text-gray-500">{title}</p>
    <h3 className="text-lg font-bold">{value}</h3>
  </div>
);

const WalletCard = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-900 border rounded-xl p-4 text-center shadow-sm">
    <p className="text-xs text-gray-500">{title}</p>
    <h3 className="font-bold text-[#00A991]">
      ₦{value.toLocaleString()}
    </h3>
  </div>
);


