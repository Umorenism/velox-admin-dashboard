
import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";



import Settings from "../pages/Dashboard/Settings";
import Dashboardpage from "../pages/Dashboard/Dashboardpage";
import Packages from "../pages/Dashboard/Packages";
import UsersMangement from "../pages/Dashboard/UsersManagement";
import LeaderManagement from "../pages/Dashboard/LeaderManagement";
import Transaction from "../pages/Dashboard/Transaction";
import Withdrawal from "../pages/Dashboard/Withdrawal";

export default function AppRouter() {
  return (
    <Routes>
      {/* Redirect from root "/" to "/login" */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Example nested routes */}
         <Route index element={<Dashboardpage/>} />
        <Route path="users" element={<UsersMangement />} />
        <Route path="leaders" element={<LeaderManagement />} />
        <Route path="package" element={<Packages />} />
        <Route path="transactions" element={<Transaction />} />
        <Route path="withdrawals" element={<Withdrawal />} />
        <Route path="settings" element={<Settings />} /> 
      </Route>

      {/* 404 fallback */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
