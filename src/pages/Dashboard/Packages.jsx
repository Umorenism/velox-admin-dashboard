
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { Upload } from "lucide-react";
import pic from "../../assets/success.svg";
import PackageGrid from "../../utlis/PackageGrid";

export default function Package() {
  // const [showModal, setShowModal] = useState(false);
  // const [showSuccess, setShowSuccess] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   amount: "",
  //   image: null,
  // });


  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    image: null,
  });

  const [refreshKey, setRefreshKey] = useState(0); // 🔁 triggers reload

  // const handleInputChange = (e) => {
  //   const { name, value, files } = e.target;
  //   if (name === "image") {
  //     setFormData({ ...formData, image: files[0] });
  //   } else {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("price", formData.amount);
      payload.append("description", "Access to premium features");
      payload.append("isFree", false);
      if (formData.image) payload.append("image", formData.image);

      await createPackage(payload);

      setShowModal(false);
      setShowSuccess(true);
      setRefreshKey((prev) => prev + 1); // refresh package list
    } catch (error) {
      console.error("Package creation failed:", error);
      alert("Failed to create package. Check console for details.");
    }
  };
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

  // const handleSubmit = () => {
  //   console.log("New Package Created:", formData);
  //   setShowModal(false);
  //   setShowSuccess(true);
  // };

  useEffect(() => {
    let timer;
    if (showSuccess) {
      timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showSuccess]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 dark:text-white mt-10 px-4 sm:px-6 lg:px-8"
    >
      <motion.div variants={fadeUp} className="w-full max-w-[1500px]">
        {/* Header */}
        <div className="space-y-5">
          <RiMenuFoldLine size={30} className="text-gray-700 dark:text-white" />
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-[20px] sm:text-[24px] font-[700] text-[#000000] dark:text-white">
              Packages and Wallet Activity
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#00A991] text-white px-6 sm:px-10 py-3 rounded-[10px] text-sm sm:text-base hover:bg-[#00957F] transition"
            >
              Create New Package
            </button>
          </div>
        </div>

        {/* Package Grid */}
        <div className="mt-10">
          {/* <PackageGrid /> */}

          <PackageGrid />
        </div>
      </motion.div>

      {/* CREATE PACKAGE MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg w-full max-w-[500px] p-6 sm:p-8"
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
              <label className="block text-sm font-medium mb-2">
                Upload Image
              </label>
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
                <label
                  htmlFor="imageUpload"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Click to upload or drag and drop
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row w-full sm:space-x-3 gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-lg border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-300 w-full hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
              >
                Cancel
              </button>
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg w-full max-w-[400px] p-6 sm:p-8 flex flex-col items-center justify-center text-center"
          >
            <img src={pic} alt="success" className="w-20 h-20 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Package Created Successfully!
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
              The new package has been added successfully.
            </p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
