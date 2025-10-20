
// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   Crown,
//   Wallet,
//   CreditCard,
//   ArrowDownCircle,
//   Shield,
//   Settings,
//   LifeBuoy,
//   LogOut,
//   Search,
//   X,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import logoimg from "../../assets/velox.svg";
// import profilePic from "../../assets/profile.svg";
// import { useTheme } from "../../context/ThemeContext"; // ✅ to access dark/light mode toggle

// export default function SideBar({ closeSidebar }) {
//   const { theme, toggleTheme } = useTheme();

//   const topLinks = [
//     { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
//     { to: "/dashboard/users", label: "User Management", icon: <Users size={18} /> },
//     { to: "/dashboard/leaders", label: "Leader Management", icon: <Crown size={18} /> },
//     { to: "/dashboard/package", label: "Package & Wallet Activity", icon: <Wallet size={18} /> },
//     { to: "/dashboard/transactions", label: "Transactions", icon: <CreditCard size={18} /> },
//     { to: "/dashboard/withdrawals", label: "Withdrawals", icon: <ArrowDownCircle size={18} /> },
//     { to: "/dashboard/promotions", label: "Promotions & Banners", icon: <ArrowDownCircle size={18} /> },
//     { to: "/dashboard/settings", label: "Security & Settings", icon: <Shield size={18} /> },
//   ];

//   const bottomLinks = [
//     { to: "/dashboard/support", label: "Support", icon: <LifeBuoy size={18} /> },
//     { to: "/dashboard/settings", label: "Settings", icon: <Settings size={18} /> },
//   ];

//   return (
//     <motion.aside
//       initial={{ x: -300 }}
//       animate={{ x: 0 }}
//       exit={{ x: -300 }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//       className="w-72 bg-white min-h-screen dark:bg-neutral-900 dark:text-white shadow-md h-screen p-4 flex flex-col justify-between"
//     >
//       {/* ---- Top Section ---- */}
//       <div>
//         {/* Mobile Close Button */}
//         <div className="flex justify-between items-center mb-4 md:hidden">
//           <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
//           <button
//             onClick={closeSidebar}
//             className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
//           >
//             <X size={22} />
//           </button>
//         </div>

//         {/* Desktop Logo */}
//         <div className="hidden md:flex justify-start mb-6">
//           <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
//         </div>

//         {/* Search Bar */}
//         <div className="relative mb-6">
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 
//             dark:border-white border dark:text-white rounded-[6px] pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A991]"
//           />
//         </div>

//         {/* Navigation Links */}
//         <nav className="space-y-5">
//           {topLinks.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               onClick={closeSidebar}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-[#FFECE5] text-black"
//                     : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
//                 }`
//               }
//             >
//               {link.icon}
//               {link.label}
//             </NavLink>
//           ))}
//         </nav>

//         <hr className="mt-10 border-gray-200 dark:border-gray-700" />
//       </div>

//       {/* ---- Bottom Section ---- */}
//       <div className="space-y-4 mb-20">
//         {/* 🌙 Dark/Light Toggle (only visible on mobile) */}
//         <div className="flex justify-center md:hidden">
//           <button
//             onClick={toggleTheme}
//             className="relative flex items-center gap-2 px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-full transition duration-300"
//           >
//             <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
//               {theme === "dark" ? "Dark" : "Light"}
//             </span>
//             <div className="relative w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition">
//               <span
//                 className={`absolute top-0.5 left-1 flex items-center justify-center w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
//                   theme === "dark" ? "translate-x-5" : "translate-x-0"
//                 }`}
//               >
//                 {theme === "dark" ? (
//                   <Moon size={10} className="text-gray-700" />
//                 ) : (
//                   <Sun size={10} className="text-yellow-500" />
//                 )}
//               </span>
//             </div>
//           </button>
//         </div>

//         {/* Support & Settings Links */}
//         <div className="space-y-2">
//           {bottomLinks.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               onClick={closeSidebar}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-gray-200 text-black"
//                     : "text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
//                 }`
//               }
//             >
//               {link.icon}
//               {link.label}
//             </NavLink>
//           ))}
//         </div>

//         {/* Profile Section */}
//         <div className="flex items-center justify-between dark:bg-gray-800 rounded-lg p-3">
//           <div className="flex items-center gap-3 relative">
//             <div className="relative">
//               <img
//                 src={profilePic}
//                 alt="Admin"
//                 className="w-20 h-20 rounded-full object-cover border border-gray-300 dark:border-gray-700"
//               />
//               <div className="absolute bottom-5 right-2 h-4 w-4 bg-blue-500 rounded-full flex justify-center items-center">
//                 <span className="text-white text-[5px] font-bold">✔</span>
//               </div>
//             </div>
//             <div>
//               <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
//                 Alison Eyo
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 admin@alison.com
//               </p>
//             </div>
//           </div>

