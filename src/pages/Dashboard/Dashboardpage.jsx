
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { RiMenuFoldLine } from "react-icons/ri";
// import { DollarSign } from "lucide-react";
// import DonutChart from "../../utlis/DonutChart";
// import DonutCharts from "../../utlis/DountCharts";
// import DepositProgressChart from "../../utlis/DepositProgressChart";
// import Banner from "../../utlis/Banner";
// import { useSidebar } from "../../components/layout/SidebarContext";
// // import { toggleSidebar } from "../../components/layout/SidebarContext";
// // import { apiClient } from "../../api/apiClient";
// export default function Dashboardpage() {
//   const [stats, setStats] = useState({
//     totalLeaders: 0,
//     totalActiveUsers: 0,
//   });
//   const [loading, setLoading] = useState(true);
//    const data = [
//      { title: "Total Deposit", amount: "0.00", currency: "USD" },
//     { title: "Total Free Packages", amount: "0.00", currency: "USD" },
//      { title: "Total Users on Activated Packages", amount: "76", currency: "" },
//      { title: "Total Leaders on Free Packages", amount: "76", currency: "" },
//   ];

  

//   // ✅ Fetch live stats
//   // useEffect(() => {
//   //   const fetchStats = async () => {
//   //     try {
//   //       const res = await apiClient.get("/api/admin/stats/users");
//   //       setStats(res.data);
//   //     } catch (error) {
//   //       console.error(
//   //         "Fetching stats failed:",
//   //         error.response?.data || error.message
//   //       );
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchStats();
//   // }, []);

//    // ✅ Build the dynamic data cards
//   // const data = [
//   //   { title: "Total Deposit", amount: "0.00", currency: "USD" },
//   //   { title: "Total Free Packages", amount: "0.00", currency: "USD" },
//   //   {
//   //     title: "Total Users on Activated Packages",
//   //     amount: loading ? "..." : stats.totalActiveUsers,
//   //     currency: "",
//   //   },
//   //   {
//   //     title: "Total Leaders on Free Packages",
//   //     amount: loading ? "..." : stats.totalLeaders,
//   //     currency: "",
//   //   },
//   // ];

// const { toggleSidebar } = useSidebar();
//   const fadeUp = {
//     hidden: { opacity: 0, y: 40 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
//     }),
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="flex flex-col items-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-screen"
//     >
//       <div className="w-full max-w-[1500px] px-4 sm:px-8 py-4 md:py-10">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <RiMenuFoldLine onClick={toggleSidebar} size={28} className="text-gray-800 dark:text-gray-100" />
//           <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
//         </div>

//         {/* Banner */}
//         <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
//           <Banner />
//         </motion.div>

//         {/* Statistic Cards */}
//         <div className="flex flex-wrap justify-center sm:justify-between gap-4">
//           {data.map((item, index) => (
//             <motion.div
//               key={index}
//               variants={fadeUp}
//               custom={index}
//               className="flex flex-col justify-between items-start w-full sm:w-[48%] lg:w-[23%]
//                 rounded-xl p-4 shadow-md bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 hover:shadow-lg transition"
//             >
//               <div className="flex items-center justify-between w-full mb-2">
//                 <h3 className="text-[15px] font-semibold">{item.title}</h3>
//                 <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex justify-center items-center border border-gray-300 dark:border-neutral-700">
//                   <DollarSign size={16} />
//                 </div>
//               </div>
//               <div className="border-t border-neutral-200 dark:border-neutral-800 w-full mt-3 pt-2 text-left">
//                 <span className="text-[28px] sm:text-[32px] font-bold text-green-600 dark:text-green-400">
//                   {item.amount}
//                   <span className="text-[14px] ml-1">{item.currency}</span>
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Donut Charts */}
//         <div className="mt-10 flex flex-col lg:flex-row w-full gap-5">
//           <div className="w-full lg:w-1/2">
//             <DonutChart />
//           </div>
//           <div className="w-full lg:w-1/2 bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-xl shadow-md">
//             <DonutCharts />
//           </div>
//         </div>

