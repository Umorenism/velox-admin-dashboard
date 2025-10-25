// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { RiMenuFoldLine } from "react-icons/ri";



// import { Search, Filter, Upload } from "lucide-react";


// export default function BannersPage() {
  

  
//   // Animation variants
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
//       {/* Dashboard Header */}
//       <motion.div
//         variants={fadeUp}
//         className="w-full max-w-[1500px] mt-2 dark:bg-neutral-900"
//       >
//         <div className="space-y-5 ">
//           <RiMenuFoldLine size={30} />
//           <h1 className="text-[24px] font-[700] text-[#000000] dark:text-white">
//             Banners
//           </h1>
//         </div>

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
//               className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
//             />
//           </div>

//           {/* 🔘 Action Buttons */}
//           <div className="flex items-center gap-2">
//             {/* Filter Button */}
//             <button className="flex items-center gap-1.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 px-3 py-3 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all">
//               <Filter size={16} />
//               Filter
//             </button>

//             {/* Import CSV Button */}
//             <button className="flex items-center gap-1.5 bg-white hover:bg-green-700 text-black px-3 py-3 rounded-lg text-sm shadow-md transition-all">
//               <Upload size={16} />
//               Import CSV
//             </button>
//           </div>
//         </div>

//         <div>
         
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }





// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { RiMenuFoldLine } from "react-icons/ri";
// import { Search, Filter, Upload, Edit, Trash2, RefreshCw } from "lucide-react";
// import { getBanners, deleteBanner, updateBanner } from "../../api/bannerApi";

// export default function BannersPage() {
//   const [banners, setBanners] = useState([]);
//   const [filteredBanners, setFilteredBanners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch banners
//   const fetchBanners = async () => {
//     try {
//       setLoading(true);
//       const data = await getBanners();
//       setBanners(data);
//       setFilteredBanners(data);
//     } catch (error) {
//       console.error("Error fetching banners:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   // 🔍 Search logic
//   useEffect(() => {
//     if (!searchTerm) return setFilteredBanners(banners);
//     const lower = searchTerm.toLowerCase();
//     setFilteredBanners(
//       banners.filter(
//         (b) =>
//           b.title.toLowerCase().includes(lower) ||
//           b.description.toLowerCase().includes(lower)
//       )
//     );
//   }, [searchTerm, banners]);

//   // 🗑️ Delete banner
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this banner?")) return;
//     try {
//       await deleteBanner(id);
//       setBanners((prev) => prev.filter((b) => b._id !== id));
//     } catch (error) {
//       console.error("Error deleting banner:", error);
//     }
//   };

//   // ✏️ Toggle banner active/inactive
//   const handleToggleActive = async (banner) => {
//     try {
//       const updated = { ...banner, active: !banner.active };
//       await updateBanner(banner._id, updated);
//       setBanners((prev) =>
//         prev.map((b) => (b._id === banner._id ? updated : b))
//       );
//     } catch (error) {
//       console.error("Error updating banner:", error);
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
//       <motion.div variants={fadeUp} className="w-full max-w-[1500px] mt-2">
//         <div className="space-y-5">
//           <RiMenuFoldLine size={30} />
//           <h1 className="text-[24px] font-[700] text-[#000000] dark:text-white">
//             Banners
//           </h1>
//         </div>

//         {/* 🔍 Search & Actions */}
//         <div className="flex mb-10 mt-5 flex-wrap items-center gap-3 dark:bg-neutral-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800">
//           <div className="flex items-center w-full sm:w-1/3 bg-white dark:bg-neutral-800 rounded-lg border border-gray-300 dark:border-neutral-700 px-3 py-3">
//             <Search size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Search banners..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200"
//             />
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={fetchBanners}
//               className="flex items-center gap-1.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 px-3 py-3 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all"
//             >
//               <RefreshCw size={16} /> Refresh
//             </button>
//           </div>
//         </div>

