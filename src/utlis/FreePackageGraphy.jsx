

// // import React from "react";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   ResponsiveContainer,
// // } from "recharts";

// // const data = [
// //   { name: "Package A", value: 80 },
// //   { name: "Package B", value: 80 },
// //   { name: "Package C", value: 80 },
// //   { name: "Package D", value: 80 },
// //   { name: "Package E", value: 80 },
// // ];

// // const COLORS = ["#f5f0f0ff", "#FBEFE3", "#EE933C", "#F3C89F", "#FAE3CD"];

// // // ✅ Custom label bubble placed close to each slice
// // const renderCustomLabel = ({
// //   cx,
// //   cy,
// //   midAngle,
// //   outerRadius,
// //   value,
// // }) => {
// //   const RADIAN = Math.PI / 180;
// //   const radius = outerRadius + 8; // smaller offset = closer to the slice
// //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
// //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

// //   return (
// //     <foreignObject
// //       x={x - 15}
// //       y={y - 25}
// //       width={40}
// //       height={30}
// //       style={{ overflow: "visible" }}
// //     >
// //       <div className="relative bg-black text-white text-[10px] px-1.5 py-0.5 rounded-md shadow-md text-center">
// //         {value}%
// //         {/* Small triangle pointer */}
// //         <div className="absolute left-1/2 -bottom-[4px] -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-black" />
// //       </div>
// //     </foreignObject>
// //   );
// // };

// // const DonutCharts = () => {
// //   return (
// //     <div className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-sm p-4 w-full mx-auto">
// //       <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
// //         Leaders on free packages ($)
// //       </h2>
// //       <hr className="border-gray-200 dark:border-neutral-800 mb-4" />

// //       <div className="flex justify-center">
// //         <ResponsiveContainer width={250} height={250}>
// //           <PieChart>
// //             <Pie
// //               data={data}
// //               cx="50%"
// //               cy="50%"
// //               innerRadius={60}
// //               outerRadius={90}
// //               paddingAngle={3}
// //               dataKey="value"
// //               labelLine={false}
// //               label={renderCustomLabel}
// //               isAnimationActive={false}
// //             >
// //               {data.map((entry, index) => (
// //                 <Cell
// //                   key={`cell-${index}`}
// //                   fill={COLORS[index % COLORS.length]}
// //                 />
// //               ))}
// //             </Pie>
// //           </PieChart>
// //         </ResponsiveContainer>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DonutCharts;







// import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import { apiClient } from "../../api/apiClient";

// const COLORS = ["#f5f0f0ff", "#FBEFE3", "#EE933C", "#F3C89F", "#FAE3CD"];

// const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, value }) => {
//   const RADIAN = Math.PI / 180;
//   const radius = outerRadius + 8;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <foreignObject x={x - 15} y={y - 25} width={40} height={30} style={{ overflow: "visible" }}>
//       <div className="relative bg-black text-white text-[10px] px-1.5 py-0.5 rounded-md shadow-md text-center">
//         {value}
//         <div className="absolute left-1/2 -bottom-[4px] -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-black" />
//       </div>
//     </foreignObject>
//   );
// };

// const DonutCharts = () => {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data from the free-packages endpoint
//   useEffect(() => {
//     const fetchFreePackagesData = async () => {
//       try {
//         const res = await apiClient.get("/api/admin/graphy/free-packages");
//         const { labels, data } = res.data;

//         // Transform API data to recharts format
//         const transformedData = labels.map((label, index) => ({
//           name: label.includes("T") ? new Date(label).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : label, // Handle dates or package names
//           value: data[index],
//         }));
//         setChartData(transformedData);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch free packages data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFreePackagesData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-sm p-4 w-full mx-auto">
//       <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
//         Leaders on free packages ($)
//       </h2>
//       <hr className="border-gray-200 dark:border-neutral-800 mb-4" />
//       <div className="flex justify-center">
//         <ResponsiveContainer width={250} height={250}>
//           <PieChart>
//             <Pie
//               data={chartData}
//               cx="50%"
//               cy="50%"
//               innerRadius={60}
//               outerRadius={90}
//               paddingAngle={3}
//               dataKey="value"
//               labelLine={false}
//               label={renderCustomLabel}
//               isAnimationActive={false}
//             >
//               {chartData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default DonutCharts;







// import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import { apiClient } from "../api/apiClient";

// const COLORS = ["#f5f0f0ff", "#FBEFE3", "#EE933C", "#F3C89F", "#FAE3CD"];

// const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, value }) => {
//   const RADIAN = Math.PI / 180;
//   const radius = outerRadius + 8;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <foreignObject x={x - 15} y={y - 25} width={40} height={30} style={{ overflow: "visible" }}>
//       <div className="relative bg-black text-white text-[10px] px-1.5 py-0.5 rounded-md shadow-md text-center">
//         {value}
//         <div className="absolute left-1/2 -bottom-[4px] -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-black" />
//       </div>
//     </foreignObject>
//   );
// };

