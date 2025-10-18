import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Bell, MessageSquare, Settings, Search } from "lucide-react";
import { IoChatbubblesOutline } from "react-icons/io5";
 import adminImg from "../../assets/profile.svg"; // replace with your admin image

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 shadow-md">
      {/* LEFT SECTION — SEARCH BAR */}
      <div className="flex items-center space-x-3 w-full max-w-md">
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2  dark:border-gray-700 rounded-[6px] dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A991] transition"
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center space-x-6">
        {/* THEME SWITCH */}
       

        <button
  onClick={toggleTheme}
  className="relative flex items-center gap-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full transition duration-300"
>
  {/* Label (Light/Dark text) */}
  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
    {theme === "dark" ? "Dark" : "Light"}
  </span>

  {/* Switch Track */}
  <div className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition">
    {/* Moving circle */}
    <span
      className={`absolute top-1 left-1 flex items-center justify-center w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
        theme === "dark" ? "translate-x-6" : "translate-x-0"
      }`}
    >
      {theme === "dark" ? (
        <Moon size={12} className="text-gray-700" />
      ) : (
        <Sun size={12} className="text-yellow-500" />
      )}
    </span>
  </div>
</button>


        {/* ICONS */}
        <div className="flex items-center space-x-5 text-gray-500 dark:text-gray-300">
          <MessageSquare className="cursor-pointer hover:text-[#00A991] transition" size={20} />
          <Bell className="cursor-pointer hover:text-[#00A991] transition" size={20} />
          
          <IoChatbubblesOutline className="cursor-pointer hover:text-[#00A991] transition" size={20} />
          <Settings className="cursor-pointer hover:text-[#00A991] transition" size={20} />
        </div>

        {/* PROFILE IMAGE */}
        <div className="flex items-center space-x-2">
          <img
            src={adminImg}
            alt="Admin"
            className="w-9 h-9 rounded-full object-cover border-2 border-[#00A991] cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}
