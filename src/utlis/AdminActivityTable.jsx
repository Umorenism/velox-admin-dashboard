import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const AdminActivityTable = () => {
  const tableData = [
    {
      id: 1,
      adminId: "ALX65272",
      dateTime: "05-08-2025",
      loginTime: "06:45PM",
      logoutTime: "02:45AM",
      action: "Withdrawal",
    },
    {
      id: 2,
      adminId: "ALX65272",
      dateTime: "05-08-2025",
      loginTime: "06:45PM",
      logoutTime: "02:45AM",
      action: "Created Banners",
    },
    {
      id: 3,
      adminId: "ALX65272",
      dateTime: "05-08-2025",
      loginTime: "06:45PM",
      logoutTime: "02:45AM",
      action: "Created Package",
    },
    {
      id: 4,
      adminId: "ALX65272",
      dateTime: "05-08-2025",
      loginTime: "06:45PM",
      logoutTime: "02:45AM",
      action: "Transactions",
    },
    {
      id: 5,
      adminId: "ALX65272",
      dateTime: "05-08-2025",
      loginTime: "06:45PM",
      logoutTime: "02:45AM",
      action: "Transactions",
    },
  ];

  const [entriesPerPage, setEntriesPerPage] = useState(10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full dark:text-white dark:bg-neutral-800  mx-auto bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      {/* Table Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex dark:text-white items-center gap-2 text-sm text-gray-600">
          <span>Showing</span>
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="border dark:text-gray-500 border-gray-300 rounded-md px-1.5 py-0.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>Entries</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-50 dark:text-gray-500 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium">S/N ⇅</th>
              <th className="px-6 py-3 font-medium">Admin ID ⇅</th>
              <th className="px-6 py-3 font-medium">Date & Time ⇅</th>
              <th className="px-6 py-3 font-medium">Login Time ⇅</th>
              <th className="px-6 py-3 font-medium">Logout Time ⇅</th>
              <th className="px-6 py-3 font-medium">Action Taken ⇅</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="hover:bg-gray-50 dark:text-white border-b last:border-none"
              >
                <td className="px-6 py-3">{row.id}</td>
                <td className="px-6 py-3">{row.adminId}</td>
                <td className="px-6 py-3">{row.dateTime}</td>
                <td className="px-6 py-3">{row.loginTime}</td>
                <td className="px-6 py-3">{row.logoutTime}</td>
                <td className="px-6 py-3 text-gray-800">{row.action}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center dark:text-white justify-between px-4 py-3 border-t border-gray-200">
        <p className="text-sm dark:text-white text-gray-600 mt-5">
          Page <span className="font-medium">1</span> of{" "}
          <span className="font-medium">1</span>
        </p>
        <div className="flex items-center mt-5 gap-2">
          <button className="flex dark:text-white items-center gap-1 px-3 py-1  rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <FiChevronLeft size={14} /> Previous
          </button>

          <span className="px-3 py-1 bg-orange-600 text-white rounded-[100px] text-sm">
            1
          </span>

          <button className="flex dark:text-white items-center gap-1 px-3 py-1  text-sm text-gray-600 hover:bg-gray-50">
            Next <FiChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminActivityTable;






// import React, { useState, useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import { apiClient } from "../api/apiClient"; // ✅ your axios setup file

// const AdminActivityTable = ({ searchQuery = "" }) => {
//   const [companyData, setCompanyData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   // ✅ Fetch data from endpoint
//   useEffect(() => {
//     const fetchCompanyData = async () => {
//       try {
//         setLoading(true);
//         const res = await apiClient.get("/api/admin/settings/company");
//         // The endpoint returns one object, so we wrap it in an array
//         setCompanyData([res.data]);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load company data");
//         setLoading(false);
//       }
//     };
//     fetchCompanyData();
//   }, []);

//   // 🔍 Search filter
//   const filteredData = useMemo(() => {
//     if (!searchQuery) return companyData;
//     return companyData.filter((item) =>
//       Object.values(item)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase())
//     );
//   }, [companyData, searchQuery]);

//   // 🔢 Pagination
//   const totalPages = Math.ceil(filteredData.length / entriesPerPage);
//   const startIndex = (currentPage - 1) * entriesPerPage;
//   const currentEntries = filteredData.slice(
//     startIndex,
//     startIndex + entriesPerPage
//   );

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   // 📤 Export CSV
//   const exportToCSV = () => {
//     if (!filteredData.length) return;
//     const headers = Object.keys(filteredData[0]).join(",");
//     const rows = filteredData
//       .map((item) => Object.values(item).join(","))
//       .join("\n");
//     const csv = `${headers}\n${rows}`;
//     const blob = new Blob([csv], { type: "text/csv" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "company_profile.csv";
//     link.click();
//   };

//   useEffect(() => {
//     const exportHandler = () => exportToCSV();
//     window.addEventListener("exportTableCSV", exportHandler);
//     return () => window.removeEventListener("exportTableCSV", exportHandler);
//   }, [filteredData]);

//   if (loading) {
//     return (
//       <div className="w-full text-center py-8 text-gray-600 dark:text-gray-300">
//         Loading company data...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full text-center py-8 text-red-500">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="w-full dark:text-white dark:bg-neutral-800 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm"
//     >
//       {/* Table Header */}
//       <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
//         <div className="flex dark:text-white items-center gap-2 text-sm text-gray-600">
//           <span>Show</span>
//           <select
//             value={entriesPerPage}
//             onChange={(e) => {
//               setEntriesPerPage(Number(e.target.value));
//               setCurrentPage(1);
//             }}
//             className="border dark:text-gray-500 border-gray-300 rounded-md px-1.5 py-0.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
//           >
//             <option value="10">10</option>
//             <option value="25">25</option>
//             <option value="50">50</option>
//           </select>
//           <span>entries</span>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-left text-sm text-gray-700">
//           <thead className="bg-gray-50 dark:text-gray-500 border-b border-gray-200">
//             <tr>
//               <th className="px-6 py-3 font-medium">S/N</th>
//               <th className="px-6 py-3 font-medium">Company Name</th>
//               <th className="px-6 py-3 font-medium">Email</th>
//               <th className="px-6 py-3 font-medium">Phone</th>
//               <th className="px-6 py-3 font-medium">Contact Person</th>
//               <th className="px-6 py-3 font-medium">Address</th>
//               <th className="px-6 py-3 font-medium">Default Currency</th>
//               <th className="px-6 py-3 font-medium">Last Updated</th>
//               <th className="px-6 py-3 font-medium">Logo</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentEntries.map((row, idx) => (
//               <motion.tr
//                 key={row._id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.05 }}
//                 className="hover:bg-gray-50 dark:text-white border-b last:border-none"
//               >
//                 <td className="px-6 py-3">{startIndex + idx + 1}</td>
//                 <td className="px-6 py-3">{row.companyName}</td>
//                 <td className="px-6 py-3">{row.companyEmail}</td>
//                 <td className="px-6 py-3">{row.companyPhone}</td>
//                 <td className="px-6 py-3">{row.contactPerson}</td>
//                 <td className="px-6 py-3">{row.companyAddress}</td>
//                 <td className="px-6 py-3">{row.defaultCurrency}</td>
//                 <td className="px-6 py-3">
//                   {new Date(row.updatedAt).toLocaleString()}
//                 </td>
//                 <td className="px-6 py-3">
//                   <img
//                     src={row.companyLogo}
//                     alt="Company Logo"
//                     className="h-8 w-8 rounded-full object-cover"
//                   />
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center dark:text-white justify-between px-4 py-3 border-t border-gray-200">
//         <p className="text-sm text-gray-600">
//           Page <span className="font-medium">{currentPage}</span> of{" "}
//           <span className="font-medium">{totalPages}</span>
//         </p>
//         <div className="flex items-center gap-2">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => handlePageChange(currentPage - 1)}
//             className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
//           >
//             <FiChevronLeft size={14} /> Previous
//           </button>

//           <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-sm">
//             {currentPage}
//           </span>

//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => handlePageChange(currentPage + 1)}
//             className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
//           >
//             Next <FiChevronRight size={14} />
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default AdminActivityTable;

