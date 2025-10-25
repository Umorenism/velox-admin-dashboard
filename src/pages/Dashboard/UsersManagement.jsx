





import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { getUsers } from "../../api/userApi"; // ← your users endpoint
import UserTable from "../../utlis/UserTable";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 8;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res?.users || []);
    } catch (err) {
      console.error("❌ Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-100 dark:bg-neutral-900 min-h-screen px-6 py-10 text-gray-900 dark:text-white"
    >
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* 🔍 Search + Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <div className="flex items-center bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg px-3 py-2 w-full sm:w-1/3">
          <Search size={16} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full bg-transparent outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>

      {/* 🧾 User Table */}
      <UserTable
        users={users}
        loading={loading}
        searchTerm={searchTerm}
        filter={filter}
        entriesPerPage={entriesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onRefresh={fetchUsers}
      />
    </motion.div>
  );
}









