import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bold, Italic, Link, List, ListOrdered } from 'lucide-react';

export default function CompanyInformationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currency: '',
    phone: '',
    contact: '',
    address: '',
    about: '',
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  return (
    <motion.div
      className="p-8 bg-white dark:bg-neutral-800 dark:text-white rounded-2xl w-full shadow-sm max-w-[1550px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-lg font-semibold mb-6">Company Information</h2>

      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Company Name<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Velox Limited"
            className="w-full border dark:bg-transparent dark:text-white rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company Email Address<span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Velox773@gmail.com"
            className="w-full border dark:bg-transparent dark:text-white rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Default Currency<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            placeholder="USD"
            className="w-full dark:bg-transparent dark:text-white border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company Phone Number<span className="text-red-500">*</span></label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="090123 4556 555"
            className="w-full dark:bg-transparent dark:text-white border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact Person<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Obiora Wilson"
            className="w-full dark:bg-transparent dark:text-white border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company Address<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="8726 Building 67 Abuja, Nigeria"
            className="w-full dark:bg-transparent dark:text-white border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">About Company<span className="text-red-500">*</span></label>
          <div className="border rounded-lg p-2">
            <div className="flex space-x-3 mb-2 text-gray-500">
              <Bold className="w-4 h-4 cursor-pointer" />
              <Italic className="w-4 h-4 cursor-pointer" />
              <Link className="w-4 h-4 cursor-pointer" />
              <List className="w-4 h-4 cursor-pointer" />
              <ListOrdered className="w-4 h-4 cursor-pointer" />
            </div>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows="4"
              placeholder="Enter company description"
              className="w-full dark:bg-transparent dark:text-white border-none focus:outline-none p-2 resize-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company Logo<span className="text-red-500">*</span></label>
          <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:border-emerald-500 transition">
            <span className="text-4xl text-gray-400 mb-2">+</span>
            <p className="text-sm text-gray-500">Upload .JPG, .PNG only</p>
            <input type="file" name="logo" accept="image/*" onChange={handleChange} className="hidden" />
          </label>
        </div>
      </form>
    </motion.div>
  );
}
