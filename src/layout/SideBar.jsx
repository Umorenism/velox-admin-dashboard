import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3, Settings } from "lucide-react";
import React from "react";
export default function SideBar() {
  const links = [
    { to: "/dashboard", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { to: "/dashboard/users", label: "Users", icon: <Users size={18} /> },
    { to: "/dashboard/reports", label: "Reports", icon: <BarChart3 size={18} /> },
    { to: "/dashboard/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md h-screen p-4 hidden md:flex flex-col">
      <div className="text-2xl font-bold mb-8">Velox</div>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