//         {/* 🖼️ Banner List */}
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading banners...</p>
//           ) : filteredBanners.length === 0 ? (
//             <p className="text-center text-gray-500">No banners found</p>
//           ) : (
//             filteredBanners.map((banner) => (
//               <motion.div
//                 key={banner._id}
//                 variants={fadeUp}
//                 className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
//               >
//                 <img
//                   src={banner.imageUrl}
//                   alt={banner.title}
//                   className="h-40 w-full object-cover"
//                 />
//                 <div className="p-4 space-y-2">
//                   <h3 className="text-lg font-semibold">{banner.title}</h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
//                     {banner.description}
//                   </p>
//                   <div className="flex justify-between items-center mt-3">
//                     <button
//                       onClick={() => handleToggleActive(banner)}
//                       className={`px-3 py-1 text-xs rounded-full ${
//                         banner.active
//                           ? "bg-green-200 text-green-800"
//                           : "bg-gray-300 text-gray-800"
//                       }`}
//                     >
//                       {banner.active ? "Active" : "Inactive"}
//                     </button>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => alert("Edit modal coming soon")}
//                         className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(banner._id)}
//                         className="p-2 rounded-full hover:bg-red-200 dark:hover:bg-red-800"
//                       >
//                         <Trash2 size={16} className="text-red-600" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }






// src/pages/admin/BannersPage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { Search, Filter, Upload, Edit, Trash2, RefreshCw } from "lucide-react";
import { getBanners, deleteBanner, updateBanner } from "../../api/bannerApi";

export default function BannersPage() {
  const [banners, setBanners] = useState([]);
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch banners
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const data = await getBanners();
      setBanners(data);
      setFilteredBanners(data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // 🔍 Search
  useEffect(() => {
    if (!searchTerm) return setFilteredBanners(banners);
    const lower = searchTerm.toLowerCase();
    setFilteredBanners(
      banners.filter(
        (b) =>
          b.title.toLowerCase().includes(lower) ||
          b.description.toLowerCase().includes(lower)
      )
    );
  }, [searchTerm, banners]);

  // 🗑️ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await deleteBanner(id);
      await fetchBanners(); // ✅ Refresh list after delete
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  // ✏️ Toggle Active
  const handleToggleActive = async (banner) => {
    try {
      const updated = { ...banner, active: !banner.active };
      await updateBanner(banner._id, updated);
      await fetchBanners(); // ✅ Refresh list after update
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

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
      <motion.div variants={fadeUp} className="w-full max-w-[1500px] mt-2">
        <div className="space-y-5">
          <RiMenuFoldLine size={30} />
          <h1 className="text-[24px] font-[700] text-[#000000] dark:text-white">
            Banners
          </h1>
        </div>

        {/* 🔍 Search & Actions */}
        <div className="flex mb-10 mt-5 flex-wrap items-center gap-3 dark:bg-neutral-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800">
          <div className="flex items-center w-full sm:w-1/3 bg-white dark:bg-neutral-800 rounded-lg border border-gray-300 dark:border-neutral-700 px-3 py-3">
            <Search size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search banners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200"
            />
          </div>

          <button
            onClick={fetchBanners}
            className="flex items-center gap-1.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 px-3 py-3 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* 🖼️ Banner List */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading banners...</p>
          ) : filteredBanners.length === 0 ? (
            <p className="text-center text-gray-500">No banners found</p>
          ) : (
            filteredBanners.map((banner) => (
              <motion.div
                key={banner._id}
                variants={fadeUp}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{banner.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {banner.description}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <button
                      onClick={() => handleToggleActive(banner)}
                      className={`px-3 py-1 text-xs rounded-full ${
                        banner.active
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-300 text-gray-800"
                      }`}
                    >
                      {banner.active ? "Active" : "Inactive"}
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => alert("Edit modal coming soon")}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(banner._id)}
                        className="p-2 rounded-full hover:bg-red-200 dark:hover:bg-red-800"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
