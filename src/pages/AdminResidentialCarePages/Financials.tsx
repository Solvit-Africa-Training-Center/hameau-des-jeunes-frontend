import { useState } from 'react';
import { ResidentialCareSideBar } from '@/components/AdminResidentialCareComponents/ResidentialCareSideBar';
import { ResidentialMobileSidebar } from '@/components/AdminResidentialCareComponents/ResidentialMobileSideBar';
import { ResidentialCareTopNavBar } from '@/components/AdminResidentialCareComponents/ResidentialCareTopNavBar';
import FinancialsContent from '@/components/AdminResidentialCareComponents/RCFinancialsContent/FinancialsContent';

function Financials() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    
    <>
      {/* Mobile Sidebar */}
      <ResidentialMobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Desktop Sidebar */}
      <ResidentialCareSideBar className="hidden md:flex" />

      {/* Main content */}
      <div className="flex-1 md:ml-54 lg:ml-54">
        {" "}
        {/* ml-64 = sidebar width */}
        {/* Top Navbar */}
        <ResidentialCareTopNavBar onMenuClick={() => setSidebarOpen(true)} />
        {/* Page content below */}
        <div className="flex flex-col items-center gap-6">
          {/* Your main dashboard content here */}
          <FinancialsContent />
        </div>
      </div>
    </>
  );
}

export default Financials;