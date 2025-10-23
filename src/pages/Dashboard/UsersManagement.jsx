import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";



import { Search, Filter, Upload } from "lucide-react";

import UserTable from "../../utlis/UserTable";
export default function UsersManagement() {
  

  // const wallets = [
  //   { id: 1, title: "Deposit Wallet", amount: "0.00 USD" },
  //   { id: 2, title: "USD Wallet", amount: "0.00 USD" },
  //   { id: 3, title: "IB Wallet", amount: "0.00 USD" },
  //   { id: 4, title: "Credit Wallet", amount: "0.00 USD" },
  // ];

  // const data = [
  //   {
  //     title: "Opix Algo Lite",
  //     des: "Fully automated algorithmic trading that uses advanced order flow strategy, money management and probabilistic analysis.",
  //   },
  //   {
  //     title: "Opix Algo Pro",
  //     des: "Fine-tuned automated trading improving as it learns through self-optimization. Equity protection, order flow strategy, and money management.",
  //   },
  //   {
  //     title: "Opix Algo Expert",
  //     des: "Next generation algorithmic trading providing unique stability. Volume-based trading, equity protection, and probabilistic analysis.",
  //   },
  // ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-[400px]"
    >
      {/* Dashboard Header */}
      <motion.div
        variants={fadeUp}
        className="w-full max-w-[1500px] mt-5 dark:bg-neutral-900"
      >
        <div className="space-y-5 ">
          <RiMenuFoldLine size={30} />
          <h1 className="text-[24px] font-[700] text-[#000000] dark:text-white">
            User Management
          </h1>
        </div>

        <div className="flex mb-10 mt-5 flex-wrap items-center gap-3 dark:bg-neutral-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800">
          {/* 🔍 Search Bar */}
          <div className="flex items-center w-full sm:w-1/3 bg-white dark:bg-neutral-800 rounded-lg border border-gray-300 dark:border-neutral-700 px-3 py-3 focus-within:ring-2 focus-within:ring-green-500 transition-all">
            <Search
              size={16}
              className="text-gray-500 dark:text-gray-400 mr-2"
            />
            <input
              type="text"
              placeholder="Search users, packages..."
              className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* 🔘 Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Filter Button */}
            <button className="flex items-center gap-1.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 px-3 py-3 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all">
              <Filter size={16} />
              Filter
            </button>

            {/* Import CSV Button */}
            <button className="flex items-center gap-1.5 bg-white hover:bg-green-700 text-black px-3 py-3 rounded-lg text-sm shadow-md transition-all">
              <Upload size={16} />
              Import CSV
            </button>
          </div>
        </div>

        <div>
          <UserTable />
        </div>
      </motion.div>
    </motion.div>
  );
}









// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { RiMenuFoldLine } from "react-icons/ri";
// import { Search, Filter, Upload } from "lucide-react";
// import UserTable from "../../utlis/UserTable";
// // import { getAllUsers,} from "../../api/exportUser"; // ✅ import from your api file

// export default function UsersManagement() {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch users from API
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const data = await getAllUsers();
//         setUsers(data);
//         setFilteredUsers(data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // ✅ Filter logic
//   useEffect(() => {
//     const lower = searchTerm.toLowerCase();
//     const filtered = users.filter(
//       (u) =>
//         u.username?.toLowerCase().includes(lower) ||
//         u.email?.toLowerCase().includes(lower) ||
//         u.userType?.toLowerCase().includes(lower)
//     );
//     setFilteredUsers(filtered);
//   }, [searchTerm, users]);

//   // ✅ Export users (filtered)
//   const handleExport = async () => {
//     try {
//       const response = await exportUser({ users: filteredUsers });
//       const blob = new Blob([response], { type: "text/csv" });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "exported_users.csv");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error("Export failed:", error);
//     }
//   };

//   const fadeUp = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };

//   return (
//     <motion.div
//       initial="hidden"
//       animate="show"
//       className="flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-[400px]"
//     >
//       <motion.div
//         variants={fadeUp}
//         className="w-full max-w-[1500px] mt-5 dark:bg-neutral-900"
//       >
//         {/* Header */}
//         <div className="space-y-5">
//           <RiMenuFoldLine size={30} />
//           <h1 className="text-[24px] font-[700] text-[#000000] dark:text-white">
//             User Management
//           </h1>
//         </div>

//         {/* Top Controls */}
//         <div className="flex mb-10 mt-5 flex-wrap items-center gap-3 dark:bg-neutral-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800">
//           {/* 🔍 Search Bar */}
//           <div className="flex items-center w-full sm:w-1/3 bg-white dark:bg-neutral-800 rounded-lg border border-gray-300 dark:border-neutral-700 px-3 py-3 focus-within:ring-2 focus-within:ring-green-500 transition-all">
//             <Search
//               size={16}
//               className="text-gray-500 dark:text-gray-400 mr-2"
//             />
//             <input
//               type="text"
//               placeholder="Search users, packages..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
//             />
//           </div>

//           {/* 🔘 Buttons */}
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setFilteredUsers(users)} // reset filter
//               className="flex items-center gap-1.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 px-3 py-3 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all"
//             >
//               <Filter size={16} />
//               Reset
//             </button>

//             <button
//               onClick={handleExport}
//               className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-3 rounded-lg text-sm shadow-md transition-all"
//             >
//               <Upload size={16} />
//               Export Users
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div>
//           {loading ? (
//             <div className="text-center py-10 text-gray-500 dark:text-gray-400">
//               Loading users...
//             </div>
//           ) : (
//             <UserTable users={filteredUsers} />
//           )}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }
