
// // import React, { useState, useMemo } from "react";
// // import { NavLink, useNavigate } from "react-router-dom";
// // import {
// //   LayoutDashboard,
// //   Users,
// //   Crown,
// //   Wallet,
// //   CreditCard,
// //   ArrowDownCircle,
// //   Shield,
// //   LifeBuoy,
// //   LogOut,
// //   Search,
// //   X,
// //   ChevronDown,
// //   ChevronUp,
// //   GraduationCap,
// //   BarChart3,
// //   Megaphone,
// //   Copy,
// //   Network,
// //   Banknote,
// //   QrCode,
// //   Download,
// //   Calendar,
// //   Image as ImageIcon,
// //   PlusSquare,
// // } from "lucide-react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import logoimg from "../../assets/velox.svg";
// // import profilePic from "../../assets/profile.svg";
// // import { useTheme } from "../../context/ThemeContext";

// // export default function SideBar({ closeSidebar }) {
// //   const { theme, toggleTheme } = useTheme();
// //   const navigate = useNavigate();

// //   const [openDropdown, setOpenDropdown] = useState(null);
// //   const [isAccordionOpen, setIsAccordionOpen] = useState(false);
// //   const [isPromotionOpen, setIsPromotionOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [searchResults, setSearchResults] = useState([]);

// //   const toggleDropdown = (key) =>
// //     setOpenDropdown((prev) => (prev === key ? null : key));
// //   const toggleAccordion = () => setIsAccordionOpen((prev) => !prev);
// //   const togglePromotion = () => setIsPromotionOpen((prev) => !prev);

// //   // === TOP STATIC LINKS ===
// //   const topLinks = [
// //     { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
// //     { to: "/dashboard/users", label: "User Management", icon: <Users size={18} /> },
// //     { to: "/dashboard/leaders", label: "Leader Management", icon: <Crown size={18} /> },
// //     { to: "/dashboard/package", label: "Package & Wallet Activity", icon: <Wallet size={18} /> },
// //     { to: "/dashboard/transactions", label: "Transactions", icon: <CreditCard size={18} /> },
// //     { to: "/dashboard/wallet-fund", label: "Wallet", icon: <CreditCard size={18} /> },
// //     { to: "/dashboard/withdrawals", label: "Withdrawals", icon: <ArrowDownCircle size={18} /> },
// //     { to: "/dashboard/courses", label: "Upload courses", icon: <ArrowDownCircle size={18} /> },
// //   ];

// //   const promotionSubLinks = [
// //     { to: "/dashboard/promotions", label: "Promotions Overview", icon: <PlusSquare size={15} /> },
// //     { to: "/dashboard/promotions/banners", label: "Banners Created", icon: <ImageIcon size={15} /> },
// //   ];

// //   const dropdownLinks = [
// //     {
// //       key: "academy",
// //       label: "Academy",
// //       icon: <GraduationCap size={18} />,
// //       links: [
// //         { to: "/dashboard/academy/masterclass/basic", label: "Masterclass (Basic)" },
// //         { to: "/dashboard/academy/masterclass/pro", label: "Masterclass (Pro)" },
// //         { to: "/dashboard/academy/masterclass/advance", label: "Masterclass (Advance)" },
// //         { to: "/dashboard/academy/market-review", label: "Market Review" },
// //         { to: "/dashboard/academy/live-mentorship", label: "Live Mentorship" },
// //       ],
// //     },
// //     {
// //       key: "copytrading",
// //       label: "Copy Trading",
// //       icon: <Copy size={18} />,
// //       links: [
// //         { to: "/dashboard/copytrading/low-risk", label: "Low Risk" },
// //         { to: "/dashboard/copytrading/medium-risk", label: "Medium Risk" },
// //         { to: "/dashboard/copytrading/high-risk", label: "High Risk" },
// //       ],
// //     },
// //     {
// //       key: "network",
// //       label: "Network",
// //       icon: <Network size={18} />,
// //       links: [
// //         { to: "/dashboard/network/unilevel", label: "Unilevel" },
// //         { to: "/dashboard/network/matrix", label: "Matrix" },
// //         { to: "/dashboard/network/ranks", label: "Ranks" },
// //       ],
// //     },
// //     {
// //       key: "monthly",
// //       label: "Monthly",
// //       icon: <Calendar size={18} />,
// //       links: [
// //         { to: "/dashboard/monthly/income-calculator", label: "Income Calculator" },
// //         { to: "/dashboard/monthly/compound", label: "Compound" },
// //         { to: "/dashboard/monthly/relation-boards", label: "Relation Boards" },
// //       ],
// //     },
// //   ];

// //   const singleLinks = [
// //     { to: "/dashboard/reports", label: "Reports", icon: <BarChart3 size={18} /> },
// //     { to: "/dashboard/announcements", label: "Announcements", icon: <Megaphone size={18} /> },
// //     { to: "/dashboard/retirement-bloq", label: "Retirement Bloq", icon: <Banknote size={18} /> },
// //     { to: "/dashboard/qr", label: "QR / Social Links", icon: <QrCode size={18} /> },
// //     { to: "/dashboard/downloads", label: "Downloads", icon: <Download size={18} /> },
// //   ];

