import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ClipboardCheckIcon } from "lucide-react";
import profilePic from "@/assets/profile_pic.jpg";

import DashLogo from "@/assets/dashboardLogo.png";
import Typography from "./typography";
import { FaArrowTrendUp } from "react-icons/fa6";
import { GrOverview } from "react-icons/gr";
import { GoPeople } from "react-icons/go";
import { VscFeedback } from "react-icons/vsc";
import { GiProgression } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { UserMenu } from "../UserMenu";
import { useState } from "react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/superAdminDashboard" },
  { icon: FaArrowTrendUp, label: "Analytics", href: "/superAdminAnalytics" },
  { icon: GrOverview, label: "Activity Overview", href: "/activityOverview" },
  { icon: ClipboardCheckIcon, label: "Programs", href: "/listOfprograms" },
  { icon: GoPeople, label: "Users", href: "/usersManagement" },
  { icon: VscFeedback, label: "Feedback", href: "/feedback" },
  { icon: GiProgression, label: "Financials", href: "/allProgramsFinancials" },
  { icon: IoSettingsOutline, label: "Settings", href: "/settings" },
];

export function Sidebar({ className }: { className?: string }) {
  const { pathname } = useLocation();
   const [menuOpen, setMenuOpen] = useState(false);

  const loggedInUserString = localStorage.getItem("user");
  if (!loggedInUserString) {
    console.error("No user in localStorage");
    return null;
  }

  const loggedInUser = JSON.parse(loggedInUserString);
  const firstName = loggedInUser.first_name;
  const lastName = loggedInUser.last_name;

  return (
    <>
    <aside
      className={cn(
        // Base styles
        "flex flex-col h-screen w-54 shadow-xl bg-white flex-shrink-0",
        // Desktop: fixed positioning
        "md:fixed md:top-0 md:left-0",
        className,
      )}
    >
      <div className="mt-5 flex flex-col space-y-0.5 px-4">
        <img src={DashLogo} alt="Dashboard Logo" />
        <h1 className="text-[#0F3D2E] text-center">Welcome Again!</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar mt-5">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-[#2E454C] text-white"
                  : "text-[#0F3D2E] hover:bg-[#E7ECEA] hover:text-[#0F3D2E]",
              )}
            >
              <item.icon className="h-5 w-5" />
              <Typography
                variant="p"
                size="sm"
                weight="medium"
                className="text-inherit"
              >
                {item.label}
              </Typography>
            </Link>
          );
        })}
      </nav>

      <div className="h-[1px] w-full bg-gray-300" />

      <div className="p-4 flex items-center gap-4">
        <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={profilePic}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-button-yellow text-sm">Welcome back</p>
          <p className="text-[#0F3D2E] font-semibold truncate">
            {firstName} {lastName}
          </p>
        </div>
        <div className="ml-auto relative z-60">
            <UserMenu open={menuOpen} setOpen={setMenuOpen}/>
          </div>   
      </div> 
    </aside>
        {menuOpen && (
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={() => setMenuOpen(false)}
      />
    )}
    </>
    
  );
}
