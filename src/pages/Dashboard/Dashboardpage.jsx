import React from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { DollarSign } from "lucide-react";
import PortfolioOverview from "../../utlis/ChartPortfolio";
import { Copy } from "lucide-react";
import QRCode from "react-qr-code";
import { useState } from "react";
import { CiWarning } from "react-icons/ci";
import Chart3D from "../../utlis/Chart3D";
import DonutChart from "../../utlis/DonutChart";
import DonutCharts from "../../utlis/DountCharts";
import DepositProgressChart from "../../utlis/DepositProgressChart";


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
    { title: "Total Deposit", amount: "0.00", currency: "USD" },
    { title: "Total Free Packages", amount: "0.00", currency: "USD" },
    { title: "Total Users on Activated Packages", amount: "76", currency: "" },
    { title: "Total Leaders on Free Packages", amount: "76", currency: "" },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 dark:text-white ">
      {/* Main Card */}
      
      <div className="w-full max-w-[1500px]  min-h-screen dark:bg-neutral-900 dark:border-neutral-800">
        <div className="space-y-5 mt-10">
          <RiMenuFoldLine size={30} />
          <h1 className="text-[24px] font-[700] text-[#000000] dark:text-white">
            {" "}
            Dashboard
          </h1>
        </div>

        <div>
          <Chart3D/>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            marginTop: "25px",
          }}
        >
          {data.map((item, index) => (
            
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
              {/* <PortfolioOverview /> */}
              <DonutChart/>
            </div>

            <div className="w-1/2 bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 rounded-xl shadow-md flex flex-col justify-between">
              <DonutCharts/>  
            </div>
          </div>
        </div>
        <div className="mt-10 ">
          <div>
            <DepositProgressChart/>
          </div>
          
        </div>
      </div>
    </div>
  );
}