// //   const settingsSubLinks = [
// //     { to: "/dashboard/settings", label: "Active Log Page" },
// //     { to: "/dashboard/companyprofile", label: "Company Profile" },
// //     { to: "/dashboard/permission", label: "Roles & Permission" },
// //     { to: "/dashboard/email", label: "Email Broadcasting" },
// //   ];

// //   const bottomLinks = [
// //     { to: "/dashboard/support", label: "Support", icon: <LifeBuoy size={18} /> },
// //   ];

// //   // ✅ Flatten all links into one searchable list
// //   const allLinks = useMemo(() => {
// //     const flattenLinks = (arr) =>
// //       arr.flatMap((item) =>
// //         item.links
// //           ? item.links.map((sub) => ({ ...sub }))
// //           : item
// //       );

// //     return [
// //       ...topLinks,
// //       ...promotionSubLinks,
// //       ...flattenLinks(dropdownLinks),
// //       ...singleLinks,
// //       ...settingsSubLinks,
// //       ...bottomLinks,
// //     ];
// //   }, []);

// //   // ✅ Search handler
// //   const handleSearch = (e) => {
// //     const value = e.target.value.toLowerCase();
// //     setSearchQuery(value);

// //     if (value.trim() === "") {
// //       setSearchResults([]);
// //       return;
// //     }

// //     const results = allLinks.filter((link) =>
// //       link.label.toLowerCase().includes(value)
// //     );

// //     setSearchResults(results);
// //   };

// //   // ✅ Navigate on click
// //   const handleNavigate = (path) => {
// //     navigate(path);
// //     closeSidebar();
// //     setSearchQuery("");
// //     setSearchResults([]);
// //   };

// //   return (
// //     <motion.aside
// //       initial={{ x: -300 }}
// //       animate={{ x: 0 }}
// //       exit={{ x: -300 }}
// //       transition={{ duration: 0.3, ease: "easeInOut" }}
// //       className="w-72 bg-white min-h-screen dark:bg-neutral-900 dark:text-white shadow-md flex flex-col"
// //     >
// //       {/* === FIXED HEADER (Logo + Search) === */}
// //       <div className="sticky top-0 z-20 bg-white dark:bg-neutral-900 pb-3 border-b border-gray-200 dark:border-gray-800">
// //         {/* Mobile Close Button */}
// //         <div className="flex justify-between items-center mb-3 md:hidden px-4 pt-3">
// //           <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
// //           <button
// //             onClick={closeSidebar}
// //             className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
// //           >
// //             <X size={22} />
// //           </button>
// //         </div>

// //         {/* Desktop Logo */}
// //         <div className="hidden md:flex justify-start px-4 mb-4 pt-3">
// //           <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
// //         </div>

// //         {/* ✅ Search Bar */}
// //         <div className="relative px-4">
// //           <Search className="absolute left-7 top-2.5 text-gray-400" size={18} />
// //           <input
// //             type="text"
// //             placeholder="Search pages..."
// //             value={searchQuery}
// //             onChange={handleSearch}
// //             className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A991]"
// //           />

// //           {/* 🔽 Search Results Dropdown */}
// //           {searchResults.length > 0 && (
// //             <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-neutral-800 shadow-lg rounded-md max-h-60 overflow-y-auto z-30 border border-gray-200 dark:border-gray-700">
// //               {searchResults.map((result) => (
// //                 <button
// //                   key={result.to}
// //                   onClick={() => handleNavigate(result.to)}
// //                   className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#FFECE5] dark:hover:bg-gray-700 transition"
// //                 >
// //                   {result.label}
// //                 </button>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* === SCROLLABLE CONTENT === */}
// //       <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
// //         {/* === NAVIGATION === */}
// //         <nav className="space-y-3">
// //           {/* === TOP LINKS === */}
// //           {topLinks.map((link) => (
// //             <NavLink
// //               key={link.to}
// //               to={link.to}
// //               onClick={closeSidebar}
// //               className={({ isActive }) =>
// //                 `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
// //                   isActive
// //                     ? "bg-[#FFECE5] text-black"
// //                     : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
// //                 }`
// //               }
// //             >
// //               {link.icon}
// //               {link.label}
// //             </NavLink>
// //           ))}

// //           {/* === Promotions === */}
// //           <div>
// //             <button
// //               onClick={togglePromotion}
// //               className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800 transition"
// //             >
// //               <div className="flex items-center gap-3">
// //                 <ArrowDownCircle size={18} />
// //                 <span>Promotions & Banners</span>
// //               </div>
// //               {isPromotionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
// //             </button>

