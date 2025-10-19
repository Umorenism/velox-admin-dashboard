
import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { DollarSign } from "lucide-react";
import { CiWarning } from "react-icons/ci";
import QRCode from "react-qr-code";

export default function UsersManagement() {
  const referralLink = "https://microtrade.com";
  const [activeTab, setActiveTab] = useState("all");
  const packages = [];

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  const wallets = [
    { id: 1, title: "Deposit Wallet", amount: "0.00 USD" },
    { id: 2, title: "USD Wallet", amount: "0.00 USD" },
    { id: 3, title: "IB Wallet", amount: "0.00 USD" },
    { id: 4, title: "Credit Wallet", amount: "0.00 USD" },
  ];

  const data = [
    {
      title: "Opix Algo Lite",
      des: "Fully automated algorithmic trading that uses advanced order flow strategy, money management and probabilistic analysis.",
    },
    {
      title: "Opix Algo Pro",
      des: "Fine-tuned automated trading improving as it learns through self-optimization. Equity protection, order flow strategy, and money management.",
    },
    {
      title: "Opix Algo Expert",
      des: "Next generation algorithmic trading providing unique stability. Volume-based trading, equity protection, and probabilistic analysis.",
    },
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-screen"
    >
      {/* Wallet Summary Section */}
      <motion.div
        variants={fadeUp}
        className="bg-white dark:bg-neutral-900 dark:text-white rounded-xl shadow-md flex flex-col md:flex-row w-full max-w-7xl mt-10 py-3"
      >
        {wallets.map((wallet, index) => (
          <motion.div
            key={wallet.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
            className="flex flex-col items-center justify-center flex-1 px-4 relative"
          >
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-gray-800 dark:text-white text-base text-center">
                {wallet.title}
              </h1>
              <p className="text-gray-500 dark:text-white font-[400] text-sm">
                {wallet.amount}
              </p>
            </div>

            <div className="flex items-center mt-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#00A991] text-white px-5 py-1.5 rounded-full shadow hover:shadow-lg transition-all text-sm font-medium"
              >
                Deposit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#EE933C] text-white px-5 py-1.5 rounded-full shadow hover:shadow-lg transition-all text-sm font-medium"
              >
                Transfer
              </motion.button>
            </div>

            {index !== wallets.length - 1 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-16 w-[1px] bg-gray-300"></div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Dashboard Header */}
      <motion.div
        variants={fadeUp}
        className="w-full max-w-[1500px] mt-10 dark:bg-neutral-900"
      >
        <div className="space-y-5 mt-10">
          <RiMenuFoldLine size={30} />
          <h1 className="text-[24px] font-[700] text-[#000000] dark:text-white">
            Dashboard
          </h1>
        </div>

        {/* Package Cards */}
        <div className="flex w-full gap-4 mt-3 ">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col justify-between items-start 
                 w-full 
                 rounded-[10px] overflow-hidden shadow-sm
                 bg-white dark:bg-neutral-900 dark:text-white
                 border border-gray-100 dark:border-neutral-800
                 hover:shadow-md transition-all duration-300"
            >
              <div className="w-full p-4 flex flex-col items-start">
                <div className="flex items-center justify-between w-full mb-2">
                  <h3 className="text-[24px] font-bold text-gray-800 dark:text-gray-200">
                    {item.title}
                  </h3>
                </div>

                <input
                  type="text"
                  placeholder="Projected Monthly Return: 8% - 13%"
                  className="w-[80%] text-[12px] px-2 py-1.5 rounded-[100px] border border-gray-300 dark:border-neutral-700 
                     bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 
                     focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
                />

                <div className="border-t border-neutral-200 dark:border-neutral-800 w-full mt-3 pt-2 text-left">
                  <span className="text-[14px] font-medium text-gray-800 dark:text-gray-300 leading-snug">
                    {item.des}
                  </span>
                </div>
              </div>

              <motion.div
                whileHover={{ backgroundColor: "#e57b1c" }}
                className="w-full bg-orange-500 text-white text-center py-2 text-[13px] font-medium cursor-pointer transition-all duration-300"
              >
                Subscribe
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Packages Section */}
        <motion.div variants={fadeUp} className="mt-10">
          <div className="w-full bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 rounded-xl shadow-md flex flex-col p-6 py-20">
            <h1 className="font-bold text-xl text-gray-800 dark:text-gray-100 p-4">
              Packages
            </h1>
            <hr className="border-neutral-200 dark:border-neutral-800 mt-2" />

            <div className="flex justify-between items-center mt-8 p-5">
              {[
                { key: "all", label: "All Package" },
                { key: "lite", label: "Package Lite" },
                { key: "pro", label: "Package Pro" },
                { key: "expert", label: "Package Expert" },
              ].map(({ key, label }) => (
                <motion.button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  whileHover={{ scale: 1.05, color: "#16a34a" }}
                  className={`relative pb-3 text-sm font-medium text-gray-700 dark:text-gray-300 transition duration-200`}
                >
                  {label}
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] bg-green-600 dark:bg-green-400 transition-all duration-300
                      ${activeTab === key ? "w-full" : "w-0"}`}
                  ></span>
                </motion.button>
              ))}
            </div>

            <div className="flex flex-col mt-20 justify-center items-center w-full">
              {packages.length === 0 ? (
                <>
                  <CiWarning size={44} className="text-gray-500 mb-2" />
                  <p className="text-[16px] font-[500] text-gray-600 dark:text-gray-400">
                    No Data Available
                  </p>
                </>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  {/* render package data here */}
                </p>
              )}
            </div>
          </div>
        </motion.div>
         <hr  className="mt-10"/>
        <div className="w-full mt-4 gap-10 flex ">
         
            <div className="w-1/2">
              <motion.h1 className="font-bold text-[20px]">Risk Warning</motion.h1>
              <motion.p>
                Trading forex, CFDs, and any financial derivative instruments on
                margin carries a high level of risk and may not be suitable for
                all investors, as you could sustain losses in excess of your
                deposits. Leverage can work for you as well as against you,
                please be aware and fully understand all risks associated with
                the market conditions and trading terms. Please carefully
                consider your financial situation and investment experience
                prior to proceeding in trading any products offered by
                International Finance Asia. International Finance Asia assumes
                no liability for errors, inaccuracies, or omissions; does not
                warrant the accuracy, completeness of information, text,
                graphics, links, or other items contained within this sit%e.
              </motion.p>
              <motion.span className="mt-5">
                International Finance Asia Pty Ltd is a financial services
                institution regulated by the Australian Securities and
                Investments Commission (ACN 670 137 345) under Australian
                Financial Services Authorized Representative License No.
                001305580.
              </motion.span>
            </div>
            <div className="w-1/2 mt-5">
              <motion.p>
                The contents in this site are provided only for information
                purposes and they should not be regarded as an offer or
                solicitation to any person in any jurisdiction where such an
                offer or solicitation is not authorized; nor should any of the
                contrary to local law or regulation. Read and understand the
                Terms and Conditions, and read our Risk Disclosure and other
                legal documents on International Finance Asia website prior to
                initiating your leveraged investment.
              </motion.p>
            </div>
          </div>
      </motion.div>
    </motion.div>
  );
}
