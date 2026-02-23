import { AboutUs } from "@/pages/AboutUs";
import Education from "@/pages/AdminResidentialCarePages/Education";
import Financials from "@/pages/AdminResidentialCarePages/Financials";
import HealthRecords from "@/pages/AdminResidentialCarePages/HealthRecords";
import Reports from "@/pages/AdminResidentialCarePages/Reports";
import ResidentialCareCareTakers from "@/pages/AdminResidentialCarePages/ResidentialCareCareTakers";
import ResidentialCareChildren from "@/pages/AdminResidentialCarePages/ResidentialCareChildren";
import ResidentialCareDashboard from "@/pages/AdminResidentialCarePages/ResidentialCareDashboard";
import ResidentialCareSettings from "@/pages/AdminResidentialCarePages/ResidentialCareSettings";
import { Contacts } from "@/pages/Contacts";
import { IfasheTugufasheDashboard } from "@/pages/DashboardPages/IfasheTugufasheDashboard";
import { ManageResidentialCare } from "@/pages/DashboardPages/ManageResidentialCare";
import { SuperAdminActivityOverview } from "@/pages/DashboardPages/SuperAdminActivityOverview";
import SuperAdminAnalytics from "@/pages/DashboardPages/SuperAdminAnalytics";
import { SuperAdminDashboard } from "@/pages/DashboardPages/SuperAdminDashboard";
import { SuperAdminPrograms } from "@/pages/DashboardPages/SuperAdminPrograms";
import SuperAdminSettings from "@/pages/DashboardPages/SuperAdminSettings";
import Donate from "@/pages/Donate";
import Gallery from "@/pages/Gallery";
import { Home } from "@/pages/Home";
import { IfasheTugufashe } from "@/pages/IfasheTugufashe";
import Internship from "@/pages/Internship";
import { LoginPage } from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import OurImpact from "@/pages/OurImpact";
import { Programs } from "@/pages/Programs";
import { ResetPassword } from "@/pages/ResetPassword";
import { ResidentialCare } from "@/pages/ResidentialCare";
import { SignupPage } from "@/pages/Signup";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { SuperAdminUsersMgt } from "@/pages/DashboardPages/SuperAdminUsersMgt";
import { SuperAdminFeedback } from "@/pages/DashboardPages/SuperAdminFeedback";
import SuperAdminFinancials from "@/pages/DashboardPages/SuperAdminFinancials";
import { NewPassword } from "@/pages/NewPassword";
import { ChangePassword } from "@/pages/ChangePassword";
import InternshipDashboard from "@/pages/AdminInternshipPages/InternshipDashboard";
import InternshipApplication from "@/pages/AdminInternshipPages/InternshipApplication";
import InternshipManagement from "@/pages/AdminInternshipPages/InternshipManagement";
import InternshipFeedBack from "@/pages/AdminInternshipPages/InternshipFeedback";
import InternshipSettings from "@/pages/AdminInternshipPages/InternshipSettings";
import Institutions from "@/pages/AdminResidentialCarePages/Institutions";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/programs/residentialCare" element={<ResidentialCare />} />
      <Route path="/programs/ifasheTugufashe" element={<IfasheTugufashe />} />
      <Route path="/programs/internships" element={<Internship />} />
      <Route path="/ourImpact" element={<OurImpact />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contacts" element={<Contacts />} />

      {/* ================= AUTH ROUTES ================= */}
      <Route path="/login" element={<LoginPage />} />

      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/newPassword" element={<NewPassword />} />
      <Route path="/changePassword" element={<ChangePassword />} />

      {/* ================= SUPER ADMIN ================= */}

      <Route
        path="/managerRegistration"
        element={
          <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
            <SignupPage />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/superAdminDashboard"
        element={
          <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/superAdminAnalytics"
        element={
          <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
            <SuperAdminAnalytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/listOfPrograms"
        element={
          <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
            <SuperAdminPrograms />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manageResidentialCare"
        element={
          <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
            <ManageResidentialCare />
          </ProtectedRoute>
        }
      />

      <Route
        path="/activityOverview"
        element={
          <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
            <SuperAdminActivityOverview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/usersManagement"
        element={
          <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
            <SuperAdminUsersMgt />
          </ProtectedRoute>
        }
      />

      <Route
        path="/feedback"
        element={
          <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
            <SuperAdminFeedback />
          </ProtectedRoute>
        }
      />

      <Route
        path="/allProgramsFinancials"
        element={
          <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
            <SuperAdminFinancials />
          </ProtectedRoute>
        }
      />

      <Route
        path="/superAdminSettings"
        element={
          <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
            <SuperAdminSettings />
          </ProtectedRoute>
        }
      />

      {/* ================= RESIDENTIAL MANAGER ================= */}
      <Route
        path="/residentialCareDashboard"
        element={
          <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
            <ResidentialCareDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/residentialCareChildren"
        element={
          <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
            <ResidentialCareChildren />
          </ProtectedRoute>
        }
      />
      <Route
        path="/residentialCareCareTakers"
        element={
          <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
            <ResidentialCareCareTakers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/residentialCareSettings"
        element={
          <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
            <ResidentialCareSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/education"
        element={
          <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
            <Education />
          </ProtectedRoute>
        }
      />
      <Route
        path="/financials"
        element={
          <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
            <Financials />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/healthRecords"
        element={
          <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
            <HealthRecords />
          </ProtectedRoute>
        }
      />

      <Route
        path="/educationalInstitutions"
        element={
          <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
            <Institutions />
          </ProtectedRoute>
        }
      />

      {/* ================= OTHER MANAGERS ================= */}

      {/* ================= Internship Program Managers */}

      <Route
        path="/InternshipsDashboard"
        element={
          <ProtectedRoute allowedRoles={["INTERNSHIPS_MANAGER"]}>
            <InternshipDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/InternshipApplication"
        element={
          <ProtectedRoute allowedRoles={["INTERNSHIPS_MANAGER"]}>
            <InternshipApplication />
          </ProtectedRoute>
        }
      />
      <Route
        path="/InternshipManagement"
        element={
          <ProtectedRoute allowedRoles={["INTERNSHIPS_MANAGER"]}>
            <InternshipManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/InternshipFeedbackContent"
        element={
          <ProtectedRoute allowedRoles={["INTERNSHIPS_MANAGER"]}>
            <InternshipFeedBack />
          </ProtectedRoute>
        }
      />
      <Route
        path="/InternshipSettings"
        element={
          <ProtectedRoute allowedRoles={["INTERNSHIPS_MANAGER"]}>
            <InternshipSettings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ifasheTugufasheDashboard"
        element={
          <ProtectedRoute allowedRoles={["IFASHE_MANAGER"]}>
            <IfasheTugufasheDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= NOT FOUND ================= */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
