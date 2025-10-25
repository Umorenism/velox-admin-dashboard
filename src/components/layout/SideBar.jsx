





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
  LifeBuoy,
  LogOut,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  BarChart3,
  Megaphone,
  Copy,
  Network,
  Banknote,
  QrCode,
  Download,
  Calendar,
  Image as ImageIcon,
  PlusSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoimg from "../../assets/velox.svg";
import profilePic from "../../assets/profile.svg";
import { useTheme } from "../../context/ThemeContext";

export default function SideBar({ closeSidebar }) {
  const { theme, toggleTheme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isPromotionOpen, setIsPromotionOpen] = useState(false);

  const toggleDropdown = (key) =>
    setOpenDropdown((prev) => (prev === key ? null : key));
  const toggleAccordion = () => setIsAccordionOpen((prev) => !prev);
  const togglePromotion = () => setIsPromotionOpen((prev) => !prev);

  // === TOP STATIC LINKS ===
  const topLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/dashboard/users", label: "User Management", icon: <Users size={18} /> },
    { to: "/dashboard/leaders", label: "Leader Management", icon: <Crown size={18} /> },
    { to: "/dashboard/package", label: "Package & Wallet Activity", icon: <Wallet size={18} /> },
    { to: "/dashboard/transactions", label: "Transactions", icon: <CreditCard size={18} /> },
    { to: "/dashboard/withdrawals", label: "Withdrawals", icon: <ArrowDownCircle size={18} /> },
  ];

  // === PROMOTIONS SECTION ===
  const promotionSubLinks = [
    { to: "/dashboard/promotions", label: "Promotions Overview", icon: <PlusSquare size={15} /> },
    { to: "/dashboard/promotions/banners", label: "Banners Created", icon: <ImageIcon size={15} /> },
  ];

  // === NEW DROPDOWN GROUPS (from your updated sidebar) ===
  const dropdownLinks = [
    {
      key: "academy",
      label: "Academy",
      icon: <GraduationCap size={18} />,
      links: [
        { to: "/dashboard/academy/masterclass/basic", label: "Masterclass (Basic)" },
        { to: "/dashboard/academy/masterclass/pro", label: "Masterclass (Pro)" },
        { to: "/dashboard/academy/masterclass/advance", label: "Masterclass (Advance)" },
        { to: "/dashboard/academy/market-review", label: "Market Review" },
        { to: "/dashboard/academy/live-mentorship", label: "Live Mentorship" },
      ],
    },
    {
      key: "copytrading",
      label: "Copy Trading",
      icon: <Copy size={18} />,
      links: [
        { to: "/dashboard/copytrading/low-risk", label: "Low Risk" },
        { to: "/dashboard/copytrading/medium-risk", label: "Medium Risk" },
        { to: "/dashboard/copytrading/high-risk", label: "High Risk" },
      ],
    },
    {
      key: "network",
      label: "Network",
      icon: <Network size={18} />,
      links: [
        { to: "/dashboard/network/unilevel", label: "Unilevel" },
        { to: "/dashboard/network/matrix", label: "Matrix" },
        { to: "/dashboard/network/ranks", label: "Ranks" },
      ],
    },
    {
      key: "monthly",
      label: "Monthly",
      icon: <Calendar size={18} />,
      links: [
        { to: "/dashboard/monthly/income-calculator", label: "Income Calculator" },
        { to: "/dashboard/monthly/compound", label: "Compound" },
        { to: "/dashboard/monthly/relation-boards", label: "Relation Boards" },
      ],
    },
  ];

  // === SINGLE PAGE LINKS ===
  const singleLinks = [
    { to: "/dashboard/reports", label: "Reports", icon: <BarChart3 size={18} /> },
    { to: "/dashboard/announcements", label: "Announcements", icon: <Megaphone size={18} /> },
    { to: "/dashboard/retirement-bloq", label: "Retirement Bloq", icon: <Banknote size={18} /> },
    { to: "/dashboard/qr", label: "QR / Social Links", icon: <QrCode size={18} /> },
    { to: "/dashboard/downloads", label: "Downloads", icon: <Download size={18} /> },
  ];

  // === SECURITY & SETTINGS ===
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
      {/* ---- TOP SECTION ---- */}
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

        {/* === TOP LINKS === */}
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

          {/* === Promotions & Banners === */}
          <div>
            <button
              onClick={togglePromotion}
              className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800 transition"
            >
              <div className="flex items-center gap-3">
                <ArrowDownCircle size={18} />
                <span>Promotions & Banners</span>
              </div>
              {isPromotionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <AnimatePresence>
              {isPromotionOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-8 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-3"
                >
                  {promotionSubLinks.map((sublink) => (
                    <NavLink
                      key={sublink.to}
                      to={sublink.to}
                      onClick={closeSidebar}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-all ${
                          isActive
                            ? "bg-[#FFECE5] text-black"
                            : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
                        }`
                      }
                    >
                      {sublink.icon}
                      {sublink.label}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* === NEW DROPDOWN GROUPS === */}
          {dropdownLinks.map((group) => (
            <div key={group.key}>
              <button
                onClick={() => toggleDropdown(group.key)}
                className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-3">
                  {group.icon}
                  <span>{group.label}</span>
                </div>
                {openDropdown === group.key ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              <AnimatePresence>
                {openDropdown === group.key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-8 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-3"
                  >
                    {group.links.map((sub) => (
                      <NavLink
                        key={sub.to}
                        to={sub.to}
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                          `block px-2 py-1 rounded-md text-sm transition-all ${
                            isActive
                              ? "bg-[#FFECE5] text-black"
                              : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
                          }`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* === SINGLE LINKS === */}
          {singleLinks.map((link) => (
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

          {/* === SECURITY & SETTINGS === */}
          <div>
            <button
              onClick={toggleAccordion}
              className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800 transition"
            >
              <div className="flex items-center gap-3">
                <Shield size={18} />
                <span>Security & Settings</span>
              </div>
              {isAccordionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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

      {/* ---- BOTTOM SECTION ---- */}
      <div className="space-y-4 mt-4 mb-20">
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
            <img
              src={profilePic}
              alt="Admin"
              className="w-20 h-20 rounded-full object-cover border border-gray-300 dark:border-gray-700"
            />
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
