






import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { Upload } from "lucide-react";
import pic from '../../assets/success.svg'
import PackageGrid from "../../utlis/PackageGrid";

export default function Package() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    image: null,
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    console.log("New Package Created:", formData);
    setShowModal(false);
    setShowSuccess(true);
  };

  // ✅ Function to auto-close success modal after interval
  useEffect(() => {
    let timer;
    if (showSuccess) {
      timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000); // closes after 3 seconds
    }
    return () => clearTimeout(timer);
  }, [showSuccess]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 dark:text-white mt-10"
    >
      <motion.div variants={fadeUp} className="w-full max-w-[1500px]">
        {/* Header */}
        <div className="space-y-5">
          <RiMenuFoldLine size={30} />
          <div className="flex justify-between items-center">
            <h1 className="text-[24px] font-[700] text-[#000000] dark:text-white">
              Packages and Wallet Activity
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#00A991] text-white px-10 py-3 rounded-[10px]"
            >
              Create New Package
            </button>
          </div>
        </div>

        {/* Package Grid */}
        <div className="mt-10">
          <PackageGrid />
        </div>
      </motion.div>

      {/* CREATE PACKAGE MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg w-[500px] p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white text-center">
              Create New Package
            </h2>

            {/* Package Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Package Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter package name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 dark:border-neutral-700 rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#00A991]"
              />
            </div>

            {/* Amount */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full border border-gray-300 dark:border-neutral-700 rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#00A991]"
              />
            </div>

            {/* Upload Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Upload Image</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#00A991] transition">
                <Upload size={24} className="text-gray-500 mb-2" />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="text-sm text-gray-600 dark:text-gray-300">
                  Click to upload or drag and drop
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex w-full space-x-3">
              
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-lg bg-[#00A991] text-white w-full hover:bg-green-700 transition"
              >
                Create Package
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg w-[400px] p-8 flex flex-col items-center justify-center text-center"
          >
            {/* Center Image */}
            <img
              src={pic}
              alt="success"
              className="w-20 h-20 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Package Created for User 3863 successfully
            </h3>
           
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
