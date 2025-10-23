// import React from "react";
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

// const data = [
//   { name: "Jan", legend1: 600, legend2: 700 },
//   { name: "Feb", legend1: 300, legend2: 450 },
//   { name: "Mar", legend1: 650, legend2: 250 },
//   { name: "Apr", legend1: 450, legend2: 300 },
//   { name: "May", legend1: 520, legend2: 420 },
//   { name: "Jun", legend1: 480, legend2: 250 },
//   { name: "Jul", legend1: 600, legend2: 700 },
//   { name: "Aug", legend1: 820, legend2: 750 },
//   { name: "Sep", legend1: 620, legend2: 450 },
//   { name: "Oct", legend1: 430, legend2: 550 },
//   { name: "Nov", legend1: 580, legend2: 400 },
//   { name: "Dec", legend1: 400, legend2: 600 },
// ];

// const DepositProgressChart = () => {
//   return (
//     <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm p-5 w-full  mx-auto">
//       <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
//         Real-time deposit progress toward $1B
//       </h2>
//       <hr className="border-gray-200 dark:border-neutral-800 mb-4" />

//       <div className="w-full h-[350px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={data} barGap={4}>
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
//               dataKey="legend1"
//               fill="#A7F3D0"
//               radius={[4, 4, 0, 0]}
//               barSize={25}
//             />
//             <Bar
//               dataKey="legend2"
//               fill="#059669"
//               radius={[4, 4, 0, 0]}
//               barSize={25}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default DepositProgressChart;





import React, { useEffect, useState } from "react";
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
// ✅ your API function
import { Loader2 } from "lucide-react";
import { adminGraphy } from "../api/graphApi";

const DepositProgressChart = () => {
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch graph data
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const res = await adminGraphy();

        // Transform API data to Recharts format
        const formattedData = res.labels.map((label, index) => ({
          name: label, // date (e.g. 2025-10-01)
          deposits: res.data[index], // numeric value (e.g. 100)
        }));

        setGraphData(formattedData);
      } catch (error) {
        console.error("Error fetching deposit graph:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm p-5 w-full mx-auto">
      <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Real-time Deposit Graph
      </h2>
      <hr className="border-gray-200 dark:border-neutral-800 mb-4" />

      {loading ? (
        <div className="flex justify-center items-center h-[350px]">
          <Loader2 className="animate-spin text-gray-500" size={24} />
        </div>
      ) : (
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={graphData} barGap={4}>
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
                fill="#059669"
                radius={[4, 4, 0, 0]}
                barSize={25}
                name="Deposits"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default DepositProgressChart;

