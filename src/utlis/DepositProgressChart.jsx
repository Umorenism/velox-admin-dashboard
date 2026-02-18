





// import React, { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   ReferenceLine,
// } from "recharts";
// import { apiClient } from "../api/apiClient";

// // Helper function to get the current month name
// const getCurrentMonth = () => {
//   const date = new Date();
//   return date.toLocaleString("en-US", { month: "short" }); // e.g., "Nov" for November 2025
// };

// export const DepositProgressChart = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDepositData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await apiClient.get("/api/admin/graph/deposits");
//         console.log("Deposit Stats:", response.data);

//         // Get current month dynamically
//         const currentMonth = getCurrentMonth();

//         // Format data for the chart using real API data
//         const chartData = [
//           {
//             name: currentMonth,
//             Deposits: response.data?.totalDeposits || 0,
//             Target: response.data?.target || 1000000000,
//           },
//         ];

//         setData(chartData);
//       } catch (error) {
//         console.error("Error fetching deposit stats:", error.response?.data || error.message);
//         setError("Failed to load deposit data");
//         // Fallback to current month with zero deposits only on failure
//         setData([{ name: getCurrentMonth(), Deposits: 0, Target: 1000000000 }]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDepositData(); // Fetch data on mount
//   }, []);

//   // Format large numbers for Y-axis and tooltip
//   const formatNumber = (value) => {
//     if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
//     if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
//     if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
//     return value;
//   };

//   return (
//     <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm p-5 w-full mx-auto">
//       <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
//         Real-time deposit progress toward $1B
//       </h2>
//       <hr className="border-gray-200 dark:border-neutral-800 mb-4" />

//       {loading ? (
//         <div className="w-full h-[350px] flex items-center justify-center">
//           <span className="text-gray-500 dark:text-gray-400">Loading...</span>
//         </div>
//       ) : error ? (
//         <div className="w-full h-[350px] flex items-center justify-center">
//           <span className="text-red-500 dark:text-red-400">{error}</span>
//         </div>
//       ) : data.length === 0 ? (
//         <div className="w-full h-[350px] flex items-center justify-center">
//           <span className="text-gray-500 dark:text-gray-400">No Data Available</span>
//         </div>
//       ) : (
//         <div className="w-full h-[350px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data} barGap={4}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
//               <XAxis
//                 dataKey="name"
//                 tick={{ fill: "#6B7280", fontSize: 12 }}
//                 axisLine={false}
//                 tickLine={false}
//               />
//               <YAxis
//                 tick={{ fill: "#6B7280", fontSize: 12 }}
//                 axisLine={false}
//                 tickLine={false}
//                 tickFormatter={formatNumber}
//                 domain={[0, Math.max(1000000000, ...data.map((d) => d.Deposits * 1.2))]} // Dynamic scaling
//               />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "#111827",
//                   borderRadius: "6px",
//                   border: "none",
//                   color: "#fff",
//                   fontSize: "12px",
//                 }}
//                 formatter={(value) => formatNumber(value)}
//               />
//               <Legend
//                 iconType="circle"
//                 iconSize={8}
//                 wrapperStyle={{
//                   fontSize: "12px",
//                   color: "#6B7280",
//                   paddingTop: "10px",
//                 }}
//               />
//               <Bar
//                 dataKey="Deposits"
//                 fill="#A7F3D0" // Light green for deposits
//                 radius={[4, 4, 0, 0]}
//                 barSize={25}
//               />
//               <Bar
//                 dataKey="Target"
//                 fill="#059669" // Dark green for target
//                 radius={[4, 4, 0, 0]}
//                 barSize={25}
//               />
//               <ReferenceLine
//                 y={1000000000}
//                 stroke="#EF4444"
//                 strokeDasharray="3 3"
//                 label={{ value: "$1B Target", fill: "#EF4444", position: "top", fontSize: 12 }}
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
  ReferenceLine,
  LabelList,
} from "recharts";
import { apiClient } from "../api/apiClient";

// Helper to get short month name (e.g. "Feb")
const getCurrentMonth = () => {
  return new Date().toLocaleString("en-US", { month: "short" });
};

export const DepositProgressChart = () => {
  const [chartData, setChartData] = useState([]);
  const [target, setTarget] = useState(1000000000); // 1B fallback
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepositData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get("/api/admin/graph/deposits");
        console.log("Deposit API response:", response.data);

        const apiDeposits = response.data?.totalDeposits ?? 0;
        const apiTarget = response.data?.target ?? 1000000000;

        setTarget(apiTarget);

        const currentMonth = getCurrentMonth();

        setChartData([
          {
            month: currentMonth,
            Deposits: apiDeposits,
          },
        ]);
      } catch (err) {
        console.error("Failed to fetch deposit stats:", err);
        setError("Could not load deposit progress");
        
        // Fallback display
        setChartData([
          {
            month: getCurrentMonth(),
            Deposits: 0,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepositData();
  }, []);

  // Format large numbers (K, M, B)
  const formatValue = (value) => {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000)    return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000)        return `${(value / 1_000).toFixed(1)}K`;
    return value.toLocaleString();
  };

  const currentDeposits = chartData[0]?.Deposits ?? 0;
  const progressPercent = target > 0 ? (currentDeposits / target) * 100 : 0;
  const displayedPercent = Math.min(100, progressPercent).toFixed(1);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm p-5 w-full">
      {/* Header with progress summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Deposit Progress – {getCurrentMonth()} 2026
        </h2>
        <div className="text-sm font-medium">
          <span className="text-emerald-700 dark:text-emerald-400">
            {formatValue(currentDeposits)}
          </span>
          <span className="text-gray-500 dark:text-gray-400 mx-1.5">/</span>
          <span className="text-gray-700 dark:text-gray-300">
            {formatValue(target)}
          </span>
          <span className="ml-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
            ({displayedPercent}%)
          </span>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-neutral-800 mb-5" />

      {loading ? (
        <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400">
          Loading deposit data...
        </div>
      ) : error ? (
        <div className="h-80 flex items-center justify-center text-red-600 dark:text-red-400">
          {error}
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 30, right: 30, left: 10, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
                className="dark:stroke-neutral-700"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatValue}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={[0, Math.max(target * 1.15, currentDeposits * 1.4) || target * 1.15]}
              />
              <Tooltip
                formatter={(value) => [formatValue(value), "Deposits"]}
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "none",
                  borderRadius: "8px",
                  color: "#f3f4f6",
                  fontSize: "13px",
                  padding: "10px 14px",
                }}
              />

              <Bar
                dataKey="Deposits"
                fill="#10b981"           // emerald-600
                radius={[6, 6, 0, 0]}
                barSize={50}
                maxBarSize={80}
              >
                <LabelList
                  dataKey="Deposits"
                  position="top"
                  formatter={formatValue}
                  fill="#10b981"
                  fontSize={13}
                  fontWeight={600}
                  offset={12}
                />
              </Bar>

              <ReferenceLine
                y={target}
                stroke="#dc2626"          // red-600
                strokeWidth={2}
                strokeDasharray="4 4"
                label={{
                  value: "₦1B Target",
                  position: "top",
                  fill: "#dc2626",
                  fontSize: 12,
                  fontWeight: 500,
                  offset: 18,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};