// //             <AnimatePresence>
// //               {isPromotionOpen && (
// //                 <motion.div
// //                   initial={{ height: 0, opacity: 0 }}
// //                   animate={{ height: "auto", opacity: 1 }}
// //                   exit={{ height: 0, opacity: 0 }}
// //                   transition={{ duration: 0.3 }}
// //                   className="ml-8 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-3"
// //                 >
// //                   {promotionSubLinks.map((sublink) => (
// //                     <NavLink
// //                       key={sublink.to}
// //                       to={sublink.to}
// //                       onClick={closeSidebar}
// //                       className={({ isActive }) =>
// //                         `flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-all ${
// //                           isActive
// //                             ? "bg-[#FFECE5] text-black"
// //                             : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
// //                         }`
// //                       }
// //                     >
// //                       {sublink.icon}
// //                       {sublink.label}
// //                     </NavLink>
// //                   ))}
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>
// //           </div>

// //           {/* === DROPDOWNS === */}
// //           {dropdownLinks.map((group) => (
// //             <div key={group.key}>
// //               <button
// //                 onClick={() => toggleDropdown(group.key)}
// //                 className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800 transition"
// //               >
// //                 <div className="flex items-center gap-3">
// //                   {group.icon}
// //                   <span>{group.label}</span>
// //                 </div>
// //                 {openDropdown === group.key ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
// //               </button>

// //               <AnimatePresence>
// //                 {openDropdown === group.key && (
// //                   <motion.div
// //                     initial={{ height: 0, opacity: 0 }}
// //                     animate={{ height: "auto", opacity: 1 }}
// //                     exit={{ height: 0, opacity: 0 }}
// //                     transition={{ duration: 0.3 }}
// //                     className="ml-8 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-3"
// //                   >
// //                     {group.links.map((sub) => (
// //                       <NavLink
// //                         key={sub.to}
// //                         to={sub.to}
// //                         onClick={closeSidebar}
// //                         className={({ isActive }) =>
// //                           `block px-2 py-1 rounded-md text-sm transition-all ${
// //                             isActive
// //                               ? "bg-[#FFECE5] text-black"
// //                               : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
// //                           }`
// //                         }
// //                       >
// //                         {sub.label}
// //                       </NavLink>
// //                     ))}
// //                   </motion.div>
// //                 )}
// //               </AnimatePresence>
// //             </div>
// //           ))}

// //           {/* === SINGLE LINKS === */}
// //           {singleLinks.map((link) => (
// //             <NavLink
// //               key={link.to}
// //               to={link.to}
// //               onClick={closeSidebar}
// //               className={({ isActive }) =>
// //                 `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
// //                   isActive
// //                     ? "bg-[#FFECE5] text-black"
// //                     : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
// //                 }`
// //               }
// //             >
// //               {link.icon}
// //               {link.label}
// //             </NavLink>
// //           ))}

// //           {/* === SECURITY & SETTINGS === */}
// //           <div>
// //             <button
// //               onClick={toggleAccordion}
// //               className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800 transition"
// //             >
// //               <div className="flex items-center gap-3">
// //                 <Shield size={18} />
// //                 <span>Security & Settings</span>
// //               </div>
// //               {isAccordionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
// //             </button>

// //             <AnimatePresence>
// //               {isAccordionOpen && (
// //                 <motion.div
// //                   initial={{ height: 0, opacity: 0 }}
// //                   animate={{ height: "auto", opacity: 1 }}
// //                   exit={{ height: 0, opacity: 0 }}
// //                   transition={{ duration: 0.3 }}
// //                   className="ml-8 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-3"
// //                 >
// //                   {settingsSubLinks.map((sublink) => (
// //                     <NavLink
// //                       key={sublink.to}
// //                       to={sublink.to}
// //                       onClick={closeSidebar}
// //                       className={({ isActive }) =>
// //                         `block px-2 py-1 rounded-md text-sm transition-all ${
// //                           isActive
// //                             ? "bg-[#FFECE5] text-black"
// //                             : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
// //                         }`
// //                       }
// //                     >
// //                       {sublink.label}
// //                     </NavLink>
// //                   ))}
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>
// //           </div>
// //         </nav>

// //         {/* === BOTTOM SECTION === */}
// //         <hr className="mt-6 border-gray-200 dark:border-gray-700" />

// //         <div className="space-y-4 mt-2 mb-4">
// //           {bottomLinks.map((link) => (
// //             <NavLink
// //               key={link.to}
// //               to={link.to}
// //               onClick={closeSidebar}
// //               className={({ isActive }) =>
// //                 `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
// //                   isActive
// //                     ? "bg-gray-200 text-black"
// //                     : "text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
// //                 }`
// //               }
// //             >
// //               {link.icon}
// //               {link.label}
// //             </NavLink>
// //           ))}

// //           {/* === PROFILE SECTION === */}
// //           <div className="flex items-center justify-between dark:bg-gray-800 rounded-lg p-3">
// //             <div className="flex items-center gap-3 relative">
// //               <img
// //                 src={profilePic}
// //                 alt="Admin"
// //                 className="w-20 h-20 rounded-full object-cover border border-gray-300 dark:border-gray-700"
// //               />
// //               <div>
// //                 <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
// //                   Alison Eyo
// //                 </p>
// //                 <p className="text-xs text-gray-500 dark:text-gray-400">
// //                   admin@alison.com
// //                 </p>
// //               </div>
// //             </div>

