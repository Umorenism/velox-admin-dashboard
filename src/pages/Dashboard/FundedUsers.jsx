import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { apiClient } from "../../api/apiClient";
import {
  Users,
  Wallet,
  ShieldCheck,
  ShieldX,
  Search,
} from "lucide-react";

const FundedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ NEW STATES (UI ONLY)
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const perPage = 6;

  // ✅ FETCH (UNCHANGED)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiClient.get("/api/admin/users/funded");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  /* ================= FILTER LOGIC ================= */
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.phone.includes(search);

      const matchesRole =
        roleFilter === "all" || u.role === roleFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && !u.withdrawalFrozen) ||
        (statusFilter === "frozen" && u.withdrawalFrozen);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredUsers.length / perPage);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredUsers.slice(start, start + perPage);
  }, [filteredUsers, page]);

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Funded Users
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage funded accounts efficiently
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Users />} label="Total Users" value={users.length} />
        <StatCard
          icon={<Wallet />}
          label="Total Funded"
          value={`₦${users
            .reduce((acc, u) => acc + u.depositWallet, 0)
            .toLocaleString()}`}
        />
        <StatCard
          icon={<ShieldCheck />}
          label="Active"
          value={users.filter((u) => !u.withdrawalFrozen).length}
        />
        <StatCard
          icon={<ShieldX />}
          label="Frozen"
          value={users.filter((u) => u.withdrawalFrozen).length}
        />
      </div>

      {/* FILTER BAR */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        
        {/* SEARCH */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl w-full md:w-1/3">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search name, email, phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="bg-transparent outline-none text-sm w-full text-gray-700 dark:text-white"
          />
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 flex-wrap">
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="leader">Leader</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="frozen">Frozen</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="hidden md:block bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Wallet</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user, i) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-t dark:border-gray-800"
              >
                <td className="p-4">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </td>

                <td className="p-4 capitalize">{user.role}</td>

                <td className="p-4 text-teal-600 font-semibold">
                  ₦{user.depositWallet.toLocaleString()}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      user.withdrawalFrozen
                        ? "bg-red-100 text-red-600"
                        : "bg-teal-100 text-teal-600"
                    }`}
                  >
                    {user.withdrawalFrozen ? "Frozen" : "Active"}
                  </span>
                </td>

                <td className="p-4 text-xs text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="md:hidden space-y-4">
        {paginatedUsers.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 p-4 rounded-2xl border"
          >
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>

            <div className="mt-2 text-sm flex justify-between">
              <span>{user.role}</span>
              <span className="text-teal-600">
                ₦{user.depositWallet.toLocaleString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-lg text-sm ${
              page === i + 1
                ? "bg-teal-600 text-white"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setPage((p) => Math.min(p + 1, totalPages))
          }
          className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800"
        >
          Next
        </button>
      </div>

      {loading && (
        <div className="text-center mt-6 text-gray-500">
          Loading...
        </div>
      )}
    </div>
  );
};

export default FundedUsers;

/* ================= SMALL COMPONENT ================= */

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white dark:bg-gray-900 border rounded-2xl p-4 flex gap-3 items-center">
    <div className="bg-teal-100 text-teal-600 p-2 rounded-xl">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  </div>
);