//         {/* Deposit Progress */}
//         <div className="mt-10">
//           <DepositProgressChart />
//         </div>
//       </div>
//     </motion.div>
//   );
// }




// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { RiMenuFoldLine } from "react-icons/ri";
// import { DollarSign } from "lucide-react";
// import DonutChart from "../../utlis/DonutChart";
// import DonutCharts from "../../utlis/DountCharts"; // Note: Typo in filename ("DountCharts" → "DonutCharts")
// import DepositProgressChart from "../../utlis/DepositProgressChart";
// import Banner from "../../utlis/Banner";
// import { useSidebar } from "../../components/layout/SidebarContext";
// // import { useSidebar } from "../layout/SidebarContext";

// export default function Dashboardpage() {
//   const [stats, setStats] = useState({
//     totalLeaders: 0,
//     totalActiveUsers: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const data = [
//     { title: "Total Deposit", amount: "0.00", currency: "USD" },
//     { title: "Total Free Packages", amount: "0.00", currency: "USD" },
//     { title: "Total Users on Activated Packages", amount: "76", currency: "" },
//     { title: "Total Leaders on Free Packages", amount: "76", currency: "" },
//   ];

//   // Uncomment to fetch live stats
//   /*
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await apiClient.get("/api/admin/stats/users");
//         setStats(res.data);
//       } catch (error) {
//         console.error("Fetching stats failed:", error.response?.data || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);
//   */

  

//   const { closeSidebar } = useSidebar(); // Use closeSidebar instead of toggleSidebar

//   const fadeUp = {
//     hidden: { opacity: 0, y: 40 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
//     }),
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="flex flex-col items-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-screen"
//     >
//       <div className="w-full max-w-[1500px] px-4 sm:px-8 py-4 md:py-10">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <RiMenuFoldLine
//             onClick={openSidebar} // Changed to closeSidebar
//             size={28}
//             className="text-gray-800 dark:text-gray-100 cursor-pointer"
//           />
//           <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
//         </div>

//         {/* Banner */}
//         <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
//           <Banner />
//         </motion.div>

//         {/* Statistic Cards */}
//         <div className="flex flex-wrap justify-center sm:justify-between gap-4">
//           {data.map((item, index) => (
//             <motion.div
//               key={index}
//               variants={fadeUp}
//               custom={index}
//               className="flex flex-col justify-between items-start w-full sm:w-[48%] lg:w-[23%] rounded-xl p-4 shadow-md bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 hover:shadow-lg transition"
//             >
//               <div className="flex items-center justify-between w-full mb-2">
//                 <h3 className="text-[15px] font-semibold">{item.title}</h3>
//                 <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex justify-center items-center border border-gray-300 dark:border-neutral-700">
//                   <DollarSign size={16} />
//                 </div>
//               </div>
//               <div className="border-t border-neutral-200 dark:border-neutral-800 w-full mt-3 pt-2 text-left">
//                 <span className="text-[28px] sm:text-[32px] font-bold text-green-600 dark:text-green-400">
//                   {item.amount}
//                   <span className="text-[14px] ml-1">{item.currency}</span>
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Donut Charts */}
//         <div className="mt-10 flex flex-col lg:flex-row w-full gap-5">
//           <div className="w-full lg:w-1/2">
//             <DonutChart />
//           </div>
//           <div className="w-full lg:w-1/2 bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-xl shadow-md">
//             <DonutCharts />
//           </div>
//         </div>

//         {/* Deposit Progress */}
//         <div className="mt-10">
//           <DepositProgressChart />
//         </div>
//       </div>
//     </motion.div>
//   );
// }




// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { RiMenuFoldLine } from "react-icons/ri";
// import { DollarSign } from "lucide-react";
// import Banner from "../../utlis/Banner";
// import { useSidebar } from "../../components/layout/SidebarContext";
// import { apiClient } from "../../api/apiClient"; 
// import { UserActiveGraphy } from "../../utlis/UserActiveGraphy";
// import {DepositProgressChart} from '../../utlis/DepositProgressChart'
// import { FreePackageGraphy } from "../../utlis/FreePackageGraphy";
// export default function Dashboardpage() {
//   const [stats, setStats] = useState({
//     totalLeaders: 0,
//     totalActiveUsers: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   // Static data (fallback if API fails)
//   const data = [
//     { title: "Total Deposit", amount: "0.00", currency: "USD" },
//     { title: "Total Free Packages", amount: "0.00", currency: "USD" },
//     {
//       title: "Total Users on Activated Packages",
//       amount: loading ? "..." : stats.totalActiveUsers,
//       currency: "",
//     },
//     {
//       title: "Total Leaders on Free Packages",
//       amount: loading ? "..." : stats.totalLeaders,
//       currency: "",
//     },
//   ];

//   // Fetch live stats
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await apiClient.get("/api/admin/stats/users");
//         console.log("Fetched Stats:", res.data); // Debug log
//         setStats(res.data);
//       } catch (error) {
//         console.error("Fetching stats failed:", error.response?.data || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   const { closeSidebar } = useSidebar(); // Destructure closeSidebar

//   const fadeUp = {
//     hidden: { opacity: 0, y: 40 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
//     }),
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="flex flex-col items-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-screen"
//     >
//       <div className="w-full max-w-[1500px] px-4 sm:px-8 py-4 md:py-10">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <RiMenuFoldLine
//             onClick={closeSidebar} // Closes sidebar on click
//             size={28}
//             className="text-gray-800 dark:text-gray-100 cursor-pointer"
//           />
//           <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
//         </div>

//         {/* Banner */}
//         <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
//           <Banner />
//         </motion.div>

//         {/* Statistic Cards */}
//         <div className="flex flex-wrap justify-center sm:justify-between gap-4">
//           {data.map((item, index) => (
//             <motion.div
//               key={index}
//               variants={fadeUp}
//               custom={index}
//               className="flex flex-col justify-between items-start w-full sm:w-[48%] lg:w-[23%] rounded-xl p-4 shadow-md bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 hover:shadow-lg transition"
//             >
//               <div className="flex items-center justify-between w-full mb-2">
//                 <h3 className="text-[15px] font-semibold">{item.title}</h3>
//                 <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex justify-center items-center border border-gray-300 dark:border-neutral-700">
//                   <DollarSign size={16} />
//                 </div>
//               </div>
//               <div className="border-t border-neutral-200 dark:border-neutral-800 w-full mt-3 pt-2 text-left">
//                 <span className="text-[28px] sm:text-[32px] font-bold text-green-600 dark:text-green-400">
//                   {item.amount}
//                   <span className="text-[14px] ml-1">{item.currency}</span>
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Donut Charts */}
//         <div className="mt-10 flex flex-col lg:flex-row w-full gap-5">
//           <div className="w-full lg:w-1/2">
//             <UserActiveGraphy />
//           </div>
//           <div className="w-full lg:w-1/2 bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-xl shadow-md">
//             <FreePackageGraphy />
//           </div>
//         </div>

//         {/* Deposit Progress */}
//         <div className="mt-10">
//           <DepositProgressChart />
//         </div>
//       </div>
//     </motion.div>
//   );
// }





// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { RiMenuFoldLine } from "react-icons/ri";
// import { DollarSign } from "lucide-react";
// import Banner from "../../utlis/Banner";
// import { useSidebar } from "../../components/layout/SidebarContext";
// import { apiClient } from "../../api/apiClient";
// import { UserActiveGraphy } from "../../utlis/UserActiveGraphy";
// import { DepositProgressChart } from "../../utlis/DepositProgressChart";
// import { FreePackageGraphy } from "../../utlis/FreePackageGraphy";

