import React from "react";
import { motion } from "framer-motion";
import { DownloadCloud, File } from "lucide-react";

const files = [
  { id: 1, name: "Investor Guide", type: "PDF", size: "2.1 MB" },
  { id: 2, name: "System Whitepaper", type: "PDF", size: "3.6 MB" },
  { id: 3, name: "Mobile App Manual", type: "DOCX", size: "1.2 MB" },
];

const Downloads = () => (
  <motion.div
    className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h1 className="text-3xl font-semibold mb-8">Downloads</h1>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {files.map((file) => (
        <motion.div
          key={file.id}
          className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-lg transition"
          whileHover={{ scale: 1.02 }}
        >
          <div>
            <File className="w-8 h-8 text-indigo-500 mb-3" />
            <h2 className="text-lg font-semibold">{file.name}</h2>
            <p className="text-sm text-neutral-500">
              {file.type} • {file.size}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="mt-5 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 flex items-center justify-center gap-2"
          >
            <DownloadCloud className="w-4 h-4" /> Download
          </motion.button>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default Downloads;
