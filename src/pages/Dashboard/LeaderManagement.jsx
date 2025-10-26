




import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { DollarSign, Search, Filter, Download } from "lucide-react";
import { getTotalLeaders, getActiveLeaders, getleaderAllUsers } from "../../api/leaderApi";

import * as XLSX from "xlsx"; // For CSV export
import LeaderTable from "../../utlis/leaderTable";

export default function LeaderManagement() {
  const [stats, setStats] = useState({
    totalLeaders: 0,
    activeLeaders: 0,
  });
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ rank: "all", role: "all" });

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [totalRes, activeRes, usersRes] = await Promise.all([
          getTotalLeaders(),
          getActiveLeaders(),
          getleaderAllUsers(),
        ]);
        setStats({
          totalLeaders: totalRes?.total || 0,
          activeLeaders: activeRes?.total || 0,
        });
        // Update ranks based on criteria
        const updatedUsers = usersRes.map(user => ({
          ...user,
          rank: determineRank(user), // Function to determine rank
        }));
        setUsers(updatedUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Function to determine rank based on criteria
  const determineRank = (user) => {
    if (user.referrals >= 10) return "Gold";
    if (user.referrals >= 5) return "Silver";
    if (user.referrals >= 1) return "Bronze";
    return "None";
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Handle filter
  const handleFilter = (type, value) => {
    setFilter((prev) => ({ ...prev, [type]: value }));
  };

  // Filter users based on search and filter criteria
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery) ||
      user._id.toLowerCase().includes(searchQuery);
    const matchesRank = filter.rank === "all" || user.rank === filter.rank;
    const matchesRole = filter.role === "all" || user.role === filter.role;
    return matchesSearch && matchesRank && matchesRole;
  });

  // Export to CSV
  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredUsers.map((user) => ({
        ID: user._id,
        Username: user.name,
        Email: user.email,
        Phone: `${user.prefix} ${user.phone}`,
        Role: user.role,
        Rank: user.rank,
        Referrals: user.referrals,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leaders");
    XLSX.writeFile(workbook, "leaders_export.xlsx");
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const statData = [
    { title: "Total Leaders", amount: stats.totalLeaders, currency: "" },
    { title: "Active Leaders", amount: stats.activeLeaders, currency: "" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="flex flex-col items-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-screen"
    >
      <div className="w-full max-w-[1500px] px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <RiMenuFoldLine size={28} />
            <h1 className="text-xl sm:text-2xl font-bold">Leader Management</h1>
          </div>
        </div>

        {/* Statistic Cards */}
        <div className="flex flex-col md:flex-row justify-center sm:justify-start gap-4">
          {statData.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index}
              className="flex flex-col items-start w-full sm:w-[58%] lg:w-[80%] rounded-xl p-4 shadow-md bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800"
            >
              <div className="flex items-center justify-between w-full mb-2">
                <h3 className="text-[15px] font-semibold">{item.title}</h3>
                <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex justify-center items-center border border-gray-300 dark:border-neutral-700">
                  <DollarSign size={16} />
                </div>
              </div>
              <div className="border-t border-neutral-200 dark:border-neutral-800 w-full mt-3 pt-2">
                <span className="text-[28px] sm:text-[32px] font-bold text-green-600 dark:text-green-400">
                  {item.amount}
                  <span className="text-[14px] ml-1">{item.currency}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="flex flex-wrap gap-3 items-center p-4 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl">
          {/* Search Bar */}
          <div className="flex items-center w-full sm:w-1/3 bg-gray-50 dark:bg-neutral-800 rounded-lg border border-gray-300 dark:border-neutral-700 px-3 py-2">
            <Search size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search users, packages..."
              className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex dark:bg-neutral-800 dark:text-white flex-wrap gap-2 w-full sm:w-auto">
            <select
              onChange={(e) => handleFilter("rank", e.target.value)}
              className="border dark:bg-neutral-800  dark:text-white border-gray-300 rounded-md text-sm px-3 py-2"
            >
              <option value="all">All Ranks</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
              <option value="None">None</option>
            </select>
            <select
              onChange={(e) => handleFilter("role", e.target.value)}
              className="border dark:bg-neutral-800  dark:text-white border-gray-300 rounded-md text-sm px-3 py-2"
            >
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="leader">Leader</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-1.5 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm shadow-md transition"
            >
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <LeaderTable users={filteredUsers} />
      </div>
    </motion.div>
  );
}

