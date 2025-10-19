
import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";



import Settings from "../pages/Dashboard/Settings";
import Dashboardpage from "../pages/Dashboard/Dashboardpage";
import Packages from "../pages/Dashboard/Packages";
import UsersMangement from "../pages/Dashboard/UsersManagement";

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
        <Route path="package" element={<Packages />} />
        <Route path="settings" element={<Settings />} /> 
      </Route>

      {/* 404 fallback */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
