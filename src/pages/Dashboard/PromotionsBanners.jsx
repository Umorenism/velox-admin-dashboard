import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";

import BannerForm from "../../utlis/BannerForm";


export default function PromotionsBanner() {

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };




  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 dark:text-white mt-4 sm:mt-10"
    >
      <motion.div variants={fadeUp} className="w-full max-w-[1500px]">
        {/* Header */}
        <div className="space-y-5">
          <RiMenuFoldLine size={30} />
          <div className="flex justify-between items-center">
            <h1 className="text-[24px] font-[700] text-[#000000] dark:text-white">
             Promotions and Banners
            </h1>
          </div>
        </div>
      </motion.div>
      <motion.div className="w-full mt-10">
        <BannerForm/>
      </motion.div>
      
    </motion.div>
  );
}