// //             <button className="text-gray-500 hover:text-red-500 transition">
// //               <LogOut size={18} />
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </motion.aside>
// //   );
// // }






// import React, { useState, useMemo } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   Crown,
//   Wallet,
//   CreditCard,
//   ArrowDownCircle,
//   Shield,
//   LifeBuoy,
//   LogOut,
//   Search,
//   X,
//   ChevronDown,
//   ChevronUp,
//   GraduationCap,
//   BarChart3,
//   Megaphone,
//   Copy,
//   Network,
//   Banknote,
//   QrCode,
//   Download,
//   Calendar,
//   Image as ImageIcon,
//   PlusSquare,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import logoimg from "../../assets/velox.svg";
// import profilePic from "../../assets/profile.svg";
// import { useTheme } from "../../context/ThemeContext";

// // ────────────────────────────────────────────────
// // Logout Hook (you can move this to a separate file later: e.g. src/hooks/useLogout.js)
// const useLogout = () => {
//   const navigate = useNavigate();

//   const logout = () => {
//     // Clear authentication token (must match key used in ProtectedRoute)
//     localStorage.removeItem("access_token");

//     // Optional: clear additional auth-related items if you use them
//     // localStorage.removeItem("refresh_token");
//     // localStorage.removeItem("user");

//     // Redirect to login page and replace history so user can't go back
//     navigate("/login", { replace: true });
//   };

//   return logout;
// };
// // ────────────────────────────────────────────────

// export default function SideBar({ closeSidebar }) {
//   const { theme, toggleTheme } = useTheme();
//   const logout = useLogout(); // ← using the logout function

//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [isAccordionOpen, setIsAccordionOpen] = useState(false);
//   const [isPromotionOpen, setIsPromotionOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const displayName = user.name || "Admin";
// const displayEmail = user.email || "admin@yourcompany.com";

//   const toggleDropdown = (key) =>
//     setOpenDropdown((prev) => (prev === key ? null : key));
//   const toggleAccordion = () => setIsAccordionOpen((prev) => !prev);
//   const togglePromotion = () => setIsPromotionOpen((prev) => !prev);

//   // === TOP STATIC LINKS ===
//   const topLinks = [
//     { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
//     { to: "/dashboard/users", label: "User Management", icon: <Users size={18} /> },
//     { to: "/dashboard/leaders", label: "Leader Management", icon: <Crown size={18} /> },
//     { to: "/dashboard/package", label: "Package & Wallet Activity", icon: <Wallet size={18} /> },
//     { to: "/dashboard/transactions", label: "Transactions", icon: <CreditCard size={18} /> },
//     { to: "/dashboard/wallet-fund", label: "Wallet", icon: <CreditCard size={18} /> },
//     { to: "/dashboard/withdrawals", label: "Withdrawals", icon: <ArrowDownCircle size={18} /> },
//     { to: "/dashboard/courses", label: "Upload courses", icon: <GraduationCap size={18} /> }, // ← better icon
//   ];

//   const promotionSubLinks = [
//     { to: "/dashboard/promotions", label: "Promotions Overview", icon: <PlusSquare size={15} /> },
//     { to: "/dashboard/promotions/banners", label: "Banners Created", icon: <ImageIcon size={15} /> },
//   ];

//   const dropdownLinks = [
//     {
//       key: "academy",
//       label: "Academy",
//       icon: <GraduationCap size={18} />,
//       links: [
//         { to: "/dashboard/academy/masterclass/basic", label: "Masterclass (Basic)" },
//         { to: "/dashboard/academy/masterclass/pro", label: "Masterclass (Pro)" },
//         { to: "/dashboard/academy/masterclass/advance", label: "Masterclass (Advance)" },
//         { to: "/dashboard/academy/market-review", label: "Market Review" },
//         { to: "/dashboard/academy/live-mentorship", label: "Live Mentorship" },
//       ],
//     },
//     {
//       key: "copytrading",
//       label: "Copy Trading",
//       icon: <Copy size={18} />,
//       links: [
//         { to: "/dashboard/copytrading/low-risk", label: "Low Risk" },
//         { to: "/dashboard/copytrading/medium-risk", label: "Medium Risk" },
//         { to: "/dashboard/copytrading/high-risk", label: "High Risk" },
//       ],
//     },
//     {
//       key: "network",
//       label: "Network",
//       icon: <Network size={18} />,
//       links: [
//         { to: "/dashboard/network/unilevel", label: "Unilevel" },
//         { to: "/dashboard/network/matrix", label: "Matrix" },
//         { to: "/dashboard/network/ranks", label: "Ranks" },
//       ],
//     },
//     {
//       key: "monthly",
//       label: "Monthly",
//       icon: <Calendar size={18} />,
//       links: [
//         { to: "/dashboard/monthly/income-calculator", label: "Income Calculator" },
//         { to: "/dashboard/monthly/compound", label: "Compound" },
//         { to: "/dashboard/monthly/relation-boards", label: "Relation Boards" },
//       ],
//     },
//   ];

