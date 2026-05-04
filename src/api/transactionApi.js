import { apiClient } from "./apiClient";

// ✅ Fetch all transactions
export const getTransactions = async () => {
  try {
    const res = await apiClient.get("/api/admin/transactions");

    console.log("✅ [GET TRANSACTIONS SUCCESS]");
    console.log("Status:", res.status);
    console.log("Headers:", res.headers);
    console.log("Data:", res.data);

    return res.data;
  } catch (error) {
    console.error("❌ [GET TRANSACTIONS FAILED]");
    console.error("Status:", error.response?.status);
    console.error("Error Data:", error.response?.data || error.message);
    throw error;
  }
};




export const getUserTransactions = async (page = 1, limit = 8, search = "", status = "") => {
  try {
    const res = await apiClient.get("/api/admin/transactions", {
      params: { 
        page, 
        limit, 
        search, // for name/email
        status  // for approved/pending/rejected
      },
    });
    console.log("✅ [GET TRANSACTIONS SUCCESS]");
    return res.data;
  } catch (error) {
    console.error("❌ [GET TRANSACTIONS FAILED]", error.response?.data || error.message);
    throw error;
  }
};





export const creditDailyRebate = async (rebateData) => {
  try {
    const res = await apiClient.post("/api/admin/rebate/credit-daily", rebateData);
    console.log("✅ [REBATE DISTRIBUTION SUCCESS]", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ [REBATE DISTRIBUTION FAILED]");
    throw error.response?.data || error.message;
  }
};


export const getAllRebateTransactions = async () => {
  const response = await apiClient.get(
    "/api/admin/rebate/all-transactions"
  );
  return response.data;
};