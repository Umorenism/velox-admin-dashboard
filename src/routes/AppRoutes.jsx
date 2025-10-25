
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
import PromotionsBanner from "../pages/Dashboard/PromotionsBanners";
import CompanyProfile from "../pages/Dashboard/CompanyProfile";
import Notification from "../pages/Dashboard/Notification";
import Permission from "../pages/Dashboard/Permission";
import NotFound from "../pages/Dashboard/NotFound";
import CreateRole from "../pages/Dashboard/CreateRole";
import EmailPage from "../pages/Dashboard/EmailPage";
import BannersPage from "../pages/Dashboard/BannersPage";

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
        <Route path="promotions" element={<PromotionsBanner />} />
        <Route path="/dashboard/promotions/banners" element={<BannersPage />} />
        <Route path="settings" element={<Settings />} /> 
        <Route path="companyprofile" element={<CompanyProfile/>} /> 
        <Route path="notifications-route" element={<Notification/>} /> 
        <Route path="permission" element={<Permission/>} /> 
        <Route path="create" element={<CreateRole/>} /> 
        <Route path="email" element={<EmailPage/>} /> 
      </Route>

      {/* 404 fallback */}
       <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
