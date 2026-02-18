import { IoIosArrowForward } from "react-icons/io";
import { FiLogOut, FiUser } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLogoutMutation } from "@/store/api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PiPasswordDuotone } from "react-icons/pi";

export const UserMenu = ({open, setOpen,} : {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();

      // Clear localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Logout failed. Please try again.");

      // Clear local storage even if API call fails
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      navigate("/login");
    }
  };

  return (
 
          <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
          <IoIosArrowForward size={20} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56" onClick={(e) => e.stopPropagation()}>
        {/* User Info Section */}
        {user && (
          <>
            <div className="px-2 py-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#0F3D2E] rounded-full flex items-center justify-center">
                  <FiUser size={16} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.email}
                  </p>
                  <p>{user.role?.replace(/_/g, "")}</p>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
          </>
        )}

        {/* Logout Button */}
        <div className="p-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-2 py-2 text-sm text-red-600 hover:bg-red-100 rounded transition-colors"
          >
            <FiLogOut size={16} />
          </button>
        </div>

        {/* Change password button */}
        <div className="p-1">
          <button
            className="w-full flex items-center gap-2 px-2 py-2 text-sm text-black hover:bg-red-100 rounded transition-colors"
            onClick={() => navigate("/changePassword")}
          >
            <div className="flex items-center gap-2">
              <PiPasswordDuotone size={16} />
              <h1>Change Password</h1>
            </div>
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
