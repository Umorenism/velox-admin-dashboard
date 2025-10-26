





import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { apiClient } from "../api/apiClient";

// Helper function to get the current month name
const getCurrentMonth = () => {
  const date = new Date();
  return date.toLocaleString("en-US", { month: "short" }); // e.g., "Nov" for November 2025
};

export const DepositProgressChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepositData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.get("/api/admin/graph/deposits");
        console.log("Deposit Stats:", response.data);

        // Get current month dynamically
        const currentMonth = getCurrentMonth();

        // Format data for the chart using real API data
        const chartData = [
          {
            name: currentMonth,
            Deposits: response.data?.totalDeposits || 0,
            Target: response.data?.target || 1000000000,
          },
        ];

        setData(chartData);
      } catch (error) {
        console.error("Error fetching deposit stats:", error.response?.data || error.message);
        setError("Failed to load deposit data");
        // Fallback to current month with zero deposits only on failure
        setData([{ name: getCurrentMonth(), Deposits: 0, Target: 1000000000 }]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepositData(); // Fetch data on mount
  }, []);

  // Format large numbers for Y-axis and tooltip
  const formatNumber = (value) => {
    if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value;
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm p-5 w-full mx-auto">
      <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Real-time deposit progress toward $1B
      </h2>
      <hr className="border-gray-200 dark:border-neutral-800 mb-4" />

      {loading ? (
        <div className="w-full h-[350px] flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">Loading...</span>
        </div>
      ) : error ? (
        <div className="w-full h-[350px] flex items-center justify-center">
          <span className="text-red-500 dark:text-red-400">{error}</span>
        </div>
      ) : data.length === 0 ? (
        <div className="w-full h-[350px] flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">No Data Available</span>
        </div>
      ) : (
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatNumber}
                domain={[0, Math.max(1000000000, ...data.map((d) => d.Deposits * 1.2))]} // Dynamic scaling
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  borderRadius: "6px",
                  border: "none",
                  color: "#fff",
                  fontSize: "12px",
                }}
                formatter={(value) => formatNumber(value)}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{
                  fontSize: "12px",
                  color: "#6B7280",
                  paddingTop: "10px",
                }}
              />
              <Bar
                dataKey="Deposits"
                fill="#A7F3D0" // Light green for deposits
                radius={[4, 4, 0, 0]}
                barSize={25}
              />
              <Bar
                dataKey="Target"
                fill="#059669" // Dark green for target
                radius={[4, 4, 0, 0]}
                barSize={25}
              />
              <ReferenceLine
                y={1000000000}
                stroke="#EF4444"
                strokeDasharray="3 3"
                label={{ value: "$1B Target", fill: "#EF4444", position: "top", fontSize: 12 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};