//   const singleLinks = [
//     { to: "/dashboard/reports", label: "Reports", icon: <BarChart3 size={18} /> },
//     { to: "/dashboard/announcements", label: "Announcements", icon: <Megaphone size={18} /> },
//     { to: "/dashboard/retirement-bloq", label: "Retirement Bloq", icon: <Banknote size={18} /> },
//     { to: "/dashboard/qr", label: "QR / Social Links", icon: <QrCode size={18} /> },
//     { to: "/dashboard/downloads", label: "Downloads", icon: <Download size={18} /> },
//   ];

//   const settingsSubLinks = [
//     { to: "/dashboard/settings", label: "Active Log Page" },
//     { to: "/dashboard/companyprofile", label: "Company Profile" },
//     { to: "/dashboard/permission", label: "Roles & Permission" },
//     { to: "/dashboard/email", label: "Email Broadcasting" },
//   ];

//   const bottomLinks = [
//     { to: "/dashboard/support", label: "Support", icon: <LifeBuoy size={18} /> },
//   ];

//   // Flatten all links for search
//   const allLinks = useMemo(() => {
//     const flattenLinks = (arr) =>
//       arr.flatMap((item) =>
//         item.links
//           ? item.links.map((sub) => ({ ...sub, group: item.label }))
//           : { ...item }
//       );

//     return [
//       ...topLinks,
//       ...promotionSubLinks,
//       ...flattenLinks(dropdownLinks),
//       ...singleLinks,
//       ...settingsSubLinks,
//       ...bottomLinks,
//     ];
//   }, []);

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchQuery(value);

//     if (value.trim() === "") {
//       setSearchResults([]);
//       return;
//     }

//     const results = allLinks.filter((link) =>
//       link.label.toLowerCase().includes(value)
//     );

//     setSearchResults(results);
//   };

//   const handleNavigate = (path) => {
//     navigate(path);
//     closeSidebar();
//     setSearchQuery("");
//     setSearchResults([]);
//   };

//   return (
//     <motion.aside
//       initial={{ x: -300 }}
//       animate={{ x: 0 }}
//       exit={{ x: -300 }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//       className="w-72 bg-white min-h-screen dark:bg-neutral-900 dark:text-white shadow-md flex flex-col"
//     >
//       {/* FIXED HEADER (Logo + Search) */}
//       <div className="sticky top-0 z-20 bg-white dark:bg-neutral-900 pb-3 border-b border-gray-200 dark:border-gray-800">
//         {/* Mobile Close Button */}
//         <div className="flex justify-between items-center mb-3 md:hidden px-4 pt-3">
//           <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
//           <button
//             onClick={closeSidebar}
//             className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
//           >
//             <X size={22} />
//           </button>
//         </div>

//         {/* Desktop Logo */}
//         <div className="hidden md:flex justify-start px-4 mb-4 pt-3">
//           <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
//         </div>

//         {/* Search Bar */}
//         <div className="relative px-4">
//           <Search className="absolute left-7 top-2.5 text-gray-400" size={18} />
//           <input
//             type="text"
//             placeholder="Search pages..."
//             value={searchQuery}
//             onChange={handleSearch}
//             className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A991]"
//           />

//           {searchResults.length > 0 && (
//             <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-neutral-800 shadow-lg rounded-md max-h-60 overflow-y-auto z-30 border border-gray-200 dark:border-gray-700">
//               {searchResults.map((result) => (
//                 <button
//                   key={result.to}
//                   onClick={() => handleNavigate(result.to)}
//                   className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#FFECE5] dark:hover:bg-gray-700 transition"
//                 >
//                   {result.label}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* SCROLLABLE CONTENT */}
//       <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
//         <nav className="space-y-3">
//           {/* TOP LINKS */}
//           {topLinks.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               onClick={closeSidebar}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-[#FFECE5] text-black dark:bg-opacity-20"
//                     : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
//                 }`
//               }
//             >
//               {link.icon}
//               {link.label}
//             </NavLink>
//           ))}

//           {/* Promotions Dropdown */}
//           <div>
//             <button
//               onClick={togglePromotion}
//               className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800 transition"
//             >
//               <div className="flex items-center gap-3">
//                 <ArrowDownCircle size={18} />
//                 <span>Promotions & Banners</span>
//               </div>
//               {isPromotionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//             </button>

