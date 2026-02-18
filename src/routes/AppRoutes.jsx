
import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";

// 🧩 Core Dashboard Pages
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
import AdminUploadCourse from "../pages/Dashboard/AdminUploadCourse";

// 💰 Monthly
import IncomeCalculator from "../pages/monthly/IncomeCalculator";
import CompoundCalculator from "../pages/monthly/CompoundCalculator";
import RelationBoard from "../pages/monthly/RelationBoard";

// 📈 Copy Trading
import LowRisk from "../pages/Trading/LowRisk";
import MediumRisk from "../pages/Trading/MediumRisk";
import HighRisk from "../pages/Trading/HighRisk";

// 🧾 Reports, Announcements, Retirement, etc.
import Reports from "../pages/reports/Reports";
import Announcements from "../pages/anouncement/Announcements";
import RetirementBlock from "../pages/retirement/RetirementBlock";
import SocialLinks from "../pages/sociallink/SocialLinks";
import Downloads from "../pages/download/Downloads";


// 🎓 Academy
import MasterclassBasic from "../pages/academy/MasterclassBasic";
import MasterclassPro from "../pages/academy/MasterclassPro";
import MasterclassAdvance from "../pages/academy/MasterclassAdvance";
import MarketReview from "../pages/academy/MarketReview";
import LiveMentorship from "../pages/academy/LiveMentorship";

// 🌐 Network
import Unilevel from "../pages/network/Unilevel";
import Matrix from "../pages/network/Matrix";
import Ranks from "../pages/network/Ranks";
import Wallet from "../pages/wallet/Wallet";

export default function AppRouter() {
  return (
    <Routes>
  <Route path="/" element={<Navigate to="/login" replace />} />
  <Route path="/login" element={<Login />} />

  {/* All protected routes live under one guarded layout route */}
  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route index element={<Dashboardpage />} />
      <Route path="users" element={<UsersMangement />} />
      <Route path="leaders" element={<LeaderManagement />} />
      <Route path="package" element={<Packages />} />
      <Route path="transactions" element={<Transaction />} />
      <Route path="withdrawals" element={<Withdrawal />} />
      <Route path="wallet-fund" element={<Wallet />} />
      <Route path="promotions" element={<PromotionsBanner />} />
      <Route path="promotions/banners" element={<BannersPage />} />
      <Route path="settings" element={<Settings />} />
      <Route path="companyprofile" element={<CompanyProfile />} />
      <Route path="notifications-route" element={<Notification />} />
      <Route path="permission" element={<Permission />} />
      <Route path="create" element={<CreateRole />} />
      <Route path="courses" element={<AdminUploadCourse />} />
      <Route path="email" element={<EmailPage />} />

      {/* Monthly */}
      <Route path="monthly/income-calculator" element={<IncomeCalculator />} />
      <Route path="monthly/compound" element={<CompoundCalculator />} />
      <Route path="monthly/relation-boards" element={<RelationBoard />} />

      {/* Network */}
      <Route path="network/unilevel" element={<Unilevel />} />
      <Route path="network/matrix" element={<Matrix />} />
      <Route path="network/ranks" element={<Ranks />} />

      {/* Copy Trading */}
      <Route path="copytrading/low-risk" element={<LowRisk />} />
      <Route path="copytrading/medium-risk" element={<MediumRisk />} />
      <Route path="copytrading/high-risk" element={<HighRisk />} />

      {/* Academy */}
      <Route path="academy/masterclass/basic" element={<MasterclassBasic />} />
      <Route path="academy/masterclass/pro" element={<MasterclassPro />} />
      <Route path="academy/masterclass/advance" element={<MasterclassAdvance />} />
      <Route path="academy/market-review" element={<MarketReview />} />
      <Route path="academy/live-mentorship" element={<LiveMentorship />} />

      {/* Others */}
      <Route path="reports" element={<Reports />} />
      <Route path="announcements" element={<Announcements />} />
      <Route path="retirement-bloq" element={<RetirementBlock />} />
      <Route path="qr" element={<SocialLinks />} />
      <Route path="downloads" element={<Downloads />} />

      {/* Optional: catch-all inside dashboard */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Route>

  {/* Global 404 – only reached if nothing else matches */}
  <Route path="*" element={<NotFound />} />
</Routes>
  );
}
