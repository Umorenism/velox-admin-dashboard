// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { TrendingUp } from "lucide-react";

// const CompoundCalculator = () => {
//   const [amount, setAmount] = useState("");
//   const [rate, setRate] = useState("");
//   const [months, setMonths] = useState("");
//   const [total, setTotal] = useState(null);

//   const calculateCompound = () => {
//     const principal = parseFloat(amount);
//     const monthlyRate = (parseFloat(rate) / 100) || 0;
//     const n = parseFloat(months) || 0;
//     const compound = principal * Math.pow(1 + monthlyRate, n);
//     setTotal(compound);
//   };

//   return (
//     <motion.div
//       className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-sm">
//         <div className="flex items-center gap-3 mb-6">
//           <TrendingUp className="w-7 h-7 text-green-500" />
//           <h1 className="text-2xl font-semibold">Compound Calculator</h1>
//         </div>

//         <div className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium mb-1">Initial Amount ($)</label>
//             <input
//               type="number"
//               className="w-full p-3 rounded-xl border dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Monthly Growth Rate (%)</label>
//             <input
//               type="number"
//               className="w-full p-3 rounded-xl border dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900"
//               value={rate}
//               onChange={(e) => setRate(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Number of Months</label>
//             <input
//               type="number"
//               className="w-full p-3 rounded-xl border dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900"
//               value={months}
//               onChange={(e) => setMonths(e.target.value)}
//             />
//           </div>

//           <motion.button
//             whileTap={{ scale: 0.97 }}
//             onClick={calculateCompound}
//             className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
//           >
//             Calculate
//           </motion.button>

//           {total !== null && (
//             <div className="mt-5 text-center text-lg font-semibold text-green-600 dark:text-green-400">
//               Future Value after {months} months: ${total.toFixed(2)}
//             </div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default CompoundCalculator;





import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Calculator, RefreshCw } from "lucide-react";

const CompoundInterestCalculator = () => {
  const [capital, setCapital] = useState("");
  const [rate, setRate] = useState("");
  const [days, setDays] = useState("");
  const [reinvest, setReinvest] = useState(100);
  const [result, setResult] = useState(null);

  const calculateCompound = () => {
    let P = parseFloat(capital);
    let r = parseFloat(rate) / 100;
    let t = parseInt(days);
    let reinvestRate = parseFloat(reinvest) / 100;
    if (isNaN(P) || isNaN(r) || isNaN(t)) return;

    for (let i = 0; i < t; i++) {
      let profit = P * r;
      P += profit * reinvestRate;
    }
    setResult(P.toFixed(2));
  };

  const resetForm = () => {
    setCapital("");
    setRate("");
    setDays("");
    setReinvest(100);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-[#012B2E] via-[#013B43] to-[#014C5A] dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-6lg p-8 bg-white/10 dark:bg-neutral-800/60 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header Glow Accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00A991] via-[#00FFC3] to-[#00A991]" />

        <div className="flex items-center justify-center mb-6">
          <Calculator className="text-[#00FFC3] mr-2" size={24} />
          <h2 className="text-2xl font-bold tracking-wide text-center">
            VeloxCapital Market
          </h2>
        </div>

        <p className="text-center text-sm text-gray-300 mb-6">
          Smart Compound Interest Tool for Traders
        </p>

        {/* Form */}
        <div className="space-y-4">
          {[
            { label: "Initial Capital ($)", value: capital, set: setCapital, placeholder: "Enter amount" },
            { label: "Daily Return Rate (%)", value: rate, set: setRate, placeholder: "e.g. 2" },
            { label: "Number of Trading Days", value: days, set: setDays, placeholder: "e.g. 30" },
            { label: "Reinvest Percentage (%)", value: reinvest, set: setReinvest, placeholder: "e.g. 100" },
          ].map((field, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <label className="block text-sm font-medium mb-1 text-gray-200">
                {field.label}
              </label>
              <input
                type="number"
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                className="w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00A991] focus:outline-none transition-all"
                placeholder={field.placeholder}
              />
            </motion.div>
          ))}

          <div className="flex gap-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={calculateCompound}
              className="w-full flex items-center justify-center gap-2 bg-[#00A991] hover:bg-[#00987D] text-white py-3 rounded-lg font-semibold shadow-md transition-all"
            >
              <TrendingUp size={18} />
              Calculate
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={resetForm}
              className="w-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-all"
            >
              <RefreshCw size={18} />
            </motion.button>
          </div>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-200">Final Capital:</h3>
            <p className="text-3xl font-bold text-[#00FFC3] mt-2 tracking-wide drop-shadow-lg">
              ${result}
            </p>
          </motion.div>
        )}

        {/* Subtle Footer Line */}
        <div className="mt-8 text-center text-xs text-gray-400">
          Powered by <span className="text-[#00FFC3] font-medium">VeloxCapital Market</span>
        </div>
      </motion.div>
    </div>
  );
};

export default CompoundInterestCalculator;