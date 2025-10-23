
import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { DollarSign } from "lucide-react";
import DonutChart from "../../utlis/DonutChart";
import DonutCharts from "../../utlis/DountCharts";
import DepositProgressChart from "../../utlis/DepositProgressChart";
import Banner from "../../utlis/Banner";
// import { apiClient } from "../../api/apiClient";
export default function Dashboardpage() {
  const [stats, setStats] = useState({
    totalLeaders: 0,
    totalActiveUsers: 0,
  });
  const [loading, setLoading] = useState(true);
   const data = [
     { title: "Total Deposit", amount: "0.00", currency: "USD" },
    { title: "Total Free Packages", amount: "0.00", currency: "USD" },
     { title: "Total Users on Activated Packages", amount: "76", currency: "" },
     { title: "Total Leaders on Free Packages", amount: "76", currency: "" },
  ];

  // ✅ Fetch live stats
  // useEffect(() => {
  //   const fetchStats = async () => {
  //     try {
  //       const res = await apiClient.get("/api/admin/stats/users");
  //       setStats(res.data);
  //     } catch (error) {
  //       console.error(
  //         "Fetching stats failed:",
  //         error.response?.data || error.message
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchStats();
  // }, []);

   // ✅ Build the dynamic data cards
  // const data = [
  //   { title: "Total Deposit", amount: "0.00", currency: "USD" },
  //   { title: "Total Free Packages", amount: "0.00", currency: "USD" },
  //   {
  //     title: "Total Users on Activated Packages",
  //     amount: loading ? "..." : stats.totalActiveUsers,
  //     currency: "",
  //   },
  //   {
  //     title: "Total Leaders on Free Packages",
  //     amount: loading ? "..." : stats.totalLeaders,
  //     currency: "",
  //   },
  // ];


  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-screen"
    >
      <div className="w-full max-w-[1500px] px-4 sm:px-8 py-4 md:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <RiMenuFoldLine size={28} className="text-gray-800 dark:text-gray-100" />
          <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
        </div>

        {/* Banner */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <Banner />
        </motion.div>

        {/* Statistic Cards */}
        <div className="flex flex-wrap justify-center sm:justify-between gap-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index}
              className="flex flex-col justify-between items-start w-full sm:w-[48%] lg:w-[23%]
                rounded-xl p-4 shadow-md bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between w-full mb-2">
                <h3 className="text-[15px] font-semibold">{item.title}</h3>
                <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex justify-center items-center border border-gray-300 dark:border-neutral-700">
                  <DollarSign size={16} />
                </div>
              </div>
              <div className="border-t border-neutral-200 dark:border-neutral-800 w-full mt-3 pt-2 text-left">
                <span className="text-[28px] sm:text-[32px] font-bold text-green-600 dark:text-green-400">
                  {item.amount}
                  <span className="text-[14px] ml-1">{item.currency}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Donut Charts */}
        <div className="mt-10 flex flex-col lg:flex-row w-full gap-5">
          <div className="w-full lg:w-1/2">
            <DonutChart />
          </div>
          <div className="w-full lg:w-1/2 bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-xl shadow-md">
            <DonutCharts />
          </div>
        </div>

        {/* Deposit Progress */}
        <div className="mt-10">
          <DepositProgressChart />
        </div>
      </div>
    </motion.div>
  );
}
