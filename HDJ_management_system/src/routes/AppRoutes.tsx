import { AboutUs } from "@/pages/AboutUs";
import { Home } from "@/pages/Home";
import OurImpact from "@/pages/OurImpact";
import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/OurImpact" element={<OurImpact/>} />
    </Routes>
  );
};
