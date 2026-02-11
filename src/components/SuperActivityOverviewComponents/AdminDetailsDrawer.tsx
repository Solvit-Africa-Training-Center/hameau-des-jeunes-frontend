import { useEffect, useState } from "react";
import type { Admin } from "./AdminActivityDetailsTable";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { AdminActivityFeed } from "./AdminActivityFeed";

const statusCards = [
  {
    id: 1,
    title: "Total",
    nbrOfActions: "4",
  },
  {
    id: 2,
    title: "Pending",
    nbrOfActions: "2",
  },
  {
    id: 3,
    title: "Action",
    nbrOfActions: "0",
  },
  {
    id: 4,
    title: "Completed",
    nbrOfActions: "2",
  },
];

interface AdminDetailsDrawerProps {
  isOpen: boolean;
  admin: Admin | null;
  onClose: () => void;
}

export const AdminDetailsDrawer: React.FC<AdminDetailsDrawerProps> = ({
  isOpen,
  admin,
  onClose,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger animation after mount
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  if (!isOpen || !admin) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-40/100 bg-white shadow-lg z-50 p-6 transition-transform duration-300 ease-in-out ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Avatar size="lg">
              <AvatarFallback>
                <IoPersonCircleOutline size={40} />
              </AvatarFallback>
            </Avatar>

            <div className="grid gap-1">
              <span className="text-sm">Recent Activity</span>
              <span className="text-sm font-bold">{admin.name}</span>
            </div>
          </div>

          <button onClick={onClose} className="cursor-pointer">
            <IoMdCloseCircle size={25} className="text-[#0F3D2E]" />
          </button>
        </div>

        {/* Status cards */}
        <div className="flex gap-2 mt-14 ">
          {statusCards.map((item) => (
            <div
              className={`w-full space-y-1 py-3 rounded-lg font-light 
               ${item.id === 2 ? "text-[#F4B400] border border-[#F4B400] bg-[#FCE8B0]" : ""}
                ${item.id === 1 ? "text-black border border-[#D2D3D452] bg-[#D2D3D452]" : ""}
                ${item.id === 3 ? "text-[#480911] border border-[#920E0E69] bg-[#F90A2829]" : ""}
                ${item.id === 4 ? "text-[#0C9857] border border-[#0C985752] bg-[#D3FBEE]" : ""}`}
            >
              <h1 className="text-center">{item.title}</h1>

              <h1
                className={`text-center font-semibold
                
             `}
              >
                {item.nbrOfActions}
              </h1>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <AdminActivityFeed />
        </div>
      </div>
    </>
  );
};
