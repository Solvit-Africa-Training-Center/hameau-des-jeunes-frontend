/**
 * System Admin Routes Module
 *
 * Contains all routes for SYSTEM_ADMIN role (Super Administrator)
 * These routes provide access to system-wide management and analytics
 */

import { Route } from "react-router-dom";
import { SignupPage } from "@/pages/Signup";
import { SuperAdminDashboard } from "@/pages/DashboardPages/SuperAdminDashboard";
import SuperAdminAnalytics from "@/pages/DashboardPages/SuperAdminAnalytics";
import { SuperAdminPrograms } from "@/pages/DashboardPages/SuperAdminPrograms";
import { ManageResidentialCare } from "@/pages/DashboardPages/ManageResidentialCare";
import { SuperAdminActivityOverview } from "@/pages/DashboardPages/SuperAdminActivityOverview";
import { SuperAdminUsersMgt } from "@/pages/DashboardPages/SuperAdminUsersMgt";
import { SuperAdminFeedback } from "@/pages/DashboardPages/SuperAdminFeedback";
import SuperAdminFinancials from "@/pages/DashboardPages/SuperAdminFinancials";
import SuperAdminSettings from "@/pages/DashboardPages/SuperAdminSettings";
import { ProtectedRoute } from "../ProtectedRoute";

export const systemAdminRoutes = [
  <Route
    key="manager-reg"
    path="/managerRegistration"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SignupPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="sa-dashboard"
    path="/superAdminDashboard"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminDashboard />
      </ProtectedRoute>
    }
  />,
  <Route
    key="sa-analytics"
    path="/superAdminAnalytics"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminAnalytics />
      </ProtectedRoute>
    }
  />,
  <Route
    key="programs-list"
    path="/listOfPrograms"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminPrograms />
      </ProtectedRoute>
    }
  />,
  <Route
    key="manage-rc"
    path="/manageResidentialCare"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <ManageResidentialCare />
      </ProtectedRoute>
    }
  />,
  <Route
    key="activity-overview"
    path="/activityOverview"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminActivityOverview />
      </ProtectedRoute>
    }
  />,
  <Route
    key="users-mgt"
    path="/usersManagement"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminUsersMgt />
      </ProtectedRoute>
    }
  />,
  <Route
    key="feedback"
    path="/feedback"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminFeedback />
      </ProtectedRoute>
    }
  />,
  <Route
    key="financials"
    path="/allProgramsFinancials"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminFinancials />
      </ProtectedRoute>
    }
  />,
  <Route
    key="sa-settings"
    path="/superAdminSettings"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminSettings />
      </ProtectedRoute>
    }
  />,
];