// export const FreePackageGraphy = () => {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data from the free-packages endpoint
//   // useEffect(() => {
//   //   const fetchFreePackagesData = async () => {
//   //     try {
//   //       const res = await apiClient.get("/api/admin/graphy/free-packages");
//   //       const { labels, data } = res.data;

//   //       // Transform API data to recharts format
//   //       const transformedData = labels.map((label, index) => ({
//   //         name: label.includes("T") ? new Date(label).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : label, // Handle dates or package names
//   //         value: data[index],
//   //       }));
//   //       setChartData(transformedData);
//   //     } catch (err) {
//   //       setError(err.response?.data?.message || "Failed to fetch free packages data");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchFreePackagesData();
//   // }, []);

//   useEffect(() => {
//   const fetchFreePackagesData = async () => {
//     try {
//       const res = await apiClient.get("/api/admin/graphy/free-packages");
//       console.log("✅ Free packages API raw response:", res.data);

//       let labels = [];
//       let data = [];

//       // 🧩 Handle multiple possible formats
//       if (Array.isArray(res.data)) {
//         // Example: [{ name: "Bronze", value: 10 }]
//         labels = res.data.map((item) => item.name || item.label);
//         data = res.data.map((item) => item.value || item.count || item.data);
//       } else if (res.data.labels && res.data.data) {
//         // Example: { labels: [...], data: [...] }
//         labels = res.data.labels;
//         data = res.data.data;
//       } else if (res.data.result) {
//         // Example: { result: [...] }
//         labels = res.data.result.map((r) => r.name || r.label);
//         data = res.data.result.map((r) => r.value || r.count || r.total);
//       } else {
//         throw new Error("Unexpected response format");
//       }

//       const transformedData = labels.map((label, index) => ({
//         name: label.includes("T")
//           ? new Date(label).toLocaleDateString("en-US", {
//               month: "short",
//               day: "numeric",
//             })
//           : label,
//         value: data[index],
//       }));

//       setChartData(transformedData);
//     } catch (err) {
//       console.error("❌ Free packages fetch error:", err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchFreePackagesData();
// }, []);


//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-sm p-4 w-full mx-auto">
//       <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
//         Leaders on free packages ($)
//       </h2>
//       <hr className="border-gray-200 dark:border-neutral-800 mb-4" />
//       <div className="flex justify-center">
//         <ResponsiveContainer width={250} height={250}>
//           <PieChart>
//             <Pie
//               data={chartData}
//               cx="50%"
//               cy="50%"
//               innerRadius={60}
//               outerRadius={90}
//               paddingAngle={3}
//               dataKey="value"
//               labelLine={false}
//               label={renderCustomLabel}
//               isAnimationActive={false}
//             >
//               {chartData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };








import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { apiClient } from "../api/apiClient";

const COLORS = ["#f5f0f0ff", "#FBEFE3", "#EE933C", "#F3C89F", "#FAE3CD"];

const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 8;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <foreignObject x={x - 15} y={y - 25} width={40} height={30} style={{ overflow: "visible" }}>
      <div className="relative bg-black text-white text-[10px] px-1.5 py-0.5 rounded-md shadow-md text-center">
        {value}
        <div className="absolute left-1/2 -bottom-[4px] -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-black" />
      </div>
    </foreignObject>
  );
};

export const FreePackageGraphy = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFreePackagesData = async () => {
      try {
        const res = await apiClient.get("/api/admin/graph/free-packages");
        console.log("✅ Free packages API raw response:", res.data);

        let labels = [];
        let data = [];

        // 🧩 Handle multiple possible formats
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

        const transformedData = labels.map((label, index) => ({
          name: label.includes("T")
            ? new Date(label).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : label,
          value: data[index],
        }));

        setChartData(transformedData);
      } catch (err) {
        console.error("❌ Free packages fetch error:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFreePackagesData();
  }, []);

  if (loading) return <div className="text-gray-800 dark:text-gray-100 text-center">Loading...</div>;
  if (error) return <div className="text-red-500 dark:text-red-400 text-center">Error: {error}</div>;
  if (!chartData || chartData.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-sm p-4 w-full mx-auto h-[250px] flex items-center justify-center">
        <p className="text-gray-800 dark:text-gray-100 text-lg font-semibold">No Data Available</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-sm p-4 w-full mx-auto">
      <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Leaders on free packages ($)
      </h2>
      <hr className="border-gray-200 dark:border-neutral-800 mb-4" />
      <div className="flex justify-center">
        <ResponsiveContainer width={250} height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
              isAnimationActive={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

