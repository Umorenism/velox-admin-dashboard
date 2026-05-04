





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
import { AdminUserAnalyticsChart } from "../../utlis/DepositProgressChart";
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

    const usersRes = await apiClient.get("/api/admin/users");
    const users = usersRes.data || [];

    const totalActiveUsers = users.filter(
      (user) => user.userState === "trading"
    ).length;

    const totalActiveLeaders = users.filter(
      (user) => user.rank && user.rank !== "none"
    ).length;

    const totalDeposits = users.reduce(
      (sum, user) => sum + (user.wallets?.deposit || 0),
      0
    );

    const totalFreePackages = users.reduce(
      (sum, user) => sum + (user.packages?.length || 0),
      0
    );

    setStats({
      totalActiveUsers,
      totalActiveLeaders,
      totalDeposits,
      totalFreePackages,
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
      title: "Total Active Package", 
      amount: stats.totalFreePackages,  
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

       

        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5">
          <div className="mb-6 px-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">  Admin User Analytics</h3>
          </div>
          {/* <DepositProgressChart /> */}
          <AdminUserAnalyticsChart/>
        </div>
      </div>
    </motion.div>
  );
}