//             <AnimatePresence>
//               {isPromotionOpen && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="ml-8 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-3"
//                 >
//                   {promotionSubLinks.map((sublink) => (
//                     <NavLink
//                       key={sublink.to}
//                       to={sublink.to}
//                       onClick={closeSidebar}
//                       className={({ isActive }) =>
//                         `flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-all ${
//                           isActive
//                             ? "bg-[#FFECE5] text-black dark:bg-opacity-20"
//                             : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
//                         }`
//                       }
//                     >
//                       {sublink.icon}
//                       {sublink.label}
//                     </NavLink>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Other Dropdowns */}
//           {dropdownLinks.map((group) => (
//             <div key={group.key}>
//               <button
//                 onClick={() => toggleDropdown(group.key)}
//                 className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800 transition"
//               >
//                 <div className="flex items-center gap-3">
//                   {group.icon}
//                   <span>{group.label}</span>
//                 </div>
//                 {openDropdown === group.key ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//               </button>

//               <AnimatePresence>
//                 {openDropdown === group.key && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="ml-8 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-3"
//                   >
//                     {group.links.map((sub) => (
//                       <NavLink
//                         key={sub.to}
//                         to={sub.to}
//                         onClick={closeSidebar}
//                         className={({ isActive }) =>
//                           `block px-2 py-1 rounded-md text-sm transition-all ${
//                             isActive
//                               ? "bg-[#FFECE5] text-black dark:bg-opacity-20"
//                               : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
//                           }`
//                         }
//                       >
//                         {sub.label}
//                       </NavLink>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}

//           {/* Single Links */}
//           {singleLinks.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               onClick={closeSidebar}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-[#FFECE5] text-black dark:bg-opacity-20"
//                     : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
//                 }`
//               }
//             >
//               {link.icon}
//               {link.label}
//             </NavLink>
//           ))}

//           {/* Security & Settings Accordion */}
//           <div>
//             <button
//               onClick={toggleAccordion}
//               className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800 transition"
//             >
//               <div className="flex items-center gap-3">
//                 <Shield size={18} />
//                 <span>Security & Settings</span>
//               </div>
//               {isAccordionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//             </button>

//             <AnimatePresence>
//               {isAccordionOpen && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="ml-8 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-3"
//                 >
//                   {settingsSubLinks.map((sublink) => (
//                     <NavLink
//                       key={sublink.to}
//                       to={sublink.to}
//                       onClick={closeSidebar}
//                       className={({ isActive }) =>
//                         `block px-2 py-1 rounded-md text-sm transition-all ${
//                           isActive
//                             ? "bg-[#FFECE5] text-black dark:bg-opacity-20"
//                             : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
//                         }`
//                       }
//                     >
//                       {sublink.label}
//                     </NavLink>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </nav>

//         <hr className="mt-6 border-gray-200 dark:border-gray-700" />

//         {/* BOTTOM SECTION – Logout */}
//         <div className="space-y-4 mt-6 mb-6">
//           {bottomLinks.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               onClick={closeSidebar}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-gray-200 text-black dark:bg-gray-700"
//                     : "text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
//                 }`
//               }
//             >
//               {link.icon}
//               {link.label}
//             </NavLink>
//           ))}

//           {/* Profile + Logout */}
//           {/* Profile + Logout */}
// <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-sm">
//   <div className="flex items-center gap-3">
//     <img
//       src={profilePic}
//       alt={`${displayName} profile`}
//       className="w-14 h-14 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
//     />
//     <div>
//       <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
//         {displayName}
//       </p>
//       <p className="text-xs text-gray-500 dark:text-gray-400">
//         {displayEmail}
//       </p>
//     </div>
//   </div>

//   <button
//     onClick={logout}
//     className="p-3 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
//     title="Sign out"
//     aria-label="Sign out"
//   >
//     <LogOut size={20} />
//   </button>
// </div>
//         </div>
//       </div>
//     </motion.aside>
//   );
// }








// import React, { useState, useMemo } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard, Users, Crown, Wallet, CreditCard,
//   ArrowDownCircle, Shield, LifeBuoy, LogOut, Search, X,
//   ChevronDown, ChevronUp, GraduationCap, BarChart3,
//   Megaphone, Copy, Network, Banknote, QrCode,
//   Download, Calendar, Image as ImageIcon, PlusSquare,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import logoimg from "../../assets/velox.svg";
// import profilePic from "../../assets/profile.svg";

// // ────────────────────────────────────────────────
// // Reusable Nav Item
// const NavItem = ({ to, icon, label, onClick }) => (
//   <NavLink
//     to={to}
//     onClick={onClick}
//     className={({ isActive }) =>
//       `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
//         isActive
//           ? "bg-[#FFECE5] text-black dark:bg-opacity-20"
//           : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
//       }`
//     }
//   >
//     {icon}
//     {label}
//   </NavLink>
// );

// // ────────────────────────────────────────────────
// // Dropdown Section
// const DropdownSection = ({
//   title,
//   icon,
//   isOpen,
//   toggle,
//   children,
// }) => (
//   <div>
//     <button
//       onClick={toggle}
//       className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
//     >
//       <div className="flex items-center gap-3">
//         {icon}
//         {title}
//       </div>
//       {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//     </button>

