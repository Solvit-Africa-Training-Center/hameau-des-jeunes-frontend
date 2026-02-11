import { IoPersonCircleOutline } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import { AdminDetailsDrawer } from "./AdminDetailsDrawer";

/* -------------------- Types -------------------- */

type AdminRole =
  | "Residential Care"
  | "Ifashe Tugufashe"
  | "Internship"
  | "Health Post";

type AdminStatus = "Up_to_date" | "Action_Required" | "Pending";

export interface Admin {
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  lastLogin: string;
  updates: string;
}

/* -------------------- Data -------------------- */

const admins: Admin[] = [
  {
    name: "Jean-Paul Mugisha",
    email: "jeanpaul@saintkizito.org",
    role: "Residential Care",
    status: "Up_to_date",
    lastLogin: "2 hours ago",
    updates: "45",
  },
  {
    name: "Marie-Claire Umuhoza",
    email: "marieclaire@saintkizito.org",
    role: "Ifashe Tugufashe",
    status: "Action_Required",
    lastLogin: "5 hours ago",
    updates: "54",
  },
  {
    name: "Eric Gasana",
    email: "eric@saintkizito.org",
    role: "Internship",
    status: "Pending",
    lastLogin: "1 day ago",
    updates: "34",
  },
  {
    name: "Alice Mutoni",
    email: "alicemutoni@saintkizito.org",
    role: "Health Post",
    status: "Up_to_date",
    lastLogin: "3 days ago",
    updates: "94",
  },
];

/* -------------------- Component -------------------- */

export const AdminActivityDetailsTable: React.FC = () => {
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedAdmin(null);
  };

  return (
    <>
      <div className="max-h-[225px] overflow-y-auto">
        <Table className="w-full">
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow className="border-none">
              <TableHead className="px-5 font-normal text-[#838484] text-base">
                Administrator
              </TableHead>
              <TableHead className="font-normal text-[#838484] text-base">
                Assigned Program
              </TableHead>
              <TableHead className="font-normal text-[#838484] text-base">
                Last Activity
              </TableHead>
              <TableHead className="font-normal text-[#838484] text-base">
                7-Day Updates
              </TableHead>
              <TableHead className="font-normal text-[#838484] text-base">
                Status
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {admins.map((admin) => (
              <TableRow key={admin.name} className="border-b border-gray-200">
                <TableCell className="px-5">
                  <div className="flex gap-2">
                    <Avatar size="lg">
                      <AvatarFallback>
                        <IoPersonCircleOutline size={40} />
                      </AvatarFallback>
                    </Avatar>

                    <div className="grid gap-1">
                      <span className="text-sm font-bold">{admin.name}</span>
                      <span className="text-sm text-gray-500">
                        {admin.email}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="grid gap-1">
                    <span className="text-sm font-bold">{admin.role}</span>
                    <span className="text-sm text-gray-500">PROGRAM ADMIN</span>
                  </div>
                </TableCell>

                <TableCell className="text-sm text-[#838484]">
                  {admin.lastLogin}
                </TableCell>

                <TableCell className="text-sm text-center text-[#838484]">
                  {admin.updates}
                </TableCell>

                <TableCell>
                  <Badge text={admin.status} />
                </TableCell>

                <TableCell>
                  <button
                    onClick={() => handleOpen(admin)}
                    className="cursor-pointer"
                  >
                    <MdKeyboardArrowRight
                      size={20}
                      className="text-[#838484]"
                    />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Changed from AdminActivityDetailsTable to AdminDetailsDrawer */}
      <AdminDetailsDrawer
        isOpen={isOpen}
        admin={selectedAdmin}
        onClose={handleClose}
      />
    </>
  );
};
