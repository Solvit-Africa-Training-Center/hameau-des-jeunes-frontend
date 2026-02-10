import { AboutUs } from "@/pages/AboutUs";
import { Contacts } from "@/pages/Contacts";
import { IfasheTugufasheDashboard } from "@/pages/DashboardPages/IfasheTugufasheDashboard";
import { InternshipsDashboard } from "@/pages/DashboardPages/InternshipsDashboard";
import { ResidentialCareDashboard } from "@/pages/DashboardPages/ResidentialCareDashboard";
import SuperAdminAnalytics from "@/pages/DashboardPages/SuperAdminAnalytics";
import { SuperAdminDashboard } from "@/pages/DashboardPages/SuperAdminDashboard";
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

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/programs/residentialCare" element={<ResidentialCare />} />
      <Route path="/OurImpact" element={<OurImpact />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="programs/ifasheTugufashe" element={<IfasheTugufashe />} />

      {/* ADMIN PAGES ROUTES */}

      <Route path="/login" element={<LoginPage />} />
      <Route path="/managerRegistration" element={<SignupPage />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/superAdminDashboard" element={<SuperAdminDashboard />} />
      <Route path="/superAdminAnalytics" element={<SuperAdminAnalytics />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/settings" element={<SuperAdminSettings />} />

      {/* MANAGERS ROUTES */}
      <Route
        path="/residentialCareDashboard"
        element={<ResidentialCareDashboard />}
      />
      <Route path="/internshipsDashboard" element={<InternshipsDashboard />} />
      <Route
        path="/ifasheTugufasheDashboard"
        element={<IfasheTugufasheDashboard />}
      />
      <Route path="/donate" element={<Donate />} />
      <Route path="programs/internships" element={<Internship />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/gallery" element={<Gallery />} />
      {/* NOT FOUND */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