//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: "auto", opacity: 1 }}
//           exit={{ height: 0, opacity: 0 }}
//           className="ml-8 mt-2 space-y-2 border-l pl-3"
//         >
//           {children}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   </div>
// );

// // ────────────────────────────────────────────────
// export default function SideBar({ closeSidebar }) {
//   const navigate = useNavigate();

//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [promotionOpen, setPromotionOpen] = useState(false);
//   const [settingsOpen, setSettingsOpen] = useState(false);
//   const [search, setSearch] = useState("");

//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const logout = () => {
//     localStorage.removeItem("access_token");
//     navigate("/login", { replace: true });
//   };

//   const toggleDropdown = (key) =>
//     setOpenDropdown((prev) => (prev === key ? null : key));

//   // ────────────────────────────────────────────────
//   const topLinks = [
//     { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
//     { to: "/dashboard/users", label: "Users", icon: <Users size={18} /> },
//     { to: "/dashboard/leaders", label: "Leaders", icon: <Crown size={18} /> },
//     { to: "/dashboard/package", label: "Wallet Activity", icon: <Wallet size={18} /> },
//     { to: "/dashboard/transactions", label: "Transactions", icon: <CreditCard size={18} /> },
//     { to: "/dashboard/withdrawal-management", label: "Withdrawal Management", icon: <Shield size={18} /> },
//   ];

//   const dropdowns = [
//     {
//       key: "academy",
//       title: "Academy",
//       icon: <GraduationCap size={18} />,
//       links: [
//         { to: "/dashboard/academy/basic", label: "Basic" },
//         { to: "/dashboard/academy/pro", label: "Pro" },
//       ],
//     },
//     {
//       key: "network",
//       title: "Network",
//       icon: <Network size={18} />,
//       links: [
//         { to: "/dashboard/network/unilevel", label: "Unilevel" },
//         { to: "/dashboard/network/matrix", label: "Matrix" },
//       ],
//     },
//   ];

//   // ────────────────────────────────────────────────
//   const allLinks = useMemo(
//     () => [
//       ...topLinks,
//       ...dropdowns.flatMap((d) => d.links),
//     ],
//     []
//   );

//   const results = search
//     ? allLinks.filter((l) =>
//         l.label.toLowerCase().includes(search.toLowerCase())
//       )
//     : [];

//   // ────────────────────────────────────────────────
//   return (
//     <motion.aside
//       initial={{ x: -250 }}
//       animate={{ x: 0 }}
//       exit={{ x: -250 }}
//       className="w-72 bg-white dark:bg-neutral-900 flex flex-col"
//     >
//       {/* HEADER */}
//       <div className="sticky top-0 bg-white dark:bg-neutral-900 border-b p-4">
//         <div className="flex justify-between items-center">
//           <img src={logoimg} className="w-20" />
//           <X onClick={closeSidebar} className="md:hidden cursor-pointer" />
//         </div>

//         {/* SEARCH */}
//         <div className="relative mt-3">
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search..."
//             className="w-full pl-9 py-2 rounded-md bg-gray-100 dark:bg-gray-800"
//           />

//           {results.length > 0 && (
//             <div className="absolute w-full bg-white dark:bg-gray-800 mt-2 rounded shadow">
//               {results.map((r) => (
//                 <button
//                   key={r.to}
//                   onClick={() => navigate(r.to)}
//                   className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   {r.label}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {topLinks.map((link) => (
//           <NavItem key={link.to} {...link} onClick={closeSidebar} />
//         ))}

//         {/* DROPDOWNS */}
//         {dropdowns.map((d) => (
//           <DropdownSection
//             key={d.key}
//             title={d.title}
//             icon={d.icon}
//             isOpen={openDropdown === d.key}
//             toggle={() => toggleDropdown(d.key)}
//           >
//             {d.links.map((l) => (
//               <NavItem key={l.to} {...l} onClick={closeSidebar} />
//             ))}
//           </DropdownSection>
//         ))}

//         {/* SETTINGS */}
//         <DropdownSection
//           title="Settings"
//           icon={<Shield size={18} />}
//           isOpen={settingsOpen}
//           toggle={() => setSettingsOpen(!settingsOpen)}
//         >
//           <NavItem to="/dashboard/settings" label="Settings" />
//         </DropdownSection>
//       </div>

//       {/* FOOTER */}
//       <div className="p-4 border-t space-y-3">
//         <NavItem to="/dashboard/support" label="Support" icon={<LifeBuoy size={18} />} />

//         <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
//           <div className="flex items-center gap-3">
//             <img src={profilePic} className="w-10 h-10 rounded-full" />
//             <div>
//               <p className="text-sm font-semibold">
//                 {user.name || "Admin"}
//               </p>
//               <p className="text-xs text-gray-500">
//                 {user.email || "admin@email.com"}
//               </p>
//             </div>
//           </div>

//           <LogOut
//             onClick={logout}
//             className="cursor-pointer text-gray-500 hover:text-red-500"
//           />
//         </div>
//       </div>
//     </motion.aside>
//   );
// }





