/**
 * Public Routes Module
 *
 * Contains routes accessible to all users without authentication
 */

import { Route } from "react-router-dom";
import { AboutUs } from "@/pages/AboutUs";
import { Contacts } from "@/pages/Contacts";
import Donate from "@/pages/Donate";
import Gallery from "@/pages/Gallery";
import { Home } from "@/pages/Home";
import { IfasheTugufashe } from "@/pages/IfasheTugufashe";
import Internship from "@/pages/Internship";
import NotFound from "@/pages/NotFound";
import OurImpact from "@/pages/OurImpact";
import { Programs } from "@/pages/Programs";
import { ResidentialCare } from "@/pages/ResidentialCare";

export const publicRoutes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="about" path="/about" element={<AboutUs />} />,
  <Route key="programs" path="/programs" element={<Programs />} />,
  <Route
    key="programs-rc"
    path="/programs/residentialCare"
    element={<ResidentialCare />}
  />,
  <Route
    key="programs-if"
    path="/programs/ifasheTugufashe"
    element={<IfasheTugufashe />}
  />,
  <Route key="internships" path="/internships" element={<Internship />} />,
  <Route key="our-impact" path="/ourImpact" element={<OurImpact />} />,
  <Route key="donate" path="/donate" element={<Donate />} />,
  <Route key="gallery" path="/gallery" element={<Gallery />} />,
  <Route key="contacts" path="/contacts" element={<Contacts />} />,
  <Route key="not-found" path="*" element={<NotFound />} />,
];
