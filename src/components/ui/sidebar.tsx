import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LogOut, ClipboardCheckIcon } from "lucide-react";

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

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen w-64 bg-white text-white flex-shrink-0 sticky top-0",
        className,
      )}
    >
      <img src={DashLogo} />

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar">
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

      <div className="p-4 mt-auto">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm font-medium text-gray-300 hover:bg-[#3d262a] hover:text-white rounded-lg bg-[#3d262a]/50 transition-colors">
          <LogOut className="h-5 w-5" />
          <Typography
            variant="p"
            size="sm"
            weight="medium"
            className="text-inherit"
          >
            Logout
          </Typography>
        </button>
      </div>
    </aside>
  );
}
