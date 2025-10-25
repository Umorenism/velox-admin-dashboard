import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserCircle, Users, ChevronDown } from "lucide-react";

const mockData = [
  { id: 1, name: "John Doe", email: "john@example.com", level: 1, referrals: 5 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", level: 2, referrals: 2 },
  { id: 3, name: "Mark Wayne", email: "mark@example.com", level: 3, referrals: 1 },
];

const Unilevel = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <motion.div
      className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-semibold text-neutral-800 dark:text-neutral-100 mb-8">
        Unilevel Network
      </h1>

      <div className="space-y-4">
        {mockData.map((member) => (
          <motion.div
            key={member.id}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-sm hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <UserCircle className="w-10 h-10 text-indigo-500" />
                <div>
                  <h2 className="text-lg font-semibold">{member.name}</h2>
                  <p className="text-sm text-neutral-500">{member.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-xl text-sm">
                  Level {member.level}
                </span>
                <span className="flex items-center text-sm text-neutral-600 dark:text-neutral-300">
                  <Users className="w-4 h-4 mr-1" /> {member.referrals}
                </span>
                <button
                  onClick={() => setExpanded(expanded === member.id ? null : member.id)}
                  className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full"
                >
                  <ChevronDown
                    className={`transition-transform ${
                      expanded === member.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {expanded === member.id && (
              <div className="mt-4 bg-neutral-100 dark:bg-neutral-700 p-3 rounded-xl text-sm text-neutral-700 dark:text-neutral-200">
                <p>Referral Earnings: <strong>$240</strong></p>
                <p>Joined: <strong>March 2024</strong></p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Unilevel;
