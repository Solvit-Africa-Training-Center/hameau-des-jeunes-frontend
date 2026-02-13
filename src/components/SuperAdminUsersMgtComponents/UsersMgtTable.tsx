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
import { useState } from "react";
import { FaPenClip } from "react-icons/fa6";
import { IoMdTrash } from "react-icons/io";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { EditAdministratorModal } from "./EditAdministratorModal";
import { DeleteAdminModal } from "./DeleteAdminModal";
import { toast } from "react-toastify";

/* -------------------- Types -------------------- */

export type AdminRole =
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

export const UsersMgtTable: React.FC = () => {
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [adminsList, setAdminsList] = useState<Admin[]>(admins);

  const handleEditOpen = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setSelectedAdmin(null);
  };

  const handleSaveAdmin = (updatedAdmin: Admin) => {
    setAdminsList((prev) =>
      prev.map((admin) =>
        admin.email === selectedAdmin?.email ? updatedAdmin : admin,
      ),
    );
    toast.success("Administrator updated successfully!");
  };

  const handleDeleteOpen = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
    setSelectedAdmin(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedAdmin) {
      setAdminsList((prev) =>
        prev.filter((admin) => admin.email !== selectedAdmin.email),
      );
      toast.success("Administrator deleted successfully!");
    }
  };

  return (
    <>
      <div className="max-h-[225px] overflow-y-auto">
        <Table className="w-full">
          <TableHeader className="bg-white">
            {/* Search Field */}
            <Field className="m-3 bg-white">
              <div className="relative w-full max-w-xs">
                <Input
                  id="search_field"
                  type="text"
                  placeholder="Search by name, email or role"
                  required
                  className="border-none rounded-2xl bg-[#F5F7FA] text-[#718EBF] pl-10"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718EBF]"
                  size={18}
                />
              </div>
            </Field>
            <TableRow className="border-none bg-[#F9FAFB]">
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
                Status
              </TableHead>
              <TableHead className="font-normal text-[#838484] text-base">
                Actions
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {adminsList.map((admin) => (
              <TableRow key={admin.email} className="border-b border-gray-200">
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

                <TableCell>
                  <Badge text={admin.status} />
                </TableCell>

                <TableCell className="flex items-center gap-5">
                  <button
                    onClick={() => handleEditOpen(admin)}
                    className="cursor-pointer hover:opacity-70 transition-opacity"
                  >
                    <FaPenClip size={15} className="text-[#838484]" />
                  </button>

                  <button
                    onClick={() => handleDeleteOpen(admin)}
                    className="cursor-pointer hover:opacity-70 transition-opacity"
                  >
                    <IoMdTrash size={20} className="text-red-600" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Administrator Modal */}
      <EditAdministratorModal
        isOpen={isEditOpen}
        admin={selectedAdmin}
        onClose={handleEditClose}
        onSave={handleSaveAdmin}
      />

      {/* Delete Administrator Modal */}
      <DeleteAdminModal
        isOpen={isDeleteOpen}
        admin={selectedAdmin}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};
