import { DashboardTopNavBar } from "@/components/DashboardsComponents/DashboardTopNavBar";
import { MobileSidebar } from "@/components/ui/MobileSidebar";
import { Sidebar } from "@/components/ui/sidebar";
import { useState } from "react";

export const SuperAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar */}
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex" />

      {/* Main content */}
      <div className="flex-1 md:ml-64 lg:ml-64">
        {" "}
        {/* ml-64 = sidebar width */}
        {/* Top Navbar */}
        <DashboardTopNavBar onMenuClick={() => setSidebarOpen(true)} />
        {/* Page content below */}
        <div className="pt-[80px] flex flex-col items-center gap-6">
          {/* Your main dashboard content here */}
        </div>
      </div>
    </>
  );
};
