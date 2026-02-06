import { MobileSidebar } from "@/components/ui/MobileSidebar";
import { Sidebar } from "@/components/ui/sidebar";

import { useState } from "react";

export const SuperAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex min-h-screen">
        {/* Mobile Sidebar */}
        <MobileSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Desktop Sidebar */}
        <Sidebar />
      </div>
    </>
  );
};
