import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { Heart, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import hdj_logo from "@/assets/hameau_des_jeunes_logo.png";
// className="flex items-center justify-center px-5 py-5 space-x-4 shadow-sm"

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Impact", to: "/impact" },
  { label: "Programs", to: "/programs" },
  { label: "International Internships", to: "/internships" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export const TopNavBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      {/* Mobile / Tablet */}
      <div className="sticky flex md:hidden items-center justify-between px-4 py-4">
        <div>
          <img
            src={hdj_logo}
            alt="hameau_des_jeunes_logo"
            className="h-15 w-15"
          />
        </div>
        <p className="font-heading text-xl font-bold">Hameau des Jeunes</p>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu size={26} />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-70">
            <nav className="flex flex-col gap-6 mt-10">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="font-heading text-lg text-center hover:bg-amber-200 hover:font-bold"
                >
                  {item.label}
                </Link>
              ))}

              <Button className="bg-button-yellow mt-6 mx-5">
                <div className="flex items-center gap-2">
                  <Heart size={18} />
                  Donate
                </div>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex justify-center">
        <NavigationMenu className="flex gap-30">
          <div>
            <img
              src={hdj_logo}
              alt="hameau_des_jeunes_logo"
              className="h-[60px] w-[60px]"
            />
          </div>
          <NavigationMenuList className="flex items-center justify-center gap-10 my-6">
            {navItems.map((item) => (
              <NavigationMenuItem
                key={item.label}
                className="font-heading cursor-pointer hover:font-bold"
              >
                <Link to={item.to}>{item.label}</Link>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem></NavigationMenuItem>
          </NavigationMenuList>

          <Button className="bg-button-yellow">
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
