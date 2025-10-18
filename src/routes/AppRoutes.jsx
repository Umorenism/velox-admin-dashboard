// import { Routes, Route } from "react-router-dom";
// import React from "react";
// import DashboardLayout from "../components/layout/DashboardLayout";
// // import Overview from "../pages/dashboard/Overview";
// // import Users from "../pages/dashboard/Users";
// // import Reports from "../pages/dashboard/Reports";
// // import Settings from "../pages/dashboard/Settings";
// // import NotFound from "../pages/NotFound";
// import { ProtectedRoute } from "./ProtectedRoute";
// import Login from "../pages/Login";

// export default function AppRouter() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         {/* <Route index element={<Overview />} />
//         <Route path="users" element={<Users />} />
//         <Route path="reports" element={<Reports />} />
//         <Route path="settings" element={<Settings />} /> */}
//       </Route>

//       {/* <Route path="*" element={<NotFound />} /> */}
//     </Routes>
//   );
// }





import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Users from "../pages/Dashboard/Users";
import Overview from "../pages/Dashboard/Overview";
import Reports from "../pages/Dashboard/Reports";
import Settings from "../pages/Dashboard/Settings";

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
         <Route index element={<Overview/>} />
        <Route path="users" element={<Users />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} /> 
      </Route>

      {/* 404 fallback */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
