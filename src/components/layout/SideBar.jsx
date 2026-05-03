





// import React, { useState, useMemo } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard, Users, Crown, Wallet, CreditCard,
//   Shield, LifeBuoy, LogOut, Search, X,
//   ChevronDown, ChevronUp, GraduationCap, Network,
//   ShieldCheck,
//   UserCog,
 
 
//   Banknote, 
//   BookText, 
//   ArrowLeftRight, 
//   Coins,
//   Package, 
 
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import logoimg from "../../assets/nvelox.png";
// import profilePic from "../../assets/profile.svg";

// const NavItem = ({ to, icon, label, onClick }) => (
//   <NavLink
//     to={to}
//     onClick={onClick}
//     className={({ isActive }) =>
//       `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
//         isActive
//           ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
//           : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
//       }`
//     }
//   >
//     {icon}
//     {label}
//   </NavLink>
// );

// const DropdownSection = ({ title, icon, isOpen, toggle, children }) => (
//   <div>
//     <button
//       onClick={toggle}
//       className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
//           className="ml-8 mt-2 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3"
//         >
//           {children}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   </div>
// );

// export default function SideBar({ closeSidebar }) {
//   const navigate = useNavigate();
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [settingsOpen, setSettingsOpen] = useState(false);
//   const [search, setSearch] = useState("");

//   // Retrieve user data from localStorage based on your login response structure
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const logout = () => {
//     localStorage.clear(); // Clear all data on logout
//     navigate("/login", { replace: true });
//   };

//   const toggleDropdown = (key) =>
//     setOpenDropdown((prev) => (prev === key ? null : key));

//   // Admin-Specific Links
//   const topLinks = [
//   { to: "/dashboard", label: "Admin Overview", icon: <LayoutDashboard size={18} /> },
//   { to: "/dashboard/users", label: "User Directory", icon: <Users size={18} /> },
//   { to: "/dashboard/user-rank", label: "User Rank Management", icon: <Crown size={18} /> },
//   { to: "/dashboard/leaders", label: "Leader Oversight", icon: <Crown size={18} /> },
//   { to: "/dashboard/package", label: "Package Management", icon: <Wallet size={18} /> },
  
//   // Changed to Banknote to distinguish from System Wallets
//   { to: "/dashboard/manage-withdrawals", label: "Manage Withdrawals", icon: <Banknote size={18} /> },
  
//   // Changed to BookText (Ledger style)
//   { to: "/dashboard/transactions", label: "Global Ledger", icon: <BookText size={18} /> },
  
//   // Changed to ArrowLeftRight to represent individual user movements
//   { to: "/dashboard/user-transactions", label: "User Transactions", icon: <ArrowLeftRight size={18} /> },
//   { to: "/dashboard/funded-users", label: "Funded Users", icon: <Users size={18} /> },
//   { to: "/dashboard/user-packages", label: "User Packages", icon: <Package size={18} /> },
  
//   // Changed to Coins to represent profit/loss distribution
//   { to: "/dashboard/rebate-management", label: "Rebate Management", icon: <Coins size={18} /> },
  
//   { to: "/dashboard/withdrawal-management", label: "Admin Frozen Control", icon: <ShieldCheck size={18} /> },
//   { to: "/dashboard/training", label: "Training Academy", icon: <GraduationCap size={18} /> },
// ];

//   const dropdowns = [
//     {
//       key: "network",
//       title: "Network Mapping",
//       icon: <Network size={18} />,
//       links: [
//         { to: "/dashboard/network/unilevel", label: "Unilevel View" },
//         { to: "/dashboard/network/matrix", label: "Matrix View" },
//       ],
//     },
//   ];

//   const allLinks = useMemo(() => [...topLinks, ...dropdowns.flatMap((d) => d.links)], []);
//   const results = search ? allLinks.filter((l) => l.label.toLowerCase().includes(search.toLowerCase())) : [];

//   return (
//     <motion.aside
//       initial={{ x: -250 }}
//       animate={{ x: 0 }}
//       exit={{ x: -250 }}
//       className="w-72 bg-white dark:bg-neutral-950 flex flex-col border-r border-gray-200 dark:border-white/5"
//     >
//       {/* LOGO SECTION */}
//       <div className="p-6">
//         <div className="flex justify-between items-center mb-6">
//           <img src={logoimg} className="w-24" alt="Velox Capital" />
//           <X onClick={closeSidebar} className="md:hidden cursor-pointer dark:text-white" />
//         </div>

//         {/* SEARCH BAR */}
//         <div className="relative">
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search Admin Tools..."
//             className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-gray-100 dark:bg-white/5 dark:text-white border-none outline-none focus:ring-1 focus:ring-emerald-500"
//           />
//         </div>
//       </div>

//       {/* NAVIGATION CONTENT */}
//       <div className="flex-1 overflow-y-auto px-4 space-y-2">
//         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-3 mb-2">Main Management</p>
//         {topLinks.map((link) => (
//           <NavItem key={link.to} {...link} onClick={closeSidebar} />
//         ))}

//         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-3 mt-6 mb-2">Systems</p>
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

//         <DropdownSection
//           title="Security Settings"
//           icon={<Shield size={18} />}
//           isOpen={settingsOpen}
//           toggle={() => setSettingsOpen(!settingsOpen)}
//         >
//           <NavItem to="/dashboard/settings" label="Admin Config" />
//         </DropdownSection>
//       </div>

//       {/* FOOTER - ADMIN PROFILE */}
//       <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-neutral-900/50">
//         <div className="flex items-center justify-between p-2 rounded-2xl">
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <img src={profilePic} className="w-10 h-10 rounded-full border-2 border-emerald-500/20" alt="Admin" />
//               <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-neutral-900 rounded-full"></div>
//             </div>
//             <div className="overflow-hidden">
//               <p className="text-sm font-black text-gray-900 dark:text-white truncate">
//                 {user.name || "Super Admin"}
//               </p>
//               <div className="flex items-center gap-1">
//                 <UserCog size={10} className="text-emerald-500" />
//                 <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">
//                   {user.role || "Admin"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <button 
//             onClick={logout}
//             className="p-2 hover:bg-rose-500/10 text-gray-400 hover:text-rose-500 rounded-xl transition-colors"
//           >
//             <LogOut size={20} />
//           </button>
//         </div>
//       </div>
//     </motion.aside>
//   );
// }
















import React, { useState, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, Crown, Wallet,
  Shield, LogOut, Search, X,
  ChevronDown, ChevronUp, GraduationCap, Network,
  ShieldCheck, UserCog, Banknote, BookText,
  ArrowLeftRight, Coins, Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoimg from "../../assets/nvelox.png";
import profilePic from "../../assets/profile.svg";

/* ================= NAV ITEM ================= */
const NavItem = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-teal-500/10 to-yellow-400/10 text-teal-600 dark:text-teal-400 shadow-sm"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:translate-x-1"
      }`
    }
  >
    <span className="opacity-80 group-hover:scale-110 transition">
      {icon}
    </span>
    {label}
  </NavLink>
);

/* ================= DROPDOWN ================= */
const DropdownSection = ({ title, icon, isOpen, toggle, children }) => (
  <div>
    <button
      onClick={toggle}
      className="flex justify-between items-center w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition"
    >
      <div className="flex items-center gap-3">
        {icon}
        {title}
      </div>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
        <ChevronDown size={16} />
      </motion.div>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="ml-8 mt-2 space-y-1 border-l border-gray-200 dark:border-white/10 pl-3"
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

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const toggleDropdown = (key) =>
    setOpenDropdown((prev) => (prev === key ? null : key));

  /* ================= LINKS ================= */
  const topLinks = [
    { to: "/dashboard", label: "Admin Overview", icon: <LayoutDashboard size={18} /> },
    { to: "/dashboard/users", label: "User Directory", icon: <Users size={18} /> },
    { to: "/dashboard/user-rank", label: "User Rank Management", icon: <Crown size={18} /> },
    { to: "/dashboard/leaders", label: "Leader Oversight", icon: <Crown size={18} /> },
    { to: "/dashboard/package", label: "Package Management", icon: <Wallet size={18} /> },
    { to: "/dashboard/manage-withdrawals", label: "Manage Withdrawals", icon: <Banknote size={18} /> },
    { to: "/dashboard/transactions", label: "Global Ledger", icon: <BookText size={18} /> },
    { to: "/dashboard/user-transactions", label: "User Transactions", icon: <ArrowLeftRight size={18} /> },
    { to: "/dashboard/funded-users", label: "Funded Users", icon: <Users size={18} /> },
    { to: "/dashboard/user-packages", label: "User Packages", icon: <Package size={18} /> },
    { to: "/dashboard/rebate-management", label: "Rebate Engine", icon: <Coins size={18} /> },
    { to: "/dashboard/withdrawal-management", label: "Frozen Control", icon: <ShieldCheck size={18} /> },
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

  const allLinks = useMemo(
    () => [...topLinks, ...dropdowns.flatMap((d) => d.links)],
    []
  );

  const results = search
    ? allLinks.filter((l) =>
        l.label.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  /* ================= UI ================= */

  return (
    <motion.aside
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      exit={{ x: -260 }}
      className="w-72 h-screen bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl flex flex-col border-r border-gray-200 dark:border-white/5 shadow-xl"
    >
      {/* HEADER */}
      <div className="p-5 border-b border-gray-100 dark:border-white/5">
        <div className="flex justify-between items-center mb-5">
          <img src={logoimg} className="w-24" alt="Velox" />
          <X
            onClick={closeSidebar}
            className="md:hidden cursor-pointer text-gray-500 hover:text-red-500"
          />
        </div>

        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* NAV */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">

        <SectionTitle title="Management" />

        {topLinks.map((link) => (
          <NavItem key={link.to} {...link} onClick={closeSidebar} />
        ))}

        <SectionTitle title="Systems" />

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
          title="Security"
          icon={<Shield size={18} />}
          isOpen={settingsOpen}
          toggle={() => setSettingsOpen(!settingsOpen)}
        >
          <NavItem to="/dashboard/settings" label="Admin Config" />
        </DropdownSection>
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gradient-to-r from-teal-50/50 to-yellow-50/30 dark:from-transparent dark:to-transparent">
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={profilePic}
                className="w-10 h-10 rounded-full border-2 border-teal-400/30"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 border-2 border-white dark:border-neutral-900 rounded-full" />
            </div>

            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                {user.name || "Super Admin"}
              </p>
              <div className="flex items-center gap-1">
                <UserCog size={10} className="text-yellow-500" />
                <p className="text-[10px] font-bold text-yellow-500 uppercase">
                  {user.role || "Admin"}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-xl transition"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}

/* ================= SMALL COMPONENT ================= */
const SectionTitle = ({ title }) => (
  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mt-4">
    {title}
  </p>
);