// export default function Dashboardpage() {
//   const [stats, setStats] = useState({
//     totalActiveUsers: 0,
//     totalLeaders: 0, // Renamed to match display but will map to totalActiveLeaders
//   });
//   const [loading, setLoading] = useState(true);

//   const { closeSidebar } = useSidebar();

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);

//         // Fetch both endpoints concurrently
//         const [activeUsersRes, activeLeadersRes] = await Promise.all([
//           apiClient.get("/api/admin/users/active/total"),
//           apiClient.get("/api/admin/leaders/active/total"),
//         ]);

//         // Log responses for debugging
//         console.log("Active Users Stats:", activeUsersRes.data);
//         console.log("Active Leaders Stats:", activeLeadersRes.data);

//         setStats({
//           totalActiveUsers: activeUsersRes.data?.totalActiveUsers || 0,
//           totalLeaders: activeLeadersRes.data?.totalActiveLeaders || 0, // Map totalActiveLeaders to totalLeaders
//         });
//       } catch (error) {
//         console.error("Error fetching dashboard stats:", error.response?.data || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const fadeUp = {
//     hidden: { opacity: 0, y: 40 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
//     }),
//   };

//   // Card data (using fetched stats)
//   const data = [
//     { title: "Total Deposit", amount: "0.00", currency: "USD" },
//     { title: "Total Free Packages", amount: "0.00", currency: "USD" },
//     {
//       title: "Total Users on Activated Packages",
//       amount: loading ? "..." : stats.totalActiveUsers,
//       currency: "",
//     },
//     {
//       title: "Total Leaders on Free Packages",
//       amount: loading ? "..." : stats.totalLeaders,
//       currency: "",
//     },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="flex flex-col items-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-screen"
//     >
//       <div className="w-full max-w-[1500px] px-4 sm:px-8 py-4 md:py-10">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <RiMenuFoldLine
//             onClick={closeSidebar}
//             size={28}
//             className="text-gray-800 dark:text-gray-100 cursor-pointer"
//           />
//           <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
//         </div>

//         {/* Banner */}
//         <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
//           <Banner />
//         </motion.div>

//         {/* Stats Cards */}
//         <div className="flex flex-wrap justify-center sm:justify-between gap-4">
//           {data.map((item, index) => (
//             <motion.div
//               key={index}
//               variants={fadeUp}
//               custom={index}
//               initial="hidden"
//               animate="visible"
//               className="flex flex-col justify-between items-start w-full sm:w-[48%] lg:w-[23%] rounded-xl p-4 shadow-md bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 hover:shadow-lg transition"
//             >
//               <div className="flex items-center justify-between w-full mb-2">
//                 <h3 className="text-[15px] font-semibold">{item.title}</h3>
//                 <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex justify-center items-center border border-gray-300 dark:border-neutral-700">
//                   <DollarSign size={16} />
//                 </div>
//               </div>
//               <div className="border-t border-neutral-200 dark:border-neutral-800 w-full mt-3 pt-2 text-left">
//                 <span className="text-[28px] sm:text-[32px] font-bold text-green-600 dark:text-green-400">
//                   {item.amount}
//                   <span className="text-[14px] ml-1">{item.currency}</span>
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Charts */}
//         <div className="mt-10 flex flex-col lg:flex-row w-full gap-5">
//           <div className="w-full lg:w-1/2">
//             <UserActiveGraphy />
//           </div>
//           <div className="w-full lg:w-1/2 bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-xl shadow-md">
//             <FreePackageGraphy />
//           </div>
//         </div>

//         {/* Deposit Progress */}
//         <div className="mt-10">
//           <DepositProgressChart />
//         </div>
//       </div>
//     </motion.div>
//   );
// }






