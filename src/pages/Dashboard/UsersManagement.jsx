





// // import React, { useEffect, useState } from "react";
// // import { motion } from "framer-motion";
// // import { Search, Filter } from "lucide-react";
// // import { getUsers } from "../../api/userApi"; // ← your users endpoint
// // import UserTable from "../../utlis/UserTable";

// // export default function UserManagement() {
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [filter, setFilter] = useState("All");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const entriesPerPage = 8;

// //   const fetchUsers = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await getUsers();
// //       setUsers(res?.users || []);
// //     } catch (err) {
// //       console.error("❌ Failed to fetch users:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       className="bg-gray-100 dark:bg-neutral-900 min-h-screen px-6 py-10 text-gray-900 dark:text-white"
// //     >
// //       <h1 className="text-2xl font-bold mb-6">User Management</h1>

// //       {/* 🔍 Search + Filter */}
// //       <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
// //         <div className="flex items-center bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg px-3 py-2 w-full sm:w-1/3">
// //           <Search size={16} className="text-gray-500 mr-2" />
// //           <input
// //             type="text"
// //             placeholder="Search users..."
// //             className="w-full bg-transparent outline-none text-sm"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //         </div>

// //         <select
// //           className="bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm"
// //           value={filter}
// //           onChange={(e) => setFilter(e.target.value)}
// //         >
// //           <option value="All">All</option>
// //           <option value="Admin">Admin</option>
// //           <option value="User">User</option>
// //         </select>
// //       </div>

// //       {/* 🧾 User Table */}
// //       <UserTable
// //         users={users}
// //         loading={loading}
// //         searchTerm={searchTerm}
// //         filter={filter}
// //         entriesPerPage={entriesPerPage}
// //         currentPage={currentPage}
// //         setCurrentPage={setCurrentPage}
// //         onRefresh={fetchUsers}
// //       />
// //     </motion.div>
// //   );
// // }





// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Search, Filter } from "lucide-react";
// import { getUsers } from "../../api/userApi";
// import UserTable from "../../utlis/UserTable";

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const entriesPerPage = 8;

//   // Fetch Users
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const data = await getUsers();
//       setUsers(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="bg-gray-100 dark:bg-neutral-900 min-h-screen px-6 py-10 text-gray-900 dark:text-white"
//     >
//       <h1 className="text-2xl font-bold mb-6">User Management</h1>

//       {/* Error Message */}
//       {error && (
//         <p className="text-red-500 mb-4 bg-red-100 dark:bg-red-900 p-2 rounded">{error}</p>
//       )}

//       {/* Search + Filter */}
//       <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
//         <div className="flex items-center bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg px-3 py-2 w-full sm:w-1/3">
//           <Search size={16} className="text-gray-500 mr-2" />
//           <input
//             type="text"
//             placeholder="Search users..."
//             className="w-full bg-transparent outline-none text-sm"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <select
//           className="bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           <option value="All">All</option>
//           <option value="Admin">Admin</option>
//           <option value="User">User</option>
//         </select>
//       </div>

//       {/* User Table */}
//       <UserTable
//         users={users}
//         loading={loading}
//         searchTerm={searchTerm}
//         filter={filter}
//         entriesPerPage={entriesPerPage}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         onRefresh={fetchUsers}
//       />
//     </motion.div>
//   );
// }



import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, ShieldCheck, Loader2 } from "lucide-react";
import { getUsers } from "../../api/userApi";
import UserTable from "../../utlis/UserTable";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getUsers();
      setUsers(data || []);
    } catch (err) {
      setError(err.message);
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
      className="p-4 sm:p-8 max-w-[1600px] mx-auto min-h-screen bg-gray-50 dark:bg-[#020617] transition-colors duration-300"
    >
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">User Management</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Control and fund platform accounts</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-2xl text-sm font-bold">
          ⚠️ {error}
        </div>
      )}

      {/* Header Actions */}
      <div className="bg-white dark:bg-slate-900/50 p-4 rounded-[2rem] border border-slate-200 dark:border-white/5 mb-8 flex flex-col xl:flex-row items-center gap-4 shadow-sm">
        <div className="relative w-full xl:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-green-500 outline-none dark:text-white transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full xl:w-48 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="All">All Roles</option>
          <option value="Admin">Administrators</option>
          <option value="User">Regular Users</option>
        </select>
      </div>

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




