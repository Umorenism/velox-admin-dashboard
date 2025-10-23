// // import React from "react";
// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// // } from "recharts";

// // const data = [
// //   { name: "Jan", legend1: 600, legend2: 700 },
// //   { name: "Feb", legend1: 300, legend2: 450 },
// //   { name: "Mar", legend1: 650, legend2: 250 },
// //   { name: "Apr", legend1: 450, legend2: 300 },
// //   { name: "May", legend1: 520, legend2: 420 },
// //   { name: "Jun", legend1: 480, legend2: 250 },
// //   { name: "Jul", legend1: 600, legend2: 700 },
// //   { name: "Aug", legend1: 820, legend2: 750 },
// //   { name: "Sep", legend1: 620, legend2: 450 },
// //   { name: "Oct", legend1: 430, legend2: 550 },
// //   { name: "Nov", legend1: 580, legend2: 400 },
// //   { name: "Dec", legend1: 400, legend2: 600 },
// // ];

// // const DepositProgressChart = () => {
// //   return (
// //     <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm p-5 w-full  mx-auto">
// //       <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
// //         Real-time deposit progress toward $1B
// //       </h2>
// //       <hr className="border-gray-200 dark:border-neutral-800 mb-4" />

// //       <div className="w-full h-[350px]">
// //         <ResponsiveContainer width="100%" height="100%">
// //           <BarChart data={data} barGap={4}>
// //             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
// //             <XAxis
// //               dataKey="name"
// //               tick={{ fill: "#6B7280", fontSize: 12 }}
// //               axisLine={false}
// //               tickLine={false}
// //             />
// //             <YAxis
// //               tick={{ fill: "#6B7280", fontSize: 12 }}
// //               axisLine={false}
// //               tickLine={false}
// //             />
// //             <Tooltip
// //               contentStyle={{
// //                 backgroundColor: "#111827",
// //                 borderRadius: "6px",
// //                 border: "none",
// //                 color: "#fff",
// //                 fontSize: "12px",
// //               }}
// //             />
// //             <Legend
// //               iconType="circle"
// //               iconSize={8}
// //               wrapperStyle={{
// //                 fontSize: "12px",
// //                 color: "#6B7280",
// //                 paddingTop: "10px",
// //               }}
// //             />
// //             <Bar
// //               dataKey="legend1"
// //               fill="#A7F3D0"
// //               radius={[4, 4, 0, 0]}
// //               barSize={25}
// //             />
// //             <Bar
// //               dataKey="legend2"
// //               fill="#059669"
// //               radius={[4, 4, 0, 0]}
// //               barSize={25}
// //             />
// //           </BarChart>
// //         </ResponsiveContainer>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DepositProgressChart;






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
// } from "recharts";
// import { apiClient } from "../../api/apiClient";

// const DepositProgressChart = () => {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data from the deposit endpoint
//   useEffect(() => {
//     const fetchDepositData = async () => {
//       try {
//         const res = await apiClient.get("/api/admin/graphy/deposit");
//         const { labels, data } = res.data;

//         // Transform API data to recharts format
//         const transformedData = labels.map((label, index) => ({
//           name: new Date(label).toLocaleDateString("en-US", { month: "short", day: "numeric" }), // e.g., "Oct 1"
//           deposits: data[index], // Single data series
//         }));
//         setChartData(transformedData);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch deposit data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDepositData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm p-5 w-full mx-auto">
//       <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
//         Real-time deposit progress toward $1B
//       </h2>
//       <hr className="border-gray-200 dark:border-neutral-800 mb-4" />
//       <div className="w-full h-[350px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={chartData} barGap={4}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
//             <XAxis
//               dataKey="name"
//               tick={{ fill: "#6B7280", fontSize: 12 }}
//               axisLine={false}
//               tickLine={false}
//             />
//             <YAxis
//               tick={{ fill: "#6B7280", fontSize: 12 }}
//               axisLine={false}
//               tickLine={false}
//             />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#111827",
//                 borderRadius: "6px",
//                 border: "none",
//                 color: "#fff",
//                 fontSize: "12px",
//               }}
//             />
//             <Legend
//               iconType="circle"
//               iconSize={8}
//               wrapperStyle={{
//                 fontSize: "12px",
//                 color: "#6B7280",
//                 paddingTop: "10px",
//               }}
//             />
//             <Bar
//               dataKey="deposits"
//               fill="#A7F3D0"
//               radius={[4, 4, 0, 0]}
//               barSize={25}
//               name="Deposits"
//             />
//             {/* Add second Bar if you have another dataset to compare */}
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default DepositProgressChart;













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
// } from "recharts";
// import { apiClient } from "../api/apiClient";

