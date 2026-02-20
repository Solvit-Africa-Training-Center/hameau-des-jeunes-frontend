import { useState } from 'react';
import { InternshipSideBar } from '@/components/AdminInternshipComponents/InternshipSideBar';
import { InternshipMobileSideBar } from '@/components/AdminInternshipComponents/InternshipMobileSideBar';
import { InternshipTopNavBar } from '@/components/AdminInternshipComponents/InternshipTopNavBar';
import InternshipSettingsContent from '@/components/AdminInternshipComponents/IPSettingsContent/InternshipSettingsContent';

function InternshipSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    
    <>
      {/* Mobile Sidebar */}
      <InternshipMobileSideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Desktop Sidebar */}
      <InternshipSideBar className="hidden md:flex" />

      {/* Main content */}
      <div className="flex-1 md:ml-54 lg:ml-54">
        {" "}
        {/* ml-64 = sidebar width */}
        {/* Top Navbar */}
        <InternshipTopNavBar onMenuClick={() => setSidebarOpen(true)} />
        {/* Page content below */}
        <div className="flex flex-col items-center gap-6">
          {/* Your main dashboard content here */}
          <InternshipSettingsContent/>
        </div>

        
      </div>
    </>
  );
}

export default InternshipSettings;