

import React from "react";
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
} from "lucide-react";
import logoimg from "../../assets/velox.svg";
import profilePic from "../../assets/profile.svg"; // replace with your actual admin image

export default function SideBar() {
  const topLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/dashboard/users", label: "User Management", icon: <Users size={18} /> },
    { to: "/dashboard/leaders", label: "Leader Management", icon: <Crown size={18} /> },
    { to: "/dashboard/wallet", label: "Package & Wallet Activity", icon: <Wallet size={18} /> },
    { to: "/dashboard/transactions", label: "Transactions", icon: <CreditCard size={18} /> },
    { to: "/dashboard/withdrawals", label: "Withdrawals", icon: <ArrowDownCircle size={18} /> },
    { to: "/dashboard/security", label: "Security & Settings", icon: <Shield size={18} /> },
  ];

  const bottomLinks = [
    { to: "/dashboard/support", label: "Support", icon: <LifeBuoy size={18} /> },
    { to: "/dashboard/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-72 bg-white dark:bg-gray-900 shadow-md h-screen p-4 hidden md:flex flex-col justify-between">
      {/* ---- Top Section ---- */}
      <div>
        {/* Logo */}
        <div className="flex justify-start mb-6">
          <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 
            dark:border-white border dark:text-white rounded-[6px] pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Navigation Links */}
        <nav className="space-y-5">
          {topLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
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
        </nav>
        <hr />

      </div>
      
      {/* ---- Bottom Section ---- */}
      <div className="space-y-4">
        {/* Support & Settings Links */}
        <div className="space-y-2">
          {bottomLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
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
        <div className="flex items-center justify-between  dark:bg-gray-800 rounded-lg p-3">
         

          <div className="flex items-center gap-3 relative">
  {/* Profile Image */}
  <div className="relative">
    <img
      src={profilePic}
      alt="Admin"
      className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700"
    />
    {/* Blue Circle with Checkmark */}
    <div className="absolute bottom-0 -right-1 h-4 w-4 bg-blue-500 rounded-full flex justify-center items-center">
      <span className="text-white text-[5px] font-bold">✔</span>
    </div>
  </div>

  {/* Name & Email */}
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
    </aside>
  );
}
