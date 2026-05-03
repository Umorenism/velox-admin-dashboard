import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "../../api/apiClient";
import { Search, Crown, ShieldCheck,X  } from "lucide-react";

const UserRankManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI STATES
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [newRank, setNewRank] = useState("");
  const [toast, setToast] = useState(null);

  const perPage = 6;

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiClient.get("/api/admin/users");

        // ✅ NORMALIZE ID (CRITICAL FIX)
        const normalized = res.data.map((u) => ({
          ...u,
          id: u.id || u._id,
        }));

        setUsers(normalized);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  /* ================= ACTIONS ================= */

  const promoteToLeader = async () => {
    const userId = selectedUser?.id;

    if (!userId) {
      setToast("Invalid user ID");
      return;
    }

    try {
      await apiClient.post(
        `/api/admin/users/${userId}/role/leader`
      );

      setToast("User promoted to leader successfully");

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, role: "leader" } : u
        )
      );
    } catch (err) {
      setToast("Failed to promote user");
    } finally {
      closeModal();
    }
  };

  const updateRank = async () => {
    const userId = selectedUser?.id;

    if (!userId || !newRank) {
      setToast("Select a valid rank");
      return;
    }

    try {
      await apiClient.post(
        `/api/admin/users/${userId}/rank`,
        { newRank }
      );

      setToast("User rank updated successfully");

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, rank: newRank } : u
        )
      );
    } catch (err) {
      setToast("Failed to update rank");
    } finally {
      closeModal();
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedUser(null);
    setNewRank("");
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          User Management
        </h1>
      </div>

      {/* SEARCH */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl mb-6 border flex items-center gap-2">
        <Search size={16} />
        <input
          placeholder="Search users..."
          className="bg-transparent outline-none w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* TABLE */}
      <div className="hidden md:block bg-white dark:bg-gray-900 rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Rank</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((user, i) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t"
              >
                <td className="p-4">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">
                    {user.email}
                  </p>
                </td>

                <td className="p-4 capitalize text-teal-600">
                  {user.role}
                </td>

                <td className="p-4 text-yellow-500 capitalize">
                  {user.rank || "none"}
                </td>

                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setModalType("role");
                    }}
                    className="px-3 py-1 bg-teal-600 text-white rounded-lg text-xs flex items-center gap-1"
                  >
                    <ShieldCheck size={14} /> Promote
                  </button>

                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setModalType("rank");
                    }}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-xs flex items-center gap-1"
                  >
                    <Crown size={14} /> Rank
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="md:hidden space-y-4">
        {paginated.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-900 p-4 rounded-2xl border"
          >
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>

            <div className="flex justify-between mt-2 text-sm">
              <span className="text-teal-600">{user.role}</span>
              <span className="text-yellow-500">
                {user.rank || "none"}
              </span>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  setSelectedUser(user);
                  setModalType("role");
                }}
                className="flex-1 bg-teal-600 text-white py-1 rounded-lg text-xs"
              >
                Promote
              </button>

              <button
                onClick={() => {
                  setSelectedUser(user);
                  setModalType("rank");
                }}
                className="flex-1 bg-yellow-500 text-white py-1 rounded-lg text-xs"
              >
                Rank
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-teal-600 text-white"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalType && (
          <motion.div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-80"
            >
              {modalType === "role" ? (
                <>
                  <h2 className="font-bold mb-4">
                    Promote to Leader?
                  </h2>
                  <button
                    onClick={promoteToLeader}
                    className="w-full bg-teal-600 text-white py-2 rounded-lg"
                  >
                    Confirm
                  </button>
                </>
              ) : (
                <>
                  <h2 className="font-bold mb-4">
                    Update Rank
                  </h2>

                  <select
                    value={newRank}
                    onChange={(e) =>
                      setNewRank(e.target.value)
                    }
                    className="w-full bg-gray-100 dark:bg-gray-800 mb-4 p-2 border rounded"
                  >
                    <option value="">Select rank</option>
                    <option value="executive">Executive</option>
                    <option value="director">Director</option>
                    <option value="president">President</option>
                    <option value="manager">Manager</option>
                    <option value="ambassador">Ambassador</option>
                    <option value="global_ambassador">Global Ambassador</option>
                  </select>

                  <button
                    onClick={updateRank}
                    className="w-full bg-yellow-500 text-white py-2 rounded-lg"
                  >
                    Update
                  </button>
                </>
              )}

              <button
                onClick={closeModal}
                className="mt-3 text-sm text-gray-500"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
  {toast && (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-5 left-1/2 -translate-x-1/2 
                 bg-emerald-500 text-white px-4 py-3 
                 rounded-xl shadow-lg flex items-center gap-3 
                 z-50 min-w-[250px] max-w-sm"
    >
      {/* MESSAGE */}
      <span className="text-sm flex-1">{toast}</span>

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setToast(null)}
        className="hover:bg-white/20 p-1 rounded-md transition"
      >
        <X size={16} />
      </button>
    </motion.div>
  )}
</AnimatePresence>

      {loading && (
        <div className="text-center mt-6 text-gray-500">
          Loading...
        </div>
      )}
    </div>
  );
};

export default UserRankManagement;