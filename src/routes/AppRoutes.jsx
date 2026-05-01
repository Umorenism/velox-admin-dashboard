import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";

// 🧩 Sidebar Linked Pages
import Dashboardpage from "../pages/Dashboard/Dashboardpage";
import UsersMangement from "../pages/Dashboard/UsersManagement";
import LeaderManagement from "../pages/Dashboard/LeaderManagement";
import Packages from "../pages/Dashboard/Packages";
import Transaction from "../pages/Dashboard/Transaction";
import WithdrawalManagement from "../utlis/WithdrawalManagement";
import CourseManager from "../pages/academy/CourseManager";
import Unilevel from "../pages/network/Unilevel";
import Matrix from "../pages/network/Matrix";
import Settings from "../pages/Dashboard/Settings";
import NotFound from "../pages/Dashboard/NotFound";
import ManageWithdrawal from "../utlis/ManageWithdrawal";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Main Management Section */}
          <Route index element={<Dashboardpage />} />
          <Route path="users" element={<UsersMangement />} />
          <Route path="leaders" element={<LeaderManagement />} />
          <Route path="package" element={<Packages />} />
          <Route path="transactions" element={<Transaction />} />
          <Route path="withdrawal-management" element={<WithdrawalManagement/>} />
          <Route path="training" element={<CourseManager />} />
          <Route path="manage-withdrawals" element={<ManageWithdrawal />} />

          {/* Network Mapping Section */}
          <Route path="network/unilevel" element={<Unilevel />} />
          <Route path="network/matrix" element={<Matrix />} />

          {/* Security Settings Section */}
          <Route path="settings" element={<Settings />} />

          {/* Catch-all for dashboard */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      {/* Global 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}