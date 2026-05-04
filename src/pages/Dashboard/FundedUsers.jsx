// import React, { useEffect, useState, useMemo } from "react";
// import { motion } from "framer-motion";
// import { apiClient } from "../../api/apiClient";
// import {
//   Users,
//   Wallet,
//   ShieldCheck,
//   ShieldX,
//   Search,
// } from "lucide-react";

// const FundedUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ NEW STATES (UI ONLY)
//   const [search, setSearch] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [page, setPage] = useState(1);

//   const perPage = 6;

//   // ✅ FETCH (UNCHANGED)
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await apiClient.get("/api/admin/users/funded");
//         setUsers(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   /* ================= FILTER LOGIC ================= */
//   const filteredUsers = useMemo(() => {
//     return users.filter((u) => {
//       const matchesSearch =
//         u.name.toLowerCase().includes(search.toLowerCase()) ||
//         u.email.toLowerCase().includes(search.toLowerCase()) ||
//         u.phone.includes(search);

//       const matchesRole =
//         roleFilter === "all" || u.role === roleFilter;

//       const matchesStatus =
//         statusFilter === "all" ||
//         (statusFilter === "active" && !u.withdrawalFrozen) ||
//         (statusFilter === "frozen" && u.withdrawalFrozen);

//       return matchesSearch && matchesRole && matchesStatus;
//     });
//   }, [users, search, roleFilter, statusFilter]);

//   /* ================= PAGINATION ================= */
//   const totalPages = Math.ceil(filteredUsers.length / perPage);

//   const paginatedUsers = useMemo(() => {
//     const start = (page - 1) * perPage;
//     return filteredUsers.slice(start, start + perPage);
//   }, [filteredUsers, page]);

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
//           Funded Users
//         </h1>
//         <p className="text-gray-500 text-sm mt-1">
//           Manage funded accounts efficiently
//         </p>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <StatCard icon={<Users />} label="Total Users" value={users.length} />
//         <StatCard
//           icon={<Wallet />}
//           label="Total Funded"
//           value={`₦${users
//             .reduce((acc, u) => acc + u.depositWallet, 0)
//             .toLocaleString()}`}
//         />
//         <StatCard
//           icon={<ShieldCheck />}
//           label="Active"
//           value={users.filter((u) => !u.withdrawalFrozen).length}
//         />
//         <StatCard
//           icon={<ShieldX />}
//           label="Frozen"
//           value={users.filter((u) => u.withdrawalFrozen).length}
//         />
//       </div>

//       {/* FILTER BAR */}
//       <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        
//         {/* SEARCH */}
//         <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl w-full md:w-1/3">
//           <Search size={16} className="text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search name, email, phone..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//             className="bg-transparent outline-none text-sm w-full text-gray-700 dark:text-white"
//           />
//         </div>

//         {/* FILTERS */}
//         <div className="flex gap-2 flex-wrap">
//           <select
//             value={roleFilter}
//             onChange={(e) => {
//               setRoleFilter(e.target.value);
//               setPage(1);
//             }}
//             className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm"
//           >
//             <option value="all">All Roles</option>
//             <option value="user">User</option>
//             <option value="leader">Leader</option>
//           </select>

//           <select
//             value={statusFilter}
//             onChange={(e) => {
//               setStatusFilter(e.target.value);
//               setPage(1);
//             }}
//             className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm"
//           >
//             <option value="all">All Status</option>
//             <option value="active">Active</option>
//             <option value="frozen">Frozen</option>
//           </select>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="hidden md:block bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100 dark:bg-gray-800">
//             <tr>
//               <th className="p-4 text-left">User</th>
//               <th className="p-4 text-left">Role</th>
//               <th className="p-4 text-left">Wallet</th>
//               <th className="p-4 text-left">Status</th>
//               <th className="p-4 text-left">Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {paginatedUsers.map((user, i) => (
//               <motion.tr
//                 key={user.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.05 }}
//                 className="border-t dark:border-gray-800"
//               >
//                 <td className="p-4">
//                   <p className="font-semibold">{user.name}</p>
//                   <p className="text-xs text-gray-500">{user.email}</p>
//                 </td>

