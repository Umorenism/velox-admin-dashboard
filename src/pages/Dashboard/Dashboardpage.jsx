import React from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { DollarSign } from "lucide-react";
import PortfolioOverview from "../../utlis/ChartPortfolio";
import { Copy } from "lucide-react";
import QRCode from "react-qr-code";
import { useState } from "react";
import { CiWarning } from "react-icons/ci";

export default function Dashboardpage() {
  const referralLink = "https://microtrade.com";
  const [activeTab, setActiveTab] = useState("all");
  const packages = [];
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };
  const wallets = [
    { id: 1, title: "Deposit Wallet", amount: "0.00 USD" },
    { id: 2, title: "USD Wallet : ", amount: "0.00 USD" },
    { id: 3, title: "IB Wallet :", amount: "0.00 USD" },
    { id: 4, title: "Credit Wallet :", amount: "0.00 USD" },
  ];

  const data = [
    { title: "Total Investment", amount: "0.00", currency: "USD" },
    { title: "Weekly Rebate Profit", amount: "0.00", currency: "USD" },
    { title: "Weekly Total Profit", amount: "0.00", currency: "USD" },
    { title: "Weekly Packages", amount: "0", currency: "USD" },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 dark:text-white ">
      {/* Main Card */}
      <div className="bg-white dark:bg-neutral-900 dark:text-white rounded-xl shadow-md flex flex-col md:flex-row w-full max-w-7xl mt-10 py-3">
        {wallets.map((wallet, index) => (
          <div
            key={wallet.id}
            className="flex flex-col items-center justify-center flex-1 px-4 relative"
          >
            {/* Wallet Info */}
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-gray-800 dark:text-white text-base mb  text-center">
                {wallet.title}
              </h1>
              <p className="text-gray-500 dark:text-white font-[400] text-sm ">
                {wallet.amount}
              </p>
            </div>

            {/* Buttons */}
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

            {/* Divider (shorter, centered) */}
            {index !== wallets.length - 1 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-16 w-[1px] bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full max-w-[1500px]  mt-10 min-h-screen dark:bg-neutral-900 dark:border-neutral-800">
        <div className="space-y-5 mt-10">
          <RiMenuFoldLine size={30} />
          <h1 className="text-[24px] font-[700] text-[#000000] dark:text-white">
            {" "}
            Dashboard
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            marginTop: "10px",
          }}
        >
          {data.map((item, index) => (
            // <div
            // className="dark:bg-neutral-900 dark:text-white"
            //   key={index}
            //   style={{
            //     flex: 1,
            //     backgroundColor: "#fff",
            //     borderRadius: "12px",
            //     padding: "16px",
            //     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            //     display: "flex",
            //     flexDirection: "column",
            //     justifyContent: "space-between",
            //     alignItems: "flex-start", // align items to the start
            //     width: "100%",
            //   }}
            // >
            //   {/* Title and Dollar Icon */}
            //   <div
            //     style={{
            //       display: "flex",
            //       alignItems: "center",
            //       justifyContent: "space-between",
            //       gap: "50px",
            //       width: "100%",
            //     }}
            //   >
            //     <h3
            //       style={{
            //         fontSize: "16px",
            //         fontWeight: "600",
            //         textAlign: "left",
            //       }}
            //     >
            //       {item.title}
            //     </h3>
            //     <div style={{ display: "flex", gap: "4px" }}>
            //       {[...Array(1)].map((_, i) => (
            //         <div
            //           key={i}
            //           style={{
            //             width: "28px",
            //             height: "28px",
            //             borderRadius: "50%",
            //             backgroundColor: "#f1f1f1",
            //             display: "flex",
            //             justifyContent: "center",
            //             alignItems: "center",
            //             border: "1px solid #ddd",
            //           }}
            //         >
            //           <DollarSign size={16} color="#333" />
            //         </div>
            //       ))}
            //     </div>
            //   </div>

            //   {/* Amount */}
            //   <div
            //     style={{
            //       borderTop: "1px solid #eee",
            //       width: "100%",
            //       marginTop: "16px",
            //       paddingTop: "12px",
            //       textAlign: "left", // align text to start
            //     }}
            //   >
            //     <span
            //       style={{
            //         fontSize: "50px",
            //         fontWeight: "600",
            //         color: "#16a34a",
            //       }}
            //     >
            //       {item.amount}
            //       <span
            //         style={{
            //           fontSize: "14px",
            //           fontWeight: "500",
            //           marginLeft: "4px",
            //           color: "#16a34a",
            //           verticalAlign: "super",
            //         }}
            //       >
            //         {item.currency}
            //       </span>
            //     </span>
            //   </div>
            // </div>

            <div
              key={index}
              className="flex flex-col justify-between items-start w-full flex-1 
             rounded-xl p-4 shadow-md 
             bg-white dark:bg-neutral-900 dark:text-white 
             transition-colors duration-300"
            >
              {/* Title + Dollar Icon */}
              <div className="flex items-center justify-between gap-12 w-full">
                <h3 className="text-[16px] font-semibold text-left">
                  {item.title}
                </h3>

                <div className="flex gap-2">
                  {[...Array(1)].map((_, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-gray-100 dark:bg-neutral-800 
                     flex justify-center items-center border border-gray-300 dark:border-neutral-700 dark:border"
                    >
                      <DollarSign
                        size={16}
                        color={
                          window.matchMedia("(prefers-color-scheme: dark)")
                            .matches
                            ? "#ccc"
                            : "#333"
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div className="border-t border-neutral-200 dark:border-neutral-800 w-full mt-4 pt-3 text-left">
                <span className="text-[40px] font-semibold text-green-600 dark:text-green-400">
                  {item.amount}
                  <span className="text-[14px] font-medium ml-1 align-super text-green-600 dark:text-green-400">
                    {item.currency}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 ">
          <div className="flex w-full gap-5">
            <div className="w-1/2">
              <PortfolioOverview />
            </div>

            <div className="w-1/2 bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 rounded-xl shadow-md flex flex-col justify-between">
              {/* Header */}
              <div className="flex justify-between items-center p-5 border-b border-neutral-200 dark:border-neutral-800">
                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Referral Link
                </h1>
                <h1 className="text-sm text-gray-600 dark:text-gray-400">
                  Total Invited Members (78)
                </h1>
              </div>

              {/* Content */}
              <div className="flex flex-col items-center justify-center py-8 px-6">
                <QRCode value={referralLink} size={140} />
              </div>

              {/* Footer (Copy Button) */}
              <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 rounded-b-xl bg-[#F89235] flex justify-center">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2   text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  Copy Link <Copy size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 ">
          <div className="flex w-full gap-5">
            

            <div className="w-1/2 bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 rounded-xl shadow-md flex flex-col p-6 space-y-5">
              {/* Title */}
              <h1 className="text-lg font-semibold text-gray-800 font-bold dark:text-gray-100">
                Package Summary
              </h1>

              <hr className="border-neutral-200 dark:border-neutral-800" />

              {/* Profit */}
              <div className="flex items-center gap-4">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Profit:
                </span>
                <div className="text-green-600 bg-green-50 dark:bg-green-900/30 py-2 px-6 rounded-md font-semibold">
                  0.00 USD
                </div>
              </div>

              {/* Period */}
              <div className="flex items-center gap-4">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Period:
                </span>
                <div className="text-gray-500 dark:text-gray-400 bg-neutral-100 dark:bg-neutral-800 py-2 px-6 rounded-md">
                  2025-07-04 — 2025-07-04
                </div>
              </div>

              <hr className="border-neutral-200 dark:border-neutral-800" />

              {/* Total Lot Traded */}
              <div className="flex items-center gap-4">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Total Lot Traded:
                </span>
                <div className="text-gray-500 dark:text-gray-400 bg-neutral-100 dark:bg-neutral-800 py-2 px-6 rounded-md">
                  --
                </div>
              </div>

              {/* Total Rebate Profits */}
              <div className="flex items-center gap-4">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Total Rebate Profits:
                </span>
                <div className="text-green-600 bg-green-50 dark:bg-green-900/30 py-2 px-6 rounded-md font-semibold">
                  0.00 USD
                </div>
              </div>

              <hr className="border-neutral-200 dark:border-neutral-800" />

              {/* Footer Labels */}
              <div className="grid grid-cols-4 text-sm text-gray-600 dark:text-gray-400 font-medium mt-4">
                <h1>Package ID</h1>
                <h1>MT5 ID</h1>
                <h1>Lot Traded</h1>
                <h1>Profit (USD)</h1>
              </div>
            </div>

            {/* <div className="w-1/2 bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 rounded-xl shadow-md flex flex-col justify-between p-5">
              <div>
                <h1 className="font-bold text-xl">Packages</h1>
                <hr />
                <div className="flex justify-between items-center mt-10">
                  <button>All Package</button>
                  <button>Package Lite</button>
                  <button>Package Pro</button>
                  <button>Package Expert</button>
                </div>
                <div className="flex flex-col  mt-20 justify-center items-center w-full">
                 <CiWarning size={40} className="text-gray-500"/>
                 <p className="text-[16px] font-[500]">No Data Available</p>
                </div>
              </div>
              
              
            </div> */}

            <div className="w-1/2 bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 rounded-xl shadow-md flex flex-col p-6">
              {/* Header */}
              <h1 className="font-bold text-xl text-gray-800 dark:text-gray-100">
                Packages
              </h1>
              <hr className="border-neutral-200 dark:border-neutral-800 mt-2" />

              {/* Buttons */}
              <div className="flex justify-between items-center mt-8 border-b border-neutral-200 dark:border-neutral-800">
                {[
                  { key: "all", label: "All Package" },
                  { key: "lite", label: "Package Lite" },
                  { key: "pro", label: "Package Pro" },
                  { key: "expert", label: "Package Expert" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`relative pb-3 text-sm font-medium text-gray-700 dark:text-gray-300 transition duration-200
              hover:text-green-600 dark:hover:text-green-400`}
                  >
                    {label}
                    <span
                      className={`absolute left-0 bottom-0 h-[2px] bg-green-600 dark:bg-green-400 transition-all duration-300
                ${activeTab === key ? "w-full" : "w-0 group-hover:w-full"}`}
                    ></span>
                  </button>
                ))}
              </div>

              {/* Conditional Render */}
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
          </div>
          <hr className="mt-10" />
          <div className="w-full mt-4 gap-10 flex ">
            <div className="w-1/2">
              <h1 className="font-bold text-[20px]">Risk Warning</h1>
              <p>
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
              </p>
              <span className="mt-5">
                International Finance Asia Pty Ltd is a financial services
                institution regulated by the Australian Securities and
                Investments Commission (ACN 670 137 345) under Australian
                Financial Services Authorized Representative License No.
                001305580.
              </span>
            </div>
            <div className="w-1/2 mt-5">
              <p>
                The contents in this site are provided only for information
                purposes and they should not be regarded as an offer or
                solicitation to any person in any jurisdiction where such an
                offer or solicitation is not authorized; nor should any of the
                contrary to local law or regulation. Read and understand the
                Terms and Conditions, and read our Risk Disclosure and other
                legal documents on International Finance Asia website prior to
                initiating your leveraged investment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
