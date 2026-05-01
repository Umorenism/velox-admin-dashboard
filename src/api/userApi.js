// import { apiClient } from "../api/apiClient";

// // ✅ Get all users
// export const getUsers = async (params = {}) => {
//   try {
//     const res = await apiClient.get("/api/admin/users", { params });
//     console.log("Fetched Users:", res.data);
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching users:", error.response?.data || error);
//     throw error;
//   }
// };


// // ✅ Activate package
// // ✅ Activate package
// // export const activateUserPackage = async (userId, packageId) => {
// //   // Sending as userId and packageId to match your successful expectation description
// //   return await apiClient.post(`/api/admin/users/activate-package`, { 
// //     userId,    
// //     packageId 
// //   });
// // };

// // // ✅ Fund package
// // export const fundUserPackage = async (userId, data) => {
// //   return await apiClient.post(`/api/admin/users/fund`, { userId, ...data });
// // };



// import { apiClient } from "../api/apiClient";

// // ✅ Activate package
// export const activateUserPackage = async (userId, packageId) => {
//   // Matches req: { "userId": "...", "packageId": "..." }
//   return await apiClient.post(`/api/admin/users/activate-package`, { 
//     userId,    
//     packageId 
//   });
// };

// // ✅ Fund package
// export const fundUserPackage = async (userId, data) => {
//   // data usually contains { amount: number }
//   return await apiClient.post(`/api/admin/users/fund`, { userId, ...data });
// };






import { apiClient } from "../api/apiClient";

// ✅ Get all users
export const getUsers = async (params = {}) => {
  const res = await apiClient.get("/api/admin/users", { params });
  return res.data;
};

// ✅ Get all packages (New)
export const getPackages = async () => {
  const res = await apiClient.get("/api/admin/packages");
  return res.data; // This returns the array of 16 packages you provided
};

// ✅ Activate package
export const activateUserPackage = async (userId, packageId) => {
  return await apiClient.post(`/api/admin/users/activate-package`, { 
    userId,    
    packageId 
  });
};

// ✅ Fund package
export const fundUserPackage = async (userId, data) => {
  return await apiClient.post(`/api/admin/users/fund`, { userId, ...data });
};