//                 <td className="p-4 capitalize">{user.role}</td>

//                 <td className="p-4 text-teal-600 font-semibold">
//                   ₦{user.depositWallet.toLocaleString()}
//                 </td>

//                 <td className="p-4">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs ${
//                       user.withdrawalFrozen
//                         ? "bg-red-100 text-red-600"
//                         : "bg-teal-100 text-teal-600"
//                     }`}
//                   >
//                     {user.withdrawalFrozen ? "Frozen" : "Active"}
//                   </span>
//                 </td>

//                 <td className="p-4 text-xs text-gray-500">
//                   {new Date(user.createdAt).toLocaleDateString()}
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* MOBILE */}
//       <div className="md:hidden space-y-4">
//         {paginatedUsers.map((user, i) => (
//           <motion.div
//             key={user.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white dark:bg-gray-900 p-4 rounded-2xl border"
//           >
//             <p className="font-semibold">{user.name}</p>
//             <p className="text-xs text-gray-500">{user.email}</p>

//             <div className="mt-2 text-sm flex justify-between">
//               <span>{user.role}</span>
//               <span className="text-teal-600">
//                 ₦{user.depositWallet.toLocaleString()}
//               </span>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* PAGINATION */}
//       <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
//         <button
//           onClick={() => setPage((p) => Math.max(p - 1, 1))}
//           className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800"
//         >
//           Prev
//         </button>

//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => setPage(i + 1)}
//             className={`px-3 py-1 rounded-lg text-sm ${
//               page === i + 1
//                 ? "bg-teal-600 text-white"
//                 : "bg-gray-200 dark:bg-gray-800"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button
//           onClick={() =>
//             setPage((p) => Math.min(p + 1, totalPages))
//           }
//           className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800"
//         >
//           Next
//         </button>
//       </div>

//       {loading && (
//         <div className="text-center mt-6 text-gray-500">
//           Loading...
//         </div>
//       )}
//     </div>
//   );
// };

// export default FundedUsers;

// /* ================= SMALL COMPONENT ================= */

// const StatCard = ({ icon, label, value }) => (
//   <div className="bg-white dark:bg-gray-900 border rounded-2xl p-4 flex gap-3 items-center">
//     <div className="bg-teal-100 text-teal-600 p-2 rounded-xl">
//       {icon}
//     </div>
//     <div>
//       <p className="text-xs text-gray-500">{label}</p>
//       <p className="font-bold">{value}</p>
//     </div>
//   </div>
// );









import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "../../api/apiClient";
import {
  Users,
  Wallet,
  ShieldCheck,
  ShieldX,
  Search,
  User as UserIcon,
  Calendar,
} from "lucide-react";

const FundedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI STATES
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const perPage = 6;

  // FETCH
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

  // FILTER LOGIC
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.phone.includes(search);

      const matchesRole = roleFilter === "all" || u.role === roleFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && !u.withdrawalFrozen) ||
        (statusFilter === "frozen" && u.withdrawalFrozen);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  // PAGINATION
  const totalPages = Math.ceil(filteredUsers.length / perPage);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredUsers.slice(start, start + perPage);
  }, [filteredUsers, page]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 font-sans">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tight">
          Funded Users
        </h1>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">
          Financial Audit Ledger
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Users />} label="Total Users" value={users.length} />
        <StatCard
          icon={<Wallet />}
          label="Total Balance"
          value={`$${users
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
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-2xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 px-4 py-2.5 rounded-xl w-full md:w-1/3 border border-transparent focus-within:border-teal-500/50 transition-all">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search database..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="bg-transparent outline-none text-xs font-bold w-full text-gray-700 dark:text-white"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer"
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
            className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="frozen">Frozen</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="hidden md:block bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl border border-gray-100 dark:border-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/50 dark:bg-white/[0.02]">
            <tr>
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">User Details</th>
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Role</th>
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Balance</th>
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Admin Audit</th>
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50 dark:divide-white/5">
            {paginatedUsers.map((user, i) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="hover:bg-gray-50 dark:hover:bg-white/[0.01] transition-colors"
              >
                <td className="p-6">
                  <p className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">{user.name}</p>
                  <p className="text-[10px] text-gray-400 font-medium">{user.email}</p>
                </td>

                <td className="p-6">
                  <span className="text-[10px] font-black uppercase tracking-tighter bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-md">{user.role}</span>
                </td>

                <td className="p-6 font-black text-teal-600">
                  ${user.depositWallet.toLocaleString()}
                </td>

                <td className="p-6 min-w-[200px]">
                  <div className="flex flex-col gap-1.5">
                    {user.fundedBy && user.fundedBy.length > 0 ? (
                      user.fundedBy.map((log, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-white/5 rounded-lg p-2 border border-gray-100 dark:border-white/5">
                          <div className="flex items-center justify-between gap-4 mb-1">
                            <span className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-1">
                              <UserIcon size={10} className="text-teal-500" /> {log.adminName || "System/User"}
                            </span>
                            <span className="text-[9px] font-black text-teal-600">+${log.amount.toLocaleString()}</span>
                          </div>
                          <p className="text-[8px] text-gray-400 font-bold flex items-center gap-1 uppercase">
                            <Calendar size={10} /> {new Date(log.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <span className="text-[10px] text-gray-400 font-bold uppercase opacity-50 italic">No admin record</span>
                    )}
                  </div>
                </td>

                <td className="p-6">
                  <span
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      user.withdrawalFrozen
                        ? "bg-red-500/10 text-red-500"
                        : "bg-teal-500/10 text-teal-500"
                    }`}
                  >
                    {user.withdrawalFrozen ? "Frozen" : "Active"}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="md:hidden space-y-4">
        {paginatedUsers.map((user) => (
          <div key={user.id} className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold text-gray-900 dark:text-white uppercase leading-tight">{user.name}</p>
                <p className="text-[10px] text-gray-400">{user.email}</p>
              </div>
              <span className={`px-2 py-1 rounded text-[8px] font-black uppercase ${user.withdrawalFrozen ? 'bg-red-500 text-white' : 'bg-teal-500 text-white'}`}>
                {user.withdrawalFrozen ? "Frozen" : "Active"}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50 dark:border-white/5">
              <div>
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Role</p>
                <p className="text-xs font-bold dark:text-white uppercase">{user.role}</p>
              </div>
              <div>
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Balance</p>
                <p className="text-xs font-black text-teal-600">${user.depositWallet.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 dark:border-white/5">
               <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">Recent Funding Activity</p>
               <div className="space-y-2">
                 {user.fundedBy.slice(0, 2).map((log, idx) => (
                   <div key={idx} className="flex justify-between items-center text-[10px]">
                      <span className="font-bold dark:text-gray-300">{log.adminName || "System"}</span>
                      <span className="font-black text-teal-600">+${log.amount}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-3 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="p-2 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:bg-teal-500 hover:text-white transition-all disabled:opacity-30"
          disabled={page === 1}
        >
          <Search size={16} className="rotate-180" />
        </button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-xl text-[10px] font-black transition-all ${
                page === i + 1
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-500/30"
                  : "bg-white dark:bg-white/5 text-gray-400"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="p-2 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:bg-teal-500 hover:text-white transition-all disabled:opacity-30"
          disabled={page === totalPages}
        >
          <Search size={16} />
        </button>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-gray-900/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-2xl flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Deciphering Ledger...</p>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-3xl p-5 flex gap-4 items-center shadow-sm">
    <div className="bg-teal-500/10 text-teal-600 p-3 rounded-2xl">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-lg font-black dark:text-white leading-none mt-1">{value}</p>
    </div>
  </div>
);

export default FundedUsers;