import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { 
  DollarSign, Users, Crown, Wallet, 
  Loader2, Activity, RefreshCw 
} from "lucide-react";
import { useSidebar } from "../../components/layout/SidebarContext";
import { apiClient } from "../../api/apiClient";
import { UserActiveGraphy } from "../../utlis/UserActiveGraphy";
import { DepositProgressChart } from "../../utlis/DepositProgressChart";
import { FreePackageGraphy } from "../../utlis/FreePackageGraphy";

export default function Dashboardpage() {
  const [stats, setStats] = useState({
    totalActiveUsers: 0,
    totalActiveLeaders: 0,
    totalDeposits: 0,
    totalFreePackages: 0
  });
  const [loading, setLoading] = useState(true);
  const { closeSidebar } = useSidebar();

  const fetchStats = async () => {
    try {
      setLoading(true);
      // Fetching actual live data from your endpoints
      const [activeUsersRes, activeLeadersRes, financeRes] = await Promise.all([
        apiClient.get("/api/admin/users/active/total"),
        apiClient.get("/api/admin/leaders/active/total"),
        apiClient.get("/api/admin/finance/summary").catch(() => ({ data: {} })) // Fallback for finance
      ]);

      setStats({
        totalActiveUsers: activeUsersRes.data?.totalActiveUsers || 0,
        totalActiveLeaders: activeLeadersRes.data?.totalActiveLeaders || 0,
        totalDeposits: financeRes.data?.totalDeposits || 0,
        totalFreePackages: financeRes.data?.totalFreePackages || 0,
      });
    } catch (error) {
      console.error("Data Sync Failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cardConfig = [
    { 
      title: "Total Deposits", 
      amount: stats.totalDeposits, 
      currency: "USD", 
      icon: <Wallet size={18} className="text-emerald-500" />,
      color: "emerald"
    },
    { 
      title: "Free Package Volume", 
      amount: stats.totalFreePackages, 
      currency: "USD", 
      icon: <DollarSign size={18} className="text-blue-500" />,
      color: "blue"
    },
    {
      title: "Active Packages (Users)",
      amount: stats.totalActiveUsers,
      currency: "Accounts",
      icon: <Users size={18} className="text-purple-500" />,
      color: "purple"
    },
    {
      title: "Active Leaders",
      amount: stats.totalActiveLeaders,
      currency: "Verified",
      icon: <Crown size={18} className="text-amber-500" />,
      color: "amber"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-300"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-10 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-5">
            <button 
              onClick={closeSidebar}
              className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:scale-105 transition-all"
            >
              <RiMenuFoldLine size={22} className="text-slate-600 dark:text-slate-400" />
            </button>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Admin Dashboard
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {loading ? 'Syncing Records...' : 'Systems Live'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={fetchStats}
              className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {cardConfig.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl bg-${item.color}-500/10`}>
                  {item.icon}
                </div>
                <Activity size={14} className="text-slate-300" />
              </div>
              
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.title}</p>
                <div className="flex items-baseline gap-2">
                  {loading ? (
                    <div className="h-8 w-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg" />
                  ) : (
                    <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">
                      {item.amount.toLocaleString()}
                    </h2>
                  )}
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.currency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-slate-900/50 p-4 rounded-[2.5rem] border border-slate-200 dark:border-white/5">
             <div className="px-4 py-2 mb-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">User Growth Analytics</h3>
             </div>
             {/* These components should also be verified to use live props if they don't already fetch their own data */}
            <UserActiveGraphy />
          </div>

          <div className="bg-white dark:bg-slate-900/50 p-4 rounded-[2.5rem] border border-slate-200 dark:border-white/5">
            <div className="px-4 py-2 mb-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Package Distribution</h3>
             </div>
            <FreePackageGraphy />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5">
          <div className="mb-6 px-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Deposit Flow History</h3>
          </div>
          <DepositProgressChart />
        </div>
      </div>
    </motion.div>
  );
}