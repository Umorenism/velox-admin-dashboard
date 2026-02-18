// ProtectedRoute.tsx  (rename suggestion: AuthRequired.tsx or PrivateOutlet.tsx)
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("access_token");
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    localStorage.removeItem("access_token");
    return <Navigate to="/login" replace />;
  }

  // All good → render child route(s)
  return <Outlet />;
};