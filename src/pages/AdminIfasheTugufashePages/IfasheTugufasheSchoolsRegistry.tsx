import { useState } from 'react';
import { IfasheTugufasheTopNavBar } from '@/components/AdminIfasheTugufasheComponents/IfasheTugufasheTopNavBar';
import { IfasheTugufasheSideBar } from '@/components/AdminIfasheTugufasheComponents/IfasheTugufasheSideBar';
import { IfasheTugufasheMobileSidebar } from '@/components/AdminIfasheTugufasheComponents/IfasheTugufasheMobileSideBar';
import SchoolsManagementContent from '@/components/AdminIfasheTugufasheComponents/ITSchoolContent/SchoolsManagementContent';

function IfasheTugufasheSchoolsRegistry() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/* Mobile Sidebar */}
      <IfasheTugufasheMobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Desktop Sidebar */}
      <IfasheTugufasheSideBar className="hidden md:flex" />

      {/* Main content */}
      <div className="flex-1 md:ml-54 lg:ml-54">
        {/* Top Navbar */}
        <IfasheTugufasheTopNavBar onMenuClick={() => setSidebarOpen(true)} />
        {/* Page content */}
        <div className="flex flex-col items-center gap-6">
          <SchoolsManagementContent />
        </div>
      </div>
    </>
  );
}

export default IfasheTugufasheSchoolsRegistry;
