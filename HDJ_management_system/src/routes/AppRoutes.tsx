import { AboutUs } from "@/pages/AboutUs";
<<<<<<< HEAD
import { Dashboard } from "@/pages/Dashboard";
import { IfasheTugufasheDashboard } from "@/pages/DashboardPages/IfasheTugufasheDashboard";
import { InternshipsDashboard } from "@/pages/DashboardPages/InternshipsDashboard";
import { ResidentialCareDashboard } from "@/pages/DashboardPages/ResidentialCareDashboard";
import Donate from "@/pages/Donate";
import { Home } from "@/pages/Home";
import { IfasheTugufashe } from "@/pages/IfasheTugufashe";
import { LoginPage } from "@/pages/Login";
=======
import { Contacts } from "@/pages/Contacts";
import Donate from "@/pages/Donate";
import { Home } from "@/pages/Home";
import Internship from "@/pages/Internship";
>>>>>>> 7f9dc234ea86bc7a300ae6b947c468a916e567cf
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
<<<<<<< HEAD
      <Route path="/donate" element={<Donate />} />
      <Route path="programs/ifasheTugufashe" element={<IfasheTugufashe />} />

      {/* ADMIN PAGES ROUTES */}

      <Route path="/adminLogin" element={<LoginPage />} />
      <Route path="/adminSignup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/resetPassword" element={<ResetPassword />} />

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
=======
      <Route path="/donate" element={<Donate/>} />
      <Route path="/internships" element={<Internship/>} />
      <Route path="/contacts" element={<Contacts />} /> 
>>>>>>> 7f9dc234ea86bc7a300ae6b947c468a916e567cf
    </Routes>
  );
};
