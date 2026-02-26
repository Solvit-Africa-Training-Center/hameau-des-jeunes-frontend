import { DashboardContent } from "@/components/SuperAdminDashboardComponents/DashboardContent";
import { DashboardTopNavBar } from "@/components/SuperAdminDashboardComponents/DashboardTopNavBar";
import { MobileSidebar } from "@/components/ui/MobileSidebar";
import { Sidebar } from "@/components/ui/sidebar";
import { useState } from "react";

export const SuperAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Mobile Sidebar drawer */}
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Desktop Sidebar - completely hidden on mobile */}
      <Sidebar className="hidden md:flex" />

      {/* Top navbar */}
      <DashboardTopNavBar onMenuClick={() => setSidebarOpen(true)} />

      {/* Main content - offset by sidebar on desktop only */}
      <main className="pt-16 md:ml-[13.5rem] flex flex-col items-center gap-6">
        <DashboardContent />
      </main>
    </div>
  );
};