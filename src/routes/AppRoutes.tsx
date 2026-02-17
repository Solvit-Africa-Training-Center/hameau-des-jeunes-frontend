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
import { InternshipsDashboard } from "@/pages/DashboardPages/InternshipsDashboard";
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

      {/* ================= SUPER ADMIN ================= */}

      <Route 
      path="/managerRegistration"
      element={
        <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
          <SignupPage/>
        </ProtectedRoute>
      }>
      </Route>
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
      <Route path="/residentialCareChildren" element={<ResidentialCareChildren />} />
      <Route path="/residentialCareCareTakers" element={<ResidentialCareCareTakers />} />
      <Route path="/residentialCareSettings" element={<ResidentialCareSettings />} />
      <Route path="/education" element={<Education />} />
      <Route path="/financials" element={<Financials />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/healthRecords" element={<HealthRecords/>} />

      {/* ================= OTHER MANAGERS ================= */}
      <Route
        path="/internshipsDashboard"
        element={
          <ProtectedRoute allowedRoles={["INTERNSHIPS_MANAGER"]}>
            <InternshipsDashboard />
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
