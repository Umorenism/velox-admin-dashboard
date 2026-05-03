import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { getUsers } from "../../api/userApi";
import { Search, Package, TrendingUp } from "lucide-react";

const UserPackages = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI STATES
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const perPage = 6;

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* ================= FLATTEN PACKAGES ================= */
  const packages = useMemo(() => {
    return data.flatMap((user) =>
      (user.packages || []).map((pkg) => ({
        ...pkg,
        userName: user.name,
        userEmail: user.email,
      }))
    );
  }, [data]);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return packages.filter((p) => {
      const matchSearch =
        p.packageId?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        p.userName?.toLowerCase().includes(search.toLowerCase()) ||
        p.userEmail?.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" || p.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [packages, search, statusFilter]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Subscribed Packages
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage all user package subscriptions
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border mb-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        
        {/* SEARCH */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl w-full md:w-1/3">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search package or user..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* STATUS FILTER */}
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
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white dark:bg-gray-900 rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-4 text-left">Package</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Trading Pool</th>
              <th className="p-4 text-left">Earned</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((item, i) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-t dark:border-gray-800"
              >
                {/* PACKAGE + IMAGE */}
                <td className="p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">
                      {item.packageId?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      ${item.packageId?.price}
                    </p>
                  </div>

                  <img
                    src={item.packageId?.image}
                    alt=""
                    className="w-10 h-10 object-cover rounded-lg border"
                  />
                </td>

                <td className="p-4">
                  <p className="font-medium">{item.userName}</p>
                  <p className="text-xs text-gray-500">
                    {item.userEmail}
                  </p>
                </td>

                <td className="p-4 text-teal-600 font-semibold">
                  ${item.tradingPool}
                </td>

                <td className="p-4 text-yellow-500 font-semibold">
                  ${item.totalEarned}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      item.status === "active"
                        ? "bg-teal-100 text-teal-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-4 text-xs text-gray-500">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {paginated.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 p-4 rounded-2xl border flex justify-between items-start gap-3"
          >
            <div>
              <p className="font-semibold">
                {item.packageId?.name}
              </p>

              <p className="text-xs text-gray-500">
                {item.userName}
              </p>

              <div className="mt-2 text-sm">
                <p className="text-teal-600">
                  Pool: ${item.tradingPool}
                </p>
                <p className="text-yellow-500">
                  Earned: ${item.totalEarned}
                </p>
              </div>
            </div>

            {/* SMALL IMAGE RIGHT */}
            <img
              src={item.packageId?.image}
              alt=""
              className="w-12 h-12 rounded-lg object-cover border"
            />
          </motion.div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-lg"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-lg ${
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
          className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-lg"
        >
          Next
        </button>
      </div>

      {loading && (
        <div className="text-center mt-6 text-gray-500">
          Loading packages...
        </div>
      )}
    </div>
  );
};

export default UserPackages;