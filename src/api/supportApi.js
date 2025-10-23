import { apiClient } from "./apiClient";

// ✅ Get Support Tickets
export const getSupportTickets = async () => {
  try {
    const res = await apiClient.get("/api/v1/admin/support/tickets");
    return res.data;
  } catch (error) {
    console.error("Fetching tickets failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Reply to Ticket
export const replyToTicket = async (id, message) => {
  try {
    const res = await apiClient.post(`/api/v1/admin/support/tickets/${id}/reply`, { message });
    return res.data;
  } catch (error) {
    console.error("Replying to ticket failed:", error.response?.data || error.message);
    throw error;
  }
};
