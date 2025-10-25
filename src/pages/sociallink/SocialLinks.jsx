import React from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const links = [
  { id: 1, name: "Facebook", icon: Facebook, url: "https://facebook.com" },
  { id: 2, name: "Twitter", icon: Twitter, url: "https://twitter.com" },
  { id: 3, name: "Instagram", icon: Instagram, url: "https://instagram.com" },
  { id: 4, name: "YouTube", icon: Youtube, url: "https://youtube.com" },
];

const SocialLinks = () => (
  <motion.div
    className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h1 className="text-3xl font-semibold mb-10 text-neutral-800 dark:text-neutral-100">
      Social Links
    </h1>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {links.map((link) => (
        <motion.a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm flex flex-col items-center hover:shadow-lg transition"
          whileHover={{ scale: 1.05 }}
        >
          <link.icon className="w-10 h-10 text-indigo-500 mb-3" />
          <span className="text-lg font-semibold">{link.name}</span>
        </motion.a>
      ))}
    </div>
  </motion.div>
);

export default SocialLinks;
