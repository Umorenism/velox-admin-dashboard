
// import React from "react";
// import { motion } from "framer-motion";
// import { RiMenuFoldLine } from "react-icons/ri";
// import { Search, Filter, Upload } from "lucide-react";
// import AdminActivityTable from "../../utlis/AdminActivityTable";

// export default function Settings() {
//   const fadeUp = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };

//   return (
//     <motion.div
//       initial="hidden"
//       animate="show"
//       className="flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-[400px] px-3 sm:px-5"
//     >
//       {/* Wrapper */}
//       <motion.div
//         variants={fadeUp}
//         className="w-full max-w-[1500px] mt-5 dark:bg-neutral-900"
//       >
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-6">
//           <RiMenuFoldLine
//             size={28}
//             className="cursor-pointer text-gray-800 dark:text-gray-100"
//           />
//           <h1 className="text-[22px] sm:text-[26px] font-[700] text-[#000000] dark:text-white">
//             Activity Log
//           </h1>
//         </div>

//         {/* Search & Actions */}
//         <div className="flex flex-col sm:flex-row flex-wrap mb-10 mt-5 items-center gap-3 dark:bg-neutral-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800">
//           {/* 🔍 Search Bar */}
//           <div className="flex items-center w-full sm:w-1/3 bg-white dark:bg-neutral-800 rounded-lg border border-gray-300 dark:border-neutral-700 px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-500 transition-all">
//             <Search
//               size={16}
//               className="text-gray-500 dark:text-gray-400 mr-2"
//             />
//             <input
//               type="text"
//               placeholder="Search users, activities..."
//               className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
//             />
//           </div>

//           {/* 🔘 Action Buttons */}
//           <div className="flex items-center gap-2 w-full sm:w-auto">
//             {/* Filter Button */}
//             <button className="flex items-center justify-center gap-1.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 px-3 py-2.5 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all w-full sm:w-auto">
//               <Filter size={16} />
//               Filter
//             </button>

//             {/* Import CSV Button */}
//             <button className="flex items-center justify-center gap-1.5 bg-[#00A991] hover:bg-green-700 text-white px-3 py-2.5 rounded-lg text-sm shadow-md transition-all w-full sm:w-auto">
//               <Upload size={16} />
//               Import CSV
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <AdminActivityTable />
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }








import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { Search, Filter, Upload, RefreshCw } from "lucide-react";
import AdminActivityTable from "../../utlis/AdminActivityTable";
import { fetchCompanyProfile } from "../../api/companyApi";

export default function Settings() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // 🔹 Fetch company data
  useEffect(() => {
    const getCompany = async () => {
      setLoading(true);
      try {
        const data = await fetchCompanyProfile();
        setCompany(data);
      } catch (error) {
        console.error("Failed to load company profile", error);
      } finally {
        setLoading(false);
      }
    };
    getCompany();
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-[400px] px-3 sm:px-5"
    >
      {/* Wrapper */}
      <motion.div
        variants={fadeUp}
        className="w-full max-w-[1500px] mt-5 dark:bg-neutral-900"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <RiMenuFoldLine
            size={28}
            className="cursor-pointer text-gray-800 dark:text-gray-100"
          />
          <h1 className="text-[22px] sm:text-[26px] font-[700] text-[#000000] dark:text-white">
            Company Settings
          </h1>
        </div>

        {/* Company Profile Section */}
        {loading ? (
          <p className="text-center text-gray-500">Loading company profile...</p>
        ) : company ? (
          <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-5 mb-8 flex flex-col sm:flex-row gap-5">
            <img
              src={company.companyLogo}
              alt="Company Logo"
              className="w-28 h-28 object-contain rounded-lg border dark:border-neutral-700"
            />
            <div>
              <h2 className="text-xl font-semibold mb-1">{company.companyName}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {company.aboutCompany}
              </p>
              <div className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  <strong>Email:</strong> {company.companyEmail}
                </p>
                <p>
                  <strong>Phone:</strong> {company.companyPhone}
                </p>
                <p>
                  <strong>Address:</strong> {company.companyAddress}
                </p>
                <p>
                  <strong>Currency:</strong> {company.defaultCurrency}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No company data found.</p>
        )}

        {/* Search & Actions */}
        <div className="flex flex-col sm:flex-row flex-wrap mb-10 mt-5 items-center gap-3 dark:bg-neutral-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800">
          {/* 🔍 Search Bar */}
          <div className="flex items-center w-full sm:w-1/3 bg-white dark:bg-neutral-800 rounded-lg border border-gray-300 dark:border-neutral-700 px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-500 transition-all">
            <Search
              size={16}
              className="text-gray-500 dark:text-gray-400 mr-2"
            />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* 🔘 Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Filter Button */}
            <button className="flex items-center justify-center gap-1.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 px-3 py-2.5 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all">
              <Filter size={16} />
              Filter
            </button>

            {/* Export Button */}
            <button
              onClick={() => window.dispatchEvent(new Event("exportTableCSV"))}
              className="flex items-center justify-center gap-1.5 bg-[#00A991] hover:bg-green-700 text-white px-3 py-2.5 rounded-lg text-sm shadow-md transition-all"
            >
              <Upload size={16} />
              Export CSV
            </button>

            {/* Refresh */}
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-1.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <AdminActivityTable searchQuery={searchQuery} />
        </div>
      </motion.div>
    </motion.div>
  );
}