// export const DepositProgressChart = () => {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data from the deposit endpoint
//   useEffect(() => {
//     const fetchDepositData = async () => {
//       try {
//         const res = await apiClient.get("/api/admin/graphy/deposit");
//         const { labels, data } = res.data;
//          console.log("Fetched deposit data:", res.data); // Debug log
//         // Transform API data to recharts format
//         const transformedData = labels.map((label, index) => ({
//           name: new Date(label).toLocaleDateString("en-US", { month: "short", day: "numeric" }), // e.g., "Oct 1"
//           deposits: data[index], // Single data series
//         }));
//         setChartData(transformedData);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch deposit data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDepositData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm p-5 w-full mx-auto">
//       <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
//         Real-time deposit progress toward $1B
//       </h2>
//       <hr className="border-gray-200 dark:border-neutral-800 mb-4" />
//       <div className="w-full h-[350px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={chartData} barGap={4}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
//             <XAxis
//               dataKey="name"
//               tick={{ fill: "#6B7280", fontSize: 12 }}
//               axisLine={false}
//               tickLine={false}
//             />
//             <YAxis
//               tick={{ fill: "#6B7280", fontSize: 12 }}
//               axisLine={false}
//               tickLine={false}
//             />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#111827",
//                 borderRadius: "6px",
//                 border: "none",
//                 color: "#fff",
//                 fontSize: "12px",
//               }}
//             />
//             <Legend
//               iconType="circle"
//               iconSize={8}
//               wrapperStyle={{
//                 fontSize: "12px",
//                 color: "#6B7280",
//                 paddingTop: "10px",
//               }}
//             />
//             <Bar
//               dataKey="deposits"
//               fill="#A7F3D0"
//               radius={[4, 4, 0, 0]}
//               barSize={25}
//               name="Deposits"
//             />
//             {/* Add second Bar if you have another dataset to compare */}
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
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
  Legend,
  ResponsiveContainer,
} from "recharts";
import { apiClient } from "../api/apiClient";

export const DepositProgressChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the deposit endpoint
  useEffect(() => {
    const fetchDepositData = async () => {
      try {
        const res = await apiClient.get("/api/admin/graph/deposits");
        console.log("✅ Deposit API raw response:", res.data);

        let labels = [];
        let data = [];

        // Handle multiple possible formats
        if (Array.isArray(res.data)) {
          labels = res.data.map((item) => item.name || item.label);
          data = res.data.map((item) => item.value || item.count || item.data);
        } else if (res.data.labels && res.data.data) {
          labels = res.data.labels;
          data = res.data.data;
        } else if (res.data.result) {
          labels = res.data.result.map((r) => r.name || r.label);
          data = res.data.result.map((r) => r.value || r.count || r.total);
        } else {
          throw new Error("Unexpected response format");
        }

        // Transform API data to recharts format
        const transformedData = labels.map((label, index) => ({
          name: label.includes("T")
            ? new Date(label).toLocaleDateString("en-US", { month: "short", day: "numeric" })
            : label,
          deposits: data[index],
        }));
        setChartData(transformedData);
      } catch (err) {
        console.error("❌ Deposit fetch error:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDepositData();
  }, []);

  if (loading) return <div className="text-gray-800 dark:text-gray-100 text-center">Loading...</div>;
  if (error) return <div className="text-red-500 dark:text-red-400 text-center">Error: {error}</div>;
  if (!chartData || chartData.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm p-5 w-full mx-auto h-[350px] flex items-center justify-center">
        <p className="text-gray-800 dark:text-gray-100 text-lg font-semibold">No Data Available</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm p-5 w-full mx-auto">
      <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Real-time deposit progress toward $1B
      </h2>
      <hr className="border-gray-200 dark:border-neutral-800 mb-4" />
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={4}>
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
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                borderRadius: "6px",
                border: "none",
                color: "#fff",
                fontSize: "12px",
              }}
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
              dataKey="deposits"
              fill="#A7F3D0"
              radius={[4, 4, 0, 0]}
              barSize={25}
              name="Deposits"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
