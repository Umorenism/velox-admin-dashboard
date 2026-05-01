





// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from "recharts";

// export const data = [
//   { name: "Package A", value: 80 },
//   { name: "Package B", value: 80 },
//   { name: "Package C", value: 80 },
//   { name: "Package D", value: 80 },
//   { name: "Package E", value: 80 },
// ];

// const COLORS = ["#009688", "#00796B", "#26A69A", "#4DB6AC", "#80CBC4"];

// // ✅ Custom chat bubble label close to the slice
// const renderCustomLabel = ({
//   cx,
//   cy,
//   midAngle,
//   outerRadius,
//   value,
// }) => {
//   const RADIAN = Math.PI / 180;
//   const radius = outerRadius + 8; // closer to the slice
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <foreignObject
//       x={x - 15}
//       y={y - 25}
//       width={40}
//       height={30}
//       style={{ overflow: "visible" }}
//     >
//       <div className="relative bg-black text-white text-[10px] px-1.5 py-0.5 rounded-md shadow-md text-center">
//         {value}%
//         {/* Small triangle pointer */}
//         <div className="absolute left-1/2 -bottom-[4px] -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-black" />
//       </div>
//     </foreignObject>
//   );
// };

// export const UserActiveGraphy = () => {
//   return (
//     <div className="bg-white dark:bg-neutral-900  border-neutral-200 dark:border-neutral-800 shadow-sm p-4 w-full mx-auto">
//       <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
//         Users on activated Packages ($)
//       </h2>
//       <hr className="border-gray-200 dark:border-neutral-800 mb-4" />

//       <div className="flex justify-center">
//         <ResponsiveContainer width={250} height={250}>
//           <PieChart>
//             <Pie
//               data={data}
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
//               {data.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };





import React, { useState, useEffect, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getUsers } from "../api/userApi"; // Adjust path as needed
import { Loader2 } from "lucide-react";

const COLORS = ["#009688", "#00796B", "#26A69A", "#4DB6AC", "#80CBC4", "#B2DFDB"];

const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 12;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent === 0) return null; // Don't show labels for 0% slices

  return (
    <foreignObject x={x - 25} y={y - 15} width={50} height={40} style={{ overflow: "visible" }}>
      <div className="relative bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-xl text-center border border-white/10">
        {(percent * 100).toFixed(0)}%
        <div className="absolute left-1/2 -bottom-[4px] -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-slate-900" />
      </div>
    </foreignObject>
  );
};

export const UserActiveGraphy = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();
        
        // 1. Logic to count active packages
        const packageCounts = {};
        let totalActivePackages = 0;

        users.forEach((user) => {
          if (user.packages && Array.isArray(user.packages)) {
            user.packages.forEach((pkg) => {
              if (pkg.status === "active") {
                const name = pkg.packageId?.name || "Unknown";
                packageCounts[name] = (packageCounts[name] || 0) + 1;
                totalActivePackages++;
              }
            });
          }
        });

        // 2. Format for Recharts
        const formattedData = Object.keys(packageCounts).map((key) => ({
          name: key.replace("_", " "), // Clean up "$100,000_Package" -> "$100,000 Package"
          value: packageCounts[key],
        }));

        setChartData(formattedData);
      } catch (err) {
        console.error("Failed to fetch graph data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-white dark:bg-[#090e1a] rounded-[2.5rem]">
        <Loader2 className="animate-spin text-emerald-500" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#090e1a] border border-slate-100 dark:border-white/5 shadow-2xl p-6 rounded-[2.5rem] w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Package Distribution
          </h2>
          <p className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Active Subscriptions
          </p>
        </div>
      </div>
      
      <hr className="border-slate-100 dark:border-white/5 mb-6" />

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="relative w-[250px] h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {chartData.reduce((acc, curr) => acc + curr.value, 0)}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          {chartData.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }} 
              />
              <span className="text-[10px] font-black uppercase tracking-tight text-slate-500 dark:text-slate-400">
                {entry.name}: <span className="text-slate-900 dark:text-white">{entry.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};











