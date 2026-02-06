import { Link, useNavigate } from "react-router-dom";

import { Heart, Menu, Search } from "lucide-react";

import hdj_logo from "@/assets/hameau_des_jeunes_logo.png";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import profilePic from "@/assets/profile_pic.jpg";

interface DashboardTopNavBarProps {
  onMenuClick?: () => void;
}

// const navItems = [
//   { label: "Home", to: "/" },
//   { label: "About", to: "/about" },
//   { label: "Impact", to: "/OurImpact" },
//   { label: "Programs", to: "/programs" },
//   { label: "International Internships", to: "/internships" },
//   { label: "Gallery", to: "/gallery" },
//   { label: "Contact", to: "/contacts" },
// ];

export const DashboardTopNavBar = ({
  onMenuClick,
}: DashboardTopNavBarProps) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 z-50 h-[80px] md:w-auto w-full  border-b bg-background">
      {/* ===== Mobile / Tablet ===== */}
      <div className="flex md:hidden items-center justify-between  px-4 h-full">
        <div className="flex items-center ">
          {/* <img
            src={hdj_logo}
            alt="hameau_des_jeunes_logo"
            className="h-12 w-12 object-contain block shrink-0"
          /> */}

          <Field className="flex-1">
            <div className="relative max-w-xs">
              <Input
                id="search_field"
                type="text"
                placeholder="Search something"
                required
                className="border-none rounded-2xl bg-[#F5F7FA] text-[#718EBF] pl-10"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718EBF]"
                size={18}
              />
            </div>
          </Field>
        </div>

        <div className="flex gap-2">
          <div className="h-10 w-10 text-[#718EBF] rounded-full bg-[#F5F7FA] flex items-center justify-center">
            <IoNotificationsOutline size={20} />
          </div>

          <button
            onClick={onMenuClick}
            className="p-2 rounded-md border bg-white ml-3"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* ===== Desktop ===== */}
      <div
        className="
    hidden
    md:flex
    md:pl-[300px] md:justify-center md:items-center
    lg:pl-[700px] lg:justify-end lg:items-center
    h-full shadow-sm px-4
  "
      >
        <NavigationMenu className="flex items-center gap-4 h-[60px]">
          <NavigationMenuList className="flex items-center gap-4">
            {/* search bar */}
            <NavigationMenuItem>
              <Field>
                <div className="relative w-full max-w-xs">
                  <Input
                    id="search_field"
                    type="text"
                    placeholder="Search something"
                    required
                    className="border-none rounded-2xl bg-[#F5F7FA] text-[#718EBF] pl-10"
                  />
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718EBF]"
                    size={18}
                  />
                </div>
              </Field>
            </NavigationMenuItem>

            {/* settings icon */}
            <NavigationMenuItem>
              <div className="h-10 w-10 text-[#718EBF] rounded-full bg-[#F5F7FA] flex items-center justify-center">
                <IoSettingsOutline size={20} />
              </div>
            </NavigationMenuItem>

            {/* notifications icon */}
            <NavigationMenuItem>
              <div className="h-10 w-10 text-[#718EBF] rounded-full bg-[#F5F7FA] flex items-center justify-center">
                <IoNotificationsOutline size={20} />
              </div>
            </NavigationMenuItem>

            {/* profile picture */}
            <NavigationMenuItem>
              <div className="h-14 w-14 rounded-full overflow-hidden">
                <img
                  src={profilePic}
                  alt="profile_pic"
                  className="w-full h-full object-cover"
                />
              </div>
            </NavigationMenuItem>
            <button
              className="md:hidden p-2 rounded-md border bg-white"
              onClick={onMenuClick}
            >
              <Menu size={10} />
            </button>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};
