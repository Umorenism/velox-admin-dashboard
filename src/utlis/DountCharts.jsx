

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Package A", value: 80 },
  { name: "Package B", value: 80 },
  { name: "Package C", value: 80 },
  { name: "Package D", value: 80 },
  { name: "Package E", value: 80 },
];

const COLORS = ["#f5f0f0ff", "#FBEFE3", "#EE933C", "#F3C89F", "#FAE3CD"];

// ✅ Custom label bubble placed close to each slice
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 8; // smaller offset = closer to the slice
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <foreignObject
      x={x - 15}
      y={y - 25}
      width={40}
      height={30}
      style={{ overflow: "visible" }}
    >
      <div className="relative bg-black text-white text-[10px] px-1.5 py-0.5 rounded-md shadow-md text-center">
        {value}%
        {/* Small triangle pointer */}
        <div className="absolute left-1/2 -bottom-[4px] -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-black" />
      </div>
    </foreignObject>
  );
};

const DonutCharts = () => {
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
              data={data}
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
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DonutCharts;








