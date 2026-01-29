import { AboutUs } from "@/pages/AboutUs";
import { Home } from "@/pages/Home";
import { Programs } from "@/pages/Programs";
import { ResidentialCare } from "@/pages/ResidentialCare";
import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/programs/residentialCare" element={<ResidentialCare />} />
    </Routes>
  );
};
