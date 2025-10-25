import React from "react";
import { motion } from "framer-motion";
import { Users, Star, ArrowRight } from "lucide-react";

const mockRelations = [
  { id: 1, name: "John Doe", level: 1, earnings: 250 },
  { id: 2, name: "Jane Smith", level: 2, earnings: 180 },
  { id: 3, name: "Alex Carter", level: 3, earnings: 120 },
];

const RelationBoard = () => (
  <motion.div
    className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="flex items-center gap-3 mb-6">
      <Users className="w-7 h-7 text-indigo-500" />
      <h1 className="text-2xl font-semibold">Relation Board</h1>
    </div>

    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Your Network Levels</h2>

      <div className="space-y-4">
        {mockRelations.map((r) => (
          <motion.div
            key={r.id}
            className="flex justify-between items-center p-4 bg-gray-50 dark:bg-neutral-900 rounded-xl hover:shadow-md transition"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-3">
              <Star className="text-yellow-500 w-5 h-5" />
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-neutral-500">Level {r.level}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
              ${r.earnings}
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default RelationBoard;
