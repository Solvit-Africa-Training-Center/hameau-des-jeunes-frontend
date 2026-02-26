import { useState } from 'react';
import { IfasheTugufasheTopNavBar } from '@/components/AdminIfasheTugufasheComponents/IfasheTugufasheTopNavBar';
import { IfasheTugufasheSideBar } from '@/components/AdminIfasheTugufasheComponents/IfasheTugufasheSideBar';
import { IfasheTugufasheMobileSidebar } from '@/components/AdminIfasheTugufasheComponents/IfasheTugufasheMobileSideBar';
import IfasheTugufasheSchoolContent from '@/components/AdminIfasheTugufasheComponents/ITSchoolContent/IfasheTugufasheSchoolContent';

function IfasheTugufasheSchool() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    
    <>
      {/* Mobile Sidebar */}
      <IfasheTugufasheMobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Desktop Sidebar */}
      <IfasheTugufasheSideBar className="hidden md:flex" />

      {/* Main content */}
      <div className="flex-1 md:ml-54 lg:ml-54">
        {" "}
        {/* ml-64 = sidebar width */}
        {/* Top Navbar */}
        <IfasheTugufasheTopNavBar onMenuClick={() => setSidebarOpen(true)} />
        {/* Page content below */}
        <div className="flex flex-col items-center gap-6">
          {/* Your main dashboard content here */}
          <IfasheTugufasheSchoolContent />
        </div>
      </div>
    </>
  );
}

export default IfasheTugufasheSchool;