
import { Navigate } from "react-router-dom";
import React from "react";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token"); // ✅ Match Login.jsx

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem("access_token");
      return <Navigate to="/login" replace />;
    }
  } catch {
    localStorage.removeItem("access_token");
    return <Navigate to="/login" replace />;
  }

  return children;
};
