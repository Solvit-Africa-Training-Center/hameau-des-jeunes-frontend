import { useState } from "react";
import SuperAdminSettingsContent from "@/components/SuperAdminDashboardComponents/SuperAdminSettingsContent";
import { MobileSidebar } from "@/components/ui/MobileSidebar";
import { DashboardTopNavBar } from "@/components/SuperAdminDashboardComponents/DashboardTopNavBar";
import { Sidebar } from "@/components/ui/sidebar";

function SuperAdminSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="min-h-screen">
        {/* Mobile Sidebar drawer */}
        <MobileSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Desktop Sidebar - completely hidden on mobile */}
        <Sidebar className="hidden md:flex" />

        {/* Main content - offset by sidebar on desktop only */}
        <div className="md:ml-54">
          <DashboardTopNavBar onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex flex-col items-center gap-6">
            <SuperAdminSettingsContent />
          </main>
        </div>
      </div>
    </>
  );
}

export default SuperAdminSettings;