//           <button className="text-gray-500 hover:text-red-500 transition">
//             <LogOut size={18} />
//           </button>
//         </div>
//       </div>
//     </motion.aside>
//   );
// }










import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Crown,
  Wallet,
  CreditCard,
  ArrowDownCircle,
  Shield,
  Settings,
  LifeBuoy,
  LogOut,
  Search,
  X,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoimg from "../../assets/velox.svg";
import profilePic from "../../assets/profile.svg";
import { useTheme } from "../../context/ThemeContext";

export default function SideBar({ closeSidebar }) {
  const { theme, toggleTheme } = useTheme();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => setIsAccordionOpen((prev) => !prev);

  const topLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/dashboard/users", label: "User Management", icon: <Users size={18} /> },
    { to: "/dashboard/leaders", label: "Leader Management", icon: <Crown size={18} /> },
    { to: "/dashboard/package", label: "Package & Wallet Activity", icon: <Wallet size={18} /> },
    { to: "/dashboard/transactions", label: "Transactions", icon: <CreditCard size={18} /> },
    { to: "/dashboard/withdrawals", label: "Withdrawals", icon: <ArrowDownCircle size={18} /> },
    { to: "/dashboard/promotions", label: "Promotions & Banners", icon: <ArrowDownCircle size={18} /> },
  ];

  const settingsSubLinks = [
    { to: "/dashboard/settings", label: "Active Log Page" },
    { to: "/dashboard/companyprofile", label: "Company Profile" },
    { to: "/dashboard/permission", label: "Roles & Permission" },
    { to: "/dashboard/email", label: "Email Broadcasting" },
  ];

  const bottomLinks = [
    { to: "/dashboard/support", label: "Support", icon: <LifeBuoy size={18} /> },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-72 bg-white min-h-screen dark:bg-neutral-900 dark:text-white shadow-md h-screen p-4 flex flex-col justify-between"
    >
      {/* ---- Top Section ---- */}
      <div>
        {/* Mobile Close Button */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
          <button
            onClick={closeSidebar}
            className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Desktop Logo */}
        <div className="hidden md:flex justify-start mb-6">
          <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 
            dark:border-white border dark:text-white rounded-[6px] pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A991]"
          />
        </div>

        {/* Navigation Links */}
        <nav className="space-y-3">
          {topLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#FFECE5] text-black"
                    : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}

          {/* Accordion Section */}
          <div>
            <button
              onClick={toggleAccordion}
              className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800 transition"
            >
              <div className="flex items-center gap-3">
                <Shield size={18} />
                <span>Security & Settings</span>
              </div>
              {isAccordionOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            <AnimatePresence>
              {isAccordionOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-8 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-3"
                >
                  {settingsSubLinks.map((sublink) => (
                    <NavLink
                      key={sublink.to}
                      to={sublink.to}
                      onClick={closeSidebar}
                      className={({ isActive }) =>
                        `block px-2 py-1 rounded-md text-sm transition-all ${
                          isActive
                            ? "bg-[#FFECE5] text-black"
                            : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
                        }`
                      }
                    >
                      {sublink.label}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <hr className="mt-10 border-gray-200 dark:border-gray-700" />
      </div>

      {/* ---- Bottom Section ---- */}
      <div className="space-y-4 mb-20">
        {/* 🌙 Dark/Light Toggle (only visible on mobile) */}
        <div className="flex justify-center md:hidden">
          <button
            onClick={toggleTheme}
            className="relative flex items-center gap-2 px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-full transition duration-300"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {theme === "dark" ? "Dark" : "Light"}
            </span>
            <div className="relative w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition">
              <span
                className={`absolute top-0.5 left-1 flex items-center justify-center w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                  theme === "dark" ? "translate-x-5" : "translate-x-0"
                }`}
              >
                {theme === "dark" ? (
                  <Moon size={10} className="text-gray-700" />
                ) : (
                  <Sun size={10} className="text-yellow-500" />
                )}
              </span>
            </div>
          </button>
        </div>

        {/* Support & Settings Links */}
        <div className="space-y-2">
          {bottomLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gray-200 text-black"
                    : "text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Profile Section */}
        <div className="flex items-center justify-between dark:bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-3 relative">
            <div className="relative">
              <img
                src={profilePic}
                alt="Admin"
                className="w-20 h-20 rounded-full object-cover border border-gray-300 dark:border-gray-700"
              />
              <div className="absolute bottom-5 right-2 h-4 w-4 bg-blue-500 rounded-full flex justify-center items-center">
                <span className="text-white text-[5px] font-bold">✔</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Alison Eyo
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                admin@alison.com
              </p>
            </div>
          </div>

          <button className="text-gray-500 hover:text-red-500 transition">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
