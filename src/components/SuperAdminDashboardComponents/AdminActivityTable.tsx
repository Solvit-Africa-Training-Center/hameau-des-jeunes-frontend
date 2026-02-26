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

/* -------------------- Types -------------------- */

type UserRole =
  | "Residential Care"
  | "Ifashe Tugufashe"
  | "Internship"
  | "Health Post";

type UserStatus = "Up_to_date" | "Action_Required" | "Pending";

interface User {
  name: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
  updates: string;
}

/* -------------------- Data -------------------- */

const users: User[] = [
  {
    name: "Jean-Paul Mugisha",
    role: "Residential Care",
    status: "Up_to_date",
    lastLogin: "2 hours ago",
    updates: "45",
  },
  {
    name: "Marie-Claire Umuhoza",
    role: "Ifashe Tugufashe",
    status: "Action_Required",
    lastLogin: "5 hours ago",
    updates: "54",
  },
  {
    name: "Eric Gasana",
    role: "Internship",
    status: "Pending",
    lastLogin: "1 day ago",
    updates: "34",
  },
  {
    name: "Alice Mutoni",
    role: "Health Post",
    status: "Up_to_date",
    lastLogin: "3 days ago",
    updates: "94",
  },
];

/* -------------------- Component -------------------- */

export const AdminActivityTable: React.FC = () => {
  return (
    <div className="max-h-[225px] overflow-y-auto">
      <Table className="w-full">
        <TableHeader className="bg-[#F9FAFB]">
          <TableRow className="border-none">
            <TableHead>
              <span className="px-5 font-primary text-[--secondaryBlack] font-bold text-sm">
                Admin names
              </span>
            </TableHead>
            <TableHead className="font-primary text-[--secondaryBlack] font-bold text-sm">
              ROLE
            </TableHead>

            <TableHead className="font-primary text-[--secondaryBlack] font-bold text-sm">
              Updates
            </TableHead>

            <TableHead className="font-primary text-[--secondaryBlack] font-bold text-sm">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {users.map((user) => (
            <TableRow key={user.name} className="border-b border-gray-200">
              <TableCell className="px-5">
                <div className="flex gap-2">
                  <Avatar size="lg">
                    <AvatarFallback>
                      <IoPersonCircleOutline size={40} className="" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid gap-1">
                    <span className="font-primary text-sm font-bold">
                      {user.name}
                    </span>
                    <span className="font-primary text-sm text-gray-500">
                      Last actively {user.lastLogin}
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell className="font-semibold">{user.role}</TableCell>

              <TableCell className="text-sm text-[--secondaryBlack]">
                {user.updates}
              </TableCell>

              <TableCell>
                <Badge text={user.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