import React, { useState, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, Crown, Wallet, CreditCard,
  Shield, LifeBuoy, LogOut, Search, X,
  ChevronDown, ChevronUp, GraduationCap, Network,
  ShieldCheck,
  UserCog,
 
  Banknote, 
  BookText, 
  ArrowLeftRight, 
  Coins, 
 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoimg from "../../assets/nvelox.png";
import profilePic from "../../assets/profile.svg";

const NavItem = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
        isActive
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);

const DropdownSection = ({ title, icon, isOpen, toggle, children }) => (
  <div>
    <button
      onClick={toggle}
      className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <div className="flex items-center gap-3">
        {icon}
        {title}
      </div>
      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="ml-8 mt-2 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function SideBar({ closeSidebar }) {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Retrieve user data from localStorage based on your login response structure
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.clear(); // Clear all data on logout
    navigate("/login", { replace: true });
  };

  const toggleDropdown = (key) =>
    setOpenDropdown((prev) => (prev === key ? null : key));

  // Admin-Specific Links
  const topLinks = [
  { to: "/dashboard", label: "Admin Console", icon: <LayoutDashboard size={18} /> },
  { to: "/dashboard/users", label: "User Directory", icon: <Users size={18} /> },
  { to: "/dashboard/leaders", label: "Leader Oversight", icon: <Crown size={18} /> },
  { to: "/dashboard/package", label: "System Wallets", icon: <Wallet size={18} /> },
  
  // Changed to Banknote to distinguish from System Wallets
  { to: "/dashboard/manage-withdrawals", label: "Manage Withdrawals", icon: <Banknote size={18} /> },
  
  // Changed to BookText (Ledger style)
  { to: "/dashboard/transactions", label: "Global Ledger", icon: <BookText size={18} /> },
  
  // Changed to ArrowLeftRight to represent individual user movements
  { to: "/dashboard/user-transactions", label: "User Transactions", icon: <ArrowLeftRight size={18} /> },
  
  // Changed to Coins to represent profit/loss distribution
  { to: "/dashboard/rebate-management", label: "Rebate Management", icon: <Coins size={18} /> },
  
  { to: "/dashboard/withdrawal-management", label: "Admin Frozen Control", icon: <ShieldCheck size={18} /> },
  { to: "/dashboard/training", label: "Training Academy", icon: <GraduationCap size={18} /> },
];

  const dropdowns = [
    {
      key: "network",
      title: "Network Mapping",
      icon: <Network size={18} />,
      links: [
        { to: "/dashboard/network/unilevel", label: "Unilevel View" },
        { to: "/dashboard/network/matrix", label: "Matrix View" },
      ],
    },
  ];

  const allLinks = useMemo(() => [...topLinks, ...dropdowns.flatMap((d) => d.links)], []);
  const results = search ? allLinks.filter((l) => l.label.toLowerCase().includes(search.toLowerCase())) : [];

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      exit={{ x: -250 }}
      className="w-72 bg-white dark:bg-neutral-950 flex flex-col border-r border-gray-200 dark:border-white/5"
    >
      {/* LOGO SECTION */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <img src={logoimg} className="w-24" alt="Velox Capital" />
          <X onClick={closeSidebar} className="md:hidden cursor-pointer dark:text-white" />
        </div>

        {/* SEARCH BAR */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Admin Tools..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-gray-100 dark:bg-white/5 dark:text-white border-none outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* NAVIGATION CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-3 mb-2">Main Management</p>
        {topLinks.map((link) => (
          <NavItem key={link.to} {...link} onClick={closeSidebar} />
        ))}

        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-3 mt-6 mb-2">Systems</p>
        {dropdowns.map((d) => (
          <DropdownSection
            key={d.key}
            title={d.title}
            icon={d.icon}
            isOpen={openDropdown === d.key}
            toggle={() => toggleDropdown(d.key)}
          >
            {d.links.map((l) => (
              <NavItem key={l.to} {...l} onClick={closeSidebar} />
            ))}
          </DropdownSection>
        ))}

        <DropdownSection
          title="Security Settings"
          icon={<Shield size={18} />}
          isOpen={settingsOpen}
          toggle={() => setSettingsOpen(!settingsOpen)}
        >
          <NavItem to="/dashboard/settings" label="Admin Config" />
        </DropdownSection>
      </div>

      {/* FOOTER - ADMIN PROFILE */}
      <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-neutral-900/50">
        <div className="flex items-center justify-between p-2 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={profilePic} className="w-10 h-10 rounded-full border-2 border-emerald-500/20" alt="Admin" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-neutral-900 rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black text-gray-900 dark:text-white truncate">
                {user.name || "Super Admin"}
              </p>
              <div className="flex items-center gap-1">
                <UserCog size={10} className="text-emerald-500" />
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">
                  {user.role || "Admin"}
                </p>
              </div>
            </div>
          </div>

          <button 
            onClick={logout}
            className="p-2 hover:bg-rose-500/10 text-gray-400 hover:text-rose-500 rounded-xl transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}