import { DashboardTopNavBar } from "@/components/SuperAdminDashboardComponents/DashboardTopNavBar";
import { ManageResidentialCareContent } from "@/components/SuperAdminPrograms/ManageResidentialCareContent";
import { MobileSidebar } from "@/components/ui/MobileSidebar";
import { Sidebar } from "@/components/ui/sidebar";
import { useState } from "react";

export const ManageResidentialCare = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Mobile Sidebar drawer */}
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Desktop Sidebar - completely hidden on mobile */}
      <Sidebar className="hidden md:flex" />

      {/* Main content - offset by sidebar on desktop only */}
      <div className="md:ml-54">
        <DashboardTopNavBar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex flex-col items-center gap-6">
          <ManageResidentialCareContent />
        </main>
      </div>
    </div>
  );
};
