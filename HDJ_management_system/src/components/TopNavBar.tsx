import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { Heart, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import hdj_logo from "@/assets/hameau_des_jeunes_logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Impact", to: "/OurImpact" },
  { label: "Programs", to: "/programs" },
  { label: "International Internships", to: "/internships" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contacts" },
];

export const TopNavBar = () => {
  const navigate = useNavigate();

  return (
    <header className=" fixed block top-0 z-50 w-full h-20 border-b bg-background">
      {/* ===== Mobile / Tablet ===== */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <div className="flex items-center gap-2">
          <img
            src={hdj_logo}
            alt="hameau_des_jeunes_logo"
            className="h-12 w-12 object-contain block shrink-0"
          />
          <p className="font-heading text-lg font-bold leading-none whitespace-nowrap">
            Hameau des Jeunes
          </p>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu size={26} />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-72">
            <nav className="flex flex-col gap-6 mt-10">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="font-heading text-lg text-center hover:bg-amber-200 rounded-md py-2"
                >
                  {item.label}
                </Link>
              ))}

              <Button
                onClick={() => navigate("/donate")}
                className="bg-button-yellow mt-6 mx-5 hover:bg-amber-500"
              >
                <div className="flex items-center gap-2">
                  <Heart size={18} />
                  Donate
                </div>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* ===== Desktop ===== */}
      <div className="hidden md:flex justify-center h-full ">
        <NavigationMenu className="flex items-center gap-10 h-20px">
          <img
            src={hdj_logo}
            alt="hameau_des_jeunes_logo"
            className="h-12 w-12"
          />

          <NavigationMenuList className="flex items-center gap-10">
            {navItems.map((item) => (
              <NavigationMenuItem
                key={item.label}
                className="font-heading cursor-pointer hover:font-bold"
              >
                <Link to={item.to}>{item.label}</Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>

          <Button
            onClick={() => navigate("/donate")}
            className="bg-button-yellow"
          >
            <div className="flex items-center gap-2">
              <Heart size={18} />
              Donate
            </div>
          </Button>
        </NavigationMenu>
      </div>
    </header>
  );
};
