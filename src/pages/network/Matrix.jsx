import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const matrix = {
  root: { name: "You", children: [
    { name: "Alice", children: [{ name: "David" }, { name: "Eve" }, { name: "Sam" }] },
    { name: "Bob", children: [{ name: "Kim" }, { name: "Leo" }] },
  ] },
};

const Node = ({ name, children }) => (
  <motion.div
    className="flex flex-col items-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-md">
      <User className="w-6 h-6" />
    </div>
    <p className="text-sm mt-2 font-semibold">{name}</p>
    {children && (
      <div className="flex justify-center gap-8 mt-4">
        {children.map((child, i) => (
          <Node key={i} {...child} />
        ))}
      </div>
    )}
  </motion.div>
);

const Matrix = () => (
  <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6">
    <h1 className="text-3xl font-semibold text-neutral-800 dark:text-neutral-100 mb-10">
      Matrix Network
    </h1>

    <div className="flex justify-center">
      <Node {...matrix.root} />
    </div>
  </div>
);

export default Matrix;
