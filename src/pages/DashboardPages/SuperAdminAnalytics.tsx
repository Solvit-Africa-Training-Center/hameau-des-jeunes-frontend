import { DashboardContent } from "@/components/SuperAdminDashboardComponents/DashboardContent";
import { DashboardTopNavBar } from "@/components/SuperAdminDashboardComponents/DashboardTopNavBar";
import { MobileSidebar } from "@/components/ui/MobileSidebar";
import { Sidebar } from "@/components/ui/sidebar";
import { useState } from "react";

export const SuperAdminAnalytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar */}
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex" />

      {/* Main content */}
      <div className="flex-1 md:ml-54 lg:ml-54">
        {" "}
        {/* ml-64 = sidebar width */}
        {/* Top Navbar */}
        <DashboardTopNavBar onMenuClick={() => setSidebarOpen(true)} />
        {/* Page content below */}
        <div className="flex flex-col items-center gap-6">
          {/* Your main dashboard content here */}
          <DashboardContent />
        </div>
      </div>
    </>
  );
};
