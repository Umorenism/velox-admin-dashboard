// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Bold, Italic, Link, List, ListOrdered } from 'lucide-react';

// export default function CompanyInformationForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     currency: '',
//     phone: '',
//     contact: '',
//     address: '',
//     about: '',
//     logo: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
//   };

//   return (
//     <motion.div
//       className="p-8 bg-white dark:bg-neutral-800 dark:text-white rounded-2xl w-full shadow-sm max-w-[1550px] mx-auto"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       <h2 className="text-lg font-semibold mb-6">Company Information</h2>

//       <form className="space-y-5">
//         <div>
//           <label className="block text-sm font-medium mb-1">Company Name<span className="text-red-500">*</span></label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Velox Limited"
//             className="w-full border dark:bg-transparent dark:text-white rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Company Email Address<span className="text-red-500">*</span></label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Velox773@gmail.com"
//             className="w-full border dark:bg-transparent dark:text-white rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Default Currency<span className="text-red-500">*</span></label>
//           <input
//             type="text"
//             name="currency"
//             value={formData.currency}
//             onChange={handleChange}
//             placeholder="USD"
//             className="w-full dark:bg-transparent dark:text-white border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Company Phone Number<span className="text-red-500">*</span></label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="090123 4556 555"
//             className="w-full dark:bg-transparent dark:text-white border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Contact Person<span className="text-red-500">*</span></label>
//           <input
//             type="text"
//             name="contact"
//             value={formData.contact}
//             onChange={handleChange}
//             placeholder="Obiora Wilson"
//             className="w-full dark:bg-transparent dark:text-white border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Company Address<span className="text-red-500">*</span></label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             placeholder="8726 Building 67 Abuja, Nigeria"
//             className="w-full dark:bg-transparent dark:text-white border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">About Company<span className="text-red-500">*</span></label>
//           <div className="border rounded-lg p-2">
//             <div className="flex space-x-3 mb-2 text-gray-500">
//               <Bold className="w-4 h-4 cursor-pointer" />
//               <Italic className="w-4 h-4 cursor-pointer" />
//               <Link className="w-4 h-4 cursor-pointer" />
//               <List className="w-4 h-4 cursor-pointer" />
//               <ListOrdered className="w-4 h-4 cursor-pointer" />
//             </div>
//             <textarea
//               name="about"
//               value={formData.about}
//               onChange={handleChange}
//               rows="4"
//               placeholder="Enter company description"
//               className="w-full dark:bg-transparent dark:text-white border-none focus:outline-none p-2 resize-none"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Company Logo<span className="text-red-500">*</span></label>
//           <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:border-emerald-500 transition">
//             <span className="text-4xl text-gray-400 mb-2">+</span>
//             <p className="text-sm text-gray-500">Upload .JPG, .PNG only</p>
//             <input type="file" name="logo" accept="image/*" onChange={handleChange} className="hidden" />
//           </label>
//         </div>
//       </form>
//     </motion.div>
//   );
// }








import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Bold, Italic, Link, List, ListOrdered, Upload } from "lucide-react";

export default function CompanyInformationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currency: "",
    phone: "",
    contact: "",
    address: "",
    about: "",
    logo: null,
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [hasCompany, setHasCompany] = useState(false); // 👈 new flag

  // ✅ Fetch existing company info
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/settings/company");
        const company = res.data?.settings || res.data;

        if (company && company._id) {
          setHasCompany(true); // 👈 mark as existing
          setFormData({
            name: company.companyName || "",
            email: company.companyEmail || "",
            currency: company.defaultCurrency || "",
            phone: company.companyPhone || "",
            contact: company.contactPerson || "",
            address: company.companyAddress || "",
            about: company.aboutCompany || "",
            logo: null,
          });
          setLogoPreview(company.companyLogo || null);
        }
      } catch (error) {
        console.warn("No existing company found, ready to add new.");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyData();
  }, []);

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setLogoPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const form = new FormData();
    form.append("companyName", formData.name);
    form.append("companyEmail", formData.email);
    form.append("defaultCurrency", formData.currency);
    form.append("companyPhone", formData.phone);
    form.append("contactPerson", formData.contact);
    form.append("companyAddress", formData.address);
    form.append("aboutCompany", formData.about);
    if (formData.logo) form.append("companyLogo", formData.logo);

    try {
      let res;
      if (hasCompany) {
        // 🟢 Update existing
        res = await axios.put("/api/settings/company", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // 🟡 Add new
        res = await axios.post("/api/admin/settings/company/add", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("✅ " + res.data.message);
    } catch (error) {
      console.error("❌ Update failed:", error);
      alert("Failed to update or create company info");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <motion.div
      className="p-8 bg-white dark:bg-neutral-800 dark:text-white rounded-2xl w-full shadow-sm max-w-[1550px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-lg font-semibold mb-6">Company Information</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading company data...</p>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Company Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Velox Limited"
              className="w-full border dark:bg-transparent dark:text-white rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Company Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contact@veloxcapital.com"
              className="w-full border dark:bg-transparent dark:text-white rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Default Currency<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              placeholder="USD"
              className="w-full border dark:bg-transparent dark:text-white rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Company Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1234567890"
              className="w-full border dark:bg-transparent dark:text-white rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Contact Person<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full border dark:bg-transparent dark:text-white rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Company Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Business St, Lagos, Nigeria"
              className="w-full border dark:bg-transparent dark:text-white rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium mb-1">
              About Company<span className="text-red-500">*</span>
            </label>
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
                required
              />
            </div>
          </div>

          {/* Logo */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Company Logo<span className="text-red-500">*</span>
            </label>
            <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:border-emerald-500 transition">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Company Logo"
                  className="h-20 object-contain mb-2 rounded-md"
                />
              ) : (
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
              )}
              <p className="text-sm text-gray-500">Upload .JPG, .PNG, .GIF</p>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={updating}
            className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {updating
              ? hasCompany
                ? "Updating..."
                : "Creating..."
              : hasCompany
              ? "Update Company"
              : "Add Company"}
          </button>
        </form>
      )}
    </motion.div>
  );
}
