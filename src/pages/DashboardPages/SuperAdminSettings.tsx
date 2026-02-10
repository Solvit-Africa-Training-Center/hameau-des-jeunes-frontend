import { useState } from 'react';
import SuperAdminSettingsContent from '@/components/SuperAdminDashboardComponents/SuperAdminSettingsContent';
import { MobileSidebar } from '@/components/ui/MobileSidebar';
import { DashboardTopNavBar } from '@/components/SuperAdminDashboardComponents/DashboardTopNavBar';
import { Sidebar } from '@/components/ui/sidebar';

function SuperAdminSettings() {
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
          <SuperAdminSettingsContent />
        </div>
      </div>
    </>
  );
}

export default SuperAdminSettings;