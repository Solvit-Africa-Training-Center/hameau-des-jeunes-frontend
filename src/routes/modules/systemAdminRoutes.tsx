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
import { SuperAdminWhoWeAreMgt } from "@/pages/DashboardPages/SuperAdminWhoWeAreMgt";
import { SuperAdminWhatWeDoMgt } from "@/pages/DashboardPages/SuperAdminWhatWeDoMgt";
import { SuperAdminImpactMgt } from "@/pages/DashboardPages/SuperAdminImpactMgt";
import { SuperAdminTestimonialsMgt } from "@/pages/DashboardPages/SuperAdminTestimonialsMgt";
import { SuperAdminTeamMgt } from "@/pages/DashboardPages/SuperAdminTeamMgt";
import { SuperAdminCompanyContactMgt } from "@/pages/DashboardPages/SuperAdminCompanyContactMgt";
import { SuperAdminMessageMgt } from "@/pages/DashboardPages/SuperAdminMessageMgt";
import { SuperAdminGalleryMgt } from "@/pages/DashboardPages/SuperAdminGalleryMgt";
import { SuperAdminAboutMgt } from "@/pages/DashboardPages/SuperAdminAboutMgt";
import { SuperAdminProgramsOutcomesMgt } from "@/pages/DashboardPages/SuperAdminProgramsOutcomesMgt";
import { SuperAdminOurValuesMgt } from "@/pages/DashboardPages/SuperAdminOurValuesMgt";
import { SuperAdminSuccessStories } from "@/pages/DashboardPages/SuperAdminSuccessStories";

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
    key="who-we-are"
    path="/weAre"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminWhoWeAreMgt />
      </ProtectedRoute>
    }
  />,

  <Route
    key="what-we-do"
    path="/whatWeDo"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminWhatWeDoMgt />
      </ProtectedRoute>
    }
  />,

  <Route
    key="impact"
    path="/impact"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminImpactMgt />
      </ProtectedRoute>
    }
  />,

  <Route
    key="gallery"
    path="/ourGallery"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminGalleryMgt />
      </ProtectedRoute>
    }
  />,

  <Route
    key="testimonials"
    path="/testimonials"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminTestimonialsMgt />
      </ProtectedRoute>
    }
  />,

    <Route
    key="successStories"
    path="/successStories"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminSuccessStories />
      </ProtectedRoute>
    }
  />,

  <Route
    key="team"
    path="/team"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminTeamMgt />
      </ProtectedRoute>
    }
  />,

  <Route
    key="company-contact"
    path="/companyContact"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminCompanyContactMgt />
      </ProtectedRoute>
    }
  />,

  <Route
    key="message"
    path="/messages"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminMessageMgt />
      </ProtectedRoute>
    }
  />,

  <Route
    key="about"
    path="/aboutHameau"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminAboutMgt />
      </ProtectedRoute>
    }
  />,

  <Route
    key="programsOutcome"
    path="/programsOutcome"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminProgramsOutcomesMgt />
      </ProtectedRoute>
    }
  />,

  <Route
    key="ourValues"
    path="/ourValues"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminOurValuesMgt />
      </ProtectedRoute>
    }
  />,

  <Route
    key="sa-settings"
    path="/settings"
    element={
      <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
        <SuperAdminSettings />
      </ProtectedRoute>
    }
  />,
];
