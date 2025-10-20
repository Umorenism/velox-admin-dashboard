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
