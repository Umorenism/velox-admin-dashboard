import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import React from "react";
export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
      <h1 className="text-lg font-bold">Velox Dashboard</h1>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </header>
  );
}
