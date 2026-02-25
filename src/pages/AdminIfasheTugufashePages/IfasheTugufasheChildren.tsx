import { useState } from 'react';
import IfasheTugufasheChildrenContent from '@/components/AdminIfasheTugufasheComponents/ITChildrenContent/IfasheTugufasheChildrenContent';
import { IfasheTugufasheTopNavBar } from '@/components/AdminIfasheTugufasheComponents/IfasheTugufasheTopNavBar';
import { IfasheTugufasheSideBar } from '@/components/AdminIfasheTugufasheComponents/IfasheTugufasheSideBar';
import { IfasheTugufasheMobileSidebar } from '@/components/AdminIfasheTugufasheComponents/IfasheTugufasheMobileSideBar';

function IfasheTugufasheChildren() {
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
          <IfasheTugufasheChildrenContent />
        </div>
      </div>
    </>
  );
}

export default IfasheTugufasheChildren;