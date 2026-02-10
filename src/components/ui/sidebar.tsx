import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ClipboardCheckIcon } from "lucide-react";
import profilePic from "@/assets/profile_pic.jpg";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/scholar" },
  { icon: FaArrowTrendUp, label: "Analytics", href: "/analytics" },
  { icon: GrOverview, label: "Activity Overview", href: "/activityOverview" },
  { icon: ClipboardCheckIcon, label: "Programs", href: "/programs" },
  { icon: GoPeople, label: "Users", href: "/users" },
  { icon: VscFeedback, label: "Feedback", href: "/feedback" },
  { icon: GiProgression, label: "Financials", href: "/financials" },
  { icon: IoSettingsOutline, label: "Settings", href: "/settings" },
];

import DashLogo from "@/assets/dashboardLogo.png";
import Typography from "./typography";
import { FaArrowTrendUp } from "react-icons/fa6";
import { GrOverview } from "react-icons/gr";
import { GoPeople } from "react-icons/go";
import { VscFeedback } from "react-icons/vsc";
import { GiProgression } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";

export function Sidebar({ className }: { className?: string }) {
  const { pathname } = useLocation();

  const loggedInUserString = localStorage.getItem("user");
  if (!loggedInUserString) {
    // user not found in localStorage
    console.error("No user in localStorage");
    return;
  }

  const loggedInUser = JSON.parse(loggedInUserString);
  const firstName = loggedInUser.first_name;
  const lastName = loggedInUser.last_name;

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen w-54 shadow-xl text-white shrink-0 fixed top-0 left-0",
        className,
      )}
    >
      <div className="mt-5 flex-col space-y-0.5">
        <img src={DashLogo} />

        <h1 className="text-[#0F3D2E] text-center">Welcome Again!</h1>
      </div>

      <nav className="flex-1 px-4 space-y-[0.5px] overflow-y-auto no-scrollbar mt-5 ">
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

      <div className="h-[1px] w-full bg-gray-300"></div>

      <div className="p-4 mt-auto flex gap-4">
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <img
            src={profilePic}
            alt="profile_pic"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-col">
          <h1 className="text-button-yellow">Welcome back</h1>
          <span className="text-[#0F3D2E] font-semibold">
            {firstName} {lastName}
          </span>
        </div>
      </div>
    </aside>
  );
}
